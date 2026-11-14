import { z } from 'zod';
import type { Content, WeekPack } from '../engine/types.ts';
import { COMBOS, PROJECTS } from './core.ts';

const group = z.enum(['people', 'business', 'law', 'press']);
const effects = z.strictObject({ people: z.number(), business: z.number(), law: z.number(), press: z.number() }).partial();
const condition = z.strictObject({
  flags: z.array(z.string()), notFlags: z.array(z.string()),
  projects: z.array(z.string()), notProjects: z.array(z.string()),
  min: effects, max: effects, fromMonth: z.number().int().min(1).max(12),
}).partial();

const outcome = z.strictObject({ text: z.string().min(1).max(90), money: z.number().optional(), effects: effects.optional(), setFlag: z.string().optional() });

const option = z.strictObject({
  label: z.string().min(1).max(28),
  kind: z.enum(['pay', 'project', 'promise', 'refuse', 'favor']),
  money: z.number().optional(),
  favors: z.number().int().optional(),
  monthly: z.number().optional(),
  effects,
  project: z.string().optional(),
  promise: z.strictObject({ dueIn: z.number().int().min(1), money: z.number().positive() }).optional(),
  setFlag: z.string().optional(),
  reaction: z.string().min(1).max(90),
  headlineTag: z.string().optional(),
  campaign: z.number().optional(),
  gamble: z.strictObject({ chance: z.number().min(5).max(95), win: outcome, lose: outcome }).optional(),
});

const card = z.strictObject({
  id: z.string().min(1),
  who: z.string().min(1),
  group: group.optional(),
  text: z.string().min(1).max(140),
  day: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6)]).optional(),
  month: z.union([z.literal(1), z.literal(2)]).optional(),
  requires: condition.optional(),
  options: z.array(option).min(1).max(4),
  ignored: effects.extend({ setFlag: z.string().optional() }).optional(),
  advisors: z.array(z.strictObject({ who: z.string(), line: z.string().max(90) })).max(2).optional(),
  game: z.strictObject({ type: z.enum(['catch', 'dodge', 'whack', 'match', 'stack', 'simon', 'tug']), theme: z.string(), bad: z.string().optional(), title: z.string().min(1).max(40), flop: z.string().min(1).max(90) }).optional(),
  rare: z.boolean().optional(),
  secret: z.boolean().optional(),
  repeatable: z.boolean().optional(),
  draft: z.boolean().optional(),
});

const decree = z.strictObject({
  id: z.string().min(1), kind: z.enum(['tax', 'law', 'stunt']), who: z.string().min(1),
  name: z.string().min(1).max(28), text: z.string().min(1).max(120),
  money: z.number().optional(), monthly: z.number().optional(), effects: effects.optional(), perMonth: effects.optional(),
  setFlag: z.string().optional(), reaction: z.string().min(1).max(90), headlineTag: z.string().optional(), draft: z.boolean().optional(),
});

export const weekPackSchema = z.strictObject({
  id: z.string(),
  title: z.string(),
  cards: z.array(card).min(3),
  events: z.array(card),
  decrees: z.array(decree).min(3),
  campaign: z.array(card).min(1),
  objectives: z.array(z.strictObject({ id: z.string(), text: z.string(), when: condition })).max(3),
  cliffhangers: z.array(z.string()),
  recallEndings: z.array(z.string()).min(1),
  dave: z.strictObject({
    outcomes: z.array(z.strictObject({ id: z.string(), text: z.string(), weight: z.number().positive(), money: z.number().optional(), favors: z.number().optional(), effects: effects.optional() })).min(1),
    absence: z.array(z.string()),
  }),
  headlines: z.array(z.strictObject({ tag: z.string(), text: z.string() })),
});

const upfrontFree = (o: { money?: number; favors?: number; project?: string }) => !((o.money ?? 0) < 0) && !((o.favors ?? 0) < 0) && !o.project;

/** Schema check plus the rules a schema cannot express. Throws with every problem listed. */
export function loadPack(raw: unknown): Content {
  const pack = weekPackSchema.parse(raw) as WeekPack;
  const problems: string[] = [];
  const ids = new Set<string>();
  for (const c of [...pack.cards, ...pack.events, ...pack.campaign]) {
    if (ids.has(c.id)) problems.push(`duplicate card id ${c.id}`);
    ids.add(c.id);
    const desk = pack.cards.includes(c);
    if (desk && (c.options.length < 2 || c.options.length > 3)) problems.push(`${c.id}: desk cards need 2-3 options`);
    if (desk && !c.game) problems.push(`${c.id}: every desk card needs a mini-game`);
    if (desk && !c.options.some((o) => upfrontFree(o))) problems.push(`${c.id}: needs one option that costs no money or Favors, so the desk can always be cleared`);
    for (const o of c.options) {
      if (o.project && !PROJECTS[o.project]) problems.push(`${c.id}: unknown project ${o.project}`);
      if ((o.kind === 'project') !== Boolean(o.project)) problems.push(`${c.id}/${o.label}: kind "project" and a project id go together`);
      if ((o.kind === 'promise') !== Boolean(o.promise)) problems.push(`${c.id}/${o.label}: kind "promise" and a promise go together`);
      if (o.kind === 'favor' && !((o.favors ?? 0) < 0)) problems.push(`${c.id}/${o.label}: favor options must cost Favors`);
      if (o.kind === 'refuse' && ((o.money ?? 0) !== 0 || (o.favors ?? 0) !== 0)) problems.push(`${c.id}/${o.label}: refusing is free`);
    }
    for (const p of [...(c.requires?.projects ?? []), ...(c.requires?.notProjects ?? [])]) if (!PROJECTS[p]) problems.push(`${c.id}: requires unknown project ${p}`);
  }
  if (pack.campaign.some((c) => c.options.length !== 4)) problems.push('campaign cards need exactly 4 options');
  if (problems.length > 0) throw new Error(`Week pack ${pack.id} is invalid:\n- ${problems.join('\n- ')}`);
  return { pack, projects: PROJECTS, combos: COMBOS };
}
