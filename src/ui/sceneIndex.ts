// Which scene plays for which choice. Scripted scenes come from the pack's .scenes.txt; a choice
// without one gets a plain stand-in (the character, the mayor, a YES or NO stamp and the choice on a sign).
import scenesSrc from '../content/packs/week1.scenes.txt?raw';
import { parseScene } from './scenes.tsx';
import type { Scene } from './scenes.tsx';

export const SCRIPTS: Record<string, string> = {};
for (const block of scenesSrc.split(/^== /m).slice(1)) {
  const nl = block.indexOf('\n');
  const [key, set] = block.slice(0, nl).trim().split(/\s+/);
  SCRIPTS[key!] = `${set ?? 'office'}\n${block.slice(nl + 1)}`;
}
const REFUSAL = /^(no\b|refuse|ban\b|decline|reject|absolutely not|hands off|evict|cancel|deny|not |veto|shut|ignore|leave |one .* is plenty|.*(isn't|aren't|not) for sale)/i;

export function sceneFor(cardId: string, dir: string, who: string, label: string, good: boolean): Scene {
  const scripted = SCRIPTS[`${cardId}.${dir}`];
  if (scripted) return parseScene(scripted);
  const actor = who === 'desk' ? 'randy' : who;
  const sign = label.replace(/"/g, "'").toUpperCase();
  return parseScene(REFUSAL.test(label) || !good
    ? `office\n${actor}@78; mayor@16\nmayor:point\nfx:stampNO@50,44\nsign"${sign}"@50,62*.7; ${actor}:shock\n${actor}:angry; fx:anger@78,34\n${actor}>125`
    : `office\n${actor}@78; mayor@16\nmayor:point\nfx:stampOK@50,44\nsign"${sign}"@50,62*.7; fx:sparkle@50,40\n${actor}:cheer\nfx:confetti`);
}
