// Bot policies for the balance simulator. A policy sees the state and the legal actions and returns one.
import { blocked, campaignCard, findCard, upfront } from '../src/engine/engine.ts';
import type { Policy } from '../src/engine/engine.ts';
import { TUNING } from '../src/engine/tuning.ts';
import { GROUPS } from '../src/engine/types.ts';
import type { Action, Card, Content, Effects, Option, State } from '../src/engine/types.ts';

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
  minGain?: number; // only act when best option beats ignoring by this much
  tax?: (s: State) => State['tax'];
  payPromise?: (s: State, money: number) => boolean;
  buyAction?: boolean;
}): Policy {
  return (s, legal, content, rand) => {
    const n = () => (opts.noise ? gauss(rand) * opts.noise : 0);
    const want = opts.tax?.(s);
    if (want && want !== s.tax && legal.some((a) => a.type === 'setTax')) return { type: 'setTax', level: want };
    if (s.phase === 'promises') {
      const id = s.duePromises[0]!;
      const p = s.promises.find((x) => x.id === id)!;
      const canPay = legal.some((a) => a.type === 'resolvePromise' && a.pay);
      return { type: 'resolvePromise', id, pay: canPay && (opts.payPromise?.(s, p.money) ?? true) };
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
    // desk
    const open = s.desk.filter((d) => d.status === 'open').map((d) => {
      const card = findCard(content, d.cardId);
      let bestV = -Infinity;
      let bestI = -1;
      card.options.forEach((o, i) => {
        if (blocked(s, o, content)) return;
        const v = opts.score(s, card, o, content) + n();
        if (v > bestV) [bestV, bestI] = [v, i];
      });
      const ig = opts.ignore(s, card);
      return { card, bestI, gain: bestV - ig, ig };
    });
    const actable = open.filter((c) => c.bestI >= 0 && c.gain > (opts.minGain ?? -Infinity)).sort((a, b) => b.gain - a.gain);
    if (s.actionsLeft > 0 && actable.length > 0) return { type: 'choose', cardId: actable[0]!.card.id, option: actable[0]!.bestI };
    if (opts.buyAction && s.actionsLeft === 0 && actable.length > 0 && actable[0]!.gain > 6 && legal.some((a) => a.type === 'buyAction')) return { type: 'buyAction' };
    if (!s.delegatedThisMonth && open.length > 0) {
      // Dave gets the card that would hurt most to ignore.
      const worst = [...open].sort((a, b) => a.ig - b.ig)[0]!;
      return { type: 'delegate', cardId: worst.card.id };
    }
    return { type: 'endDesk' };
  };
}

const projectApproval = (o: Option, content: Content, s: State) => {
  if (!o.project) return 0;
  const p = content.projects[o.project]!;
  return sum(p.onBuild) + sum(p.perMonth) * monthsLeft(s);
};

export const random: Policy = (s, legal, _content, rand) => {
  const pick = (list: Action[]) => list[Math.floor(rand() * list.length)]!;
  const chooses = legal.filter((a) => a.type === 'choose');
  if (s.phase === 'promises') return pick(legal);
  if (s.phase === 'event') return rand() < 0.2 ? { type: 'skipEvent' } : pick(chooses.length ? chooses : legal);
  if (s.phase !== 'desk') return pick(legal.filter((a) => a.type !== 'setTax'));
  if (rand() < 0.03) return pick(legal.filter((a) => a.type === 'setTax'));
  if (chooses.length > 0 && rand() < 0.85) return pick(chooses);
  const delegates = legal.filter((a) => a.type === 'delegate');
  if (delegates.length > 0 && rand() < 0.4) return pick(delegates);
  return { type: 'endDesk' };
};

export const greedyApproval = scored({
  score: (s, _c, o, content) => sum(o.effects) + projectApproval(o, content, s) + (o.campaign ?? 0),
  ignore: (_s, c) => sum(c.ignored),
  tax: () => 'low',
});

export const miser = scored({
  score: (s, _c, o, content) => upfront(o, content) + ((o.monthly ?? 0) + (o.project ? content.projects[o.project]!.monthly : 0)) * monthsLeft(s) - (o.promise?.money ?? 0),
  ignore: () => 0,
  minGain: 0,
  tax: () => 'high',
  payPromise: () => false,
});

export const peoplePleaser = scored({
  score: (s, _c, o, content) => (o.effects.people ?? 0) + (o.project ? (content.projects[o.project]!.perMonth?.people ?? 0) * monthsLeft(s) : 0) + (o.campaign ?? 0) + sum(o.effects) * 0.01,
  ignore: (_s, c) => c.ignored?.people ?? 0,
  tax: () => 'low',
});

export const daveOnly: Policy = (s, legal) => {
  if (s.phase === 'desk') return legal.find((a) => a.type === 'delegate') ?? { type: 'endDesk' };
  if (s.phase === 'event') return { type: 'skipEvent' };
  if (s.phase === 'promises') return legal[legal.length - 1]!;
  if (s.phase === 'campaign') return legal[legal.length - 1]!;
  return { type: 'next' };
};

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
  if (o.promise) {
    // A promise is a loan: fine if the money will be there, bad if it will have to be broken.
    const expected = s.money + left * 15;
    v += expected > o.promise.money + 30 ? moneyValue(s, -o.promise.money) * 0.8 : -2 * approvalValue(s, o.effects) - 4;
  }
  return v;
};

export const sensible = scored({
  score: sensibleScore,
  ignore: (s, c) => approvalValue(s, c.ignored) - (c.ignored?.setFlag ? 2 : 0),
  noise: 1.5, // players differ; without noise every sensible run would be identical
  minGain: 0.5,
  buyAction: true,
  tax: (s) => (s.money < 10 ? 'high' : s.money > 110 && s.approval.people < 70 ? 'low' : s.money >= 30 ? 'medium' : s.tax),
  payPromise: (s, money) => s.money - money > -20,
});

export const POLICIES: Record<string, Policy> = {
  random, 'greedy-approval': greedyApproval, miser, 'people-pleaser': peoplePleaser, 'dave-only': daveOnly, sensible,
};
