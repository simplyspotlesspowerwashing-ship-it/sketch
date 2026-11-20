// The daily score: points for running the town well. After every card, each group earns points for
// sitting comfortably in the middle; a day that ends with everyone in a safe range earns a bonus;
// a recall costs points. Pure: the same swipes always give the same score.
import { TUNING } from './tuning.ts';
import { GROUPS, METERS } from './types.ts';
import type { Dir, MeterId, State } from './types.ts';

export type Crowd = Record<string, Partial<Record<Dir, number>>>; // cardId -> percent per direction (shown, not scored)

/** Points one meter earns after a card: 2 when comfortable, 1 when uneasy, 0 when in danger. */
export function meterPoints(m: MeterId, v: number): number {
  const { calm, uneasy } = TUNING.score;
  if (m === 'treasury') return v >= 50 - calm ? 2 : v >= 50 - uneasy ? 1 : 0; // a full purse is never a problem
  const d = Math.abs(v - 50);
  return d <= calm ? 2 : d <= uneasy ? 1 : 0;
}
/** Points for the state of the town after one card: up to 10. */
export const cardPoints = (meters: Record<MeterId, number>) => METERS.reduce((n, m) => n + meterPoints(m, meters[m]), 0);
export const MAX_CARD = METERS.length * 2;

/** How a card went, for the share grid. */
export interface Grade { id: 'great' | 'good' | 'shaky' | 'bad'; emoji: string; name: string }
export const GRADES: Grade[] = [
  { id: 'great', emoji: '🟩', name: 'Steady' },
  { id: 'good', emoji: '🟨', name: 'Fine' },
  { id: 'shaky', emoji: '🟧', name: 'Wobbly' },
  { id: 'bad', emoji: '🟥', name: 'On fire' },
];
export const gradeOf = (points: number) => GRADES[points >= 9 ? 0 : points >= 7 ? 1 : points >= 5 ? 2 : 3]!;

/** Day titles by score. A perfect day is 20 cards × 10 + the steady-finish bonus. */
export const TIERS = [
  { min: 0, name: 'Town On Fire' }, { min: 60, name: 'Wobbly' }, { min: 100, name: 'Holding It Together' },
  { min: 130, name: 'Safe Pair of Hands' }, { min: 160, name: 'Tightrope Walker' }, { min: 190, name: 'Perfectly Balanced' },
];
export const tierOf = (score: number) => [...TIERS].reverse().find((t) => score >= t.min)!;

export interface DayScore { total: number; balance: number; bonus: number; recalled: boolean; picks: { cardId: string; points: number; grade: Grade }[] }

/** Is every group within the uneasy band (and the purse not too thin)? */
export const steady = (meters: Record<MeterId, number>) => GROUPS.every((g) => Math.abs(meters[g] - 50) <= TUNING.score.uneasy) && meters.treasury >= 50 - TUNING.score.uneasy;

export function dayScore(s: State, day: number): DayScore {
  const swipes = s.swipes.filter((w) => w.day === day);
  const picks = swipes.map((w) => { const points = cardPoints(w.after); return { cardId: w.cardId, points, grade: gradeOf(points) }; });
  const recalled = (s.recalledDays ?? []).includes(day);
  const balance = picks.reduce((n, p) => n + p.points, 0);
  const last = swipes[swipes.length - 1];
  const finished = swipes.length >= TUNING.cardsPerDay;
  const bonus = !recalled && finished && last && steady(last.after) ? TUNING.score.steadyFinish : 0;
  return { total: Math.max(0, balance + bonus - (recalled ? TUNING.score.recall : 0)), balance, bonus, recalled, picks };
}

