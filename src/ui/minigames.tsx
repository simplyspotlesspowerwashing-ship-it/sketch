// Seven mini-games, 15-30 seconds each, themed by the card being played. Each reports a Skill:
// 2 clean, 1 sloppy, 0 flop. There is no skip and no bonus: a clean job gets exactly the trade you
// chose, anything less costs extra. They are pure UI; the engine only ever sees the Skill.
import { useEffect, useRef, useState } from 'preact/hooks';
import type { Card, CardGame, Skill } from '../engine/types.ts';
import { Portrait, SPRITE_NAMES, Sprite } from './art.tsx';
import { sfx } from './platform.ts';

type Done = (skill: Skill) => void;

/** Games call this on a good or bad moment so the requester can heckle. Set by MiniGame. */
let heckle: (good: boolean) => void = () => {};
const good = () => heckle(true);
const bad = () => heckle(false);
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

/** Twists can speed a game up. Set by MiniGame before a game starts. */
let timeScale = 1;

/** Frame loop: calls `step(dt, elapsed)` every frame and re-renders. Stops when `step` returns false. */
function useLoop(step: (dt: number, t: number) => boolean | void) {
  const [, setFrame] = useState(0);
  const fn = useRef(step);
  fn.current = step;
  useEffect(() => {
    let raf = 0, last = performance.now(), t = 0, alive = true;
    const tick = (now: number) => {
      if (!alive) return;
      const dt = Math.min(0.05, (now - last) / 1000) * timeScale;
      last = now; t += dt;
      if (fn.current(dt, t) === false) { setFrame((f) => f + 1); return; }
      setFrame((f) => f + 1);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, []);
}

function Hud({ left, total, children }: { left: number; total: number; children: preact.ComponentChildren }) {
  return (
    <div class="mg-hud">
      <div class="mg-time" role="timer" aria-label={`${Math.ceil(left)} seconds left`}><i style={{ width: `${clamp((left / total) * 100, 0, 100)}%` }} class={left < 5 ? 'low' : ''} /></div>
      <p class="mg-score">{children}</p>
    </div>
  );
}

// ---- 1. Catch: slide the basket, catch the good things, avoid the bad ones ----
function Catch({ g, done }: { g: CardGame; done: Done }) {
  const T = 20, CLEAN = 15, SLOPPY = 8;
  const st = useRef({ px: 50, items: [] as { id: number; x: number; y: number; bad: boolean; v: number }[], next: 0.4, id: 0, score: 0, t: 0, shake: 0, over: false });
  const arena = useRef<HTMLDivElement>(null);
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.shake = Math.max(0, s.shake - dt);
    const k = t / T;
    if (t >= s.next) { s.items.push({ id: s.id++, x: rnd(8, 92), y: -8, bad: Math.random() < 0.3, v: rnd(34, 46) + k * 34 }); s.next = t + (0.62 - k * 0.27); }
    for (const it of s.items) it.y += it.v * dt;
    s.items = s.items.filter((it) => {
      if (it.y >= 80 && it.y <= 94 && Math.abs(it.x - s.px) < 12) {
        if (it.bad) { s.score = Math.max(0, s.score - 2); s.shake = 0.3; sfx('warn'); bad(); } else { s.score += 1; sfx('tap'); if (s.score % 4 === 0) good(); }
        return false;
      }
      return it.y < 104;
    });
    if (t >= T) { s.over = true; done(s.score >= CLEAN ? 2 : s.score >= SLOPPY ? 1 : 0); return false; }
  });
  const move = (e: PointerEvent) => { const r = arena.current!.getBoundingClientRect(); st.current.px = clamp(((e.clientX - r.left) / r.width) * 100, 8, 92); };
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') st.current.px = clamp(st.current.px - 8, 8, 92); if (e.key === 'ArrowRight') st.current.px = clamp(st.current.px + 8, 8, 92); }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const s = st.current;
  return (
    <>
      <Hud left={T - s.t} total={T}><b>{s.score}</b> caught · {CLEAN} for a clean job</Hud>
      <div ref={arena} class={`mg-arena sky ${s.shake > 0 ? 'shake' : ''}`} onPointerMove={move} onPointerDown={move}>
        {s.items.map((it) => <span key={it.id} class={`mg-ent ${it.bad ? 'bad' : ''}`} style={{ left: `${it.x}%`, top: `${it.y}%` }}><Sprite theme={it.bad ? g.bad ?? 'raccoon' : g.theme} size={40} /></span>)}
        <span class="mg-basket" style={{ left: `${s.px}%` }} />
      </div>
      <p class="hint">Drag to move the basket. Catch the <Sprite theme={g.theme} size={18} />, dodge the <Sprite theme={g.bad ?? 'raccoon'} size={18} /> (−2).</p>
    </>
  );
}

// ---- 2. Dodge: three lanes, things come at you, tap a lane to move ----
function Dodge({ g, done }: { g: CardGame; done: Done }) {
  const T = 20;
  const st = useRef({ lane: 1, obs: [] as { id: number; lane: number; y: number; hit: boolean }[], next: 0.6, id: 0, hits: 0, t: 0, flash: 0, over: false });
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.flash = Math.max(0, s.flash - dt);
    const k = t / T, speed = 52 + k * 48;
    if (t >= s.next) {
      const a = Math.floor(Math.random() * 3);
      s.obs.push({ id: s.id++, lane: a, y: -10, hit: false });
      if (Math.random() < 0.3 + k * 0.25) s.obs.push({ id: s.id++, lane: (a + 1 + Math.floor(Math.random() * 2)) % 3, y: -10, hit: false });
      s.next = t + (0.78 - k * 0.3);
    }
    for (const o of s.obs) {
      o.y += speed * dt;
      if (!o.hit && o.lane === s.lane && o.y > 74 && o.y < 92) { o.hit = true; s.hits += 1; s.flash = 0.35; sfx('warn'); bad(); }
    }
    s.obs = s.obs.filter((o) => o.y < 110);
    if (t >= T) { s.over = true; done(s.hits <= 1 ? 2 : s.hits <= 3 ? 1 : 0); return false; }
  });
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') st.current.lane = Math.max(0, st.current.lane - 1); if (e.key === 'ArrowRight') st.current.lane = Math.min(2, st.current.lane + 1); }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const s = st.current;
  return (
    <>
      <Hud left={T - s.t} total={T}><b>{s.hits}</b> crash{s.hits === 1 ? '' : 'es'} · 1 or fewer for a clean job</Hud>
      <div class={`mg-arena road ${s.flash > 0 ? 'shake' : ''}`}>
        {[0, 1, 2].map((l) => <button key={l} class="mg-lane" style={{ left: `${l * 33.34}%` }} aria-label={`Lane ${l + 1}`} onPointerDown={() => { st.current.lane = l; sfx('tap'); }} />)}
        {s.obs.map((o) => <span key={o.id} class={`mg-ent ${o.hit ? 'gone' : ''}`} style={{ left: `${16.67 + o.lane * 33.34}%`, top: `${o.y}%` }}><Sprite theme={g.bad ?? 'cloud'} size={44} /></span>)}
        <span class="mg-ent me" style={{ left: `${16.67 + s.lane * 33.34}%`, top: '84%' }}><Sprite theme={g.theme} size={48} /></span>
      </div>
      <p class="hint">Tap a lane to move there. It gets faster.</p>
    </>
  );
}

// ---- 3. Whack: tap the right ones as they pop up, leave the wrong ones ----
function Whack({ g, done }: { g: CardGame; done: Done }) {
  const T = 18, CLEAN = 16, SLOPPY = 9;
  const st = useRef({ slots: Array.from({ length: 9 }, () => null as null | { bad: boolean; until: number; id: number }), next: 0.3, id: 0, score: 0, t: 0, over: false });
  useLoop((_dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t;
    const k = t / T;
    s.slots = s.slots.map((x) => (x && x.until < t ? null : x));
    if (t >= s.next) {
      const empty = s.slots.map((x, i) => (x ? -1 : i)).filter((i) => i >= 0);
      if (empty.length) s.slots[empty[Math.floor(Math.random() * empty.length)]!] = { bad: Math.random() < 0.3, until: t + (1.05 - k * 0.4), id: s.id++ };
      s.next = t + (0.5 - k * 0.2);
    }
    if (t >= T) { s.over = true; done(s.score >= CLEAN ? 2 : s.score >= SLOPPY ? 1 : 0); return false; }
  });
  const hit = (i: number) => {
    const s = st.current, x = s.slots[i];
    if (!x) return;
    if (x.bad) { s.score = Math.max(0, s.score - 2); sfx('warn'); bad(); } else { s.score += 1; sfx('tap'); if (s.score % 4 === 0) good(); }
    s.slots[i] = null;
  };
  const s = st.current;
  return (
    <>
      <Hud left={T - s.t} total={T}><b>{s.score}</b> · {CLEAN} for a clean job</Hud>
      <div class="mg-grid">
        {s.slots.map((x, i) => <button key={i} class={`mg-hole ${x ? (x.bad ? 'up bad' : 'up good') : ''}`} aria-label={x ? (x.bad ? 'Do not tap' : 'Tap') : 'Empty'} onPointerDown={() => hit(i)}>{x && <span key={x.id} class="mg-pop"><Sprite theme={x.bad ? g.bad ?? 'goose' : g.theme} size={52} /></span>}</button>)}
      </div>
      <p class="hint">Tap the <Sprite theme={g.theme} size={18} />. Leave the <Sprite theme={g.bad ?? 'goose'} size={18} /> alone (−2).</p>
    </>
  );
}

// ---- 4. Match: find the pairs before time runs out ----
function Match({ g, done }: { g: CardGame; done: Done }) {
  const T = 14;
  const st = useRef((() => {
    const themes = [g.theme, ...SPRITE_NAMES.filter((n) => n !== g.theme).sort(() => Math.random() - 0.5)].slice(0, 6);
    const deck = [...themes, ...themes].sort(() => Math.random() - 0.5).map((theme, id) => ({ id, theme, up: true, found: false }));
    return { deck, open: [] as number[], lock: 1.2, pairs: 0, t: 0, over: false, peek: true };
  })());
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t;
    if (s.lock > 0) {
      s.lock -= dt;
      if (s.lock <= 0) {
        if (s.peek) { s.peek = false; for (const c of s.deck) c.up = false; }
        else { for (const i of s.open) s.deck[i]!.up = false; s.open = []; }
      }
    }
    if (s.pairs === 6) { s.over = true; done(2); return false; }
    if (t >= T + 1.2) { s.over = true; done(s.pairs >= 4 ? 1 : 0); return false; }
  });
  const flip = (i: number) => {
    const s = st.current, c = s.deck[i]!;
    if (s.lock > 0 || c.up || c.found) return;
    c.up = true; s.open.push(i); sfx('paper');
    if (s.open.length === 2) {
      const [a, b] = s.open as [number, number];
      if (s.deck[a]!.theme === s.deck[b]!.theme) { s.deck[a]!.found = s.deck[b]!.found = true; s.pairs += 1; s.open = []; sfx('coin'); good(); }
      else { s.lock = 0.5; bad(); }
    }
  };
  const s = st.current;
  return (
    <>
      <Hud left={T + 1.2 - s.t} total={T + 1.2}><b>{s.pairs}</b> of 6 pairs · all 6 for a clean job</Hud>
      <div class="mg-deck">
        {s.deck.map((c, i) => <button key={c.id} class={`mg-card ${c.up || c.found ? 'up' : ''} ${c.found ? 'found' : ''}`} aria-label={c.up || c.found ? c.theme : 'Face-down card'} onPointerDown={() => flip(i)}>{(c.up || c.found) && <Sprite theme={c.theme} size={40} />}</button>)}
      </div>
      <p class="hint">{s.peek ? 'Memorise them…' : 'Find the pairs.'}</p>
    </>
  );
}

// ---- 5. Stack: drop each piece on the one below; whatever overhangs is lost ----
function Stack({ g, done }: { g: CardGame; done: Done }) {
  const LEVELS = 10, T = 30;
  const st = useRef({ tower: [{ x: 27, w: 46 }], x: 0, dir: 1, t: 0, over: false, wobble: 0 });
  const finish = (placed: number, w: number) => { st.current.over = true; done(placed >= LEVELS && w >= 10 ? 2 : placed >= 6 ? 1 : 0); };
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.wobble = Math.max(0, s.wobble - dt);
    const top = s.tower[s.tower.length - 1]!;
    const speed = 54 + s.tower.length * 11;
    s.x += s.dir * speed * dt;
    if (s.x <= 0) { s.x = 0; s.dir = 1; }
    if (s.x >= 100 - top.w) { s.x = 100 - top.w; s.dir = -1; }
    if (t >= T) { finish(s.tower.length - 1, top.w); return false; }
  });
  const drop = () => {
    const s = st.current;
    if (s.over) return;
    const top = s.tower[s.tower.length - 1]!;
    const lo = Math.max(s.x, top.x), hi = Math.min(s.x + top.w, top.x + top.w);
    if (hi - lo <= 1.5) { sfx('lose'); finish(s.tower.length - 1, 0); return; }
    if (hi - lo < top.w - 2) { s.wobble = 0.25; sfx('warn'); bad(); } else { sfx('stamp'); good(); }
    s.tower.push({ x: lo, w: hi - lo });
    s.x = 0; s.dir = 1;
    if (s.tower.length - 1 >= LEVELS) finish(LEVELS, hi - lo);
  };
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === ' ' && !e.repeat) { e.preventDefault(); drop(); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const s = st.current, top = s.tower[s.tower.length - 1]!;
  return (
    <>
      <Hud left={T - s.t} total={T}><b>{s.tower.length - 1}</b> of {LEVELS} placed</Hud>
      <button class={`mg-arena build ${s.wobble > 0 ? 'shake' : ''}`} onPointerDown={drop} aria-label="Drop the piece">
        {s.tower.map((b, i) => <span key={i} class={`mg-block ${i === 0 ? 'base' : ''}`} style={{ left: `${b.x}%`, width: `${b.w}%`, bottom: `${i * 8.6}%` }} />)}
        {!s.over && s.tower.length - 1 < LEVELS && <span class="mg-block live" style={{ left: `${s.x}%`, width: `${top.w}%`, bottom: `${s.tower.length * 8.6 + 3}%` }} />}
        <span class="mg-corner"><Sprite theme={g.theme} size={30} /></span>
      </button>
      <p class="hint">Tap to drop. Line it up: anything hanging over the edge is cut off.</p>
    </>
  );
}

// ---- 6. Simon: watch the signals, repeat them; three rounds, each longer ----
function Simon({ g, done }: { g: CardGame; done: Done }) {
  const ROUNDS = [3, 4, 5], T = 40;
  const st = useRef({ round: 0, seq: [] as number[], show: -1, input: [] as number[], mistakes: 0, t: 0, phaseAt: 0.8, lit: -1, litUntil: 0, over: false, wrong: 0 });
  const newRound = (s: typeof st.current, t: number) => { s.seq = Array.from({ length: ROUNDS[s.round]! }, () => Math.floor(Math.random() * 4)); s.show = -1; s.input = []; s.phaseAt = t + 0.7; };
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.wrong = Math.max(0, s.wrong - dt);
    if (s.seq.length === 0) newRound(s, 0.1);
    if (s.show < s.seq.length && t >= s.phaseAt) {
      s.show += 1;
      if (s.show < s.seq.length) { s.lit = s.seq[s.show]!; s.litUntil = t + 0.36; s.phaseAt = t + 0.56; sfx('tap'); }
    }
    if (t > s.litUntil) s.lit = -1;
    if (t >= T) { s.over = true; done(0); return false; }
  });
  const press = (i: number) => {
    const s = st.current;
    if (s.over || s.show < s.seq.length) return;
    s.lit = i; s.litUntil = s.t + 0.18;
    if (i !== s.seq[s.input.length]) {
      s.mistakes += 1; s.wrong = 0.4; sfx('warn'); bad();
      if (s.mistakes >= 2) { s.over = true; done(0); return; }
      newRound(s, s.t + 0.3);
      return;
    }
    s.input.push(i); sfx('tap');
    if (s.input.length === s.seq.length) {
      s.round += 1; sfx('coin'); good();
      if (s.round >= ROUNDS.length) { s.over = true; done(s.mistakes === 0 ? 2 : 1); return; }
      newRound(s, s.t + 0.3);
    }
  };
  useEffect(() => { const k = (e: KeyboardEvent) => { const i = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].indexOf(e.key); if (i >= 0) { e.preventDefault(); press(i); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const s = st.current, watching = s.show < s.seq.length;
  return (
    <>
      <Hud left={T - s.t} total={T}>Round <b>{Math.min(s.round + 1, 3)}</b> of 3 · {s.mistakes} mistake{s.mistakes === 1 ? '' : 's'} · a second one flops</Hud>
      <div class={`mg-pads ${s.wrong > 0 ? 'shake' : ''}`}>
        {['▲', '▶', '▼', '◀'].map((d, i) => <button key={d} class={`mg-padbtn p${i} ${s.lit === i ? 'lit' : ''}`} disabled={watching} aria-label={['Up', 'Right', 'Down', 'Left'][i]} onPointerDown={() => press(i)}>{d}</button>)}
        <span class="mg-padmid"><Sprite theme={g.theme} size={36} /></span>
      </div>
      <p class="hint">{watching ? 'Watch…' : `Your turn: ${s.input.length} of ${s.seq.length}`}</p>
    </>
  );
}

// ---- 7. Tug: tap to pull, but only on green; tapping on red loses ground ----
function Tug({ g, done }: { g: CardGame; done: Done }) {
  const T = 18;
  const st = useRef({ bar: 50, green: true, flipAt: 1.6, t: 0, over: false, oops: 0 });
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.oops = Math.max(0, s.oops - dt);
    s.bar -= (13 + t * 1.25) * dt; // the pull gets stronger the whole way
    if (t >= s.flipAt) { s.green = !s.green; s.flipAt = t + (s.green ? rnd(1.2, 2.4) : rnd(0.7, 1.3)); }
    if (s.bar <= 0) { s.bar = 0; s.over = true; done(0); return false; }
    if (s.bar > 100) s.bar = 100;
    if (t >= T) { s.over = true; done(s.bar >= 62 ? 2 : s.bar >= 34 ? 1 : 0); return false; }
  });
  const pull = () => { const s = st.current; if (s.over) return; if (s.green) { s.bar += 3.6; sfx('tap'); } else { s.bar -= 12; s.oops = 0.3; sfx('warn'); bad(); } };
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === ' ' && !e.repeat) { e.preventDefault(); pull(); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const s = st.current;
  return (
    <>
      <Hud left={T - s.t} total={T}>Hold the line past the mark</Hud>
      <div class={`mg-tug ${s.oops > 0 ? 'shake' : ''}`}>
        <span class="mg-tug-them"><Sprite theme={g.theme} size={40} /></span>
        <div class="mg-rope"><i class="mg-mark" /><i class="mg-knot" style={{ left: `${s.bar}%` }} /></div>
        <span class="mg-tug-you">YOU</span>
      </div>
      <button class={`btn mg-big ${s.green ? 'go' : 'stop'}`} onPointerDown={pull}>{s.green ? 'PULL! PULL!' : 'WAIT…'}</button>
      <p class="hint">Tap fast while it's green. Tap on red and you slip.</p>
    </>
  );
}


// ---- 8. Flap: tap to flap up through the gaps (the flappy-bird genre) ----
function Flap({ g, done }: { g: CardGame; done: Done }) {
  const T = 22, GAP = 36;
  const st = useRef({ y: 45, vy: 0, pipes: [] as { id: number; x: number; gap: number; passed: boolean }[], next: 0.9, id: 0, crashes: 0, passed: 0, inv: 0, t: 0, over: false });
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.inv = Math.max(0, s.inv - dt);
    s.vy += 150 * dt; s.y += s.vy * dt;
    const k = t / T, speed = 30 + k * 14;
    if (t >= s.next) { s.pipes.push({ id: s.id++, x: 108, gap: rnd(22, 72), passed: false }); s.next = t + 1.55 - k * 0.3; }
    for (const p of s.pipes) {
      p.x -= speed * dt;
      if (!p.passed && p.x < 18) { p.passed = true; s.passed += 1; sfx('tap'); if (s.passed % 3 === 0) good(); }
      if (s.inv <= 0 && Math.abs(p.x - 22) < 9 && Math.abs(s.y - p.gap) > GAP / 2 - 5) crash();
    }
    if (s.inv <= 0 && (s.y > 94 || s.y < 2)) crash();
    s.y = clamp(s.y, 2, 94);
    s.pipes = s.pipes.filter((p) => p.x > -12);
    if (s.crashes >= 5) { s.over = true; done(0); return false; }
    if (t >= T) { s.over = true; done(s.crashes <= 1 ? 2 : s.crashes <= 3 ? 1 : 0); return false; }
    function crash() { s.crashes += 1; s.inv = 1.1; s.vy = -40; sfx('warn'); bad(); }
  });
  const flap = () => { const s = st.current; if (!s.over) { s.vy = -58; sfx('paper'); } };
  useEffect(() => { const k = (e: KeyboardEvent) => { if ((e.key === ' ' || e.key === 'ArrowUp') && !e.repeat) { e.preventDefault(); flap(); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const s = st.current;
  return (
    <>
      <Hud left={T - s.t} total={T}><b>{s.passed}</b> through · {s.crashes} crash{s.crashes === 1 ? '' : 'es'} · 1 or fewer is clean</Hud>
      <button class="mg-arena sky flap" onPointerDown={flap} aria-label="Flap">
        {s.pipes.map((p) => (
          <span key={p.id}>
            <span class="mg-pipe top" style={{ left: `${p.x}%`, height: `${p.gap - GAP / 2}%` }}><Sprite theme={g.bad ?? 'cloud'} size={34} /></span>
            <span class="mg-pipe bottom" style={{ left: `${p.x}%`, top: `${p.gap + GAP / 2}%` }} />
          </span>
        ))}
        <span class={`mg-ent me ${s.inv > 0 ? 'blink' : ''}`} style={{ left: '22%', top: `${s.y}%`, rotate: `${clamp(s.vy * 0.6, -25, 60)}deg` }}><Sprite theme={g.theme} size={42} /></span>
      </button>
      <p class="hint">Tap to flap. Get through the gaps. Don't hit the edges.</p>
    </>
  );
}

// ---- 9. Jump: an endless runner; tap to jump the obstacles ----
function Jump({ g, done }: { g: CardGame; done: Done }) {
  const T = 22;
  const st = useRef({ y: 0, vy: 0, obs: [] as { id: number; x: number; tall: boolean; hit: boolean }[], next: 1, id: 0, hits: 0, cleared: 0, inv: 0, t: 0, over: false, scroll: 0 });
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.inv = Math.max(0, s.inv - dt);
    const k = t / T, speed = 40 + k * 24;
    s.scroll = (s.scroll + speed * dt) % 100;
    if (s.y > 0 || s.vy > 0) { s.vy -= 240 * dt; s.y = Math.max(0, s.y + s.vy * dt); if (s.y === 0) s.vy = 0; }
    if (t >= s.next) { s.obs.push({ id: s.id++, x: 106, tall: Math.random() < 0.3 + k * 0.3, hit: false }); s.next = t + rnd(0.95, 1.6) - k * 0.25; }
    for (const o of s.obs) {
      o.x -= speed * dt;
      const h = o.tall ? 18 : 11;
      if (!o.hit && s.inv <= 0 && Math.abs(o.x - 18) < 4.5 && s.y < h) { o.hit = true; s.hits += 1; s.inv = 0.8; sfx('warn'); bad(); }
      if (!o.hit && o.x < 10 && !(o as { done?: boolean }).done) { (o as { done?: boolean }).done = true; s.cleared += 1; if (s.cleared % 4 === 0) good(); }
    }
    s.obs = s.obs.filter((o) => o.x > -10);
    if (t >= T) { s.over = true; done(s.hits <= 1 ? 2 : s.hits <= 3 ? 1 : 0); return false; }
  });
  const jump = () => { const s = st.current; if (!s.over && s.y === 0) { s.vy = 112; sfx('paper'); } };
  useEffect(() => { const k = (e: KeyboardEvent) => { if ((e.key === ' ' || e.key === 'ArrowUp') && !e.repeat) { e.preventDefault(); jump(); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const s = st.current;
  return (
    <>
      <Hud left={T - s.t} total={T}><b>{s.cleared}</b> cleared · {s.hits} hit{s.hits === 1 ? '' : 's'} · 1 or fewer is clean</Hud>
      <button class="mg-arena run" onPointerDown={jump} aria-label="Jump" style={{ backgroundPosition: `${-s.scroll * 4}px 100%` }}>
        {s.obs.map((o) => <span key={o.id} class={`mg-ent ${o.hit ? 'gone' : ''}`} style={{ left: `${o.x}%`, top: o.tall ? '64%' : '72%' }}><Sprite theme={g.bad ?? 'hole'} size={o.tall ? 54 : 40} /></span>)}
        <span class={`mg-ent me ${s.inv > 0 ? 'blink' : ''}`} style={{ left: '18%', top: `${74 - s.y}%` }}><span class={s.y === 0 ? 'mg-runbob' : ''}><Sprite theme={g.theme} size={46} /></span></span>
      </button>
      <p class="hint">Tap to jump. It speeds up. Tall ones need a good jump.</p>
    </>
  );
}

// ---- 10. Snake: steer, collect, grow; don't hit the walls or yourself ----
function Snake({ g, done }: { g: CardGame; done: Done }) {
  const N = 11, T = 28, GOAL = 12;
  const place = (body: number[][]) => { let p: number[]; do { p = [Math.floor(Math.random() * N), Math.floor(Math.random() * N)]; } while (body.some((b) => b[0] === p[0] && b[1] === p[1])); return p; };
  const st = useRef((() => { const body = [[5, 5], [4, 5], [3, 5]]; return { body, dir: [1, 0], queued: [1, 0], food: place(body), acc: 0, eaten: 0, crashes: 0, t: 0, over: false, flash: 0 }; })());
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.flash = Math.max(0, s.flash - dt);
    s.acc += dt;
    const step = Math.max(0.11, 0.2 - s.eaten * 0.007);
    while (s.acc >= step) {
      s.acc -= step;
      if (!(s.queued[0] === -s.dir[0]! && s.queued[1] === -s.dir[1]!)) s.dir = s.queued;
      const head = [s.body[0]![0]! + s.dir[0]!, s.body[0]![1]! + s.dir[1]!];
      const hitSelf = s.body.slice(0, -1).some((b) => b[0] === head[0] && b[1] === head[1]);
      if (head[0]! < 0 || head[0]! >= N || head[1]! < 0 || head[1]! >= N || hitSelf) {
        s.crashes += 1; s.flash = 0.4; sfx('warn'); bad();
        s.body = [[5, 5], [4, 5], [3, 5]]; s.dir = [1, 0]; s.queued = [1, 0];
        if (s.crashes >= 4) { s.over = true; done(0); return false; }
        break;
      }
      s.body.unshift(head);
      if (head[0] === s.food[0] && head[1] === s.food[1]) { s.eaten += 1; s.food = place(s.body); sfx('coin'); if (s.eaten % 3 === 0) good(); } else s.body.pop();
    }
    if (s.eaten >= GOAL) { s.over = true; done(s.crashes <= 1 ? 2 : 1); return false; }
    if (t >= T) { s.over = true; done(s.eaten >= 7 ? 1 : 0); return false; }
  });
  const turn = (dx: number, dy: number) => { st.current.queued = [dx, dy]; };
  useEffect(() => { const k = (e: KeyboardEvent) => { const m: Record<string, [number, number]> = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }; const v = m[e.key]; if (v) { e.preventDefault(); turn(...v); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const start = useRef<[number, number] | null>(null);
  const s = st.current;
  return (
    <>
      <Hud left={T - s.t} total={T}><b>{s.eaten}</b> of {GOAL} · {s.crashes} crash{s.crashes === 1 ? '' : 'es'}</Hud>
      <div class={`mg-arena snake ${s.flash > 0 ? 'shake' : ''}`}
        onPointerDown={(e) => { start.current = [e.clientX, e.clientY]; }}
        onPointerMove={(e) => { if (!start.current) return; const dx = e.clientX - start.current[0], dy = e.clientY - start.current[1]; if (Math.hypot(dx, dy) > 22) { if (Math.abs(dx) > Math.abs(dy)) turn(Math.sign(dx), 0); else turn(0, Math.sign(dy)); start.current = [e.clientX, e.clientY]; } }}
        onPointerUp={() => { start.current = null; }}>
        <span class="mg-ent food" style={{ left: `${((s.food[0]! + 0.5) / N) * 100}%`, top: `${((s.food[1]! + 0.5) / N) * 100}%` }}><Sprite theme={g.theme} size={28} /></span>
        {s.body.map((b, i) => <span key={i} class={`mg-seg ${i === 0 ? 'head' : ''}`} style={{ left: `${(b[0]! / N) * 100}%`, top: `${(b[1]! / N) * 100}%`, width: `${100 / N}%`, height: `${100 / N}%` }}>{i === 0 && <Sprite theme="star" size={16} />}</span>)}
      </div>
      <div class="mg-dpad">{([['▲', 0, -1], ['◀', -1, 0], ['▼', 0, 1], ['▶', 1, 0]] as const).map(([l, x, y]) => <button key={l} class="btn" aria-label={l} onPointerDown={() => turn(x, y)}>{l}</button>)}</div>
      <p class="hint">Swipe or use the arrows. Collect {GOAL}. Walls and your own tail are bad.</p>
    </>
  );
}

// ---- 11. Slice: swipe through what's thrown up; never the bombs (the fruit-slicing genre) ----
function Slice({ g, done }: { g: CardGame; done: Done }) {
  const T = 20, CLEAN = 14, SLOPPY = 8;
  const st = useRef({ items: [] as { id: number; x: number; y: number; vx: number; vy: number; bomb: boolean; cut: number }[], next: 0.5, id: 0, score: 0, bombs: 0, t: 0, over: false, trail: [] as [number, number, number][], shake: 0 });
  const arena = useRef<HTMLDivElement>(null);
  const down = useRef(false);
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.shake = Math.max(0, s.shake - dt);
    const k = t / T;
    if (t >= s.next) {
      const n = Math.random() < 0.35 + k * 0.3 ? 2 : 1;
      for (let i = 0; i < n; i++) s.items.push({ id: s.id++, x: rnd(15, 85), y: 108, vx: rnd(-14, 14), vy: rnd(-118, -98), bomb: Math.random() < 0.2 + k * 0.1, cut: 0 });
      s.next = t + rnd(0.65, 1.05) - k * 0.25;
    }
    for (const it of s.items) { it.x += it.vx * dt; it.y += it.vy * dt; it.vy += 95 * dt; if (it.cut) it.cut += dt; }
    s.items = s.items.filter((it) => it.y < 115 && it.cut < 0.5);
    s.trail = s.trail.filter((p) => t - p[2] < 0.18);
    if (t >= T) { s.over = true; done(s.score >= CLEAN && s.bombs === 0 ? 2 : s.score >= SLOPPY ? 1 : 0); return false; }
  });
  const cutAt = (e: PointerEvent) => {
    const r = arena.current!.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100, y = ((e.clientY - r.top) / r.height) * 100;
    const s = st.current;
    s.trail.push([x, y, s.t]);
    for (const it of s.items) {
      if (it.cut || Math.hypot(it.x - x, (it.y - y) * 0.8) > 9) continue;
      it.cut = 0.01;
      if (it.bomb) { s.bombs += 1; s.score = Math.max(0, s.score - 3); s.shake = 0.35; sfx('lose'); bad(); }
      else { s.score += 1; sfx('stamp'); if (s.score % 5 === 0) good(); }
    }
  };
  const s = st.current;
  return (
    <>
      <Hud left={T - s.t} total={T}><b>{s.score}</b> sliced · {CLEAN} and no <Sprite theme={g.bad ?? 'bomb'} size={16} /> is clean</Hud>
      <div ref={arena} class={`mg-arena dojo ${s.shake > 0 ? 'shake' : ''}`}
        onPointerDown={(e) => { down.current = true; cutAt(e); }} onPointerMove={(e) => { if (down.current) cutAt(e); }} onPointerUp={() => { down.current = false; }} onPointerLeave={() => { down.current = false; }}>
        {s.items.map((it) => (
          <span key={it.id} data-bad={it.bomb ? '1' : undefined} class={`mg-ent ${it.cut ? 'cut' : ''}`} style={{ left: `${it.x}%`, top: `${it.y}%`, rotate: `${it.id * 47 + s.t * 160}deg` }}>
            <Sprite theme={it.bomb ? g.bad ?? 'bomb' : g.theme} size={46} />
          </span>
        ))}
        <svg class="mg-trail" viewBox="0 0 100 100" preserveAspectRatio="none"><polyline points={s.trail.map((p) => `${p[0]},${p[1]}`).join(' ')} /></svg>
      </div>
      <p class="hint">Swipe through them. Slicing a <Sprite theme={g.bad ?? 'bomb'} size={18} /> costs 3.</p>
    </>
  );
}

// ---- 12. Invaders: they march and drop things; move and shoot (the space-invaders genre) ----
function Invaders({ g, done }: { g: CardGame; done: Done }) {
  const T = 26, ROWS = 3, COLS = 6;
  const st = useRef({
    px: 50, foes: Array.from({ length: ROWS * COLS }, (_, i) => ({ id: i, c: i % COLS, r: Math.floor(i / COLS), alive: true })),
    ox: 0, oy: 0, dir: 1, shots: [] as { id: number; x: number; y: number }[], drops: [] as { id: number; x: number; y: number }[],
    id: 0, cool: 0, auto: 0, hits: 0, t: 0, over: false, flash: 0, killed: 0,
  });
  const arena = useRef<HTMLDivElement>(null);
  const fx = (c: number) => 12 + c * 13 + st.current.ox, fy = (r: number) => 10 + r * 11 + st.current.oy;
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.cool -= dt; s.auto -= dt; s.flash = Math.max(0, s.flash - dt);
    const alive = s.foes.filter((f) => f.alive);
    const speed = 7 + (ROWS * COLS - alive.length) * 0.9;
    s.ox += s.dir * speed * dt;
    const xs = alive.map((f) => fx(f.c));
    if (Math.max(...xs) > 92 || Math.min(...xs) < 8) { s.dir *= -1; s.oy += 3.2; s.ox += s.dir * 1; }
    if (s.auto <= 0) { fire(); s.auto = 0.75; }
    if (Math.random() < dt * (0.9 + t * 0.06) && alive.length) { const f = alive[Math.floor(Math.random() * alive.length)]!; s.drops.push({ id: s.id++, x: fx(f.c), y: fy(f.r) + 4 }); }
    for (const sh of s.shots) sh.y -= 120 * dt;
    for (const d of s.drops) d.y += 48 * dt;
    for (const sh of s.shots) for (const f of s.foes) if (f.alive && Math.abs(fx(f.c) - sh.x) < 6 && Math.abs(fy(f.r) - sh.y) < 5) { f.alive = false; sh.y = -99; s.killed += 1; sfx('stamp'); if (s.killed % 4 === 0) good(); }
    for (const d of s.drops) if (d.y > 84 && d.y < 94 && Math.abs(d.x - s.px) < 7) { d.y = 999; s.hits += 1; s.flash = 0.35; sfx('warn'); bad(); }
    s.shots = s.shots.filter((x) => x.y > -5); s.drops = s.drops.filter((x) => x.y < 105);
    const lowest = Math.max(...alive.map((f) => fy(f.r)), 0);
    if (!alive.length) { s.over = true; done(s.hits <= 1 ? 2 : 1); return false; }
    if (s.hits >= 3 || lowest > 78) { s.over = true; done(0); return false; }
    if (t >= T) { s.over = true; done(s.killed >= 12 ? 1 : 0); return false; }
    function fire() { s.shots.push({ id: s.id++, x: s.px, y: 84 }); }
  });
  const fire = () => { const s = st.current; if (s.cool > 0 || s.over) return; s.cool = 0.28; s.shots.push({ id: s.id++, x: s.px, y: 84 }); sfx('tap'); };
  const move = (e: PointerEvent) => { const r = arena.current!.getBoundingClientRect(); st.current.px = clamp(((e.clientX - r.left) / r.width) * 100, 6, 94); };
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') st.current.px = clamp(st.current.px - 6, 6, 94); if (e.key === 'ArrowRight') st.current.px = clamp(st.current.px + 6, 6, 94); if (e.key === ' ') { e.preventDefault(); fire(); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const s = st.current;
  return (
    <>
      <Hud left={T - s.t} total={T}><b>{s.killed}</b> of {ROWS * COLS} · {3 - s.hits} li{3 - s.hits === 1 ? 'fe' : 'ves'} left</Hud>
      <div ref={arena} class={`mg-arena night ${s.flash > 0 ? 'shake' : ''}`} onPointerMove={move} onPointerDown={(e) => { move(e); fire(); }}>
        {s.foes.filter((f) => f.alive).map((f) => <span key={f.id} class="mg-ent march" style={{ left: `${fx(f.c)}%`, top: `${fy(f.r)}%` }}><Sprite theme={g.theme} size={34} /></span>)}
        {s.shots.map((x) => <span key={x.id} class="mg-shot" style={{ left: `${x.x}%`, top: `${x.y}%` }} />)}
        {s.drops.map((x) => <span key={x.id} class="mg-drop" style={{ left: `${x.x}%`, top: `${x.y}%` }} />)}
        <span class="mg-ent me cannon" style={{ left: `${s.px}%`, top: '89%' }}><span class="mg-cannon" /></span>
      </div>
      <p class="hint">Drag to move. Tap to fire (it also fires on its own). Clear them before they land.</p>
    </>
  );
}

// ---- 13. Breakout: bounce the ball off your paddle to knock out every brick ----
function Breakout({ g, done }: { g: CardGame; done: Done }) {
  const T = 30, ROWS = 3, COLS = 6;
  const st = useRef({ px: 50, bx: 50, by: 70, vx: 26, vy: -95, stuck: true, stuckFor: 0, lives: 3, bricks: Array.from({ length: ROWS * COLS }, (_, i) => ({ id: i, c: i % COLS, r: Math.floor(i / COLS), alive: true })), broken: 0, t: 0, over: false, flash: 0 });
  const arena = useRef<HTMLDivElement>(null);
  const bx0 = (c: number) => 8 + c * 14, by0 = (r: number) => 10 + r * 10;
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.flash = Math.max(0, s.flash - dt);
    if (t >= T) { s.over = true; done(s.broken >= 14 && s.lives >= 2 ? 2 : s.broken >= 9 ? 1 : 0); return false; }
    if (s.stuck) { s.bx = s.px; s.by = 84; s.stuckFor += dt; if (s.stuckFor > 1.5) { s.stuck = false; s.stuckFor = 0; s.vx = rnd(-30, 30); s.vy = -95; } return; }
    const speed = 1 + t / T * 0.5;
    s.bx += s.vx * speed * dt; s.by += s.vy * speed * dt;
    if (s.bx < 3 || s.bx > 97) { s.vx *= -1; s.bx = clamp(s.bx, 3, 97); }
    if (s.by < 3) { s.vy = Math.abs(s.vy); }
    if (s.vy > 0 && s.by > 85 && s.by < 94 && Math.abs(s.bx - s.px) < 12) { s.vy = -Math.abs(s.vy); s.vx = (s.bx - s.px) * 6.5; if (Math.abs(s.vx) < 16) s.vx = (s.vx < 0 || (s.vx === 0 && Math.random() < 0.5) ? -1 : 1) * 16; sfx('tap'); }
    for (const b of s.bricks) {
      if (!b.alive || Math.abs(s.bx - bx0(b.c)) > 7 || Math.abs(s.by - by0(b.r)) > 5) continue;
      b.alive = false; s.broken += 1; s.vy *= -1; sfx('stamp'); if (s.broken % 4 === 0) good();
      break;
    }
    if (s.by > 100) { s.lives -= 1; s.stuck = true; s.flash = 0.4; sfx('warn'); bad(); if (s.lives <= 0) { s.over = true; done(s.broken >= 9 ? 1 : 0); return false; } }
    if (s.broken === ROWS * COLS) { s.over = true; done(s.lives >= 2 ? 2 : 1); return false; }
  });
  const move = (e: PointerEvent) => { const r = arena.current!.getBoundingClientRect(); st.current.px = clamp(((e.clientX - r.left) / r.width) * 100, 10, 90); };
  const launch = () => { const s = st.current; if (s.stuck) { s.stuck = false; s.stuckFor = 0; s.vx = rnd(-30, 30); s.vy = -95; } };
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') st.current.px = clamp(st.current.px - 7, 10, 90); if (e.key === 'ArrowRight') st.current.px = clamp(st.current.px + 7, 10, 90); if (e.key === ' ') { e.preventDefault(); launch(); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const s = st.current;
  return (
    <>
      <Hud left={T - s.t} total={T}><b>{s.broken}</b> of {ROWS * COLS} · {s.lives} ball{s.lives === 1 ? '' : 's'} left · 14 is clean</Hud>
      <div ref={arena} class={`mg-arena night ${s.flash > 0 ? 'shake' : ''}`} onPointerMove={move} onPointerDown={(e) => { move(e); launch(); }}>
        {s.bricks.filter((b) => b.alive).map((b) => <span key={b.id} class="mg-brick" style={{ left: `${bx0(b.c)}%`, top: `${by0(b.r)}%` }}><Sprite theme={g.theme} size={30} /></span>)}
        <span class="mg-ball" style={{ left: `${s.bx}%`, top: `${s.by}%` }} />
        <span class="mg-paddle" style={{ left: `${s.px}%` }} />
        {s.stuck && <span class="mg-tip">Tap to launch</span>}
      </div>
      <p class="hint">Drag the paddle. Knock out fourteen or more without losing two balls.</p>
    </>
  );
}

// ---- 14. Pour: hold to fill, let go on the line. Five pours, each faster (hold-and-release precision) ----
function Pour({ g, done }: { g: CardGame; done: Done }) {
  const ROUNDS = 5;
  const st = useRef({ round: 0, level: 0, holding: false, band: [55, 68] as [number, number], speed: 38, scores: [] as boolean[], wait: 0, t: 0, over: false, spill: 0, idle: 0 });
  const newRound = (s: typeof st.current) => { s.idle = 0; const lo = rnd(35, 72); const w = rnd(9, 14) - s.round; s.band = [lo, lo + w]; s.level = 0; s.speed = 34 + s.round * 9 + rnd(0, 8); s.wait = 0; };
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.spill = Math.max(0, s.spill - dt);
    if (s.wait > 0) { s.wait -= dt; if (s.wait <= 0) { if (s.round >= ROUNDS) { s.over = true; const ok = s.scores.filter(Boolean).length; done(ok >= 4 ? 2 : ok >= 2 ? 1 : 0); return false; } newRound(s); } return; }
    if (!s.holding && s.level === 0) { s.idle += dt; if (s.idle > 4) { s.idle = 0; settle(false); return; } }
    if (s.holding) { s.level += s.speed * dt * (1 + s.level / 160); if (s.level >= 100) { s.level = 100; s.holding = false; settle(false, true); } }
    function settle(ok: boolean, spilt = false) {
      if (!ok && !spilt && s.level === 0) s.level = 0.0001; // marks 'too slow'
      s.scores.push(ok); s.round += 1; s.wait = 0.9; if (spilt) s.spill = 0.6; sfx(ok ? 'coin' : 'warn'); if (ok) good(); else bad(); }
    (st.current as unknown as { settle: typeof settle }).settle = settle;
  });
  const down = () => { const s = st.current; if (!s.over && s.wait <= 0 && s.level === 0) { s.holding = true; sfx('paper'); } };
  const up = () => { const s = st.current; if (!s.holding) return; s.holding = false; (s as unknown as { settle: (ok: boolean) => void }).settle(s.level >= s.band[0] && s.level <= s.band[1]); };
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === ' ') { e.preventDefault(); if (e.type === 'keydown' && !e.repeat) down(); if (e.type === 'keyup') up(); } }; addEventListener('keydown', k); addEventListener('keyup', k); return () => { removeEventListener('keydown', k); removeEventListener('keyup', k); }; }, []);
  const s = st.current;
  return (
    <>
      <Hud left={ROUNDS - s.round} total={ROUNDS}>Pour <b>{Math.min(s.round + 1, ROUNDS)}</b> of {ROUNDS} · {s.scores.filter(Boolean).length} on the line · 4 is clean</Hud>
      <div class={`mg-arena vat ${s.spill > 0 ? 'shake' : ''}`}>
        <span class="mg-jug"><Sprite theme={g.theme} size={44} />{s.holding && <i class="mg-stream" />}</span>
        <span class="mg-glass">
          <i class="mg-band" style={{ bottom: `${s.band[0]}%`, height: `${s.band[1] - s.band[0]}%` }} />
          <i class="mg-liquid" style={{ height: `${s.level}%` }} />
          {s.wait > 0 && <b class={`mg-verdict ${s.scores[s.scores.length - 1] ? 'ok' : ''}`}>{s.spill > 0 ? 'SPILT!' : s.scores[s.scores.length - 1] ? 'PERFECT' : s.level < 0.01 ? 'TOO SLOW' : s.level < s.band[0] ? 'TOO LITTLE' : 'TOO MUCH'}</b>}
        </span>
      </div>
      <button class={`btn mg-big ${s.holding ? 'go' : ''}`} onPointerDown={down} onPointerUp={up} onPointerLeave={up}>{s.holding ? 'POURING… let go!' : 'Hold to pour'}</button>
      <p class="hint">Hold to pour, let go inside the yellow band. It pours faster as it fills.</p>
    </>
  );
}

// ---- 15. Sling: drag back and let go to lob things at targets (the slingshot genre) ----
function Sling({ g, done }: { g: CardGame; done: Done }) {
  const SHOTS = 7, GOAL = 4, T = 25, O: [number, number] = [14, 78];
  const place = () => ({ x: rnd(52, 90), y: rnd(25, 78), vy: Math.random() < 0.5 ? rnd(-14, 14) : 0 });
  const st = useRef({ shots: SHOTS, hits: 0, targets: [place(), place(), place()], ball: null as null | { x: number; y: number; vx: number; vy: number }, aim: null as null | [number, number], t: 0, over: false, pop: [] as { x: number; y: number; at: number }[] });
  const arena = useRef<HTMLDivElement>(null);
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t;
    for (const tg of s.targets) { tg.y += tg.vy * dt; if (tg.y < 20 || tg.y > 82) tg.vy *= -1; }
    if (s.ball) {
      const b = s.ball;
      b.vy += 90 * dt; b.x += b.vx * dt; b.y += b.vy * dt;
      s.targets.forEach((tg, i) => { if (Math.hypot(tg.x - b.x, (tg.y - b.y) * 0.85) < 7) { s.hits += 1; s.pop.push({ x: tg.x, y: tg.y, at: t }); s.targets[i] = place(); sfx('stamp'); good(); } });
      if (b.x > 105 || b.y > 105 || b.x < -5) { s.ball = null; if (s.shots === 0 || s.hits >= GOAL) finish(); }
    }
    s.pop = s.pop.filter((p) => t - p.at < 0.6);
    if (t >= T && !s.ball) { finish(); return false; }
    function finish() { s.over = true; done(s.hits >= GOAL ? 2 : s.hits >= 2 ? 1 : 0); }
  });
  const pos = (e: PointerEvent): [number, number] => { const r = arena.current!.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100]; };
  const s = st.current;
  const pull: [number, number] | null = s.aim ? [clamp(O[0]! - s.aim[0], -40, 40), clamp(O[1]! - s.aim[1], -40, 40)] : null;
  const dots = pull ? Array.from({ length: 7 }, (_, i) => { const tt = i * 0.07; return [O[0] + pull[0] * 3.2 * tt, O[1] + pull[1] * 3.2 * tt + 45 * tt * tt]; }) : [];
  return (
    <>
      <Hud left={T - s.t} total={T}><b>{s.hits}</b> of {GOAL} hits · {s.shots} shot{s.shots === 1 ? '' : 's'} left</Hud>
      <div ref={arena} class="mg-arena range"
        onPointerDown={(e) => { if (!s.ball && s.shots > 0 && !s.over) { (e.target as Element).setPointerCapture?.(e.pointerId); s.aim = pos(e); } }}
        onPointerMove={(e) => { if (s.aim) s.aim = pos(e); }}
        onPointerUp={() => { if (!s.aim || !pull) return; if (Math.hypot(pull[0], pull[1]) > 4) { s.ball = { x: O[0], y: O[1], vx: pull[0] * 3.2, vy: pull[1] * 3.2 }; s.shots -= 1; sfx('paper'); } s.aim = null; }}>
        <span class="mg-sling" style={{ left: `${O[0]}%`, top: `${O[1]}%` }} />
        {dots.map(([x, y], i) => <i key={i} class="mg-dot" style={{ left: `${x}%`, top: `${y}%`, opacity: 1 - i / 8 }} />)}
        {s.targets.map((tg, i) => <span key={i} class="mg-ent target" style={{ left: `${tg.x}%`, top: `${tg.y}%` }}><Sprite theme={g.bad ?? 'cone'} size={40} /></span>)}
        {s.pop.map((p, i) => <span key={`p${i}`} class="mg-pop2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>POW!</span>)}
        {s.ball && <span class="mg-ent" style={{ left: `${s.ball.x}%`, top: `${s.ball.y}%`, rotate: `${s.t * 700}deg` }}><Sprite theme={g.theme} size={30} /></span>}
        {!s.ball && !s.aim && <span class="mg-ent" style={{ left: `${O[0]}%`, top: `${O[1]}%` }}><Sprite theme={g.theme} size={30} /></span>}
      </div>
      <p class="hint">Press anywhere, drag back like a slingshot, let go. Hit {GOAL} with {SHOTS} shots.</p>
    </>
  );
}

// ---- 16. Spot: one of these is not like the others. Find it, eight times ----
function Spot({ g, done }: { g: CardGame; done: Done }) {
  const T = 24, ROUNDS = 8;
  const deal = (round: number) => {
    const n = round < 3 ? 9 : round < 6 ? 16 : 20;
    const kinds = g.bad ? ['flip', 'turn', 'small', 'other'] : ['flip', 'turn', 'small'];
    return { n, odd: Math.floor(Math.random() * n), kind: kinds[Math.floor(Math.random() * kinds.length)]! };
  };
  const st = useRef({ round: 0, grid: deal(0), misses: 0, t: 0, over: false, penalty: 0, flash: 0 });
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t + s.penalty; s.flash = Math.max(0, s.flash - dt);
    if (s.t >= T) { s.over = true; done(s.round >= 5 ? 1 : 0); return false; }
  });
  const pick = (i: number) => {
    const s = st.current;
    if (s.over) return;
    if (i === s.grid.odd) { s.round += 1; sfx('coin'); if (s.round % 3 === 0) good(); if (s.round >= ROUNDS) { s.over = true; done(s.misses <= 1 ? 2 : 1); return; } s.grid = deal(s.round); }
    else { s.misses += 1; s.penalty += 2; s.flash = 0.3; sfx('warn'); bad(); }
  };
  const s = st.current, cols = s.grid.n === 9 ? 3 : 4;
  return (
    <>
      <Hud left={T - s.t} total={T}>Round <b>{Math.min(s.round + 1, ROUNDS)}</b> of {ROUNDS} · wrong taps cost 2 seconds</Hud>
      <div class={`mg-spot ${s.flash > 0 ? 'shake' : ''}`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: s.grid.n }, (_, i) => {
          const odd = i === s.grid.odd;
          const k = odd ? s.grid.kind : '';
          return <button key={`${s.round}-${i}`} class={`mg-cell ${k}`} aria-label={`Item ${i + 1}`} onPointerDown={() => pick(i)}><Sprite theme={k === 'other' ? g.bad! : g.theme} size={cols === 3 ? 56 : 44} /></button>;
        })}
      </div>
      <p class="hint">Tap the odd one out: flipped, upside down, smaller, or something else entirely.</p>
    </>
  );
}

// ---- 17. Balance: keep it upright against the gusts by leaning left and right ----
function Balance({ g, done }: { g: CardGame; done: Done }) {
  const T = 20;
  const st = useRef({ a: 0, w: 0, push: 0, gust: 0, gustT: 1.5, falls: 0, t: 0, over: false, down: 0 });
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t;
    if (s.down > 0) { s.down -= dt; if (s.down <= 0) { s.a = rnd(-4, 4); s.w = 0; } return; }
    if (t > s.gustT) { s.gust = (Math.random() < 0.5 ? -1 : 1) * rnd(18, 30 + t * 2); s.gustT = t + rnd(1.4, 2.6); }
    s.gust *= Math.pow(0.4, dt);
    s.w += (s.a * 1.5 + s.gust + s.push * 95) * dt;
    s.w *= Math.pow(0.3, dt);
    s.a += s.w * dt;
    if (Math.abs(s.a) > 42) { s.falls += 1; s.down = 0.9; sfx('lose'); bad(); }
    if (t >= T) { s.over = true; done(s.falls === 0 ? 2 : s.falls <= 2 ? 1 : 0); return false; }
  });
  const set = (v: number) => { st.current.push = v; };
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') set(e.type === 'keydown' ? -1 : 0); if (e.key === 'ArrowRight') set(e.type === 'keydown' ? 1 : 0); }; addEventListener('keydown', k); addEventListener('keyup', k); return () => { removeEventListener('keydown', k); removeEventListener('keyup', k); }; }, []);
  const s = st.current;
  return (
    <>
      <Hud left={T - s.t} total={T}>{s.falls} fall{s.falls === 1 ? '' : 's'} · none is clean{Math.abs(s.gust) > 25 ? ' · GUST!' : ''}</Hud>
      <div class={`mg-arena windy ${Math.abs(s.gust) > 25 ? 'gusty' : ''}`}>
        <span class="mg-pole" style={{ rotate: `${s.down > 0 ? Math.sign(s.a) * 80 : s.a}deg` }}><span class="mg-pole-top"><Sprite theme={g.theme} size={48} /></span></span>
        <span class="mg-base" />
        <span class="mg-gauge"><i style={{ left: `${50 + clamp(s.a, -42, 42) * 1.15}%` }} /></span>
      </div>
      <div class="mg-lanes two"><button class="btn mg-lanebtn l0" onPointerDown={() => set(-1)} onPointerUp={() => set(0)} onPointerLeave={() => set(0)}>◀ Lean</button><button class="btn mg-lanebtn l2" onPointerDown={() => set(1)} onPointerUp={() => set(0)} onPointerLeave={() => set(0)}>Lean ▶</button></div>
      <p class="hint">Hold a side to lean against it. Gusts come out of nowhere. Don't overcorrect.</p>
    </>
  );
}

// ---- 18. Fish: wait for the real bite, ignore the nibbles ----
function Fish({ g, done }: { g: CardGame; done: Done }) {
  const T = 25, GOAL = 5;
  const st = useRef({ phase: 'wait' as 'wait' | 'nibble' | 'bite' | 'caught', until: rnd(1.2, 2.6), caught: 0, scared: 0, t: 0, over: false, flash: 0 });
  useLoop((dt, t) => {
    const s = st.current;
    if (s.over) return false;
    s.t = t; s.flash = Math.max(0, s.flash - dt);
    if (t >= s.until) {
      if (s.phase === 'wait') { if (Math.random() < 0.45) { s.phase = 'nibble'; s.until = t + rnd(0.3, 0.6); } else { s.phase = 'bite'; s.until = t + Math.max(0.38, 0.62 - s.caught * 0.04); sfx('tap'); } }
      else if (s.phase === 'nibble') { s.phase = 'wait'; s.until = t + rnd(0.4, 1.4); }
      else if (s.phase === 'bite') { s.phase = 'wait'; s.until = t + rnd(0.9, 2.2); }
      else { s.phase = 'wait'; s.until = t + rnd(0.9, 2.0); }
    }
    if (s.caught >= GOAL) { s.over = true; done(s.scared <= 1 ? 2 : 1); return false; }
    if (t >= T) { s.over = true; done(s.caught >= 3 ? 1 : 0); return false; }
  });
  const reel = () => {
    const s = st.current;
    if (s.over) return;
    if (s.phase === 'bite') { s.caught += 1; s.phase = 'caught'; s.until = s.t + 0.8; sfx('win'); good(); }
    else if (s.phase !== 'caught') { s.scared += 1; s.flash = 0.35; s.phase = 'wait'; s.until = s.t + rnd(1.2, 2.2); sfx('warn'); bad(); }
  };
  useEffect(() => { const k = (e: KeyboardEvent) => { if (e.key === ' ' && !e.repeat) { e.preventDefault(); reel(); } }; addEventListener('keydown', k); return () => removeEventListener('keydown', k); }, []);
  const s = st.current;
  return (
    <>
      <Hud left={T - s.t} total={T}><b>{s.caught}</b> of {GOAL} caught · {s.scared} scared off</Hud>
      <button class={`mg-arena pond ${s.flash > 0 ? 'shake' : ''}`} onPointerDown={reel} aria-label="Reel in">
        <span class="mg-rod" />
        <span class="mg-line2" />
        <span class={`mg-bobber ${s.phase}`} />
        {s.phase === 'bite' && <b class="mg-splash">!</b>}
        {s.phase === 'caught' && <span class="mg-ent caught" style={{ left: '62%', top: '30%' }}><Sprite theme={g.theme} size={60} /></span>}
        <span class="mg-ripple" />
      </button>
      <p class="hint">Tap the moment the float plunges. Little twitches are nibbles: leave them.</p>
    </>
  );
}

const HOW: Record<CardGame['type'], string> = {
  catch: 'Drag the basket. Catch the right things, dodge the wrong ones. 20 seconds.',
  dodge: 'Tap a lane to move. Don\'t crash. 20 seconds, and it speeds up.',
  whack: 'Tap the right ones as they pop up. Don\'t tap the wrong ones. 18 seconds.',
  match: 'One quick look, then find all six pairs. 14 seconds. Concentrate.',
  stack: 'Tap to drop each piece on the last. Ten pieces. Overhang is cut off.',
  simon: 'Watch the signals, then repeat them. Three rounds, each one longer.',
  tug: 'Tap fast on green. Stop on red. Hold the line for 18 seconds. It pulls harder as it goes.',
  flap: 'Tap to flap through the gaps. 22 seconds. Five crashes and it\'s over.',
  jump: 'Tap to jump. It speeds up. 22 seconds.',
  snake: 'Steer to collect twelve. Don\'t hit the walls or your own tail.',
  slice: 'Swipe through everything thrown up. Never the bombs. 20 seconds.',
  invaders: 'Drag to move, tap to fire. Clear them before they land. Three lives.',
  breakout: 'Drag the paddle, bounce the ball, knock out the bricks. Three balls.',
  pour: 'Hold to pour, let go inside the band. Five pours, each one faster.',
  sling: 'Drag back like a slingshot and let go. Hit four targets with seven shots.',
  spot: 'Find the odd one out. Eight rounds, more to search each time.',
  balance: 'Hold left or right to lean against the gusts. Twenty seconds. Don\'t let it fall.',
  fish: 'Wait for the float to plunge, then tap. Ignore the nibbles.',
};

const SHOUT: Record<string, string> = {
  gerald: 'HONK!', barb: 'Code red!', chad: 'My assets!', marge: 'Hold the front page!', pam: 'The children!', doug: 'The budget!',
  linda: 'I knew it!', steve: 'Incoming!', timmy: 'WHOA!', stranger: 'Interesting…', dave: 'Boss? BOSS!',
};
const HECKLE: Record<string, [string[], string[], string[]]> = { // [start, going well, going badly]
  gerald: [['Honk. (Begin.)', 'The union is watching.'], ['Honk! (Approval.)', 'Acceptable. For a human.'], ['HONK!! (Fury.)', 'The union is taking notes.', 'That was a goose. Apologise.']],
  barb: [['Eyes up, Mayor.', 'By the book.'], ['Textbook.', "I'd deputise you.", 'Crisp. Lawful. Crisp.'], ["That's a misdemeanour.", "I'm writing you a ticket.", 'I saw that. Everyone saw that.']],
  chad: [["Time is money. Go.", "Make me proud. Or rich."], ['Ka-ching!', "You're a natural asset.", 'Now THAT is growth.'], ['That cost me a yacht.', 'Oof. Bad investment.', 'Selling. Selling!']],
  marge: [["I'm live. Go.", 'Smile for the camera.'], ['Front page material!', "I'm drafting the headline.", 'Ooh, an angle!'], ["Ooh, that's a headline.", 'Hold still, I need a photo.', "'MAYOR FLAILS.' Lovely."]],
  pam: [['The PTA is watching.', 'Clipboards ready.'], ['The PTA approves!', 'Gold star.', 'A merit badge!'], ['The children saw that.', "I'm telling the PTA.", 'Detention. For you.']],
  doug: [['Please be careful.', "I've got my calculator."], ['The budget breathes!', "Oh, that's lovely.", 'Numbers going up!'], ['My heart.', "That's coming out of my lunch.", "I'm lying down now."]],
  linda: [['They are watching.', 'Remember: trust no one.'], ['Just as foretold.', 'The books are pleased.'], ['They got to you.', "That's what THEY wanted.", "Classic them."]],
  steve: [['Conditions: unclear.', 'Hold onto your hat.'], ['Clear skies!', 'Fair weather!', 'A warm front of success!'], ['Turbulence!', 'Storm warning. For you.', 'Precipitation of failure.']],
  timmy: [['Go go go!', 'Is this the fun bit?'], ['WHOAAA!', "You're so cool!", 'Do it again!'], ["Ha! You're bad at this!", "My mum's better.", 'Can I have a go?']],
  stranger: [['Show me.', "Let's see."], ['Interesting.', 'You might do.'], ['Hm.', "I've seen this before.", 'Disappointing.']],
  dave: [['We... I believe in you.', 'Go, boss.'], ['Nice one, boss!', 'All three of us are proud.'], ['Boss, no.', "I'll get the bin.", 'We... I saw nothing.']],
};
const pickLine = (who: string, i: 0 | 1 | 2, n: number) => { const pool = (HECKLE[who] ?? HECKLE.dave!)[i]; return pool[n % pool.length]!; };
const firstSentence = (text: string) => (text.match(/^.*?[.!?](\s|$)/)?.[0] ?? text).trim();

/** A two-panel comic of the problem arriving, before the game. Tap to skip. */
function Clip({ card, job, onEnd }: { card: Card; job: CardGame; onEnd: () => void }) {
  useEffect(() => { sfx(card.who === 'gerald' ? 'honk' : 'drum'); const t = setTimeout(onEnd, 3600); return () => clearTimeout(t); }, []);
  return (
    <button class="clip" onClick={onEnd} aria-label="Skip the clip">
      <span class="panel-tag">THE PROBLEM</span>
      <span class="clip-problem">
        <Portrait who={card.who} mood="annoyed" size={70} />
        <span class="bubble">{SHOUT[card.who] ?? 'Mayor!'} {firstSentence(card.text)}</span>
      </span>
      <span class="panel-tag">YOUR JOB</span>
      <span class="clip-stage">
        <span class="clip-sun" /><span class="clip-hill" /><span class="clip-house h1" /><span class="clip-house h2" /><span class="clip-house h3" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <span key={i} class="clip-run" style={{ 'animation-delay': `${0.5 + i * 0.17}s`, top: `${30 + (i % 3) * 17}%` }}>
            <span class="clip-dust" style={{ 'animation-delay': `${i * 0.17}s` }} />
            <span class="clip-bounce" style={{ 'animation-delay': `${i * 0.07}s` }}><Sprite theme={i % 4 === 3 && job.bad ? job.bad : job.theme} size={i % 2 ? 48 : 38} /></span>
            <span class="clip-shadow" />
          </span>
        ))}
        <span class="clip-title">{job.title}</span>
      </span>
      <span class="hint">Tap to skip</span>
    </button>
  );
}

/** The resolution: what the town looks like once you've had a go. Shown at the top of the result. */
export function Aftermath({ card, skill }: { card: Card; skill: Skill }) {
  const g = card.game!;
  const cls = ['flop', 'sloppy', 'clean'][skill]!;
  return (
    <div class={`after ${cls}`} role="img" aria-label={['It went badly.', 'It went sloppily.', 'It went well.'][skill]}>
      <span class="clip-sun" /><span class="clip-hill" /><span class="clip-house h1" /><span class="clip-house h2" /><span class="clip-house h3" />
      {[0, 1, 2, 3, 4, 5].map((i) => <span key={i} class="after-it" style={{ left: `${9 + i * 13}%`, '--i': i, 'animation-delay': `${i * 0.08}s` }}><Sprite theme={skill === 0 && i % 3 === 1 && g.bad ? g.bad : g.theme} size={38} /></span>)}
      {skill === 2 && [0, 1, 2, 3, 4].map((i) => <span key={`s${i}`} class="after-star" style={{ left: `${10 + i * 19}%`, top: `${8 + (i % 2) * 14}%`, 'animation-delay': `${i * 0.15}s` }}><Sprite theme="star" size={20} /></span>)}
      {skill === 0 && [0, 1, 2, 3].map((i) => <span key={`p${i}`} class="after-puff" style={{ left: `${14 + i * 22}%`, 'animation-delay': `${i * 0.2}s` }} />)}
      <span class="panel-tag after-tag">THE RESULT</span>
      <span class="after-who"><Portrait who={card.who} mood={skill === 2 ? 'pleased' : skill === 1 ? 'neutral' : 'annoyed'} size={64} /></span>
    </div>
  );
}

/** Twists: the same game rarely plays the same way twice. Chosen from the card and the day, so it's the same for everyone. */
const TWISTS = [
  { id: 'none', name: '' }, { id: 'none', name: '' },
  { id: 'speedy', name: 'Twist: everything is in a hurry' },
  { id: 'fog', name: 'Twist: thick fog' },
  { id: 'wobble', name: 'Twist: the ground is wobbling' },
  { id: 'tiny', name: 'Twist: everything shrank' },
  { id: 'dark', name: 'Twist: someone turned the lights off' },
];
function twistFor(card: Card, idx: number, day: number) {
  let h = idx * 31 + day * 7;
  for (const ch of card.id) h = (h * 33 + ch.charCodeAt(0)) >>> 0;
  return TWISTS[h % TWISTS.length]!;
}

/** Plays a card's game (or a catastrophe's three games in a row) and reports one Skill. */
export function MiniGame({ card, onDone, day = 1 }: { card: Card; onDone: (skill: Skill) => void; day?: number }) {
  const games = card.stages ?? [card.game!];
  const [idx, setIdx] = useState(0);
  const g = games[idx]!;
  const twist = twistFor(card, idx, day);
  timeScale = twist.id === 'speedy' ? 1.3 : 1;
  const [stage, setStage] = useState<'clip' | 'how' | 'play' | 'end'>('clip');
  const [count, setCount] = useState(4);
  const [results, setResults] = useState<Skill[]>([]);
  const [line, setLine] = useState(() => pickLine(card.who, 0, card.id.length));
  const [lineMood, setLineMood] = useState<'neutral' | 'pleased' | 'annoyed'>('neutral');
  const last = useRef(0), n = useRef(0);
  heckle = (ok: boolean) => {
    const now = performance.now();
    if (now - last.current < 1300) return;
    last.current = now; n.current += 1;
    setLine(pickLine(card.who, ok ? 1 : 2, n.current + card.id.length)); setLineMood(ok ? 'pleased' : 'annoyed');
  };
  // Test hook for the automated smoke test only (set from the test script, never from the UI).
  const auto = (globalThis as { __mgSkill?: Skill }).__mgSkill;
  useEffect(() => { if (auto !== undefined) { const t = setTimeout(() => onDone(auto), 250); return () => clearTimeout(t); } }, []);
  useEffect(() => {
    if (stage !== 'how' || count > 3) return;
    if (count === 0) { setStage('play'); return; }
    const t = setTimeout(() => { setCount(count - 1); sfx('tap'); }, 700);
    return () => clearTimeout(t);
  }, [stage, count]);
  const finish = (sk: Skill) => {
    if (stage === 'end') return;
    const all = [...results, sk];
    setResults(all); setStage('end');
    sfx(sk === 2 ? 'win' : sk === 0 ? 'lose' : 'coin');
    setLine(pickLine(card.who, sk === 0 ? 2 : 1, all.length)); setLineMood(sk === 0 ? 'annoyed' : 'pleased');
    if (all.length < games.length) setTimeout(() => { setIdx(all.length); setCount(4); setStage('how'); setLine(pickLine(card.who, 0, all.length)); setLineMood('neutral'); }, 1500);
    else {
      const total = all.reduce<number>((a, b) => a + b, 0);
      const final = (games.length === 1 ? sk : total >= 5 ? 2 : total >= 3 ? 1 : 0) as Skill;
      setTimeout(() => onDone(final), 1300);
    }
  };
  if (stage === 'clip') return <Clip card={card} job={g} onEnd={() => setStage('how')} />;
  return (
    <div class={`mg twist-${twist.id}`} data-game={g.type}>
      {card.major && <div class="ribbon">CATASTROPHE · stage {idx + 1} of {games.length}</div>}
      <div class="mg-head"><Sprite theme={g.theme} size={36} /><h2 class="display">{g.title}</h2></div>
      <div class="heckle"><Portrait who={card.who} size={40} mood={lineMood} /><span class="bubble" key={line}>{line}</span></div>
      {stage === 'how' && (
        <div class="mg-how">
          <p class="howto">{HOW[g.type]}</p>
          {twist.name && <p class="twist">{twist.name}</p>}
          {count > 3 ? <button class="btn primary" autoFocus onClick={() => { setCount(3); sfx('tap'); }}>Go</button> : <div class="mg-count" key={count}>{count}</div>}
          <p class="hint">{card.major ? 'Three stages. Every group is watching. A bad job costs everyone.' : 'A clean job keeps your deal as it is. Anything less costs extra.'}</p>
        </div>
      )}
      {stage === 'play' && <PlayGame key={idx} g={g} done={finish} />}
      {stage === 'end' && <div class={`mg-result s${results[results.length - 1]}`}>{['Disaster.', 'Sloppy, but done.', 'A clean job!'][results[results.length - 1] ?? 0]}{games.length > 1 && <small>{results.length < games.length ? `Stage ${results.length + 1} next…` : 'That was the last one.'}</small>}</div>}
    </div>
  );
}

function PlayGame({ g, done }: { g: CardGame; done: Done }) {
  switch (g.type) {
    case 'catch': return <Catch g={g} done={done} />;
    case 'dodge': return <Dodge g={g} done={done} />;
    case 'whack': return <Whack g={g} done={done} />;
    case 'match': return <Match g={g} done={done} />;
    case 'stack': return <Stack g={g} done={done} />;
    case 'simon': return <Simon g={g} done={done} />;
    case 'tug': return <Tug g={g} done={done} />;
    case 'flap': return <Flap g={g} done={done} />;
    case 'jump': return <Jump g={g} done={done} />;
    case 'snake': return <Snake g={g} done={done} />;
    case 'slice': return <Slice g={g} done={done} />;
    case 'invaders': return <Invaders g={g} done={done} />;
    case 'breakout': return <Breakout g={g} done={done} />;
    case 'pour': return <Pour g={g} done={done} />;
    case 'sling': return <Sling g={g} done={done} />;
    case 'spot': return <Spot g={g} done={done} />;
    case 'balance': return <Balance g={g} done={done} />;
    case 'fish': return <Fish g={g} done={done} />;
  }
}
