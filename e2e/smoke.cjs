// Smoke test: plays from today (plus an optional day offset) to election night in a real browser,
// swiping by dragging the card. Takes screenshots along the way.
//   npm run build && npx vite preview --port 4173 &   then   node e2e/smoke.cjs <screenshot-dir> [dayOffset] [width]
const { chromium } = require('playwright');
(async () => {
  const [out, off = '0', width = '390'] = process.argv.slice(2);
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: Number(width), height: Number(width) > 800 ? 900 : 844 }, deviceScaleFactor: 2, reducedMotion: process.env.MOTION ? 'no-preference' : 'reduce' });
  await ctx.addInitScript((o) => { if (!localStorage.getItem('badtown.save')) localStorage.setItem('badtown.save', JSON.stringify({ schema: 1, state: null, playerSeed: 'smoke', muted: true, introSeen: '', tutorialDone: false, dayOffset: o, scrapbook: [], career: { terms: 0, wins: 0, best: 0, weeks: [] }, deeds: [] })); }, Number(off));
  const pg = await ctx.newPage();
  const errs = []; pg.on('pageerror', (e) => errs.push(String(e)));
  await pg.goto(process.env.URL ?? 'http://localhost:4173/');
  let swipes = 0, days = 0, recalls = 0, reveals = 0, sneaks = { ok: 0, caught: 0 }, shots = new Set();
  const shot = async (name) => { if (!shots.has(name)) { shots.add(name); await pg.screenshot({ path: `${out}/${name}.png` }); } };
  for (let i = 0; i < 2000; i++) {
    if (await pg.locator('.election .verdict').count()) break;
    if (await pg.locator('.sheet.op').count()) { await shot('opening'); if (await pg.locator('.op-oath input').count()) await pg.locator('.op-oath input').check(); await pg.locator('.op .btn.primary').click(); continue; }
    if (await pg.locator('#mayor-name').count()) { await shot('setup'); await pg.locator('.sheet .btn.primary').click(); continue; }
    if (await pg.locator('.sheet .bugle').count()) { await shot('morning'); await pg.locator('.sheet .btn.primary').click(); continue; }
    if (await pg.locator('.panel.recall').count()) { recalls++; await shot('recall'); await pg.locator('.panel.recall .btn.primary').click(); continue; }
    if (await pg.locator('.review').count()) { days++; await shot('review'); await pg.locator('.review .btn.primary').click(); continue; }
    if (await pg.locator('.card.result').count()) {
      reveals++;
      if (reveals === 3) { await pg.waitForTimeout(500); await shot('reveal'); if (await pg.locator('.edge-chip.flip').count()) { await pg.locator('.edge-chip.flip').click(); await pg.waitForTimeout(process.env.MOTION ? 2500 : 300); await shot('scene'); } }
      await pg.locator('.edge-chip.next').click({ timeout: 1500 }).catch(() => {});
      continue;
    }
    if (await pg.locator('.card.sneak').count()) {
      await shot('sneak');
      const btn = pg.locator('.sneak-btn'); const bb = await btn.boundingBox();
      await pg.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await pg.mouse.down();
      await pg.waitForTimeout(850);
      for (let k = 0; k < 40 && !(await pg.locator('.card.sneak.away').count()); k++) await pg.waitForTimeout(25);
      await pg.mouse.up();
      await pg.waitForTimeout(150);
      const tag = await pg.locator('.sneak-tag').textContent().catch(() => '');
      if (/GOT AWAY/.test(tag)) sneaks.ok++; else if (/CAUGHT/.test(tag)) sneaks.caught++;
      await pg.waitForSelector('.card.sneak', { state: 'detached', timeout: 4000 }).catch(() => {});
      continue;
    }
    if (await pg.locator('.card:not(.result)').count()) {
      if (swipes === 0) await shot('card');
      const card = await pg.locator('.card:not(.result)').boundingBox();
      const dirs = await pg.locator('.edge-chip').evaluateAll((els) => els.map((e) => [...e.classList].find((c) => ['left', 'right', 'up', 'down'].includes(c))));
      const d = dirs[(swipes * 7 + 3) % dirs.length];
      const [dx, dy] = { left: [-160, 0], right: [160, 0], up: [0, -160], down: [0, 160] }[d];
      const cx = card.x + card.width / 2, cy = card.y + card.height / 2;
      await pg.mouse.move(cx, cy); await pg.mouse.down();
      await pg.mouse.move(cx + dx / 2, cy + dy / 2, { steps: 4 });
      if (swipes === 2) await shot('drag');
      await pg.mouse.move(cx + dx, cy + dy, { steps: 4 }); await pg.mouse.up();
      swipes++;
      await pg.waitForTimeout(80);
      continue;
    }
    await pg.waitForTimeout(60);
  }
  await pg.waitForSelector('.election .verdict', { timeout: 15000 }).catch(async (e) => { await pg.screenshot({ path: `${out}/stuck.png` }); const st = await pg.evaluate(() => JSON.parse(localStorage.getItem('badtown.save')).state); console.log('stuck errs', errs.slice(0, 3), swipes, st.day, st.phase, st.cardInDay, st.current); throw e; });
  await pg.screenshot({ path: `${out}/election.png`, fullPage: true });
  const st = await pg.evaluate(() => JSON.parse(localStorage.getItem('badtown.save')).state);
  const per = {}; for (const w of st.swipes) per[w.day] = (per[w.day] ?? 0) + 1;
  console.log('cards per day', JSON.stringify(per), 'recalled days', JSON.stringify(st.recalledDays), 'dave days', JSON.stringify(st.daveDays));
  const overflow = await pg.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  console.log('swipes', swipes, 'reveals', reveals, 'sneaks', JSON.stringify(sneaks), 'days reviewed', days, 'recalls', recalls, 'overflow', overflow, 'errors', errs.slice(0, 5));
  console.log(await pg.locator('.share').textContent());
  await b.close();
})();
