// Balance simulator: plays whole terms headlessly with each bot and writes a report.
//   npm run sim -- [terms=5000] [out=reports/balance.md]
import { writeFileSync } from 'node:fs';
import { week1Content } from '../src/content/index.ts';
import { autoplay, findCard, newTerm } from '../src/engine/engine.ts';
import { TUNING } from '../src/engine/tuning.ts';
import type { Content } from '../src/engine/types.ts';
import { POLICIES } from './bots.ts';

const N = Number(process.argv[2] ?? 5000);
const OUT = process.argv[3] ?? 'reports/balance.md';
const content: Content = week1Content;
const pct = (n: number, d: number) => (d ? ((100 * n) / d).toFixed(1) + '%' : '-');
const q = (sorted: number[], p: number) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))]!;

const TARGETS: Record<string, [number, number]> = { sensible: [55, 65], random: [0, 15], 'dave-only': [5, 10] };
type CardStat = { seen: number; options: number[]; ignored: number; dave: number };

const lines: string[] = [];
const summary: string[] = [];
const seenEver = new Set<string>();
const flags: string[] = [];

for (const [name, policy] of Object.entries(POLICIES)) {
  let wins = 0, recalled = 0, bankrupt = 0, early = 0, shareSum = 0;
  const money: number[] = [], shares: number[] = [];
  const cards = new Map<string, CardStat>();
  const projects = new Map<string, number>();
  for (let i = 0; i < N; i++) {
    const end = autoplay(newTerm(content.pack.id, `${name}-${i}`, content), policy, content, () => false);
    const r = end.result!;
    wins += r.won ? 1 : 0;
    recalled += end.recalls > 0 ? 1 : 0;
    bankrupt += end.flags.wentBankrupt ? 1 : 0;
    early += r.endedEarly ? 1 : 0;
    shareSum += r.share;
    shares.push(r.share);
    money.push(end.money);
    for (const p of end.projects) projects.set(p.id, (projects.get(p.id) ?? 0) + 1);
    for (const id of end.usedCards) seenEver.add(id);
    for (const h of end.history) {
      const card = findCard(content, h.cardId);
      const st = cards.get(h.cardId) ?? { seen: 0, options: card.options.map(() => 0), ignored: 0, dave: 0 };
      st.seen += 1;
      if (h.choice === 'ignored') st.ignored += 1;
      else if (h.choice === 'dave') st.dave += 1;
      else st.options[h.choice]! += 1;
      cards.set(h.cardId, st);
    }
  }
  money.sort((a, b) => a - b);
  shares.sort((a, b) => a - b);
  const win = (100 * wins) / N;
  const t = TARGETS[name];
  const verdict = t ? (win >= t[0] && win <= t[1] ? 'on target' : `**off target** (${t[0]}-${t[1]}%)`) : '';
  summary.push(`| ${name} | ${win.toFixed(1)}% | ${verdict} | ${(shareSum / N).toFixed(1)} | ${q(shares, 0.1)} / ${q(shares, 0.5)} / ${q(shares, 0.9)} | ${pct(recalled, N)} | ${pct(bankrupt, N)} | ${pct(early, N)} | ${q(money, 0.1)} / ${q(money, 0.5)} / ${q(money, 0.9)} |`);

  lines.push(`\n## ${name}\n`);
  lines.push(`Projects built (share of terms): ${[...projects].sort((a, b) => b[1] - a[1]).map(([id, n]) => `${id} ${pct(n, N)}`).join(', ') || 'none'}\n`);
  lines.push('| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |', '|---|---|---|---|---|');
  for (const [id, st] of [...cards].sort((a, b) => a[0].localeCompare(b[0]))) {
    const card = findCard(content, id);
    const handled = st.options.reduce((a, b) => a + b, 0);
    lines.push(`| ${id} | ${st.seen} | ${card.options.map((o, i) => `${o.label}: ${pct(st.options[i]!, handled)}`).join(' · ')} | ${pct(st.ignored, st.seen)} | ${pct(st.dave, st.seen)} |`);
    if (name === 'sensible' && handled >= 50 && card.options.length > 1) {
      card.options.forEach((o, i) => {
        const share = st.options[i]! / handled;
        if (share > 0.85) flags.push(`\`${id}\`: "${o.label}" chosen ${(share * 100).toFixed(0)}% of the time (over 85%)`);
        if (share < 0.05) flags.push(`\`${id}\`: "${o.label}" chosen ${(share * 100).toFixed(0)}% of the time (under 5%)`);
      });
    }
  }
  if (name === 'sensible') {
    const top = [...projects].sort((a, b) => b[1] - a[1])[0];
    if (top && top[1] / N > 0.9) flags.push(`project \`${top[0]}\` is built in ${pct(top[1], N)} of sensible terms (possible dominant project)`);
    const rr = (100 * recalled) / N;
    summary.push(`| | | recalls ${rr < 25 ? 'on target' : '**off target**'} (under 25%) | | | | | | |`);
  }
}

const all = [...content.pack.cards, ...content.pack.events, ...content.pack.campaign].map((c) => c.id);
const unreachable = all.filter((id) => !seenEver.has(id) && !content.pack.events.some((e) => e.id === id) && !content.pack.campaign.some((e) => e.id === id));

const report = [
  `# Balance report: pack \`${content.pack.id}\``,
  '',
  `${N} terms per policy. Tuning: ${JSON.stringify(TUNING.vote)}.`,
  '',
  '| Policy | Win rate | Target | Mean vote | Vote p10 / p50 / p90 | Recalled | Bankrupt | Term ended early | Ending money $k p10 / p50 / p90 |',
  '|---|---|---|---|---|---|---|---|---|',
  ...summary,
  '',
  '## Non-dilemmas and other flags (sensible bot)',
  '',
  ...(flags.length ? flags.map((f) => `- ${f}`) : ['None.']),
  '',
  '## Unreachable desk cards (never drawn by any policy)',
  '',
  ...(unreachable.length ? unreachable.map((f) => `- \`${f}\``) : ['None.']),
  ...lines,
  '',
].join('\n');
writeFileSync(OUT, report);
console.log(report.split('\n## random')[0]);
