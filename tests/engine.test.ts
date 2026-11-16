import { describe, expect, it } from 'vitest';
import { week1Pack as pack } from '../src/content/index.ts';
import { loadPack } from '../src/content/schema.ts';
import week1 from '../src/content/packs/week1.json' with { type: 'json' };
import { voteShare } from '../src/engine/election.ts';
import { autoplay, coverMissedDays, davePolicy, dayDeck, findCard, legalActions, newTerm, options, reduce } from '../src/engine/engine.ts';
import { TUNING } from '../src/engine/tuning.ts';
import { dayScore, rarityOf, tierOf } from '../src/engine/score.ts';
import type { Action, Dir, State } from '../src/engine/types.ts';

const start = (seed = 'p1') => newTerm('week1', seed, pack);
const swipe = (s: State, dir: Dir) => reduce(s, { type: 'swipe', dir }, pack);
/** Swipe the first available direction on whatever card is up, n times. */
const skip = (s: State, n: number) => { for (let i = 0; i < n && s.phase === 'card'; i++) s = swipe(s, options(findCard(pack, s.current!))[0]!); return s; };
/** Find a card id by playing until it shows up. */
const until = (s: State, id: string, max = 30) => { for (let i = 0; i < max && s.current !== id && s.phase === 'card'; i++) s = skip(s, 1); return s; };

describe('the run', () => {
  it('starts every meter at 50 with Monday\'s first pinned card up, the same for everyone', () => {
    const a = start('alice'), b = start('bob');
    expect(Object.values(a.meters).every((v) => v === 50)).toBe(true);
    expect(a.current).toBe(pack.cards.find((c) => c.day === 1)!.id);
    expect(b.current).toBe(a.current);
  });
  it('offers one action per swipe direction on the card', () => {
    const s = start();
    expect(legalActions(s, pack).map((a) => (a as { dir: Dir }).dir).sort()).toEqual(options(findCard(pack, s.current!)).sort());
  });
  it('applies the choice and records it', () => {
    let s = until(start(), 'g1');
    s = swipe(s, 'right');
    expect(s.meters.treasury).toBe(35);
    expect(s.flags.pond_plan).toBe(true);
    expect(s.swipes[s.swipes.length - 1]).toMatchObject({ cardId: 'g1', dir: 'right' });
  });
  it('is deterministic for the same choices', () => {
    expect(autoplay(start('x'), davePolicy, pack, () => false)).toEqual(autoplay(start('x'), davePolicy, pack, () => false));
  });
  it('ends the day after the set number of cards, with a poll', () => {
    let s = start();
    // a steady hand: always the option that keeps every meter nearest the middle
    for (let i = 0; i < TUNING.cardsPerDay && s.phase === 'card'; i++) {
      const c = findCard(pack, s.current!);
      const cost = (d: Dir) => Object.entries(c.options[d]!.effects).reduce((n, [m, v]) => n + Math.abs(s.meters[m as keyof State['meters']] + (v ?? 0) - 50), 0);
      s = swipe(s, options(c).sort((x, y) => cost(x) - cost(y))[0]!);
    }
    expect(s.phase).toBe('dayEnd');
    expect(s.polls).toHaveLength(1);
    s = reduce(s, { type: 'next' }, pack);
    expect(s.day).toBe(2);
    expect(s.current).toBe(pack.cards.find((c) => c.day === 2)!.id);
  });
});

describe('stories build on each other', () => {
  it('building the pond brings the goose contractor a few cards later', () => {
    let s = swipe(until(start(), 'g1'), 'right');
    const at = s.count;
    for (let i = 0; i < 6 && s.current !== 'g2'; i++) s = skip(s, 1);
    expect(s.current).toBe('g2');
    expect(s.count - at).toBeLessThanOrEqual(5);
  });
  it('refusing the pond leads somewhere else: the car park occupation', () => {
    let s = swipe(until(start(), 'g1'), 'left');
    expect(s.flags.goose_grudge).toBe(true);
    for (let i = 0; i < 6 && s.current !== 'g2x'; i++) s = skip(s, 1);
    expect(s.current).toBe('g2x');
  });
  it('a follow-up never appears unless a choice scheduled it', () => {
    const follow = new Set(pack.cards.filter((c) => c.followUp).map((c) => c.id));
    let s = start();
    s = skip(s, 14);
    const triggered = new Set(s.swipes.flatMap((w) => (findCard(pack, w.cardId).options[w.dir]!.then ?? []).map(([id]) => id)));
    for (const id of s.seen.filter((x) => follow.has(x))) expect(triggered.has(id), `${id} was triggered by a choice`).toBe(true);
  });
  it('a storyline runs back to back: the next beat is the very next card (or the one after a pinned card)', () => {
    let s = swipe(until(start(), 'g1'), 'right');
    if (s.current !== 'g2') s = skip(s, 1);
    expect(s.current).toBe('g2');
  });
  it('the ballots only turn up if you went into the basement', () => {
    const noBasement = { ...start(), day: 5, flags: {} };
    const s = reduce({ ...noBasement, phase: 'dayEnd' as const, day: 4 }, { type: 'next' }, pack);
    expect(s.current).not.toBe('ballots');
    const withBasement = reduce({ ...noBasement, phase: 'dayEnd' as const, day: 4, flags: { basement: true } }, { type: 'next' }, pack);
    expect(withBasement.current).toBe('ballots');
  });
});

describe('decisions carry over', () => {
  it('some consequences wait until tomorrow and open the next day', () => {
    // find a choice with a next-day consequence and play it
    const src = pack.cards.find((c) => Object.values(c.options).some((o) => o!.next?.length))!;
    const dir = options(src).find((d) => src.options[d]!.next?.length)!;
    const target = src.options[dir]!.next![0]!;
    let s = start();
    s = { ...s, current: src.id, phase: 'card' };
    s = swipe(s, dir);
    expect(s.tomorrow).toContain(target);
    expect(s.seen).not.toContain(target);
    s = { ...s, phase: 'dayEnd', current: null };
    s = reduce(s, { type: 'next' }, pack);
    expect(s.tomorrow).toEqual([]);
    const seenEarly: string[] = [];
    for (let i = 0; i < 4 && s.phase === 'card'; i++) { seenEarly.push(s.current!); s = skip(s, 1); }
    expect(seenEarly).toContain(target);
  });
  it('every day offers a storyline within the first ten cards', () => {
    const starts = (id: string) => Object.values(findCard(pack, id).options).some((o) => o!.then?.length || o!.next?.length);
    for (let d = 1; d <= 6; d++) expect(dayDeck(pack, 'week1', d).slice(0, 10).filter(starts).length, `day ${d}`).toBeGreaterThanOrEqual(2);
  });
});

describe('both ends are dangerous', () => {
  const brink = (meters: Partial<State['meters']>): State => { const s = until(start(), 'g1'); return { ...s, meters: { ...s.meters, ...meters } }; };
  it('a group at 0 recalls you and ends the day', () => {
    const s = swipe(brink({ people: 8 }), 'left'); // people -10
    expect(s.phase).toBe('recalled');
    expect(s.recallCauses).toEqual(['low:people']);
  });
  it('a group at 100 also recalls you', () => {
    const s = swipe(brink({ press: 95 }), 'right'); // g1 right: people+5, business-5
    expect(s.phase).toBe('card');
    const t = swipe(brink({ people: 96 }), 'right');
    expect(t.recallCauses).toEqual(['high:people']);
  });
  it('an empty treasury recalls you', () => {
    expect(swipe(brink({ treasury: 10 }), 'right').recallCauses).toEqual(['low:treasury']);
  });
  it('after a recall you come back next day as Acting Mayor, everything at 40, and it costs votes', () => {
    let s = swipe(brink({ people: 8 }), 'left');
    s = reduce(s, { type: 'next' }, pack);
    expect(s.phase).toBe('dayEnd');
    s = reduce(s, { type: 'next' }, pack);
    expect(Object.values(s.meters).every((v) => v === TUNING.recall.reset)).toBe(true);
    expect(voteShare(s)).toBe(Math.round(TUNING.vote.base - 5 - 2 - 1.5 - 1.5 - 1 + TUNING.recall.election));
  });
  it('a third recall ends the term', () => {
    const s = swipe({ ...brink({ people: 8 }), recalls: 2 }, 'left');
    expect(s.phase).toBe('results');
    expect(s.result).toMatchObject({ endedEarly: true, won: false });
  });
});

describe('the week', () => {
  it('a full term: six days of cards, a Sunday campaign card, a result', () => {
    const s = autoplay(start('full'), davePolicy, pack, () => false);
    expect(s.phase).toBe('results');
    expect(s.swipes.some((w) => w.cardId.startsWith('camp'))).toBe(true);
    expect(s.result!.share).toBeGreaterThanOrEqual(5);
  });
  it('Randy covers missed days and hands back a playable town', () => {
    const s = coverMissedDays(start('late'), pack, 4);
    expect(s.day).toBe(4);
    expect(s.phase).toBe('card');
    expect(s.daveDays).toEqual([1, 2, 3]);
    expect(s.recalls).toBe(0);
    for (const v of Object.values(s.meters)) { expect(v).toBeGreaterThanOrEqual(TUNING.handover.floor); expect(v).toBeLessThanOrEqual(TUNING.handover.ceiling); }
  });
  it('Sunday shows the campaign card, and its vote counts', () => {
    const s = coverMissedDays(start('sun'), pack, 7);
    expect(s.current!.startsWith('camp')).toBe(true);
    const before = voteShare(s);
    const after = swipe(s, 'right');
    expect(after.result!.share).toBeGreaterThan(before - 20);
    expect(after.campaignVote).toBe(findCard(pack, s.current!).options.right!.vote ?? 0);
  });
  it('setup boosts your base group once; names can change later', () => {
    let s = reduce(start(), { type: 'setup', profile: { mayor: ' Pat <b> ', folk: 'Goosebury', base: 'law' } }, pack);
    expect(s.meters.law).toBe(50 + TUNING.setupBase);
    expect(s.profile!.mayor).toBe('Pat b');
    expect(() => reduce(s, { type: 'setup', profile: s.profile! }, pack)).toThrow();
    s = reduce(s, { type: 'rename', mayor: 'Sam', folk: 'Honk' }, pack);
    expect(s.profile).toMatchObject({ mayor: 'Sam', folk: 'Honk', base: 'law' });
  });
});

describe('the shared day', () => {
  it('every player gets the same 25-card deck for a given day, and a different one next day', () => {
    for (let d = 1; d <= 6; d++) {
      const deck = dayDeck(pack, 'week1', d);
      expect(deck.length).toBeGreaterThanOrEqual(TUNING.cardsPerDay);
      expect(dayDeck(pack, 'week1', d)).toEqual(deck);
    }
    expect(dayDeck(pack, 'week1', 2).slice(0, 25)).not.toEqual(dayDeck(pack, 'week1', 1).slice(0, 25));
  });
  it('the day\'s sneak moment sits in its slot for everyone who has not been pulled aside by a follow-up', () => {
    for (let d = 1; d <= 6; d++) {
      const sk = pack.cards.find((c) => c.sneak && c.day === d)!;
      expect(sk, `sneak card on day ${d}`).toBeTruthy();
      expect(dayDeck(pack, 'week1', d)[sk.slot!]).toBe(sk.id);
    }
  });
  it('the sneak moment turns up at its slot even when the town is in trouble', () => {
    let s = start();
    for (let i = 0; i < 12 && s.phase === 'card'; i++) {
      const c = findCard(pack, s.current!);
      // keep everything near the middle so the day survives to card 13
      const d = options(c).sort((x, y) => Object.values(c.options[x]!.effects).reduce((n, v) => n + Math.abs(v ?? 0), 0) - Object.values(c.options[y]!.effects).reduce((n, v) => n + Math.abs(v ?? 0), 0))[0]!;
      s = swipe(s, d);
    }
    expect(s.phase).toBe('card');
    expect(findCard(pack, s.current!).sneak).toBe(true);
  });
  it('two players making the same choices see the same cards; different choices can diverge', () => {
    const run = (seed: string, pick: (n: number) => number) => { let s = start(seed); const seen: string[] = []; for (let i = 0; i < 25 && s.phase === 'card'; i++) { seen.push(s.current!); const o = options(findCard(pack, s.current!)); s = swipe(s, o[pick(i) % o.length]!); } return seen; };
    expect(run('a', () => 0)).toEqual(run('b', () => 0));
  });
});

describe('the daily score', () => {
  it('10 per card, plus a rarity bonus from how few mayors made the same choice', () => {
    let s = start();
    const ids: string[] = [];
    for (let i = 0; i < 3; i++) { ids.push(s.current!); s = swipe(s, options(findCard(pack, s.current!))[0]!); }
    const dirs = s.swipes.map((w) => w.dir);
    const crowd = { [ids[0]!]: { [dirs[0]!]: 3 }, [ids[1]!]: { [dirs[1]!]: 20 }, [ids[2]!]: { [dirs[2]!]: 90 } };
    const sc = dayScore(s, 1, crowd);
    expect(sc.survived).toBe(30);
    expect(sc.rarity).toBe(50 + 15 + 0);
    expect(sc.total).toBe(95);
  });
  it('a recall costs points but never goes below zero', () => {
    let s = start();
    for (let i = 0; i < 40 && s.phase === 'card'; i++) {
      const c = findCard(pack, s.current!);
      const d = options(c).sort((a, b) => (c.options[a]!.effects.people ?? 0) - (c.options[b]!.effects.people ?? 0))[0]!;
      s = swipe(s, d);
    }
    expect(s.recalledDays).toContain(1);
    const sc = dayScore(s, 1, {});
    expect(sc.recalled).toBe(true);
    expect(sc.total).toBe(Math.max(0, sc.survived + sc.rarity - TUNING.score.recall));
  });
  it('tiers and rarity bands are ordered and cover every score', () => {
    expect(rarityOf(2).id).toBe('unique'); expect(rarityOf(14).id).toBe('rare'); expect(rarityOf(99).id).toBe('herd'); expect(rarityOf(undefined).id).toBe('common');
    expect(tierOf(0).name).toBe('Rubber Stamp'); expect(tierOf(10000).name).toBe('One in a Million Mayor');
  });
});

describe('content', () => {
  it('rejects a pack where a choice schedules a card that does not exist', () => {
    const bad = structuredClone(week1) as unknown as { cards: { options: Record<string, { then?: [string, number][] }> }[] };
    bad.cards[0]!.options.right!.then = [['nope', 3]];
    expect(() => loadPack(bad)).toThrow(/unknown card nope/);
  });
  it('every card has at least two directions and every follow-up is reachable', () => {
    expect(() => loadPack(week1)).not.toThrow();
  });
  it('illegal actions throw', () => {
    const s = start();
    const card = findCard(pack, s.current!);
    const missing = (['left', 'right', 'up', 'down'] as Dir[]).find((d) => !card.options[d]);
    if (missing) expect(() => swipe(s, missing)).toThrow();
    expect(() => reduce(s, { type: 'next' } as Action, pack)).toThrow();
  });
});
