import type { Difficulty, Quality } from './types';

/** Rapport points earned/lost for a choice of a given quality, at a given difficulty.
 * Harder difficulty rewards great answers less generously and punishes weak ones more. */
export const QUALITY_DELTA: Record<Difficulty, Record<Quality, number>> = {
  easy: { 3: 20, 2: 9, 1: -4 },
  medium: { 3: 15, 2: 4, 1: -10 },
  hard: { 3: 10, 2: -1, 1: -18 },
};

/** How many objections (drawn at random from the flow's full pool) the prospect raises. */
export const OBJECTION_COUNT: Record<Difficulty, number> = {
  easy: 2,
  medium: 4,
  hard: 6,
};
