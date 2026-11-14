// Bot policies for the balance simulator. A policy sees the state and the legal actions and returns one.
import { blocked, campaignCard, findCard, upfront } from '../src/engine/engine.ts';
import type { Policy } from '../src/engine/engine.ts';
import { davePolicy } from '../src/engine/dave.ts';
import { TUNING } from '../src/engine/tuning.ts';
import { GROUPS } from '../src/engine/types.ts';
import type { Action, Card, Content, Decree, Effects, Option, State } from '../src/engine/types.ts';

type Scorer = (s: State, card: Card, o: Option, content: Content) => number;
type IgnoreScorer = (s: State, card: Card) => number;

const sum = (e: Effects | undefined) => GROUPS.reduce((n, g) => n + (e?.[g] ?? 0), 0);
const monthsLeft = (s: State) => TUNING.months - s.month;

function gauss(rand: () => number) {
  return Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand());
}

/** Shared skeleton: handle the cards where acting beats ignoring by the most, delegate one, end the desk. */
function scored(opts: {
  score: Scorer;
  ignore: IgnoreScorer;
  noise?: number;
  tax?: (s: State) => State['tax'];
  payPromise?: (s: State, money: number) => boolean;
  decree?: (s: State, d: Decree) => number;
  /** chance of [flop, sloppy, clean] at mini-games */
  skill?: [number, number, number];
}): Policy {
  return (s, legal, content, rand) => {
    const n = () => (opts.noise ? gauss(rand) * opts.noise : 0);
    const want = opts.tax?.(s);
    if (want && want !== s.tax && legal.some((a) => a.type === 'setTax')) return { type: 'setTax', level: want };
    if (s.phase === 'promises') {
      const id = s.duePromises[0]!;
      const p = s.promises.find((x) => x.id === id)!;
      const canPay = legal.some((a) => a.type === 'resolvePromise' && a.id === id && a.pay);
      return { type: 'resolvePromise', id, pay: canPay && (opts.payPromise?.(s, p.money) ?? true) };
    }
    if (s.phase === 'decree') {
      let best: Action = { type: 'skipDecree' };
      let bestV = 0;
      for (const a of legal) {
        if (a.type !== 'decree') continue;
        const v = (opts.decree?.(s, content.pack.decrees.find((d) => d.id === a.id)!) ?? -1) + n();
        if (v > bestV) [best, bestV] = [a, v];
      }
      return best;
    }
    if (s.phase === 'report' || s.phase === 'dayEnd') return { type: 'next' };
    if (s.phase === 'event' || s.phase === 'campaign') {
      const card = s.phase === 'event' ? findCard(content, s.eventId!) : campaignCard(s, content);
      let best: Action = s.phase === 'event' ? { type: 'skipEvent' } : legal[legal.length - 1]!;
      let bestV = s.phase === 'event' ? opts.ignore(s, card) : -Infinity;
      card.options.forEach((o, option) => {
        if (blocked(s, o, content)) return;
        const v = opts.score(s, card, o, content) + n();
        if (v > bestV) [best, bestV] = [{ type: 'choose', cardId: card.id, option }, v];
      });
      return best;
    }
    // desk: every card must be dealt with, in order; the only choice is which option
    const slot = s.desk.find((d) => d.status === 'open');
    if (!slot) return { type: 'endDesk' };
    const card = findCard(content, slot.cardId);
    let bestV = -Infinity;
    let bestI = -1;
    card.options.forEach((o, i) => {
      if (blocked(s, o, content)) return;
      const v = opts.score(s, card, o, content) + n();
      if (v > bestV) [bestV, bestI] = [v, i];
    });
    if (bestI < 0) return { type: 'endDesk' };
    const [flop, sloppy] = opts.skill ?? [0.3, 0.4, 0.3];
    const r = rand();
    return { type: 'choose', cardId: card.id, option: bestI, skill: r < flop ? 0 : r < flop + sloppy ? 1 : 2 };
  };
}

const projectApproval = (o: Option, content: Content, s: State) => {
  if (!o.project) return 0;
  const p = content.projects[o.project]!;
  return sum(p.onBuild) + sum(p.perMonth) * monthsLeft(s);
};

export const random: Policy = (s, legal, _content, rand) => {
  const pick = (list: Action[]) => list[Math.floor(rand() * list.length)]!;
  if (s.phase === 'desk') {
    const slot = s.desk.find((d) => d.status === 'open');
    const mine = legal.filter((a) => a.type === 'choose' && a.cardId === slot?.cardId);
    if (mine.length === 0) return { type: 'endDesk' };
    const a = pick(mine);
    return a.type === 'choose' ? { ...a, skill: Math.floor(rand() * 3) as 0 | 1 | 2 } : a;
  }
  if (s.phase === 'event') return rand() < 0.2 ? { type: 'skipEvent' } : pick([...legal.filter((a) => a.type === 'choose'), { type: 'skipEvent' } as Action]);
  return pick(legal.filter((a) => a.type !== 'setTax'));
};

const decreeApproval = (s: State, d: Decree) => sum(d.effects) + sum(d.perMonth) * monthsLeft(s);

export const greedyApproval = scored({
  decree: decreeApproval,
  score: (s, _c, o, content) => sum(o.effects) + projectApproval(o, content, s) + (o.campaign ?? 0),
  ignore: (_s, c) => sum(c.ignored),
  tax: () => 'low',
});

export const miser = scored({
  decree: (s, d) => (d.money ?? 0) + (d.monthly ?? 0) * monthsLeft(s),
  score: (s, _c, o, content) => upfront(o, content) + ((o.monthly ?? 0) + (o.project ? content.projects[o.project]!.monthly : 0)) * monthsLeft(s) - (o.promise?.money ?? 0),
  ignore: () => 0,
  tax: () => 'high',
  payPromise: () => false,
});

export const peoplePleaser = scored({
  decree: (s, d) => (d.effects?.people ?? 0) + (d.perMonth?.people ?? 0) * monthsLeft(s),
  score: (s, _c, o, content) => (o.effects.people ?? 0) + (o.project ? (content.projects[o.project]!.perMonth?.people ?? 0) * monthsLeft(s) : 0) + (o.campaign ?? 0) + sum(o.effects) * 0.01,
  ignore: (_s, c) => c.ignored?.people ?? 0,
  tax: () => 'low',
});

// dave-only: Deputy Dave runs the whole term (the same policy that covers missed days).
export const daveOnly: Policy = davePolicy;

// ---- sensible: values approval by what it is worth at the election, money by how scarce it is ----

function approvalValue(s: State, e: Effects | undefined, months = 1): number {
  if (!e) return 0;
  const V = TUNING.vote;
  const weight: Record<(typeof GROUPS)[number], number> = { people: V.people, press: V.press + 0.1, business: V.business + 0.15, law: V.law + 0.05 };
  let v = 0;
  for (const g of GROUPS) {
    const d = (e[g] ?? 0) * months;
    if (!d) continue;
    const now = s.approval[g];
    const after = now + d;
    let w = weight[g];
    if (d < 0 && after < TUNING.low) w += 0.5; // penalties and recall risk
    if (d < 0 && after < 15) w += 1.5;
    if (d > 0 && now < TUNING.low) w += 0.4;
    if (d > 0 && after > TUNING.high) w *= 0.3; // pressure cards wait up there
    v += d * w;
  }
  return v;
}

function moneyValue(s: State, delta: number): number {
  if (!delta) return 0;
  const after = s.money + delta;
  const rate = after < 0 ? 0.45 : after < 25 ? 0.22 : after < 80 ? 0.1 : 0.05;
  return delta * rate;
}

const sensibleScore: Scorer = (s, _card, o, content) => {
  const left = monthsLeft(s);
  let v = approvalValue(s, o.effects) + moneyValue(s, upfront(o, content)) + (o.favors ?? 0) * 1.5 + (o.campaign ?? 0);
  if (o.monthly) v += moneyValue(s, o.monthly * left);
  if (o.project) {
    const p = content.projects[o.project]!;
    v += approvalValue(s, p.onBuild) + approvalValue(s, p.perMonth, left) + p.monthly * left * 0.1;
    if (p.favorEvery) v += Math.floor(left / p.favorEvery) * 1.5;
    v += 1; // objectives and combos
  }
  if (o.gamble) {
    const val = (x: { money?: number; effects?: Effects }) => approvalValue(s, x.effects) + moneyValue(s, x.money ?? 0);
    v += (o.gamble.chance / 100) * val(o.gamble.win) + (1 - o.gamble.chance / 100) * val(o.gamble.lose);
  }
  if (o.promise) {
    // A promise is a loan: fine if the money will be there, bad if it will have to be broken.
    const expected = s.money + left * 15;
    v += expected > o.promise.money + 30 ? moneyValue(s, -o.promise.money) * 0.8 : -2 * approvalValue(s, o.effects) - 4;
  }
  return v;
};

export const sensible = scored({
  decree: (s, d) => approvalValue(s, d.effects) + approvalValue(s, d.perMonth, monthsLeft(s)) + moneyValue(s, (d.money ?? 0) + (d.monthly ?? 0) * monthsLeft(s)),
  skill: [0.15, 0.35, 0.5],
  score: sensibleScore,
  ignore: (s, c) => approvalValue(s, c.ignored) - (c.ignored?.setFlag ? 2 : 0),
  noise: 2.5, // players differ and misjudge; without noise every sensible run would be identical
  tax: (s) => (s.money < 10 ? 'high' : s.money > 110 && s.approval.people < 70 ? 'low' : s.money >= 30 ? 'medium' : s.tax),
  payPromise: (s, money) => s.money - money > -20,
});

export const POLICIES: Record<string, Policy> = {
  random, 'greedy-approval': greedyApproval, miser, 'people-pleaser': peoplePleaser, 'dave-only': daveOnly, sensible,
};
