// After Hours: ten extra cards, once a night, after a night you won (Days 1-6). Its own cards, never the dailies:
// 2 draft laws and 2 projects for tomorrow, 2 late-night visits, 2 sealed laws you enact by typing the answer to a riddle,
// 1 sneak mission and 1 After Hours disaster. Wherever the meters finish is where tomorrow starts.
// A disaster or recall ends the round with its ending and nothing carries over.
import type { Card, Ending, MeterId, Pack } from '../engine/types.ts';
import data from './afterhours.json' with { type: 'json' };

export const AFTER_HOURS_CARDS = 10;
const all = data.cards as unknown as Card[];
const byStory = (s: string) => all.filter((c) => c.story === s);
export const AH_LAWS = byStory('ahlaw');
export const AH_PROJECTS = byStory('ahproj');
export const AH_VISITS = byStory('ahvisit');
export const AH_TRAPS = byStory('ahtrap');
export const AH_RIDDLES = byStory('ahriddle');
export const AH_SNEAKS = byStory('ahsneak');
export const AH_CARDS = all;
export const AH_ENDINGS = data.endings as Record<string, Ending>;

const at = <T,>(list: T[], i: number) => list[((i % list.length) + list.length) % list.length]!;

/** The ten cards for night `round` (0, 1, 2...): a week of nights never repeats a card. */
export function afterHoursCards(round: number): Card[] {
  const two = (list: Card[], i: number) => at(list, 2 * round + i);
  const out = [two(AH_VISITS, 0), two(AH_LAWS, 0), two(AH_RIDDLES, 0), two(AH_PROJECTS, 0), at(AH_SNEAKS, round), two(AH_VISITS, 1), two(AH_LAWS, 1), two(AH_PROJECTS, 1), two(AH_RIDDLES, 1)];
  out.splice(3 + (((round % 5) + 5) % 5), 0, at(AH_TRAPS, round));
  return out;
}

/** Riddle answers: case, spaces, punctuation and a leading 'a', 'an' or 'the' don't matter. */
export const normalAnswer = (t: string) => t.toLowerCase().replace(/[^a-z ]/g, ' ').trim().replace(/\s+/g, ' ').replace(/^((a|an|the|my|your) )+/, '');
export const solves = (c: Card, typed: string) => !!c.riddle && c.riddle.answers.some((a) => normalAnswer(a) === normalAnswer(typed));

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
