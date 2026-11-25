// Card supply: does every week fill seven full days without showing a player the same card twice?
//   npm run supply
import { PACKS } from '../src/content/index.ts';
import { autoplay, davePolicy, newTerm } from '../src/engine/engine.ts';
for (const pack of PACKS) {
  let repeats = 0, weeks = 0, worst = 0;
  for (const wk of ['2026-11-16', '2026-12-14', '2027-01-11']) for (let i = 0; i < 60; i++) {
    const e = autoplay(newTerm(wk, `s${i}`, pack), davePolicy, pack, () => false); weeks++;
    const ids = e.swipes.filter((w) => !pack.cards.find((c) => c.id === w.cardId)!.repeat).map((w) => w.cardId);
    const r = ids.length - new Set(ids).size; repeats += r; worst = Math.max(worst, r);
  }
  console.log(pack.id, 'repeated cards per full week:', (repeats / weeks).toFixed(2), 'worst week:', worst);
}
import { findCard } from '../src/engine/engine.ts';
for (const pack of PACKS) {
  const pool = pack.cards.filter((c) => !c.day && !c.followUp && !c.repeat && !c.sneak && !c.ribbon);
  const e = autoplay(newTerm('2026-11-16', 'x', pack), davePolicy, pack, () => false);
  const used = new Set(e.swipes.map((w) => w.cardId).filter((id) => pool.some((c) => c.id === id)));
  const kinds: Record<string, number> = {};
  for (const w of e.swipes) { const c = findCard(pack, w.cardId); const k = c.day ? 'pinned' : c.followUp ? 'follow' : c.repeat ? 'pressure' : 'pool'; kinds[k] = (kinds[k] ?? 0) + 1; }
  console.log(pack.id, 'pool starters', pool.length, 'distinct used in a full week', used.size, JSON.stringify(kinds));
}
