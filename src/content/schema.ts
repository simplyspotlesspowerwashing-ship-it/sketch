import { z } from 'zod';
import type { Pack } from '../engine/types.ts';

const meters = z.strictObject({ people: z.number(), business: z.number(), law: z.number(), press: z.number(), treasury: z.number() }).partial();
const condition = z.strictObject({ flags: z.array(z.string()), any: z.array(z.string()), not: z.array(z.string()), min: meters, max: meters, fromDay: z.number().int() }).partial();
const choice = z.strictObject({
  label: z.string().min(1).max(30), effects: meters, reaction: z.string().min(1).max(100),
  clip: z.strictObject({ act: z.string().min(1), props: z.array(z.string().min(1)).max(3) }).optional(),
  set: z.array(z.string()).optional(), clear: z.array(z.string()).optional(),
  then: z.array(z.tuple([z.string(), z.number().int().min(1)])).optional(), vote: z.number().optional(),
});
const card = z.strictObject({
  id: z.string().min(1), who: z.string().min(1), text: z.string().min(1).max(150), story: z.string().optional(),
  day: z.number().int().min(1).max(6).optional(), slot: z.number().int().min(0).optional(), sneak: z.boolean().optional(), requires: condition.optional(), weight: z.number().positive().optional(),
  repeat: z.boolean().optional(), followUp: z.boolean().optional(),
  options: z.strictObject({ left: choice, right: choice, up: choice, down: choice }).partial(),
});
export const packSchema = z.strictObject({
  id: z.string(), title: z.string(), cards: z.array(card).min(10), campaign: z.array(card).min(1),
  objectives: z.array(z.strictObject({ id: z.string(), text: z.string(), when: condition })),
  endings: z.record(z.string(), z.strictObject({ title: z.string().max(40), text: z.string().max(160) })),
  headlines: z.record(z.string(), z.string()), cliffhangers: z.array(z.string()),
});

/** Schema check plus story integrity: every scheduled follow-up exists, every follow-up is reachable, every card has 2+ options. */
export function loadPack(raw: unknown): Pack {
  const pack = packSchema.parse(raw) as Pack;
  const problems: string[] = [];
  const ids = new Set<string>();
  const scheduled = new Set<string>();
  for (const c of [...pack.cards, ...pack.campaign]) {
    if (ids.has(c.id)) problems.push(`duplicate card id ${c.id}`);
    ids.add(c.id);
    if (Object.keys(c.options).length < 2) problems.push(`${c.id}: needs at least two options`);
    for (const o of Object.values(c.options)) for (const [t] of o!.then ?? []) scheduled.add(t);
  }
  for (const t of scheduled) if (!ids.has(t)) problems.push(`a choice schedules unknown card ${t}`);
  for (const c of pack.cards) if (c.followUp && !scheduled.has(c.id)) problems.push(`${c.id}: follow-up card is never scheduled`);
  for (const k of ['low:people', 'low:business', 'low:law', 'low:press', 'low:treasury', 'high:people', 'high:business', 'high:law', 'high:press']) if (!pack.endings[k]) problems.push(`missing ending ${k}`);
  if (problems.length) throw new Error(`Pack ${pack.id} is invalid:\n- ${problems.join('\n- ')}`);
  return pack;
}
