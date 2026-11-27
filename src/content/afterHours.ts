// After Hours: ten more cards once your day is done, as often as you like.
// Side stories from all four weeks, plus exactly one disaster per round, cycling through all of them,
// so every disaster ending can be won at any time (not just on its own day once every four weeks).
// Nothing here changes tonight's vote or tomorrow's town; endings you hit do go in the Scrapbook.
import type { Card, Choice, Pack } from '../engine/types.ts';
import { PACKS } from './index.ts';

export const AFTER_HOURS_CARDS = 10;
const isTrap = (c: Card) => Object.values(c.options).some((o) => o!.ending?.startsWith('trap:'));
/** Every disaster card across the weeks, in a fixed order. */
export const ALL_TRAPS: Card[] = PACKS.flatMap((p) => p.cards.filter(isTrap));

export function afterHoursPack(base: Pack, round: number): Pack {
  const trap = ALL_TRAPS[((round % ALL_TRAPS.length) + ALL_TRAPS.length) % ALL_TRAPS.length]!;
  const keep = PACKS.flatMap((p) => p.cards.filter((c) => !c.day && !c.repeat && !c.sneak && !c.ribbon));
  const ids = new Set([...keep.map((c) => c.id), trap.id]);
  // no tomorrow after hours: next-day consequences come back two cards later instead; links to cards not here are dropped
  const relink = (o: Choice): Choice => {
    const then = [...(o.then ?? []), ...(o.next ?? []).map((id): [string, number] => [id, 2])].filter(([id]) => ids.has(id));
    const { next: _n, ...rest } = o;
    return { ...rest, ...(then.length ? { then } : {}) };
  };
  const copy = (c: Card, extra: Partial<Card> = {}): Card => ({ ...c, ...extra, options: Object.fromEntries(Object.entries(c.options).map(([d, o]) => [d, relink(o!)])) });
  const cards = [...keep.map((c) => { const { day: _d, slot: _s, ...rest } = copy(c); return rest as Card; }), copy(trap, { day: 1, slot: 2 + (round % 6) })];
  const endings = Object.assign({}, ...PACKS.map((p) => Object.fromEntries(Object.entries(p.endings).filter(([k]) => k.startsWith('trap:')))), base.endings);
  const headlines = Object.assign({}, ...PACKS.map((p) => p.headlines));
  return { id: base.id, title: 'After Hours', theme: { name: 'After Hours', text: 'Ten more cards. The night is decided; the town will be back to normal tomorrow.' }, cards, objectives: [], endings, headlines, cliffhangers: base.cliffhangers };
}
