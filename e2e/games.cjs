// Plays each of the seven mini-games for real with a simple bot, to check that a clean result is
// reachable, that the game ends on time, and to take a mid-game screenshot.
//   node e2e/games.cjs <url> <screenshot-dir> [idle]     ("idle" = no input, to check the flop path)
const { chromium } = require('playwright');
const CARDS = { catch: 'goosePond', dodge: 'helicopter', whack: 'raccoonBins', match: 'buglePress', stack: 'newSchool', simon: 'tvStation', tug: 'bearStory' };
(async () => {
  const [url, out, mode] = process.argv.slice(2);
  const b = await chromium.launch();
  const pg = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
  const errs = []; pg.on('pageerror', (e) => errs.push(String(e)));
  await pg.goto(url);
  for (const [type, cardId] of Object.entries(CARDS)) {
    await pg.evaluate((cardId) => {
      const sv = JSON.parse(localStorage.getItem('badtown.save')); const s = sv.state;
      s.phase = 'desk'; s.duePromises = []; s.decreeOffer = []; s.money = 300; s.projects = []; s.favors = 2;
      s.desk = [{ cardId, status: 'open' }];
      sv.introSeen = s.weekId + ':' + s.day; sv.muted = true; sv.tutorialDone = true;
      localStorage.setItem('badtown.save', JSON.stringify(sv));
    }, cardId);
    await pg.reload();
    await pg.locator('.paper').first().click();
    if (type === 'catch') await pg.screenshot({ path: out + '/card.png' });
    await pg.locator('.sheet .option:not([disabled])').first().click();
    await pg.waitForSelector('.clip'); await pg.waitForTimeout(900);
    if (type === 'catch') await pg.screenshot({ path: out + '/clip.png' });
    await pg.waitForSelector('.mg .btn.primary', { timeout: 6000 });
    await pg.locator('.mg .btn.primary').click();
    const t0 = Date.now();
    await pg.waitForSelector('.mg-hud', { timeout: 6000 });
    let shot = false, peek = null, seq = [], lastLit = -1, entered = 0;
    while (!(await pg.locator('.mg-result').count()) && Date.now() - t0 < 50000) {
      if (!shot && Date.now() - t0 > 7000) { await pg.screenshot({ path: `${out}/${type}.png` }); shot = true; }
      if (mode === 'idle') { await pg.waitForTimeout(100); continue; }
      if (type === 'catch') {
        const box = await pg.locator('.mg-arena').boundingBox({ timeout: 500 }).catch(() => null);
        const x = await pg.evaluate(() => { let best = null; for (const e of document.querySelectorAll('.mg-ent:not(.bad)')) { const y = parseFloat(e.style.top); if (y < 92 && (!best || y > best.y)) best = { y, x: parseFloat(e.style.left) }; } return best ? best.x : null; });
        if (x !== null && box) await pg.mouse.move(box.x + (x / 100) * box.width, box.y + box.height * 0.8);
      } else if (type === 'dodge') {
        const lane = await pg.evaluate(() => { const danger = [0, 0, 0]; for (const e of document.querySelectorAll('.mg-ent:not(.me)')) { const y = parseFloat(e.style.top); if (y > 30 && y < 95) danger[Math.round((parseFloat(e.style.left) - 16.67) / 33.34)] += y; } return danger.indexOf(Math.min(...danger)); });
        await pg.locator('.mg-lane').nth(lane).dispatchEvent('pointerdown');
      } else if (type === 'whack') {
        const el = pg.locator('.mg-hole.up.good').first(); if (await el.count()) await el.dispatchEvent('pointerdown').catch(() => {});
      } else if (type === 'match') {
        const labels = await pg.locator('.mg-card').evaluateAll((els) => els.map((e) => e.getAttribute('aria-label')));
        if (!peek && labels.every((l) => l !== 'Face-down card')) peek = labels;
        if (peek && labels.some((l) => l === 'Face-down card')) {
          const found = await pg.locator('.mg-card').evaluateAll((els) => els.map((e) => e.classList.contains('found')));
          const i = found.findIndex((f) => !f); const j = peek.findIndex((l, k) => k !== i && l === peek[i] && !found[k]);
          if (i >= 0 && j >= 0) { await pg.locator('.mg-card').nth(i).dispatchEvent('pointerdown'); await pg.waitForTimeout(350); await pg.locator('.mg-card').nth(j).dispatchEvent('pointerdown'); await pg.waitForTimeout(350); }
        }
      } else if (type === 'stack') {
        const ok = await pg.evaluate(() => { const live = document.querySelector('.mg-block.live'); const all = [...document.querySelectorAll('.mg-block:not(.live)')]; if (!live || !all.length) return false; const top = all[all.length - 1]; return Math.abs(parseFloat(live.style.left) - parseFloat(top.style.left)) < 3.5; });
        if (ok) { await pg.locator('.mg-arena').dispatchEvent('pointerdown'); await pg.waitForTimeout(120); }
      } else if (type === 'simon') {
        const st = await pg.evaluate(() => ({ lit: [...document.querySelectorAll('.mg-padbtn')].findIndex((e) => e.classList.contains('lit')), watching: document.querySelector('.mg-padbtn').disabled }));
        if (st.watching) { if (st.lit !== lastLit) { if (st.lit >= 0) seq.push(st.lit); lastLit = st.lit; } entered = 0; }
        else if (entered < seq.length) { await pg.locator('.mg-padbtn').nth(seq[entered]).dispatchEvent('pointerdown'); entered++; await pg.waitForTimeout(150); if (entered === seq.length) { seq = []; lastLit = -1; await pg.waitForTimeout(250); } }
      } else if (type === 'tug') {
        if (await pg.locator('.mg-big.go').count()) await pg.locator('.mg-big').dispatchEvent('pointerdown').catch(() => {});
      }
      await pg.waitForTimeout(type === 'simon' ? 25 : 45);
    }
    const res = await pg.locator('.mg-result').count() ? await pg.locator('.mg-result').textContent() : 'DID NOT END';
    console.log(type.padEnd(6), '->', res.padEnd(18), ((Date.now() - t0) / 1000).toFixed(1) + 's');
    await pg.waitForSelector('.result .btn.primary', { timeout: 5000 });
    if (type === 'catch') await pg.screenshot({ path: out + '/result.png' });
    await pg.locator('.result .btn.primary').click();
  }
  console.log('errors', errs);
  await b.close();
})();
