// Which scene plays for which choice. Scripted scenes come from the pack's .scenes.txt.
import scenesSrc from '../content/packs/week1.scenes.txt?raw';
import { parseScene } from './scenes.tsx';
import type { Scene } from './scenes.tsx';

export const SCRIPTS: Record<string, string> = {};
for (const block of scenesSrc.split(/^== /m).slice(1)) {
  const nl = block.indexOf('\n');
  const [key, set] = block.slice(0, nl).trim().split(/\s+/);
  SCRIPTS[key!] = `${set ?? 'office'}\n${block.slice(nl + 1)}`;
}
/** The scripted scene for a choice, or null if nobody has written one yet. */
export function sceneFor(cardId: string, dir: string): Scene | null {
  const scripted = SCRIPTS[`${cardId}.${dir}`];
  return scripted ? parseScene(scripted) : null;
}
