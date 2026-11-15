import { describe, expect, it } from 'vitest';
import { week1Pack as pack } from '../src/content/index.ts';
import { loadPack } from '../src/content/schema.ts';
import week1 from '../src/content/packs/week1.json' with { type: 'json' };
import { voteShare } from '../src/engine/election.ts';
import { autoplay, coverMissedDays, davePolicy, findCard, legalActions, newTerm, options, reduce } from '../src/engine/engine.ts';
import { TUNING } from '../src/engine/tuning.ts';
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
    s = skip(s, TUNING.cardsPerDay);
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
    s = skip(s, 3);
    expect(s.seen.filter((id) => follow.has(id))).toEqual([]);
  });
  it('the ballots only turn up if you went into the basement', () => {
    const noBasement = { ...start(), day: 5, flags: {} };
    const s = reduce({ ...noBasement, phase: 'dayEnd' as const, day: 4 }, { type: 'next' }, pack);
    expect(s.current).not.toBe('ballots');
    const withBasement = reduce({ ...noBasement, phase: 'dayEnd' as const, day: 4, flags: { basement: true } }, { type: 'next' }, pack);
    expect(withBasement.current).toBe('ballots');
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
  it('Dave covers missed days and hands back a playable town', () => {
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
    let s = reduce(start(), { type: 'setup', profile: { mayor: ' Pat <b> ', town: 'Goosebury', base: 'law' } }, pack);
    expect(s.meters.law).toBe(50 + TUNING.setupBase);
    expect(s.profile!.mayor).toBe('Pat b');
    expect(() => reduce(s, { type: 'setup', profile: s.profile! }, pack)).toThrow();
    s = reduce(s, { type: 'rename', mayor: 'Sam', town: 'Honk' }, pack);
    expect(s.profile).toMatchObject({ mayor: 'Sam', town: 'Honk', base: 'law' });
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
