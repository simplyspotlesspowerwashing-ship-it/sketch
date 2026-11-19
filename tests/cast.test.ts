import { describe, expect, it } from 'vitest';
import { PACKS } from '../src/content/index.ts';
import { BIOS, DRAWN, NAMES } from '../src/ui/art.tsx';

describe('the cast', () => {
  for (const pack of PACKS) {
    const who = [...new Set([...pack.cards, ...pack.campaign].map((c) => c.who))];
    it(`${pack.id}: everyone who appears has a portrait, a name and (except your desk) an introduction`, () => {
      for (const w of who) {
        expect(DRAWN(w), `${w} portrait`).toBe(true);
        expect(NAMES[w], `${w} name`).toBeTruthy();
        if (w !== 'desk' && w !== 'mayor') expect(BIOS[w], `${w} bio`).toBeTruthy();
      }
    });
  }
  it('introductions are short enough to fit on a card', () => {
    for (const [w, b] of Object.entries(BIOS)) expect(b.length, w).toBeLessThanOrEqual(100);
  });
});
