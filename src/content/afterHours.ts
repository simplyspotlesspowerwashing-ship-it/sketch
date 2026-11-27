// After Hours: ten extra cards, once a night, after your day is done. Its own cards, never the dailies:
// three draft laws for tomorrow, three projects for tomorrow, three late-night visits and one After Hours disaster.
// Only on a night you won, Days 1-6: it's the chance to fix the day's mistakes. Wherever the meters finish is
// where tomorrow starts. Tonight's vote is already counted. A disaster or recall ends the round with its ending and
// nothing carries over: tomorrow starts where tonight ended.
import type { Card, Ending, MeterId, Pack } from '../engine/types.ts';
import data from './afterhours.json' with { type: 'json' };

export const AFTER_HOURS_CARDS = 10;
const all = data.cards as unknown as Card[];
const byStory = (s: string) => all.filter((c) => c.story === s);
export const AH_LAWS = byStory('ahlaw');
export const AH_PROJECTS = byStory('ahproj');
export const AH_VISITS = byStory('ahvisit');
export const AH_TRAPS = byStory('ahtrap');
export const AH_CARDS = all;
export const AH_ENDINGS = data.endings as Record<string, Ending>;

const pick = (list: Card[], r: number, i: number) => list[(((3 * r + i) % list.length) + list.length) % list.length]!;

/** The ten cards for night `round` (0, 1, 2...): a week of nights never repeats a card. */
export function afterHoursCards(round: number): Card[] {
  const out: Card[] = [];
  for (let i = 0; i < 3; i++) out.push(pick(AH_VISITS, round, i), pick(AH_LAWS, round, i), pick(AH_PROJECTS, round, i));
  const trap = AH_TRAPS[((round % AH_TRAPS.length) + AH_TRAPS.length) % AH_TRAPS.length]!;
  out.splice(3 + (((round % 5) + 5) % 5), 0, trap);
  return out;
}

export function afterHoursPack(base: Pack, round: number): Pack {
  const cards = afterHoursCards(round).map((c, slot): Card => ({ ...c, day: 1, slot }));
  return { id: base.id, title: 'After Hours', theme: { name: 'After Hours', text: 'Tonight\'s laws and plans shape tomorrow\'s town.' }, cards, objectives: [], endings: { ...base.endings, ...AH_ENDINGS }, headlines: base.headlines, cliffhangers: base.cliffhangers };
}

/** What After Hours hands to tomorrow: the round's net change per meter. */
export function overnightFrom(start: Record<MeterId, number>, end: Record<MeterId, number>): Partial<Record<MeterId, number>> {
  const out: Partial<Record<MeterId, number>> = {};
  for (const k of Object.keys(start) as MeterId[]) {
    const d = end[k] - start[k];
    if (d) out[k] = d;
  }
  return out;
}
