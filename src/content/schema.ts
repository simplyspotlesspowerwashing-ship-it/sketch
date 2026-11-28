import { z } from 'zod';
import type { Pack } from '../engine/types.ts';

const meters = z.strictObject({ people: z.number(), business: z.number(), law: z.number(), press: z.number(), treasury: z.number() }).partial();
const condition = z.strictObject({ flags: z.array(z.string()), any: z.array(z.string()), not: z.array(z.string()), min: meters, max: meters, fromDay: z.number().int() }).partial();
const choice = z.strictObject({
  label: z.string().min(1).max(30), effects: meters, reaction: z.string().min(1).max(100),
  set: z.array(z.string()).optional(), clear: z.array(z.string()).optional(),
  then: z.array(z.tuple([z.string(), z.number().int().min(1)])).optional(), next: z.array(z.string()).optional(), ending: z.string().regex(/^(rare|trap):[a-z0-9_]+$/).optional(),
});
const card = z.strictObject({
  id: z.string().min(1), who: z.string().min(1), text: z.string().min(1).max(150), story: z.string().optional(),
  day: z.number().int().min(1).max(7).optional(), slot: z.number().int().min(0).max(19).optional(), sneak: z.boolean().optional(), ribbon: z.boolean().optional(), requires: condition.optional(), weight: z.number().positive().optional(),
  repeat: z.boolean().optional(), followUp: z.boolean().optional(),
  options: z.strictObject({ left: choice, right: choice, up: choice, down: choice }).partial(),
});
export const packSchema = z.strictObject({
  id: z.string(), title: z.string(), cards: z.array(card).min(10),
  theme: z.strictObject({ name: z.string().max(40), text: z.string().max(160), drift: meters.optional() }),
  objectives: z.array(z.strictObject({ id: z.string(), text: z.string(), when: condition })),
  endings: z.record(z.string(), z.strictObject({ title: z.string().max(40), text: z.string().max(160) })),
  headlines: z.record(z.string(), z.string()), cliffhangers: z.array(z.string()).length(6),
  secret: z.strictObject({ who: z.string(), start: z.string(), rule: z.tuple([z.enum(['left', 'right']), z.enum(['left', 'right'])]), hint: z.string().max(160) }).optional(),
});

/** Schema check plus story integrity: every scheduled follow-up exists, every follow-up is reachable, every card has 2+ options. */
export function loadPack(raw: unknown): Pack {
  const pack = packSchema.parse(raw) as Pack;
  const problems: string[] = [];
  const ids = new Set<string>();
  const scheduled = new Set<string>();
  for (const c of pack.cards) {
    if (ids.has(c.id)) problems.push(`duplicate card id ${c.id}`);
    ids.add(c.id);
    if (Object.keys(c.options).length < 2) problems.push(`${c.id}: needs at least two options`);
    for (const o of Object.values(c.options)) {
      for (const t of [...(o!.then ?? []).map(([id]) => id), ...(o!.next ?? [])]) scheduled.add(t);
      if (o!.ending && !pack.endings[o!.ending]) problems.push(`${c.id}: ending ${o!.ending} has no text in endings`);
    }
  }
  if (pack.secret) scheduled.add(pack.secret.start);
  for (const t of scheduled) if (!ids.has(t)) problems.push(`a choice schedules unknown card ${t}`);
  for (const c of pack.cards) if (c.followUp && !scheduled.has(c.id)) problems.push(`${c.id}: follow-up card is never scheduled`);
  for (const k of ['low:people', 'low:business', 'low:law', 'low:press', 'low:treasury', 'high:people', 'high:business', 'high:law', 'high:press']) if (!pack.endings[k]) problems.push(`missing ending ${k}`);
  // every day of the week needs its opener, its law, its catastrophe and a mini-game
  for (let d = 1; d <= 7; d++) for (const slot of [0, 7, 11]) if (!pack.cards.some((c) => c.day === d && c.slot === slot)) problems.push(`day ${d}: nothing pinned at slot ${slot}`);
  for (let d = 1; d <= 7; d++) if (!pack.cards.some((c) => c.day === d && (c.sneak || c.ribbon))) problems.push(`day ${d}: no mini-game`);
  // one disaster a day: a card where one answer ends the day on the spot. The fatal side must vary across the week.
  const traps = pack.cards.filter((c) => Object.values(c.options).some((o) => o!.ending?.startsWith('trap:')));
  for (let d = 1; d <= 7; d++) if (traps.filter((c) => c.day === d).length !== 1) problems.push(`day ${d}: needs exactly one disaster card`);
  const fatal = (dir: 'left' | 'right') => traps.filter((c) => c.options[dir]?.ending?.startsWith('trap:')).length;
  if (traps.length && (fatal('left') < 2 || fatal('right') < 2)) problems.push('disasters: the fatal answer must be yes on some days and no on others');
  for (const c of traps) if (Object.values(c.options).every((o) => o!.ending)) problems.push(`${c.id}: a disaster card needs one safe answer`);
  const slots = new Set<string>();
  for (const c of pack.cards) if (c.day && c.slot !== undefined) { const k = `${c.day}:${c.slot}`; if (slots.has(k)) problems.push(`two cards pinned at day ${c.day} slot ${c.slot}`); slots.add(k); }
  if (problems.length) throw new Error(`Pack ${pack.id} is invalid:\n- ${problems.join('\n- ')}`);
  return pack;
}
