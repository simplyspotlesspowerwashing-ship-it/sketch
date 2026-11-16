// The daily score, Krillion-style: points for every card you get through, and more for choices few
// other mayors made. Crowd shares come from the stats provider (simulated preview data until real
// players exist). Pure: the same swipes and crowd always give the same score.
import { TUNING } from './tuning.ts';
import type { Dir, State } from './types.ts';

export type Crowd = Record<string, Partial<Record<Dir, number>>>; // cardId -> percent per direction

export interface Rarity { id: string; name: string; max: number; points: number; emoji: string }
/** Rarity tiers by the share of mayors who made the same choice. */
export const RARITY: Rarity[] = [
  { id: 'unique', name: 'One in a Million', max: 5, points: 50, emoji: '🟪' },
  { id: 'rare', name: 'Maverick', max: 15, points: 30, emoji: '🟥' },
  { id: 'uncommon', name: 'Unusual', max: 35, points: 15, emoji: '🟧' },
  { id: 'common', name: 'Popular', max: 65, points: 5, emoji: '🟨' },
  { id: 'herd', name: 'Rubber Stamp', max: 101, points: 0, emoji: '⬜' },
];
export const rarityOf = (pct: number | undefined) => RARITY.find((r) => (pct ?? 50) < r.max) ?? RARITY[RARITY.length - 1]!;

export const TIERS = [
  { min: 0, name: 'Rubber Stamp' }, { min: 350, name: 'Sensible Shoes' }, { min: 500, name: 'Local Character' },
  { min: 650, name: 'Loose Cannon' }, { min: 800, name: 'Town Legend' }, { min: 950, name: 'One in a Million Mayor' },
];
export const tierOf = (score: number) => [...TIERS].reverse().find((t) => score >= t.min)!;

export interface DayScore { total: number; survived: number; rarity: number; recalled: boolean; picks: { cardId: string; pct: number | undefined; rarity: Rarity; points: number }[] }

export function dayScore(s: State, day: number, crowd: Crowd): DayScore {
  const swipes = s.swipes.filter((w) => w.day === day);
  const picks = swipes.map((w) => {
    const pct = crowd[w.cardId]?.[w.dir];
    const r = rarityOf(pct);
    return { cardId: w.cardId, pct, rarity: r, points: TUNING.score.perCard + r.points };
  });
  const recalled = (s.recalledDays ?? []).includes(day);
  const survived = picks.length * TUNING.score.perCard;
  const rarity = picks.reduce((n, p) => n + p.rarity.points, 0);
  return { total: Math.max(0, survived + rarity - (recalled ? TUNING.score.recall : 0)), survived, rarity, recalled, picks };
}
