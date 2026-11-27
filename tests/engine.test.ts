import { describe, expect, it } from 'vitest';
import { PACKS, packFor, packForWeek, weekIdFor, week1Pack as pack } from '../src/content/index.ts';
import { loadPack } from '../src/content/schema.ts';
import week1 from '../src/content/packs/week1.json' with { type: 'json' };
import { nightVote } from '../src/engine/election.ts';
import { autoplay, coverMissedDays, dayDeck, findCard, legalActions, newTerm, options, reduce } from '../src/engine/engine.ts';
import { TUNING } from '../src/engine/tuning.ts';
import { cardPoints, dayScore, meterPoints, steady as townSteady, tierOf } from '../src/engine/score.ts';
import type { Action, Dir, MeterId, State } from '../src/engine/types.ts';

const start = (seed = 'p1') => newTerm('week1', seed, pack);
const swipe = (s: State, dir: Dir) => reduce(s, { type: 'swipe', dir }, pack);
/** The option that keeps every meter nearest the middle, never the one that ends the day: a steady hand that reads the small print. */
const steady = (s: State): Dir => {
  const c = findCard(pack, s.current!);
  const cost = (d: Dir) => (c.options[d]!.ending ? 1e6 : 0) + Object.entries(c.options[d]!.effects).reduce((n, [m, v]) => n + Math.abs(s.meters[m as MeterId] + (v ?? 0) - 50), 0);
  return options(c).sort((x, y) => cost(x) - cost(y))[0]!;
};
/** steady, for any pack */
const steadyIn = (pk: typeof pack, s: State): Dir => {
  const c = findCard(pk, s.current!);
  const cost = (d: Dir) => (c.options[d]!.ending ? 1e6 : 0) + Object.entries(c.options[d]!.effects).reduce((n, [m, v]) => n + Math.abs(s.meters[m as MeterId] + (v ?? 0) - 50), 0);
  return options(c).sort((x, y) => cost(x) - cost(y))[0]!;
};
const play = (s: State, n: number) => { for (let i = 0; i < n && s.phase === 'card'; i++) s = swipe(s, steady(s)); return s; };
/** Put a specific card in front of the mayor. */
const facing = (s: State, id: string): State => ({ ...s, current: id, phase: 'card' });
const withMeters = (s: State, m: Partial<Record<MeterId, number>>): State => ({ ...s, meters: { ...s.meters, ...m } });

describe('the run', () => {
  it('starts every meter at 50 with the same first card for everyone', () => {
    const a = start('alice'), b = start('bob');
    expect(Object.values(a.meters).every((v) => v === 50)).toBe(true);
    expect(a.current).toBe('g1');
    expect(b.current).toBe(a.current);
  });
  it('every card is a yes or a no', () => {
    const s = start();
    expect(legalActions(s, pack).filter((a) => a.type === 'swipe').map((a) => (a as { dir: Dir }).dir).sort()).toEqual(['left', 'right']);
    expect(legalActions(s, pack).some((a) => a.type === 'defer')).toBe(true);
    for (const c of pack.cards) expect(Object.keys(c.options).sort(), c.id).toEqual(['left', 'right']);
  });
  it('applies the choice, then the week\'s theme nudge, and records it', () => {
    const s = swipe(start(), 'right');
    const e = findCard(pack, 'g1').options.right!.effects;
    expect(s.meters.treasury).toBe(50 + (e.treasury ?? 0) + (pack.theme.drift?.treasury ?? 0));
    expect(s.meters.law).toBe(50 + (e.law ?? 0) + (pack.theme.drift?.law ?? 0));
    expect(s.swipes).toHaveLength(1);
    expect(s.swipes[0]).toMatchObject({ day: 1, cardId: 'g1', dir: 'right' });
  });
  it('is deterministic for the same choices', () => {
    expect(play(start('x'), 12)).toEqual(play(start('x'), 12));
  });
  it('ends the day after 20 cards with a re-election vote', () => {
    expect(TUNING.cardsPerDay).toBe(20);
    let s = play(start(), TUNING.cardsPerDay);
    expect(s.phase).toBe('dayEnd');
    expect(s.swipes).toHaveLength(20);
    expect(s.polls).toEqual([nightVote(s, 1)]);
    expect(s.won).toEqual([s.polls[0]! >= TUNING.vote.pass]);
    s = reduce(s, { type: 'next' }, pack);
    expect(s.day).toBe(2);
  });
});

describe('rabbit holes', () => {
  it('yes and no lead to different next cards, straight away', () => {
    expect(swipe(start(), 'right').current).toBe('g2');
    expect(swipe(start(), 'left').current).toBe('g2n');
  });
  it('the day\'s main story runs at least four cards deep, back to back', () => {
    let s = start(); const story: string[] = [];
    for (let i = 0; i < 5; i++) { story.push(findCard(pack, s.current!).story!); s = swipe(s, 'right'); }
    expect(story.every((x) => x === 'goose')).toBe(true);
  });
  it('a follow-up never appears unless a choice triggered it', () => {
    const follow = new Set(pack.cards.filter((c) => c.followUp).map((c) => c.id));
    const s = play(start(), 16);
    const triggered = new Set(s.swipes.flatMap((w) => { const o = findCard(pack, w.cardId).options[w.dir]!; return [...(o.then ?? []).map(([id]) => id), ...(o.next ?? [])]; }));
    for (const id of s.seen.filter((x) => follow.has(x))) expect(triggered.has(id), id).toBe(true);
  });
  it('some consequences wait until tomorrow and open the next day', () => {
    let s = swipe(facing(start(), 'g5'), 'right');
    expect(s.tomorrow).toContain('g6');
    expect(s.seen).not.toContain('g6');
    s = reduce({ ...s, phase: 'dayEnd', current: null }, { type: 'next' }, pack);
    expect(s.tomorrow).toEqual([]);
    const early: string[] = [];
    for (let i = 0; i < 4 && s.phase === 'card'; i++) { early.push(s.current!); s = swipe(s, steady(s)); }
    expect(early).toContain('g6');
  });
  it('every story choice leads somewhere or is an ending: no card points at one that does not exist', () => {
    const ids = new Set(pack.cards.map((c) => c.id));
    for (const c of pack.cards) for (const o of Object.values(c.options)) for (const t of [...(o!.then ?? []).map(([id]) => id), ...(o!.next ?? [])]) expect(ids.has(t), `${c.id} -> ${t}`).toBe(true);
  });
});

describe('the shared day', () => {
  it('every mayor gets the same deck for a day, and a different one the next day', () => {
    for (let d = 1; d <= 7; d++) expect(dayDeck(pack, 'week1', d)).toEqual(dayDeck(pack, 'week1', d));
    expect(dayDeck(pack, 'week1', 2).slice(0, 20)).not.toEqual(dayDeck(pack, 'week1', 1).slice(0, 20));
  });
  for (const p of PACKS) it(`${p.id}: each of the 7 days has its main story first, a law, one catastrophe and a mini-game, in their places`, () => {
    for (let d = 1; d <= 7; d++) {
      const deck = dayDeck(p, p.id, d);
      const at = (i: number) => findCard(p, deck[i]!);
      expect(at(0).day, `day ${d} opener`).toBe(d);
      expect(at(7).story, `day ${d} law`).toBe('law');
      expect(!!(at(15).sneak || at(15).ribbon), `day ${d} mini-game`).toBe(true);
      expect(p.cards.filter((c) => c.day === d && c.slot === 11), `day ${d} catastrophe`).toHaveLength(1);
      expect(deck[11]).toBe(p.cards.find((c) => c.day === d && c.slot === 11)!.id);
    }
  });
  for (const p of PACKS) it(`${p.id}: days do not repeat the same side stories in the same order`, () => {
    const pool = (d: number) => dayDeck(p, p.id, d).slice(0, 20).filter((id) => !findCard(p, id).day);
    for (let d = 2; d <= 7; d++) expect(pool(d).slice(0, 6), `day ${d}`).not.toEqual(pool(d - 1).slice(0, 6));
  });
  for (const p of PACKS) it(`${p.id}: every card is a yes or a no, and every link leads to a real card`, () => {
    const ids = new Set(p.cards.map((c) => c.id));
    for (const c of p.cards) {
      expect(Object.keys(c.options).sort(), c.id).toEqual(['left', 'right']);
      for (const o of Object.values(c.options)) for (const t of [...(o!.then ?? []).map(([id]) => id), ...(o!.next ?? [])]) expect(ids.has(t), `${c.id} -> ${t}`).toBe(true);
    }
  });
  it('your own weeks rotate: your first week is week 1, then 2, 3, 4, then round again with a new deck', () => {
    expect([0, 1, 2, 3, 4].map((n) => packForWeek(n).id)).toEqual(['week1', 'week2', 'week3', 'week4', 'week1']);
    expect(weekIdFor(0)).toBe('week1#r0');
    expect(weekIdFor(4)).toBe('week1#r1');
    expect(packFor(weekIdFor(5)).id).toBe('week2');
    expect(dayDeck(pack, weekIdFor(0), 1)).not.toEqual(dayDeck(pack, weekIdFor(4), 1));
  });
  it('two mayors making the same choices see the same cards', () => {
    const run = (seed: string) => { let s = start(seed); const seen: string[] = []; for (let i = 0; i < 20 && s.phase === 'card'; i++) { seen.push(s.current!); s = swipe(s, 'right'); } return seen; };
    expect(run('a')).toEqual(run('b'));
  });
});

describe('both ends are dangerous', () => {
  it('a group at 0 recalls you and ends the day', () => {
    const s = swipe(withMeters(start(), { people: 4 }), 'left'); // g1 left costs People 5
    expect(s.phase).toBe('recalled');
    expect(s.endings).toEqual(['low:people/week1']);
    expect(s.recalledDays).toEqual([1]);
  });
  it('a group at 100 also recalls you', () => {
    const s = swipe(withMeters(start(), { people: 96 }), 'right'); // g1 right gives People 5
    expect(s.endings).toEqual(['high:people/week1']);
  });
  it('an empty treasury recalls you, a full one does not', () => {
    const spend = pack.cards.find((c) => !c.day && !c.followUp && (c.options.right!.effects.treasury ?? 0) < 0 && !c.options.right!.ending)!;
    const cost = -spend.options.right!.effects.treasury!;
    expect(swipe(withMeters(facing(start(), spend.id), { treasury: cost }), 'right').endings).toEqual(['low:treasury/week1']);
    const rich = swipe(withMeters(facing(start(), 'c1'), { treasury: 95 }), 'right');
    expect(rich.phase).toBe('card');
  });
  it('a recall loses tonight\'s vote; you run again tomorrow with everything at 40', () => {
    let s = swipe(withMeters(start(), { people: 4 }), 'left');
    s = reduce(s, { type: 'next' }, pack);
    expect(s.phase).toBe('dayEnd');
    expect(s.won).toEqual([false]);
    s = reduce(s, { type: 'next' }, pack);
    expect(s.day).toBe(2);
    expect(Object.values(s.meters).every((v) => v === TUNING.recall.reset)).toBe(true);
    expect(s.recalls).toBe(1);
  });
  it('recalls never end the week early: a bad Monday is just a bad Monday', () => {
    let s = start();
    for (let i = 0; i < 4; i++) { s = swipe(withMeters(facing(s, 'g1'), { people: 4 }), 'left'); s = reduce(reduce(s, { type: 'next' }, pack), { type: 'next' }, pack); }
    expect(s.phase).toBe('card');
    expect(s.day).toBe(5);
    expect(s.won).toEqual([false, false, false, false]);
  });
});

describe("'Not now'", () => {
  it('puts the card off: nothing changes now, it comes back a few decisions later', () => {
    const s0 = start();
    const s1 = reduce(s0, { type: 'defer' }, pack);
    expect(s1.meters).toEqual(s0.meters);
    expect(s1.defers).toBe(TUNING.defer.perDay - 1);
    expect(s1.current).not.toBe('g1');
    let s = s1; const seen: string[] = [];
    for (let i = 0; i < TUNING.defer.back + 1 && s.phase === 'card'; i++) { seen.push(s.current!); s = swipe(s, steady(s)); }
    expect(seen).toContain('g1');
    expect(seen.indexOf('g1')).toBeLessThanOrEqual(TUNING.defer.back);
  });
  it('twice a day, never in the last cards of the day, and it refills each morning', () => {
    let s = reduce(reduce(start(), { type: 'defer' }, pack), { type: 'defer' }, pack);
    expect(s.defers).toBe(0);
    expect(legalActions(s, pack).some((a) => a.type === 'defer')).toBe(false);
    expect(() => reduce(s, { type: 'defer' }, pack)).toThrow();
    s = play(s, TUNING.cardsPerDay);
    expect(s.phase).toBe('dayEnd');
    s = reduce(s, { type: 'next' }, pack);
    expect(s.defers).toBe(TUNING.defer.perDay);
    const late = { ...play(s, TUNING.cardsPerDay - TUNING.defer.lastSlots) };
    if (late.phase === 'card') expect(legalActions(late, pack).some((a) => a.type === 'defer')).toBe(false);
  });
});

describe('every night is a re-election', () => {
  it('the vote comes from today\'s score plus goals met; 50% keeps the job', () => {
    const s = play(start(), TUNING.cardsPerDay);
    expect(nightVote(s, 1)).toBe(Math.round(Math.min(TUNING.vote.max, Math.max(TUNING.vote.min, TUNING.vote.base + TUNING.vote.perPoint * dayScore(s, 1).total + TUNING.vote.objective * s.objectivesDone.length))));
  });
  it('losing the vote earns a voted-out ending, blamed on the least happy group, and a fresh start', () => {
    let s = play(start(), TUNING.cardsPerDay - 1);
    s = withMeters(s, { people: 22, business: 70, law: 30, press: 75, treasury: 20 });
    s = { ...s, swipes: s.swipes.map((w) => ({ ...w, after: { people: 22, business: 70, law: 30, press: 75, treasury: 20 } })) };
    s = swipe(s, steady(s));
    expect(s.phase).toBe('dayEnd');
    expect(s.won).toEqual([false]);
    expect(s.endings.at(-1)).toMatch(/^out(:[a-z]+(_[23])?|w:[a-z]+\/week1)$/);
    s = reduce(s, { type: 'next' }, pack);
    expect(Object.values(s.meters).every((v) => v === TUNING.recall.reset)).toBe(true);
  });
  it('rare endings: some saga choices end the day on the spot with a Scrapbook ending', () => {
    const rare = pack.cards.flatMap((c) => Object.entries(c.options).filter(([, o]) => o!.ending).map(([d, o]) => [c.id, d, o!.ending!] as const));
    expect(rare.length).toBeGreaterThanOrEqual(2);
    const [id, dir, key] = rare[0]!;
    const s = swipe(facing(start(), id), dir as Dir);
    expect(s.phase).toBe('recalled');
    expect(s.endings).toEqual([key]);
    expect(pack.endings[key]).toBeTruthy();
    expect(reduce(reduce(s, { type: 'next' }, pack), { type: 'next' }, pack).day).toBe(2);
  });
  for (const p of PACKS) it(`${p.id}: one disaster a day; the fatal answer is yes on some days and no on others; it ends the day on the spot`, () => {
    const traps = p.cards.filter((c) => Object.values(c.options).some((o) => o!.ending?.startsWith('trap:')));
    expect(traps.map((c) => c.day).sort()).toEqual([1, 2, 3, 4, 5, 6, 7]);
    const fatalRight = traps.filter((c) => c.options.right!.ending).length;
    expect(fatalRight).toBeGreaterThanOrEqual(2);
    expect(traps.length - fatalRight).toBeGreaterThanOrEqual(2);
    for (const c of traps) {
      const dir: Dir = c.options.right!.ending ? 'right' : 'left';
      const st = reduce({ ...newTerm(p.id, 'trap', p), current: c.id, phase: 'card' }, { type: 'swipe', dir }, p);
      expect(st.phase, c.id).toBe('recalled');
      expect(p.endings[st.endings[0]!], c.id).toBeTruthy();
      const safe = reduce({ ...newTerm(p.id, 'trap', p), current: c.id, phase: 'card' }, { type: 'swipe', dir: dir === 'right' ? 'left' : 'right' }, p);
      expect(safe.phase, c.id).not.toBe('recalled');
    }
  });
  it('Randy never takes the bait on a disaster card', () => {
    const s = coverMissedDays(start(), pack, 8);
    const hits = s.swipes.filter((w) => findCard(pack, w.cardId).options[w.dir]!.ending);
    expect(hits).toEqual([]);
  });
  for (const p of PACKS) it(`${p.id}: the week's saga runs Monday to Sunday, one card a day, with at least two rare endings`, () => {
    const saga = p.cards.find((c) => c.day === 1 && c.slot === 8)!;
    expect(saga).toBeTruthy();
    const days = new Map<string, number>([[saga.id, 1]]);
    const todo = [saga.id];
    while (todo.length) { const id = todo.pop()!; for (const o of Object.values(findCard(p, id).options)) for (const n of o!.next ?? []) if (!days.has(n)) { days.set(n, days.get(id)! + 1); todo.push(n); } }
    expect(Math.max(...days.values())).toBe(7);
    const endings = [...days.keys()].flatMap((id) => Object.values(findCard(p, id).options).map((o) => o!.ending).filter(Boolean));
    expect(endings.length).toBeGreaterThanOrEqual(2);
  });
});

describe('the week', () => {
  it('a full week: seven days of cards, seven votes, then the week in review', () => {
    const end = autoplay(start(), (s, legal) => (s.phase === 'card' ? { type: 'swipe', dir: steady(s) } : legal[0]!), pack, (s) => s.phase === 'results');
    expect(end.phase).toBe('results');
    expect(end.polls).toHaveLength(7);
    expect(end.won).toHaveLength(7);
    expect(end.result!.daysWon).toBe(end.won.filter(Boolean).length);
    expect(end.swipes.some((w) => w.day === 7)).toBe(true);
  });
  it('Randy covers missed days and hands back a playable town', () => {
    const s = coverMissedDays(start(), pack, 4);
    expect(s.day).toBe(4);
    expect(s.daveDays).toEqual([1, 2, 3]);
    expect(s.phase).toBe('card');
    for (const v of Object.values(s.meters)) { expect(v).toBeGreaterThanOrEqual(TUNING.handover.floor); expect(v).toBeLessThanOrEqual(TUNING.handover.ceiling); }
  });
  it('Randy\'s days count as wins (he counted the votes himself) and never fill your Scrapbook', () => {
    const s = coverMissedDays(start(), pack, 5);
    expect(s.won).toEqual([true, true, true, true]);
    expect(s.endings).toEqual([]);
  });
  it('setup boosts the group that voted for you, once; names can change later', () => {
    let s = reduce(start(), { type: 'setup', profile: { mayor: ' Pat <b> ', folk: 'Goosebury', base: 'law' } }, pack);
    expect(s.meters.law).toBe(50 + TUNING.setupBase);
    expect(s.profile!.mayor).toBe('Pat b');
    expect(() => reduce(s, { type: 'setup', profile: s.profile! }, pack)).toThrow();
    s = reduce(s, { type: 'rename', mayor: 'Sam', folk: 'Honk' }, pack);
    expect(s.profile).toMatchObject({ mayor: 'Sam', folk: 'Honk', base: 'law' });
  });
});

describe('the daily score: points for keeping the town balanced', () => {
  const calm = { people: 50, business: 50, law: 50, press: 50, treasury: 50 };
  it('each group earns 2 points when calm, 1 when uneasy, 0 in danger', () => {
    expect(meterPoints('people', 50)).toBe(2); expect(meterPoints('people', 55)).toBe(2); expect(meterPoints('people', 45)).toBe(2);
    expect(meterPoints('people', 60)).toBe(1); expect(meterPoints('people', 35)).toBe(1); expect(meterPoints('people', 65)).toBe(1);
    expect(meterPoints('people', 70)).toBe(0); expect(meterPoints('people', 30)).toBe(0); expect(meterPoints('people', 100)).toBe(0);
  });
  it('a full treasury is never a problem; an empty one is', () => {
    expect(meterPoints('treasury', 100)).toBe(2); expect(meterPoints('treasury', 45)).toBe(2); expect(meterPoints('treasury', 40)).toBe(1); expect(meterPoints('treasury', 30)).toBe(0);
  });
  it('a perfectly calm town scores 10 for the card; a lopsided one much less', () => {
    expect(cardPoints(calm)).toBe(10);
    expect(cardPoints({ ...calm, people: 90, law: 40 })).toBe(7);
  });
  it('rarity no longer matters: two mayors in the same state score the same whatever they chose', () => {
    const a = swipe(start(), 'right'), b = swipe(start(), 'left');
    expect(dayScore(a, 1).total).toBe(cardPoints(a.meters));
    expect(dayScore(b, 1).total).toBe(cardPoints(b.meters));
  });
  it('a full, steady day earns the bonus; a recall costs points but never below zero', () => {
    const s = play(start(), TUNING.cardsPerDay);
    const sc = dayScore(s, 1);
    expect(sc.picks).toHaveLength(20);
    expect(sc.bonus).toBe(townSteady(s.meters) ? TUNING.score.steadyFinish : 0);
    expect(sc.total).toBe(sc.balance + sc.bonus);
    const r = swipe(withMeters(start(), { people: 4 }), 'left');
    const rs = dayScore(r, 1);
    expect(rs.recalled).toBe(true);
    expect(rs.bonus).toBe(0);
    expect(rs.total).toBe(Math.max(0, rs.balance - TUNING.score.recall));
  });
  it('day titles cover every score', () => {
    expect(tierOf(0).name).toBe('Town On Fire'); expect(tierOf(10000).name).toBe('Perfectly Balanced');
  });
});

describe('content', () => {
  it('rejects a pack where a choice leads to a card that does not exist', () => {
    const bad = structuredClone(week1) as unknown as { cards: { options: Record<string, { then?: [string, number][] }> }[] };
    bad.cards[0]!.options.right!.then = [['nope', 1]];
    expect(() => loadPack(bad)).toThrow(/nope/);
  });
  it('every follow-up is reachable, and nobody speaks without a portrait name', () => {
    expect(() => loadPack(week1)).not.toThrow();
  });
  it('illegal actions throw', () => {
    expect(() => reduce(start(), { type: 'swipe', dir: 'up' } as Action, pack)).toThrow();
    expect(() => reduce(start(), { type: 'next' }, pack)).toThrow();
  });
});

describe('after hours', () => {
  it('ten cards from every week, one disaster per round, cycling through all 28; every link resolves', async () => {
    const { afterHoursPack, ALL_TRAPS, AFTER_HOURS_CARDS } = await import('../src/content/afterHours.ts');
    expect(ALL_TRAPS).toHaveLength(28);
    const seenTraps = new Set<string>();
    for (let round = 0; round < 28; round++) {
      const ah = afterHoursPack(pack, round);
      const ids = new Set(ah.cards.map((c) => c.id));
      for (const c of ah.cards) for (const o of Object.values(c.options)) { expect(o!.next).toBeUndefined(); for (const [t] of o!.then ?? []) expect(ids.has(t), `${c.id} -> ${t}`).toBe(true); }
      let s = newTerm(`after#${round}`, 'ah', ah);
      const shown: string[] = [];
      for (let i = 0; i < AFTER_HOURS_CARDS && s.phase === 'card'; i++) { shown.push(s.current!); s = reduce(s, { type: 'swipe', dir: steadyIn(ah, s) }, ah); }
      const traps = shown.filter((id) => ALL_TRAPS.some((t) => t.id === id));
      expect(traps, `round ${round}`).toHaveLength(1);
      seenTraps.add(traps[0]!);
    }
    expect(seenTraps.size).toBe(28);
  });
});
