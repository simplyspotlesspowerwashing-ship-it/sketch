import { describe, expect, it } from 'vitest';
import { PACKS } from '../src/content/index.ts';
import { DRAWN, NAMES, ODDBALLS } from '../src/ui/art.tsx';

describe('the cast', () => {
  for (const pack of PACKS) {
    const who = [...new Set([...pack.cards, ...pack.campaign].map((c) => c.who))];
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
});
