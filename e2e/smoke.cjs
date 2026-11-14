// Smoke test: plays from today (plus an optional day offset) to election night in a real browser.
//   npm run build && npx vite preview --port 4173 &   then   node e2e/smoke.cjs <screenshot-dir> [dayOffset]
// dayOffset 2 on a Saturday starts on Monday, so the whole week is played.
const { chromium } = require('playwright');
(async () => {
  const out = process.argv[2];
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
  const pg = await ctx.newPage();
  const errs = []; pg.on('pageerror', e => errs.push(String(e))); pg.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  await ctx.addInitScript((off) => { if (!localStorage.getItem('badtown.save')) localStorage.setItem('badtown.save', JSON.stringify({ schema: 1, state: null, playerSeed: 'smoke', muted: true, introSeen: '', tutorialDone: false, dayOffset: off })); }, Number(process.argv[3] ?? 0));
  await pg.goto(process.env.URL ?? 'http://localhost:4173/');
  await pg.waitForSelector('.sheet');
  const click = async (sel) => { await pg.locator(sel).first().click(); };
  let decisions = 0, shots = 0, recalls = 0, setupShot = false;
  for (let guard = 0; guard < 400; guard++) {
    if (await pg.locator('.election').count()) break;
    if (await pg.locator('#mayor-name').count()) { if (!setupShot) { await pg.screenshot({ path: out + '/0-setup.png' }); setupShot = true; } await click('.sheet .btn.primary'); continue; }
    if (await pg.locator('.sheet.recall').count()) { await click('.sheet.recall .btn.primary'); recalls++; continue; }
    if (await pg.locator('.sheet .btn.primary').count() && !(await pg.locator('.sheet .option').count())) { await click('.sheet .btn.primary'); continue; }
    if (await pg.locator('.sheet .option:not([disabled])').count()) {       // event / campaign / open card
      if (shots === 1) { await pg.screenshot({ path: out + '/3-card.png' }); shots++; }
      const opts = pg.locator('.sheet .option:not([disabled])');
      await opts.nth(guard % (await opts.count())).click(); decisions++;
      if (shots === 2) { await pg.waitForTimeout(100); await pg.screenshot({ path: out + '/4-result.png' }); shots++; }
      continue;
    }
    if (await pg.locator('.sheet .btn.dave').count()) { await click('.sheet .btn.dave'); decisions++; continue; }
    if (await pg.locator('.sheet .close').count()) { await click('.sheet .close'); continue; }
    if (await pg.locator('.desk').count()) {
      if (shots === 0) { await pg.screenshot({ path: out + '/2-desk.png' }); shots++; }
      const open = pg.locator('.paper:not([disabled])');
      const pips = await pg.locator('.pips i.on').count();
      if (await open.count() && pips > 0) { await open.first().click(); continue; }
      const end = pg.locator('.desk-foot .btn.primary'); await end.click();
      continue;
    }
    if (await pg.locator('.promise-row').count()) { await click('.promise-row .option:not([disabled])'); continue; }
    if (await pg.locator('.poll').count()) { if (shots === 4) { await pg.screenshot({ path: out + '/6-poll.png' }); shots++; } await click('.poll .btn.primary'); continue; }
    if (await pg.locator('.panel .bugle').count()) { if (shots === 3) { await pg.screenshot({ path: out + '/5-report.png' }); shots++; } await click('.panel .btn.primary'); continue; }
    await pg.waitForTimeout(50);
  }
  await pg.waitForSelector('.verdict', { timeout: 15000 });
  await pg.screenshot({ path: out + '/7-election.png', fullPage: true });
  const overflow = await pg.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  console.log('decisions', decisions, 'recalls', recalls, 'overflow', overflow, 'errors', errs.slice(0, 5));
  console.log(await pg.locator('.share').first().textContent());
  await b.close();
})();
