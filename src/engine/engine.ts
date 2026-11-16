// Pure, deterministic swipe-card engine. No DOM, no clock, no storage.
//   reduce(state, action, pack, rng) -> new state
// Each day is a run of cards. A choice can schedule follow-up cards a few cards later; that is how
// stories build. Pinned day cards are the same for every mayor; the rest depend on your own story.
import { voteShare } from './election.ts';
import { seededRng, shuffled } from './rng.ts';
import { TUNING } from './tuning.ts';
import { DIRS, GROUPS, METERS } from './types.ts';
import type { Action, Card, Condition, Dir, MeterId, Pack, Rng, State } from './types.ts';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

export function findCard(pack: Pack, id: string): Card {
  const c = pack.cards.find((x) => x.id === id) ?? pack.campaign.find((x) => x.id === id);
  if (!c) throw new Error(`unknown card ${id}`);
  return c;
}

export function holds(s: State, c: Condition | undefined): boolean {
  if (!c) return true;
  if (c.flags?.some((f) => !s.flags[f])) return false;
  if (c.any && !c.any.some((f) => s.flags[f])) return false;
  if (c.not?.some((f) => s.flags[f])) return false;
  if (c.fromDay !== undefined && s.day < c.fromDay) return false;
  for (const m of METERS) {
    if (c.min?.[m] !== undefined && s.meters[m] < c.min[m]!) return false;
    if (c.max?.[m] !== undefined && s.meters[m] > c.max[m]!) return false;
  }
  return true;
}

export const options = (card: Card): Dir[] => DIRS.filter((d) => card.options[d]);

/** Why a recall would happen now, or null. Both ends are dangerous for the four groups; the treasury only at zero. */
export function recallCause(s: State): string | null {
  for (const g of GROUPS) if (s.meters[g] <= 0) return `low:${g}`;
  for (const g of GROUPS) if (s.meters[g] >= 100) return `high:${g}`;
  if (s.meters.treasury <= 0) return 'low:treasury';
  return null;
}

function weightedPick<T>(items: T[], weight: (t: T) => number, rand: () => number): T | undefined {
  const total = items.reduce((n, t) => n + weight(t), 0);
  let r = rand() * total;
  return items.find((t) => (r -= weight(t)) < 0) ?? items[items.length - 1];
}

const isPool = (c: Card) => !c.day && !c.followUp && !c.repeat && !c.sneak;

/**
 * The day's shared running order, the same for every mayor: pinned story openers first, a pinned
 * card at its slot, and the rest dealt from the week's pool in a fixed order. Extra spares follow,
 * for positions a mayor can't use (a pinned card whose condition they don't meet).
 */
export function dayDeck(pack: Pack, weekId: string, day: number, rng: Rng = seededRng): string[] {
  const N = TUNING.cardsPerDay;
  const order = shuffled(pack.cards.filter(isPool).map((c) => c.id), rng(`${weekId}|pool`));
  const pinned = pack.cards.filter((c) => c.day === day);
  const deck: (string | null)[] = Array.from({ length: N }, () => null);
  for (const c of pinned) if (c.slot !== undefined && c.slot < N) deck[c.slot] = c.id;
  let i = 0;
  for (const c of pinned) if (c.slot === undefined) { while (deck[i]) i++; deck[i] = c.id; }
  // how many pool cards the earlier days used
  let used = 0;
  for (let d = 1; d < day; d++) used += N - pack.cards.filter((c) => c.day === d).length;
  const spares = 8;
  const free = deck.filter((x) => !x).length + spares;
  const deal = Array.from({ length: free }, (_, k) => order[(used + k) % order.length]!);
  // everyone should meet a storyline early: bring up to four story starters to the front of today's deal
  const today = free - spares;
  const starts = (id: string) => Object.values(findCard(pack, id).options).some((o) => o!.then?.length || o!.next?.length);
  const front = deal.slice(0, today).filter(starts).slice(0, 4);
  const rest = deal.slice(0, today).filter((id) => !front.includes(id));
  // spread them out: one first, then every other card
  const mixed: string[] = []; while (front.length || rest.length) { if (front.length && mixed.length % 2 === 0) mixed.push(front.shift()!); else if (rest.length) mixed.push(rest.shift()!); else mixed.push(front.shift()!); }
  deal.splice(0, today, ...mixed);
  let k = 0;
  return [...deck.map((x) => x ?? deal[k++]!), ...deal.slice(k)];
}

/** The next card: the day's pinned card for this position, a due follow-up, then a pressure card if things are dire, then the shared deck. */
function drawNext(s: State, pack: Pack, rng: Rng): string | null {
  const deck = dayDeck(pack, s.weekId, s.day, rng);
  const at = deck[s.cardInDay];
  const usable = (id: string | undefined) => { if (!id) return false; const c = findCard(pack, id); return holds(s, c.requires) && !s.seen.includes(id); };
  // The day's pinned cards (story beats, the sneak moment) keep their place; follow-ups wait one card.
  if (usable(at) && findCard(pack, at!).day === s.day) return at!;
  s.queue.sort((a, b) => a.at - b.at);
  while (s.queue.length && s.queue[0]!.at <= s.count) {
    const q = s.queue.shift()!;
    if (holds(s, findCard(pack, q.cardId).requires)) return q.cardId;
  }
  const recent = s.swipes.slice(-TUNING.pressureGap).map((w) => w.cardId);
  const pressure = pack.cards.filter((c) => c.repeat && holds(s, c.requires));
  if (pressure.length && !recent.some((id) => pressure.some((c) => c.id === id) || findCard(pack, id).repeat)) {
    return weightedPick(pressure, (c) => c.weight ?? 1, rng(`${s.weekId}|pressure|${s.count}`))!.id;
  }
  if (usable(at)) return at!;
  const spare = deck.slice(TUNING.cardsPerDay).find(usable);
  if (spare) return spare;
  // The week's pool has run out: a stand-alone card comes round again rather than ending the day early.
  if (at && holds(s, findCard(pack, at).requires)) return at;
  return deck.find((id) => holds(s, findCard(pack, id).requires) && isPool(findCard(pack, id))) ?? null;
}

function startCard(s: State, pack: Pack, rng: Rng) {
  const id = drawNext(s, pack, rng);
  if (!id) { endDay(s); return; }
  s.current = id;
  if (!s.seen.includes(id)) s.seen.push(id);
  s.phase = 'card';
}

function endDay(s: State) {
  s.current = null;
  s.phase = 'dayEnd';
  s.polls.push(voteShare(s));
}

function finish(s: State, endedEarly: boolean) {
  const share = voteShare(s);
  s.result = { share, won: share >= 50 && !endedEarly, endedEarly };
  s.current = null;
  s.phase = 'results';
}

export function newTerm(weekId: string, playerSeed: string, pack: Pack, rng: Rng = seededRng): State {
  const m = Object.fromEntries(METERS.map((k) => [k, TUNING.start])) as Record<MeterId, number>;
  const s: State = {
    v: 10, weekId, playerSeed, day: 1, cardInDay: 0, count: 0, meters: m, flags: {}, queue: [], tomorrow: [], seen: [], current: null,
    phase: 'card', dayStart: { ...m }, swipes: [], recalls: 0, recallCauses: [], recalledDays: [], objectivesDone: [], campaignVote: 0,
    profile: null, daveDays: [], polls: [], result: null,
  };
  startCard(s, pack, rng);
  return s;
}

export function legalActions(s: State, pack: Pack): Action[] {
  if (s.phase === 'card' && s.current) return options(findCard(pack, s.current)).map((dir) => ({ type: 'swipe', dir }));
  if (s.phase === 'recalled' || s.phase === 'dayEnd') return [{ type: 'next' }];
  return [];
}

export function reduce(state: State, action: Action, pack: Pack, rng: Rng = seededRng): State {
  const s: State = structuredClone(state);
  switch (action.type) {
    case 'setup': {
      if (s.profile) throw new Error('setup is only allowed once per term');
      const name = (t: string, f: string) => t.replace(/[<>]/g, '').trim().slice(0, 18) || f;
      s.profile = { mayor: name(action.profile.mayor, 'Mayor'), folk: name(action.profile.folk, 'Bad Towners'), base: action.profile.base };
      s.meters[action.profile.base] = clamp(s.meters[action.profile.base] + TUNING.setupBase, 1, 99);
      return s;
    }
    case 'rename': {
      if (!s.profile) throw new Error('rename before setup');
      s.profile.mayor = action.mayor.replace(/[<>]/g, '').trim().slice(0, 18) || s.profile.mayor;
      s.profile.folk = action.folk.replace(/[<>]/g, '').trim().slice(0, 18) || s.profile.folk;
      return s;
    }
    case 'next': {
      if (s.phase === 'recalled') { endDay(s); s.flags.__reset = true; return s; }
      if (s.phase !== 'dayEnd') throw new Error(`illegal next in phase ${s.phase}`);
      s.day += 1;
      s.cardInDay = 0;
      if (s.flags.__reset) { for (const k of METERS) s.meters[k] = TUNING.recall.reset; delete s.flags.__reset; }
      s.dayStart = { ...s.meters };
      // yesterday's unfinished business opens the day, one card after another
      s.tomorrow.forEach((id, i) => s.queue.push({ cardId: id, at: s.count + i }));
      s.tomorrow = [];
      if (s.day >= 7) {
        const camp = pack.campaign.find((c) => holds(s, c.requires)) ?? pack.campaign[pack.campaign.length - 1]!;
        s.current = camp.id; s.phase = 'card';
      } else startCard(s, pack, rng);
      return s;
    }
    case 'swipe': {
      if (s.phase !== 'card' || !s.current) throw new Error('no card to swipe');
      const card = findCard(pack, s.current);
      const ch = card.options[action.dir];
      if (!ch) throw new Error(`card ${card.id} has no ${action.dir} option`);
      const before = { ...s.meters };
      for (const k of METERS) if (ch.effects[k]) s.meters[k] = clamp(s.meters[k] + ch.effects[k]!, 0, 100);
      for (const f of ch.set ?? []) s.flags[f] = true;
      for (const f of ch.clear ?? []) delete s.flags[f];
      s.count += 1;
      for (const [id, n] of ch.then ?? []) s.queue.push({ cardId: id, at: s.count + Math.max(0, n - 1) });
      // tomorrow's consequences; on the last day there is no tomorrow, so they arrive now
      for (const id of ch.next ?? []) { if (s.day >= 6) s.queue.push({ cardId: id, at: s.count }); else s.tomorrow.push(id); }
      s.swipes.push({ day: s.day, cardId: card.id, dir: action.dir, before, after: { ...s.meters } });
      if (s.day >= 7) { s.campaignVote += ch.vote ?? 0; finish(s, false); return s; }
      for (const o of pack.objectives) if (!s.objectivesDone.includes(o.id) && holds(s, o.when)) s.objectivesDone.push(o.id);
      const cause = recallCause(s);
      if (cause) {
        s.recalls += 1; s.recallCauses.push(cause); s.recalledDays.push(s.day); s.current = null; s.phase = 'recalled';
        if (s.recalls > TUNING.recall.max) finish(s, true);
        return s;
      }
      s.cardInDay += 1;
      if (s.cardInDay >= TUNING.cardsPerDay) endDay(s);
      else startCard(s, pack, rng);
      return s;
    }
  }
}

export type Policy = (s: State, legal: Action[], pack: Pack, rand: () => number) => Action;

export function autoplay(state: State, policy: Policy, pack: Pack, stop: (s: State) => boolean, rng: Rng = seededRng): State {
  let s = state;
  const rand = rng(`${s.playerSeed}|${s.weekId}|bot`);
  for (let i = 0; i < 1000 && s.phase !== 'results' && !stop(s); i++) {
    const legal = legalActions(s, pack);
    if (!legal.length) break;
    s = reduce(s, policy(s, legal, pack, rand), pack, rng);
  }
  return s;
}

/** Deputy Randy runs the days you missed: he picks whatever keeps everyone calm-ish, badly. */
export const davePolicy: Policy = (s, legal, pack, rand) => {
  if (s.phase !== 'card') return legal[0]!;
  const card = findCard(pack, s.current!);
  const score = (d: Dir) => METERS.reduce((n, k) => n + Math.abs(s.meters[k] + (card.options[d]!.effects[k] ?? 0) - 50), 0) + rand() * 30;
  const dirs = options(card).sort((a, b) => score(a) - score(b));
  return { type: 'swipe', dir: dirs[0]! };
};

/** Advance to `today` (1 = Monday ... 7 = Sunday) with Randy covering missed days. The town comes back a bit worn but playable. */
export function coverMissedDays(state: State, pack: Pack, today: number, rng: Rng = seededRng): State {
  let s = state;
  while (s.phase !== 'results' && s.day < today) {
    if (s.phase === 'card') {
      const before = { recalls: s.recalls, causes: s.recallCauses.length };
      s = autoplay(s, davePolicy, pack, (st) => st.phase === 'dayEnd' || st.phase === 'recalled', rng);
      if (s.phase === 'results') break;
      s = structuredClone(s);
      if (s.phase === 'recalled') { s.phase = 'card'; s.current = null; }
      s.recalls = before.recalls; s.recallCauses = s.recallCauses.slice(0, before.causes); s.recalledDays = s.recalledDays.filter((d) => d !== s.day);
      delete s.flags.__reset;
      for (const k of METERS) s.meters[k] = clamp(s.meters[k], TUNING.handover.floor, TUNING.handover.ceiling);
      s.daveDays.push(s.day);
      if (s.phase !== 'dayEnd') { s.current = null; s.phase = 'dayEnd'; s.polls.push(voteShare(s)); }
    }
    s = reduce(s, { type: 'next' }, pack, rng);
  }
  return s;
}
