import { describe, expect, it } from 'vitest';
import { week1Pack as pack } from '../src/content/index.ts';
import { SCRIPTS, sceneFor } from '../src/ui/sceneIndex.ts';
import { lintScene } from '../src/ui/scenes.tsx';

describe('scenes', () => {
  it('every scripted scene belongs to a real choice', () => {
    for (const key of Object.keys(SCRIPTS)) {
      const [id, dir] = key.split('.');
      const card = pack.cards.find((c) => c.id === id);
      expect(card, `card for ${key}`).toBeTruthy();
      expect(card!.options[dir as 'left'], `option ${key}`).toBeTruthy();
    }
  });
  it('every script reads cleanly: known commands, drawn props, real characters, 5 to 7 beats', () => {
    for (const [key, src] of Object.entries(SCRIPTS)) expect(lintScene(src), key).toEqual([]);
  });
  it('a choice without a script still gets a readable stand-in', () => {
    const s = sceneFor('nope', 'left', 'doug', 'No "thanks"', false);
    expect(s.beats.length).toBeGreaterThanOrEqual(5);
    expect(lintScene(`office\n${s.beats.map((b) => b.join('; ')).join('\n')}`)).toEqual([]);
  });
});
