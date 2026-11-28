// After Hours check: play Day 1, open After Hours from the night's review, play its ten cards, then confirm
// it can't be replayed tonight and that its net change is waiting for tomorrow.
//   node e2e/afterhours.cjs <screenshot-dir> <dir: left|right> [width] [lost]   (starts from a Day 1 review made by e2e/won-night.ts)
const { chromium } = require('playwright');
(async () => {
  const [out, side = 'left', width = '390', mode = 'won'] = process.argv.slice(2);
  const seed = require('child_process').execFileSync('node', [require('path').join(__dirname, 'won-night.ts'), mode]).toString();
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: Number(width), height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await ctx.addInitScript((sv) => { if (!localStorage.getItem('badtown.save')) localStorage.setItem('badtown.save', sv); }, seed);
  const pg = await ctx.newPage();
  const errs = []; pg.on('pageerror', (e) => errs.push(String(e)));
  await pg.goto(process.env.URL ?? 'http://localhost:4173/');
  const save = () => pg.evaluate(() => JSON.parse(localStorage.getItem('badtown.save')));
  const drag = async (d) => {
    const card = await pg.locator('.card:not(.result)').first().boundingBox();
    const cx = card.x + card.width / 2, cy = card.y + card.height / 2, dx = d === 'left' ? -160 : 160;
    await pg.mouse.move(cx, cy); await pg.mouse.down(); await pg.mouse.move(cx + dx, cy, { steps: 6 }); await pg.mouse.up(); await pg.waitForTimeout(80);
  };
  const AH = require('../src/content/afterhours.json');
  const answerFor = (law) => AH.cards.find((c) => c.riddle && c.riddle.law === law)?.riddle.answers[0];
  let riddles = 0, solved = 0, sneaks = 0;
  const step = async (d, inAH) => {
    if (inAH && await pg.locator('.riddle-card').count()) {
      riddles++;
      if (riddles === 1) await pg.screenshot({ path: `${out}/ah-riddle.png` });
      const law = await pg.locator('.riddle-law').textContent();
      if (d === 'right') { await pg.locator('.riddle-form input').fill('wrong guess'); await pg.locator('.riddle-form button').click(); await pg.waitForTimeout(100); await pg.locator('.riddle-form input').fill(`The ${answerFor(law).toUpperCase()}`); await pg.locator('.riddle-form button').click(); solved++; }
      else await pg.locator('.riddle-foot .linkbtn').click();
      await pg.waitForTimeout(150); return;
    }
    if (inAH && await pg.locator('.card.sneak').count() && !(await pg.locator('.card.result').count())) {
      sneaks++;
      const btn = pg.locator('.sneak-btn'); const bb = await btn.boundingBox();
      await pg.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await pg.mouse.down(); await pg.waitForTimeout(850);
      for (let k = 0; k < 40 && !(await pg.locator('.card.sneak.away').count()); k++) await pg.waitForTimeout(25);
      await pg.mouse.up(); await pg.waitForSelector('.card.sneak', { state: 'detached', timeout: 4000 }).catch(() => {}); return;
    }
    if (await pg.locator('.sheet.op').count()) { if (await pg.locator('.op-oath input').count()) await pg.locator('.op-oath input').check(); await pg.locator('.op .btn.primary').click(); return; }
    if (await pg.locator('#mayor-name').count() || await pg.locator('.sheet .bugle').count()) { await pg.locator('.sheet .btn.primary').click(); return; }
    if (!inAH && await pg.locator('.panel.recall').count()) { await pg.locator('.panel.recall .btn.primary').click(); return; }
    if (await pg.locator('.card.result').count()) { await pg.locator('.edge-chip.next').click({ timeout: 1500 }).catch(() => {}); return; }
    if (await pg.locator('.card.cutcard').count()) { await pg.locator('.ribbon-btn').click().catch(() => {}); await pg.waitForTimeout(150); return; }
    if (await pg.locator('.card.sneak').count()) { await pg.waitForTimeout(100); await pg.locator('.sneak-btn').click().catch(() => {}); await pg.waitForTimeout(200); return; }
    if (await pg.locator('.card:not(.result)').count()) { await drag(d); return; }
    await pg.waitForTimeout(60);
  };
  let n = 0;
  for (let i = 0; i < 600 && !(await pg.locator('.review.dayend').count()); i++) await step(n++ % 3 ? 'left' : 'right', false);
  await pg.screenshot({ path: `${out}/ah-review.png` });
  const before = (await save()).state;
  console.log('day', before.day, 'phase', before.phase, 'meters', JSON.stringify(before.meters), 'reset', !!before.flags.__reset);
  if (mode === 'lost') { console.log('lost night: buttons', await pg.locator('.ah-btn').count(), '| note:', await pg.locator('.ah-why').textContent()); await b.close(); return; }
  console.log('button:', await pg.locator('.ah-btn').textContent());
  await pg.locator('.ah-btn').click();
  let shown = 0;
  for (let i = 0; i < 400; i++) {
    if (await pg.locator('.ah-done, .afterhours .panel.recall').count()) break;
    if (await pg.locator('.afterhours .card:not(.result)').count() && !(await pg.locator('.card.result').count())) { shown++; if (shown === 1) await pg.screenshot({ path: `${out}/ah-card.png` }); }
    await step(side, true);
  }
  await pg.screenshot({ path: `${out}/ah-end-${side}.png`, fullPage: true });
  const endTxt = (await pg.locator('.afterhours .panel').first().textContent()).slice(0, 220);
  console.log('cards dragged', shown, 'riddles', riddles, 'solved', solved, 'sneaks', sneaks, '| end:', endTxt);
  const mid = await save();
  console.log('overnight', JSON.stringify(mid.state.overnight), 'afterDoneOn', mid.afterDoneOn, 'new endings', mid.scrapbook.filter((k) => k.includes('ah_')));
  await pg.locator('.afterhours .btn.primary').click();
  console.log('after back, button:', await pg.locator('.ah-btn').textContent(), 'disabled', await pg.locator('.ah-btn').isDisabled());
  await pg.reload(); await pg.waitForTimeout(400);
  console.log('after reload, button:', await pg.locator('.ah-btn').textContent(), 'disabled', await pg.locator('.ah-btn').isDisabled());
  // tomorrow: testing skip
  if (await pg.locator('.review .linkbtn').count()) { await pg.locator('.review .linkbtn').click(); await pg.waitForTimeout(200); }
  await pg.locator('.review .btn.primary').click(); await pg.waitForTimeout(300);
  const next = (await save()).state;
  const base = { ...before.meters };
  const want = Object.fromEntries(Object.keys(base).map((k) => [k, Math.min(90, Math.max(10, base[k] + ((mid.state.overnight ?? {})[k] ?? 0)))]));
  const ok = Object.keys(want).every((k) => (mid.state.overnight?.[k] ? want[k] : base[k]) === next.dayStart[k]);
  console.log('day', next.day, 'dayStart', JSON.stringify(next.dayStart), 'expected', JSON.stringify(want), ok ? 'MATCH' : 'MISMATCH', 'overnight cleared', next.overnight === undefined);
  const overflow = await pg.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  console.log('overflow', overflow, 'errors', errs.slice(0, 5));
  await b.close();
})();
