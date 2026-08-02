import type { Difficulty } from '../data/types';
import { QUALITY_DELTA } from '../data/scoring';
import {
  PARTNER_PERSONAS,
  TIME_BUDGETS,
  askSizeFor,
  type FactKey,
  type PartnerPersona,
  type TimeBudgetId,
} from '../data/partnersCall/persona';
import {
  ASK_LADDER,
  ASK_SIZES,
  CALL_CLOSES,
  DISCOVERY_QUESTIONS,
  NEXT_STEP_BEAT,
  agendaBeat,
  bridgeBeat,
  explainerBeat,
  knowledgeCheckBeat,
  openingBeat,
  outcomesBeat,
  programBeat,
  reciprocityBeat,
  type AskId,
  type Beat,
  type CallClose,
  type CallOption,
  type Phase,
} from '../data/partnersCall/beats';
import { pickRandom } from './random';

export interface TranscriptLine {
  who: 'prospect' | 'player' | 'coach' | 'system';
  text: string;
  key: string;
}

export type PendingKind =
  | { kind: 'beat'; beat: Beat }
  | { kind: 'discovery' }
  | { kind: 'ask-select' }
  | { kind: 'ask-size' }
  | { kind: 'close' }
  | { kind: 'done' };

export interface CallState {
  persona: PartnerPersona;
  difficulty: Difficulty;
  budgetId: TimeBudgetId;
  minutesTotal: number;
  minutesUsed: number;
  rapport: number;
  maxRapport: number;
  discovered: Set<FactKey>;
  askedQuestionIds: string[];
  chosenAsks: AskId[];
  phase: Phase;
  transcript: TranscriptLine[];
  pending: PendingKind;
  ended: boolean;
  endReason?: 'time' | 'closed';
  closeLabel?: string;
  closeLanded?: boolean;
  lineCounter: number;
}

export interface CallConfig {
  difficulty: Difficulty;
  /** omit to randomise, which is the normal mode */
  forceBudget?: TimeBudgetId;
  forcePersonaId?: string;
}

const BUDGET_WEIGHTS: Record<Difficulty, TimeBudgetId[]> = {
  // harder difficulty = more likely to get the squeezed call
  easy: ['standard', 'standard', 'generous', 'generous', 'rushed'],
  medium: ['standard', 'standard', 'generous', 'rushed', 'rushed'],
  hard: ['rushed', 'rushed', 'rushed', 'standard', 'generous'],
};

export function minutesLeft(state: CallState): number {
  return Math.max(0, state.minutesTotal - state.minutesUsed);
}

export function isRushed(state: CallState): boolean {
  return state.budgetId === 'rushed';
}

function line(state: CallState, who: TranscriptLine['who'], text: string): TranscriptLine {
  return { who, text, key: `l${state.lineCounter++}` };
}

export function createCall(config: CallConfig): CallState {
  const persona = config.forcePersonaId
    ? PARTNER_PERSONAS.find((p) => p.id === config.forcePersonaId) ?? PARTNER_PERSONAS[0]
    : pickRandom(PARTNER_PERSONAS);
  const budgetId = config.forceBudget ?? pickRandom(BUDGET_WEIGHTS[config.difficulty]);
  const budget = TIME_BUDGETS[budgetId];

  const state: CallState = {
    persona,
    difficulty: config.difficulty,
    budgetId,
    minutesTotal: budget.minutes,
    minutesUsed: 0,
    rapport: 0,
    // opening, agenda, knowledge check, explainer, outcomes, bridge, 3 discovery,
    // program, reciprocity, ask, close, next step
    maxRapport: QUALITY_DELTA[config.difficulty][3] * 13,
    discovered: new Set(),
    askedQuestionIds: [],
    chosenAsks: [],
    phase: 'opening',
    transcript: [],
    pending: { kind: 'done' },
    ended: false,
    lineCounter: 0,
  };

  state.transcript.push(
    line(
      state,
      'coach',
      `${persona.orgName} — ${persona.sector}. You're speaking to their ${persona.contactRole}. That's all you know going in; everything else you'll have to ask for.`,
    ),
  );

  const opening = openingBeat(persona);
  state.transcript.push(line(state, 'prospect', opening.prompt));
  state.pending = { kind: 'beat', beat: opening };
  return state;
}

function clone(state: CallState): CallState {
  return {
    ...state,
    discovered: new Set(state.discovered),
    askedQuestionIds: [...state.askedQuestionIds],
    chosenAsks: [...state.chosenAsks],
    transcript: [...state.transcript],
  };
}

function spend(state: CallState, minutes: number) {
  state.minutesUsed += minutes;
}

function award(state: CallState, option: CallOption) {
  const quality = isRushed(state) && option.rushedQuality ? option.rushedQuality : option.quality;
  state.rapport += QUALITY_DELTA[state.difficulty][quality];
}

function outOfTime(state: CallState): boolean {
  return state.minutesUsed >= state.minutesTotal;
}

function endOnTime(state: CallState) {
  state.ended = true;
  state.endReason = 'time';
  state.phase = 'close';
  state.pending = { kind: 'done' };
  state.transcript.push(
    line(
      state,
      'prospect',
      "Sorry — I'm going to have to jump, I've got another call. Let's pick this up another time?",
    ),
  );
  state.transcript.push(
    line(state, 'system', 'The call ended before you got to an ask. Time ran out.'),
  );
}

/** Advance to whatever comes next, given the phase we just finished. */
function advance(state: CallState) {
  if (outOfTime(state)) {
    endOnTime(state);
    return;
  }

  switch (state.phase) {
    case 'opening': {
      state.phase = 'agenda';
      const budget = TIME_BUDGETS[state.budgetId];
      state.transcript.push(line(state, 'prospect', budget.revealLine));
      const beat = agendaBeat(isRushed(state));
      state.pending = { kind: 'beat', beat };
      return;
    }
    case 'agenda': {
      state.phase = 'explainer';
      state.transcript.push(line(state, 'coach', knowledgeCheckBeat.prompt));
      state.pending = { kind: 'beat', beat: knowledgeCheckBeat };
      return;
    }
    case 'explainer': {
      state.phase = 'discovery';
      state.transcript.push(line(state, 'coach', bridgeBeat.prompt));
      state.pending = { kind: 'beat', beat: bridgeBeat };
      return;
    }
    case 'discovery': {
      state.phase = 'program';
      const beat = programBeat(state.persona, state.discovered);
      state.transcript.push(line(state, 'coach', beat.prompt));
      state.pending = { kind: 'beat', beat };
      return;
    }
    case 'program': {
      state.phase = 'ask';
      state.transcript.push(
        line(state, 'coach', 'Time to ask. You can stack more than one — start with what costs them least.'),
      );
      state.pending = { kind: 'ask-select' };
      return;
    }
    case 'ask': {
      state.phase = 'close';
      state.pending = { kind: 'close' };
      return;
    }
    default:
      state.pending = { kind: 'done' };
  }
}

export function chooseBeatOption(prev: CallState, option: CallOption): CallState {
  const state = clone(prev);
  if (state.ended || state.pending.kind !== 'beat') return state;
  const beat = state.pending.beat;

  state.transcript.push(line(state, 'player', option.text));
  spend(state, option.minutes);
  award(state, option);

  // Reveal whatever fact this option surfaces.
  if (option.reveals) {
    state.discovered.add(option.reveals);
    state.transcript.push(line(state, 'prospect', state.persona.lines[option.reveals]));
  }
  if (option.note) state.transcript.push(line(state, 'coach', option.note));

  if (outOfTime(state)) {
    endOnTime(state);
    return state;
  }

  // Within-phase follow-ups before moving on.
  if (beat.id === 'knowledge-check') {
    const knowledge = state.discovered.has('ccfKnowledge') ? state.persona.ccfKnowledge : 'none';
    const next = explainerBeat(knowledge);
    state.transcript.push(line(state, 'coach', next.prompt));
    state.pending = { kind: 'beat', beat: next };
    return state;
  }
  if (beat.id === 'explainer') {
    // With the clock nearly gone they skip the "prove it" push and let you get to the point.
    if (minutesLeft(state) > 8) {
      state.transcript.push(line(state, 'prospect', outcomesBeat.prompt));
      state.pending = { kind: 'beat', beat: outcomesBeat };
      return state;
    }
    advance(state);
    return state;
  }
  if (beat.id === 'outcomes') {
    advance(state);
    return state;
  }
  if (beat.id === 'bridge') {
    state.pending = { kind: 'discovery' };
    return state;
  }
  if (beat.id === 'program') {
    // Same again — a squeezed call does not stop to interrogate the exchange.
    if (minutesLeft(state) > 6) {
      state.transcript.push(line(state, 'prospect', reciprocityBeat.prompt));
      state.pending = { kind: 'beat', beat: reciprocityBeat };
      return state;
    }
    advance(state);
    return state;
  }
  if (beat.id === 'reciprocity') {
    advance(state);
    return state;
  }
  if (beat.id === 'next-step') {
    state.ended = true;
    state.endReason = 'closed';
    state.pending = { kind: 'done' };
    return state;
  }

  advance(state);
  return state;
}

export function askDiscoveryQuestion(prev: CallState, questionId: string): CallState {
  const state = clone(prev);
  if (state.ended || state.pending.kind !== 'discovery') return state;
  const q = DISCOVERY_QUESTIONS.find((d) => d.id === questionId);
  if (!q) return state;

  state.transcript.push(line(state, 'player', q.text));
  spend(state, q.minutes);
  state.rapport += QUALITY_DELTA[state.difficulty][q.quality];
  state.askedQuestionIds.push(q.id);
  state.discovered.add(q.reveals);
  state.transcript.push(line(state, 'prospect', state.persona.lines[q.reveals]));

  // A named person is worth calling out — it is the highest-value thing in the call.
  if (q.reveals === 'nameInMind' && state.persona.nameInMind) {
    state.transcript.push(
      line(state, 'coach', 'You have a name. Frame everything from here around that person, not around CCF in general.'),
    );
  }
  if (q.reveals === 'pastPartnership' && state.persona.pastPartnership === 'bad') {
    state.transcript.push(
      line(state, 'coach', 'That bad experience is the filter everything you say is passing through. Address it directly before you ask for anything.'),
    );
  }

  if (outOfTime(state)) {
    endOnTime(state);
    return state;
  }
  return state;
}

export function finishDiscovery(prev: CallState): CallState {
  const state = clone(prev);
  if (state.ended || state.pending.kind !== 'discovery') return state;
  advance(state);
  return state;
}

export function selectAsks(prev: CallState, asks: AskId[]): CallState {
  const state = clone(prev);
  if (state.ended || state.pending.kind !== 'ask-select') return state;

  const ordered = ASK_LADDER.filter((a) => asks.includes(a.id));
  for (const ask of ordered) {
    state.transcript.push(line(state, 'player', ask.text));
    spend(state, ask.minutes);
    state.chosenAsks.push(ask.id);
  }

  // Laddering from low friction upward is the right shape.
  const laddered =
    ordered.length > 1 &&
    ordered[0].friction === 'low' &&
    ordered[ordered.length - 1].friction === 'high';
  const onlyHigh = ordered.length === 1 && ordered[0].friction === 'high';

  if (laddered) {
    state.rapport += QUALITY_DELTA[state.difficulty][3];
    state.transcript.push(
      line(state, 'coach', 'Laddering from the easiest yes upward is exactly right — each one makes the next less alarming.'),
    );
  } else if (onlyHigh) {
    state.rapport += QUALITY_DELTA[state.difficulty][1];
    state.transcript.push(
      line(state, 'coach', 'Going straight for their active volunteers skips the two asks that cost them nothing.'),
    );
  } else {
    state.rapport += QUALITY_DELTA[state.difficulty][2];
  }

  if (outOfTime(state)) {
    endOnTime(state);
    return state;
  }

  if (state.chosenAsks.includes('current')) {
    state.pending = { kind: 'ask-size' };
  } else {
    state.transcript.push(line(state, 'prospect', 'Okay — that I can probably work with.'));
    advance(state);
  }
  return state;
}

export function chooseAskSize(prev: CallState, sizeId: 'small' | 'medium' | 'large'): CallState {
  const state = clone(prev);
  if (state.ended || state.pending.kind !== 'ask-size') return state;

  const size = ASK_SIZES.find((s) => s.id === sizeId)!;
  state.transcript.push(line(state, 'player', size.text));
  spend(state, 1);

  const knowsSize = state.discovered.has('programShape');
  const correct = askSizeFor(state.persona.volunteerCount);

  if (!knowsSize) {
    state.rapport += QUALITY_DELTA[state.difficulty][1];
    state.transcript.push(
      line(state, 'prospect', "...I mean, you don't actually know how many volunteers we have, do you?"),
    );
    state.transcript.push(
      line(state, 'coach', 'You named a number without knowing their size. That reads as not having listened.'),
    );
  } else if (sizeId === correct) {
    state.rapport += QUALITY_DELTA[state.difficulty][3];
    state.transcript.push(
      line(state, 'prospect', "That's a realistic number for us. I can work with that."),
    );
    state.transcript.push(
      line(state, 'coach', `Well calibrated for an org of ${state.persona.volunteerCount}.`),
    );
  } else {
    const tooBig = ['small', 'medium', 'large'].indexOf(sizeId) > ['small', 'medium', 'large'].indexOf(correct);
    state.rapport += QUALITY_DELTA[state.difficulty][tooBig ? 1 : 2];
    state.transcript.push(
      line(
        state,
        'prospect',
        tooBig
          ? `We've only got ${state.persona.volunteerCount} volunteers in total. That's most of them.`
          : "We could probably stretch further than that, honestly.",
      ),
    );
    state.transcript.push(
      line(
        state,
        'coach',
        tooBig
          ? 'Over-asking against their actual size is the doc\'s own example of not having listened.'
          : 'Under-asking is safer, but you left people on the table.',
      ),
    );
  }

  if (outOfTime(state)) {
    endOnTime(state);
    return state;
  }
  advance(state);
  return state;
}

export function chooseClose(prev: CallState, closeId: string): CallState {
  const state = clone(prev);
  if (state.ended || state.pending.kind !== 'close') return state;
  const close = CALL_CLOSES.find((c) => c.id === closeId);
  if (!close) return state;

  state.transcript.push(line(state, 'player', close.text));
  spend(state, 1);

  const pct = rapportPct(state);
  const needsApproval = state.persona.authority === 'needs-approval';
  const knowsAuthority = state.discovered.has('authority');

  let landed = false;
  if (needsApproval && !close.respectsApproval) {
    state.rapport += QUALITY_DELTA[state.difficulty][1];
    state.transcript.push(
      line(
        state,
        'prospect',
        knowsAuthority
          ? "I did say this has to go to " + (state.persona.approverRole ?? 'someone else') + ". I can't give you a number on this call."
          : "I can't actually commit to that — it'd have to go to " + (state.persona.approverRole ?? 'someone else') + " first.",
      ),
    );
    state.transcript.push(
      line(
        state,
        'coach',
        knowsAuthority
          ? 'They told you they needed sign-off and you asked for a same-call commitment anyway.'
          : 'You never asked who else was involved in the decision — so you asked the wrong person for a yes.',
      ),
    );
  } else if (pct < close.minRapport) {
    state.rapport += QUALITY_DELTA[state.difficulty][2];
    state.transcript.push(
      line(state, 'prospect', "...Let me think about it and come back to you."),
    );
    state.transcript.push(
      line(state, 'coach', 'That ask needed more rapport than this call built.'),
    );
  } else {
    landed = true;
    state.rapport += QUALITY_DELTA[state.difficulty][3];
    state.transcript.push(line(state, 'prospect', close.successText));
  }

  state.closeLabel = close.label;
  state.closeLanded = landed;

  if (outOfTime(state)) {
    endOnTime(state);
    state.endReason = 'closed';
    return state;
  }

  state.transcript.push(line(state, 'coach', NEXT_STEP_BEAT.prompt));
  state.pending = { kind: 'beat', beat: NEXT_STEP_BEAT };
  return state;
}

export function rapportPct(state: CallState): number {
  if (state.maxRapport <= 0) return 0;
  return Math.max(0, Math.min(100, (state.rapport / state.maxRapport) * 100));
}

export function remainingQuestions(state: CallState) {
  return DISCOVERY_QUESTIONS.filter((q) => !state.askedQuestionIds.includes(q.id));
}

export function availableCloses(_state: CallState): CallClose[] {
  return CALL_CLOSES;
}

export { CALL_CLOSES, ASK_LADDER, ASK_SIZES, DISCOVERY_QUESTIONS };
