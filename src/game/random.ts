import type { Difficulty } from '../data/types';

export function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

/** Weighted random pick, using each item's difficulty-scaled weight. */
export function pickWeighted<T>(items: T[], weightOf: (item: T) => number): T {
  const total = items.reduce((sum, item) => sum + weightOf(item), 0);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= weightOf(item);
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

export function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Sample n distinct items at random, without replacement. */
export function sampleDistinct<T>(items: T[], n: number): T[] {
  const pool = [...items];
  const out: T[] = [];
  const count = Math.min(n, pool.length);
  for (let i = 0; i < count; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool[idx]);
    pool.splice(idx, 1);
  }
  return out;
}

export type { Difficulty };
