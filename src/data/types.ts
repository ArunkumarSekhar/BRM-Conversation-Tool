export type Difficulty = 'easy' | 'medium' | 'hard';
export type Channel = 'online' | 'offline';
export type FlowId = 'direct' | 'partners';
export type Quality = 3 | 2 | 1;
export type PitchVariant = 'full' | 'short' | 'written';
export type InitiatedBy = 'us' | 'them';

export interface ChoiceOption {
  id: string;
  text: string;
  quality: Quality;
}

/** {label} placeholders inside block text mark content BRM hasn't supplied yet.
 *  Rendered as a distinct "to fill" badge instead of invented specifics. */
export function tofill(label: string): string {
  return `[[TOFILL:${label}]]`;
}

export interface PitchBlock {
  id: string;
  variant: PitchVariant;
  text: string;
}

export interface ObjectionBlock {
  id: string;
  trigger: string;
  /** doc's actual scripted response — the quality-3 option */
  response: string;
  /** quality 2 and quality 1 invented alternates */
  distractors: [string, string];
  /** short labels for what BRM still needs to supply, if any */
  tofillNotes?: string[];
}

export interface CloseBlock {
  id: string;
  name: string;
  text: string;
  successText: string;
  /** rapport-% band (0-100) in which picking this close is the right read of the conversation */
  band: { min: number; max: number };
  tofillNotes?: string[];
}

export interface ContentLibrary {
  pitches: Record<PitchVariant, PitchBlock>;
  objections: ObjectionBlock[];
  closes: CloseBlock[];
}

export type EntryOutcome =
  | { kind: 'continue' }
  | { kind: 'pitch'; variant: PitchVariant }
  | { kind: 'end'; text: string };

export interface EntryBranch {
  id: string;
  themLine: string;
  /** how often this branch should come up as difficulty rises — higher difficulty biases toward tougher branches */
  difficultyWeight: Record<Difficulty, number>;
  options: ChoiceOption[];
  /** how the prospect reacts to each quality tier of response, before the branch resolves */
  reactions: Record<Quality, string>;
  outcome: EntryOutcome;
}

export interface EntryScenario {
  id: string;
  label: string;
  context?: string;
  usOpening: string;
  branches: EntryBranch[];
}

export interface DiscoveryAnswerBucket {
  id: string;
  text: string;
  routesTo: PitchVariant;
  framingNote: string;
  weight: Record<Difficulty, number>;
}

export interface DiscoveryRow {
  id: string;
  question: string;
  why: string;
  /** roughly how foundational/recommended-first this question is (3 = ask early, 1 = fine but lower priority) */
  priority: Quality;
  answers: DiscoveryAnswerBucket[];
}

export interface FlowData {
  id: FlowId;
  title: string;
  subtitle: string;
  forWhom: string;
  goal: string;
  frame: string;
  library: ContentLibrary;
  entry: Record<InitiatedBy, EntryScenario[]>;
  offlineOpenings: { id: string; label: string; usLine: string }[];
  discoveryRouting: DiscoveryRow[];
  discoveryChecklist: { item: string; why: string }[];
}

export const DIFFICULTY_LABEL: Record<Difficulty, string> = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
};

export const DIFFICULTY_TAGLINE: Record<Difficulty, string> = {
  easy: 'The prospect is warm, generous, and quick to open up. Fewer objections.',
  medium: 'The prospect is friendly but wants you to earn it. A handful of objections.',
  hard: 'The prospect is skeptical, busy, and pushes back hard, repeatedly.',
};
