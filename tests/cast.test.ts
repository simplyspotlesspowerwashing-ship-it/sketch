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
    for (const [k, v] of Object.entries(RANDY_SAYS)) expect(v.length, k).toBeLessThanOrEqual(100);
  });
});
