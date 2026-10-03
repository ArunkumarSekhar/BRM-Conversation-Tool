import type {
  Channel,
  Difficulty,
  FlowData,
  InitiatedBy,
  CloseBlock,
  PitchVariant,
  Quality,
} from '../data/types';
import { QUALITY_DELTA, OBJECTION_COUNT } from '../data/scoring';
import { pickRandom, pickWeighted, sampleDistinct, shuffle } from './random';
import { PARTNER_PERSONAS, type PartnerPersona } from '../data/partnersCall/persona';

/** Partners entry scenarios where a 'continue' outcome means a call got scheduled —
 * the player should walk into the real, clocked call simulation next, not the flat
 * step-by-step engine. Their text uses {{contactName}}/{{orgName}} placeholders. */
const SCHEDULES_CALL_SCENARIOS = new Set(['whatsapp-outreach', 'email-outreach']);

function fillPersonaTokens(text: string, persona: PartnerPersona): string {
  return text.replaceAll('{{contactName}}', persona.contactName).replaceAll('{{orgName}}', persona.orgName);
}

const DIRECT_OBJECTION_REACTIONS: Record<Quality, string[]> = {
  3: [
    "Okay — that actually helps, thank you.",
    "Huh, I hadn't thought about it that way. Fair enough.",
    "That's a good answer, honestly. Go on.",
  ],
  2: [
    "Hmm, okay, if you say so.",
    "I mean... maybe. I'm not fully convinced.",
    "Okay, I guess that's fine.",
  ],
  1: [
    "That really didn't land for me.",
    "...That's not what I asked, honestly.",
    "I'm even less sure now, if I'm being honest.",
  ],
};

const DIRECT_PITCH_REACTIONS: string[] = [
  "Okay, that's actually really interesting. Can I ask you something though?",
  "Huh, okay — that's more structured than I expected. Can I ask something?",
  "Okay wait, that sounds like a lot but also kind of cool. Quick question though —",
  "Right, okay, that does sound like something I'd want to do. Can I ask —",
];

const PARTNERS_PITCH_REACTIONS: string[] = [
  "Okay, that's a clear pitch, I'll give you that. I do have a question though.",
  "Right, that tracks with what you said earlier. One thing I want to understand better —",
  "Okay, I can see where this could fit. Before we go further, I do want to ask —",
  "That's helpful context, thank you. There's something I want to raise though —",
];

const PARTNERS_OBJECTION_REACTIONS: Record<Quality, string[]> = {
  3: [
    "Okay, that's a fair answer — appreciate you addressing it directly.",
    "Fair enough, that actually changes how I'm thinking about this.",
    "That's a reasonable answer. Go on.",
  ],
  2: [
    "Hmm, okay. I'd want more detail at some point, but go on.",
    "I hear you, though I'm not fully convinced yet.",
    "Alright, noted. Let's move on for now.",
  ],
  1: [
    "That doesn't really put my mind at ease, if I'm honest.",
    "...That's not quite what I was asking.",
    "I'm more hesitant now, not less.",
  ],
};

export type Step =
  | {
      kind: 'entry';
      progressLabel: string;
      scenarioLabel: string;
      context?: string;
      usOpening: string;
      themLine: string;
      options: { id: string; text: string; quality: Quality }[];
      reactions: Record<Quality, string>;
      endsRun: boolean;
      endText?: string;
      /** set when a 'continue' outcome here means a call got scheduled — the
       * UI should walk into the real clocked call simulation next, with this persona. */
      scheduledCallPersonaId?: string;
    }
  | {
      kind: 'discovery';
      progressLabel: string;
      rowOptions: { id: string; text: string; quality: Quality; answerText: string; framingNote: string; routesTo: PitchVariant }[];
    }
  | {
      kind: 'pitch';
      progressLabel: string;
      variant: PitchVariant;
      text: string;
      framingNote?: string;
      afterReaction: string;
    }
  | {
      kind: 'objection';
      progressLabel: string;
      trigger: string;
      options: { id: string; text: string; quality: Quality }[];
      reactions: Record<Quality, string>;
      tofillNotes?: string[];
      index: number;
      total: number;
    }
  | {
      kind: 'close';
      progressLabel: string;
      closes: CloseBlock[];
    };

export interface RunConfig {
  channel: Channel;
  difficulty: Difficulty;
  initiatedBy?: InitiatedBy;
  scenarioId?: string;
  offlineOpeningId?: string;
}

export interface RunPlan {
  steps: Step[];
  maxRapport: number;
  endsEarly: boolean;
}

function continueChance(difficulty: Difficulty): number {
  return { easy: 0.85, medium: 0.7, hard: 0.5 }[difficulty];
}

export function buildRun(flow: FlowData, config: RunConfig): RunPlan {
  const { difficulty } = config;
  const bestDelta = QUALITY_DELTA[difficulty][3];
  const steps: Step[] = [];
  let maxRapport = 0;
  let endsEarly = false;

  let skipGenericSteps = false;

  if (config.channel === 'online') {
    const scenarios = flow.entry[config.initiatedBy ?? 'us'];
    const scenario = scenarios.find((s) => s.id === config.scenarioId) ?? scenarios[0];
    const schedulesCall = flow.id === 'partners' && SCHEDULES_CALL_SCENARIOS.has(scenario.id);
    const callPersona = schedulesCall ? pickRandom(PARTNER_PERSONAS) : undefined;

    const continueBranches = scenario.branches.filter((b) => b.outcome.kind !== 'end');
    const endBranches = scenario.branches.filter((b) => b.outcome.kind === 'end');
    const roll = Math.random();
    const pool = continueBranches.length > 0 && (roll < continueChance(difficulty) || endBranches.length === 0)
      ? continueBranches
      : endBranches.length > 0
        ? endBranches
        : continueBranches;
    const branch = pickWeighted(pool, (b) => b.difficultyWeight[difficulty] || 1);

    const endsRun = branch.outcome.kind === 'end';
    const willScheduleCall = schedulesCall && !endsRun;
    const fill = (text: string) => (callPersona ? fillPersonaTokens(text, callPersona) : text);
    steps.push({
      kind: 'entry',
      progressLabel: 'Entry',
      scenarioLabel: scenario.label,
      context: scenario.context,
      usOpening: fill(scenario.usOpening),
      themLine: fill(branch.themLine),
      options: shuffle(branch.options).map((o) => ({ ...o, text: fill(o.text) })),
      reactions: branch.reactions,
      endsRun,
      endText: branch.outcome.kind === 'end' ? branch.outcome.text : undefined,
      scheduledCallPersonaId: willScheduleCall ? callPersona?.id : undefined,
    });
    maxRapport += bestDelta;
    endsEarly = endsRun;
    skipGenericSteps = willScheduleCall;
  } else {
    const opening = flow.offlineOpenings.find((o) => o.id === config.offlineOpeningId) ?? flow.offlineOpenings[0];
    steps.push({
      kind: 'entry',
      progressLabel: 'Entry',
      scenarioLabel: opening.label,
      usOpening: opening.usLine,
      themLine: '',
      options: [],
      reactions: { 3: '', 2: '', 1: '' },
      endsRun: false,
    });
  }

  if (!endsEarly && !skipGenericSteps) {
    // Discovery: pick which question to ask (scored by the row's priority), reveal a
    // difficulty-weighted random answer, and route to a pitch variant.
    const rowOptions = flow.discoveryRouting.map((row) => {
      const answer = pickWeighted(row.answers, (a) => a.weight[difficulty] || 1);
      return {
        id: row.id,
        text: row.question,
        quality: row.priority,
        answerText: answer.text,
        framingNote: answer.framingNote,
        routesTo: answer.routesTo,
      };
    });
    steps.push({ kind: 'discovery', progressLabel: 'Discovery', rowOptions });
    maxRapport += bestDelta;

    // Pitch variant/text gets resolved by the UI once the player picks a discovery question;
    // this placeholder is overwritten at render time using that choice.
    const pitchReactionPool = flow.id === 'partners' ? PARTNERS_PITCH_REACTIONS : DIRECT_PITCH_REACTIONS;
    steps.push({
      kind: 'pitch',
      progressLabel: 'Pitch',
      variant: 'short',
      text: flow.library.pitches.short.text,
      afterReaction: pickRandom(pitchReactionPool),
    });

    const objectionCount = Math.min(OBJECTION_COUNT[difficulty], flow.library.objections.length);
    const chosenObjections = sampleDistinct(flow.library.objections, objectionCount);
    const reactionPool = flow.id === 'partners' ? PARTNERS_OBJECTION_REACTIONS : DIRECT_OBJECTION_REACTIONS;
    chosenObjections.forEach((block, i) => {
      const options = shuffle([
        { id: 'a', text: block.response, quality: 3 as Quality },
        { id: 'b', text: block.distractors[0], quality: 2 as Quality },
        { id: 'c', text: block.distractors[1], quality: 1 as Quality },
      ]);
      const reactions: Record<Quality, string> = {
        3: pickWeighted(reactionPool[3], () => 1),
        2: pickWeighted(reactionPool[2], () => 1),
        1: pickWeighted(reactionPool[1], () => 1),
      };
      steps.push({
        kind: 'objection',
        progressLabel: `Handle Resistance (${i + 1}/${chosenObjections.length})`,
        trigger: block.trigger,
        options,
        reactions,
        tofillNotes: block.tofillNotes,
        index: i + 1,
        total: chosenObjections.length,
      });
      maxRapport += bestDelta;
    });

    steps.push({ kind: 'close', progressLabel: 'Close', closes: flow.library.closes });
  }

  return { steps, maxRapport, endsEarly };
}

export function rapportPercent(rapport: number, maxRapport: number): number {
  if (maxRapport <= 0) return 0;
  return Math.max(0, Math.min(100, (rapport / maxRapport) * 100));
}

export type CloseResult = 'success' | 'overreach' | 'undersell';

export function evaluateClose(pct: number, close: CloseBlock): CloseResult {
  if (pct < close.band.min) return 'overreach';
  if (pct > close.band.max) return 'undersell';
  return 'success';
}
