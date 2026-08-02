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
import { pickWeighted, sampleDistinct, shuffle } from './random';

const OBJECTION_REACTIONS: Record<Quality, string[]> = {
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

  if (config.channel === 'online') {
    const scenarios = flow.entry[config.initiatedBy ?? 'us'];
    const scenario = scenarios.find((s) => s.id === config.scenarioId) ?? scenarios[0];

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
    steps.push({
      kind: 'entry',
      progressLabel: 'Entry',
      scenarioLabel: scenario.label,
      context: scenario.context,
      usOpening: scenario.usOpening,
      themLine: branch.themLine,
      options: shuffle(branch.options),
      reactions: branch.reactions,
      endsRun,
      endText: branch.outcome.kind === 'end' ? branch.outcome.text : undefined,
    });
    maxRapport += bestDelta;
    endsEarly = endsRun;
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

  if (!endsEarly) {
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
    steps.push({ kind: 'pitch', progressLabel: 'Pitch', variant: 'short', text: flow.library.pitches.short.text });

    const objectionCount = Math.min(OBJECTION_COUNT[difficulty], flow.library.objections.length);
    const chosenObjections = sampleDistinct(flow.library.objections, objectionCount);
    chosenObjections.forEach((block, i) => {
      const options = shuffle([
        { id: 'a', text: block.response, quality: 3 as Quality },
        { id: 'b', text: block.distractors[0], quality: 2 as Quality },
        { id: 'c', text: block.distractors[1], quality: 1 as Quality },
      ]);
      const reactions: Record<Quality, string> = {
        3: pickWeighted(OBJECTION_REACTIONS[3], () => 1),
        2: pickWeighted(OBJECTION_REACTIONS[2], () => 1),
        1: pickWeighted(OBJECTION_REACTIONS[1], () => 1),
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
