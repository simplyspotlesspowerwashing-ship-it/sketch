import { AH_ENDINGS } from '../src/content/afterHours.ts';
import { describe, expect, it } from 'vitest';
import { PACKS } from '../src/content/index.ts';
import { DRAWN, NAMES, ODDBALLS } from '../src/ui/art.tsx';
import { COMMON_ENDINGS } from '../src/content/endings.ts';
import { RANDY_SAYS } from '../src/content/randy.ts';

describe('the cast', () => {
  for (const pack of PACKS) {
    const who = [...new Set(pack.cards.map((c) => c.who))];
    it(`${pack.id}: everyone who appears has a portrait, and a name`, () => {
      for (const w of who) {
        expect(DRAWN(w), `${w} portrait`).toBe(true);
        expect(NAMES[w], `${w} name`).toBeTruthy();
        
      }
    });
  }
  it('every oddball has a portrait and a name', () => {
    for (const w of ODDBALLS) { expect(DRAWN(w), w).toBe(true); expect(NAMES[w], w).toBeTruthy(); }
  });
  it('Randy has something to say about every ending', () => {
    for (const k of Object.keys(COMMON_ENDINGS)) expect(RANDY_SAYS[k], k).toBeTruthy();
    for (const p of PACKS) for (const k of Object.keys(p.endings)) expect(RANDY_SAYS[`${k}@${p.id}`] ?? RANDY_SAYS[k], `${p.id} ${k}`).toBeTruthy();
    for (const k of Object.keys(AH_ENDINGS)) expect(RANDY_SAYS[k], k).toBeTruthy();
    for (const [k, v] of Object.entries(RANDY_SAYS)) expect(v.length, k).toBeLessThanOrEqual(100);
  });
});

describe('faction faces', () => {
  const FACE: Record<string, string> = { pam: 'people', chad: 'business', barb: 'law', marge: 'press', doug: 'treasury' };
  const ASK = /\b(I'd like|I would like|Can I|May I|We want|we'd like|The PTA would like|The PTA wants|The Bugle wants|The Bugle would like|Readers want)\b/i;
  it('granting a face\'s own request makes their group happier; refusing never does', async () => {
    const { AH_CARDS } = await import('../src/content/afterHours.ts');
    const cards = [...PACKS.flatMap((p) => p.cards), ...AH_CARDS];
    let n = 0;
    for (const c of cards) {
      const g = FACE[c.who];
      if (!g || !ASK.test(c.text) || !c.options.right || !c.options.left || c.sneak || c.ribbon) continue;
      n++;
      expect(c.options.right.effects?.[g as 'people'] ?? 0, `${c.id} yes`).toBeGreaterThan(0);
      expect(c.options.left.effects?.[g as 'people'] ?? 0, `${c.id} no`).toBeLessThanOrEqual(0);
    }
    expect(n).toBeGreaterThan(20);
  });
});
