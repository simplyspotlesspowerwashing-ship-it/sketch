// The week packs. A new pack each week, in rotation, counted in whole weeks from launch Monday.
import week1 from './packs/week1.json' with { type: 'json' };
import week2 from './packs/week2.json' with { type: 'json' };
import week3 from './packs/week3.json' with { type: 'json' };
import week4 from './packs/week4.json' with { type: 'json' };
import crowd1 from './packs/week1.crowd.json' with { type: 'json' };
import crowd2 from './packs/week2.crowd.json' with { type: 'json' };
import crowd3 from './packs/week3.crowd.json' with { type: 'json' };
import crowd4 from './packs/week4.crowd.json' with { type: 'json' };
import type { Crowd } from '../engine/score.ts';
import type { Pack } from '../engine/types.ts';
import { loadPack } from './schema.ts';

export const week1Pack = loadPack(week1);
export const PACKS: Pack[] = [week1Pack, loadPack(week2), loadPack(week3), loadPack(week4)];
/** Simulated crowd shares per pack: used until enough real mayors have played a card. */
export const SIMULATED_CROWD: Record<string, Crowd> = { week1: crowd1.cards as Crowd, week2: crowd2.cards as Crowd, week3: crowd3.cards as Crowd, week4: crowd4.cards as Crowd };

/** The Monday the game launches. Week 1 runs that week, week 2 the next, and so on: four weeks, then round again. */
export const LAUNCH_MONDAY = '2026-11-16';
export function packFor(weekId: string): Pack {
  const weeks = Math.round((Date.parse(weekId) - Date.parse(LAUNCH_MONDAY)) / (7 * 864e5));
  return PACKS[((weeks % PACKS.length) + PACKS.length) % PACKS.length]!;
}
export const packById = (id: string): Pack => PACKS.find((p) => p.id === id) ?? week1Pack;
