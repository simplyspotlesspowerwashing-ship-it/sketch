// Plays each of the seven mini-games for real with a simple bot, to check that a clean result is
// reachable, that the game ends on time, and to take a mid-game screenshot.
//   node e2e/games.cjs <url> <screenshot-dir> [idle]     ("idle" = no input, to check the flop path)
const { chromium } = require('playwright');
const CARDS = { catch: 'parkingMeters', dodge: 'mallParking', whack: 'curfew', match: 'buglePress', stack: 'newSchool', simon: 'tvStation', tug: 'bearStory', flap: 'helicopter', jump: 'pothole', snake: 'goosePond', slice: 'cheeseVault', invaders: 'raccoonBins', breakout: 'clockWizard', rhythm: 'karaoke', cross: 'zebra', sort: 'recycling' };
const only = process.env.ONLY ? process.env.ONLY.split(',') : null;
(async () => {
  const [url, out, mode] = process.argv.slice(2);
  const b = await chromium.launch();
  const pg = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 })).newPage();
  const errs = []; pg.on('pageerror', (e) => errs.push(String(e)));
  await pg.goto(url);
  for (const [type, cardId] of Object.entries(CARDS)) {
    if (only && !only.includes(type)) continue;
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
    await pg.waitForSelector('.clip'); await pg.waitForTimeout(1900);
    if (type === 'snake') await pg.screenshot({ path: out + '/clip.png' });
    await pg.locator('.clip').click().catch(() => {});
    await pg.waitForSelector('.mg .btn.primary', { timeout: 6000 });
    await pg.locator('.mg .btn.primary').click();
    const t0 = Date.now();
    await pg.waitForSelector('.mg-hud', { timeout: 6000 });
    let shot = false, peek = null, seq = [], lastLit = -1, entered = 0;
    while (!(await pg.locator('.mg-result').count()) && Date.now() - t0 < 50000) {
      if (!shot && Date.now() - t0 > 9000) { await pg.screenshot({ path: `${out}/${type}.png` }); shot = true; }
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
      } else if (type === 'flap') {
        const st = await pg.evaluate(() => {
          const me = document.querySelector('.mg-ent.me'); const y = parseFloat(me.style.top);
          let target = 50, best = 999;
          for (const p of document.querySelectorAll('.mg-pipe.top')) { const x = parseFloat(p.style.left); if (x > 10 && x < best) { best = x; target = parseFloat(p.style.height) + 18; } }
          return { y, target };
        });
        if (st.y > st.target + 3) await pg.locator('.mg-arena').dispatchEvent('pointerdown');
      } else if (type === 'jump') {
        const near = await pg.evaluate(() => [...document.querySelectorAll('.mg-ent:not(.me):not(.gone)')].some((e) => { const x = parseFloat(e.style.left); return x > 22 && x < 36; }));
        if (near) await pg.locator('.mg-arena').dispatchEvent('pointerdown');
      } else if (type === 'snake') {
        const key = await pg.evaluate(() => {
          const N = 11, a = document.querySelector('.mg-arena.snake');
          const segs = [...a.querySelectorAll('.mg-seg')].map((e) => [Math.round(parseFloat(e.style.left) / (100 / N)), Math.round(parseFloat(e.style.top) / (100 / N))]);
          const f = a.querySelector('.food'); const fx = Math.floor(parseFloat(f.style.left) / (100 / N)), fy = Math.floor(parseFloat(f.style.top) / (100 / N));
          const [hx, hy] = segs[0];
          const moves = [['ArrowUp', 0, -1], ['ArrowDown', 0, 1], ['ArrowLeft', -1, 0], ['ArrowRight', 1, 0]];
          const safe = moves.filter(([, dx, dy]) => { const x = hx + dx, y = hy + dy; return x >= 0 && y >= 0 && x < N && y < N && !segs.slice(0, -1).some(([sx, sy]) => sx === x && sy === y) && !(segs[1] && segs[1][0] === x && segs[1][1] === y); });
          safe.sort((m1, m2) => (Math.abs(hx + m1[1] - fx) + Math.abs(hy + m1[2] - fy)) - (Math.abs(hx + m2[1] - fx) + Math.abs(hy + m2[2] - fy)));
          return safe[0] ? safe[0][0] : null;
        });
        if (key) await pg.keyboard.press(key);
        await pg.waitForTimeout(60);
      } else if (type === 'slice') {
        const box = await pg.locator('.mg-arena').boundingBox({ timeout: 500 }).catch(() => null);
        const pts = await pg.evaluate(() => [...document.querySelectorAll('.mg-arena.dojo .mg-ent:not(.cut):not([data-bad])')].map((e) => [parseFloat(e.style.left), parseFloat(e.style.top)]).filter(([, y]) => y > 8 && y < 92));
        if (box) for (const [x, y] of pts) { await pg.mouse.move(box.x + box.width * x / 100, box.y + box.height * y / 100); await pg.mouse.down(); await pg.mouse.up(); }
      } else if (type === 'invaders') {
        const box = await pg.locator('.mg-arena').boundingBox({ timeout: 500 }).catch(() => null);
        const x = await pg.evaluate(() => {
          const me = parseFloat(document.querySelector('.cannon').style.left);
          const danger = [...document.querySelectorAll('.mg-drop')].filter((d) => parseFloat(d.style.top) > 60 && Math.abs(parseFloat(d.style.left) - me) < 9);
          const foes = [...document.querySelectorAll('.mg-ent.march')].map((e) => parseFloat(e.style.left));
          if (danger.length) return me + (me > 50 ? -14 : 14);
          return foes.length ? foes.reduce((a, b) => (Math.abs(b - me) < Math.abs(a - me) ? b : a)) : me;
        });
        if (box) { await pg.mouse.move(box.x + box.width * x / 100, box.y + box.height * 0.85); await pg.mouse.down(); await pg.mouse.up(); }
      } else if (type === 'breakout') {
        const box = await pg.locator('.mg-arena').boundingBox({ timeout: 500 }).catch(() => null);
        const bx = await pg.evaluate(() => parseFloat(document.querySelector('.mg-ball')?.style.left ?? '50'));
        if (box) { await pg.mouse.move(box.x + box.width * bx / 100, box.y + box.height * 0.9); await pg.mouse.down(); await pg.mouse.up(); }
      } else if (type === 'rhythm') {
        const lanes = await pg.evaluate(() => [...document.querySelectorAll('.mg-arena.stage .mg-ent:not(.gone)')].filter((e) => { const y = parseFloat(e.style.top); return y > 78 && y < 90; }).map((e) => Math.round((parseFloat(e.style.left) - 16.67) / 33.34)));
        for (const l of [...new Set(lanes)]) await pg.locator('.mg-lanebtn').nth(l).dispatchEvent('pointerdown');
        await pg.waitForTimeout(-20 + 30);
      } else if (type === 'cross') {
        const safe = await pg.evaluate(() => {
          const me = document.querySelector('.mg-ent.me'); const my = parseFloat(me.style.top), mx = parseFloat(me.style.left);
          const rowH = 84 / 5, next = my - rowH;
          return ![...document.querySelectorAll('.mg-arena.crossing .mg-ent:not(.me)')].some((c) => Math.abs(parseFloat(c.style.top) - next) < 2 && Math.abs(parseFloat(c.style.left) - mx) < 18);
        });
        if (safe) await pg.keyboard.press('ArrowUp');
      } else if (type === 'sort') {
        const g = await pg.evaluate(() => document.querySelector('.sortme')?.dataset.good);
        if (g !== undefined) { await pg.keyboard.press(g === '1' ? 'ArrowLeft' : 'ArrowRight'); await pg.waitForTimeout(150); }
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
