// Seven mini-games, 15-30 seconds each, themed by the card being played. Each reports a Skill:
// 2 clean, 1 sloppy, 0 flop. There is no skip and no bonus: a clean job gets exactly the trade you
// chose, anything less costs extra. They are pure UI; the engine only ever sees the Skill.
import { useEffect, useRef, useState } from 'preact/hooks';
import type { Card, CardGame, Skill } from '../engine/types.ts';
import { NAMES, Portrait, SPRITE_NAMES, Sprite } from './art.tsx';
import { sfx } from './platform.ts';

type Done = (skill: Skill) => void;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const rnd = (a: number, b: number) => a + Math.random() * (b - a);

/** Frame loop: calls `step(dt, elapsed)` every frame and re-renders. Stops when `step` returns false. */
function useLoop(step: (dt: number, t: number) => boolean | void) {
  const [, setFrame] = useState(0);
  const fn = useRef(step);
  fn.current = step;
  useEffect(() => {
    let raf = 0, last = performance.now(), t = 0, alive = true;
    const tick = (now: number) => {
      if (!alive) return;
      const dt = Math.min(0.05, (now - last) / 1000);
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
        if (it.bad) { s.score = Math.max(0, s.score - 2); s.shake = 0.3; sfx('warn'); } else { s.score += 1; sfx('tap'); }
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
      if (!o.hit && o.lane === s.lane && o.y > 74 && o.y < 92) { o.hit = true; s.hits += 1; s.flash = 0.35; sfx('warn'); }
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
    if (x.bad) { s.score = Math.max(0, s.score - 2); sfx('warn'); } else { s.score += 1; sfx('tap'); }
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
  const T = 28;
  const st = useRef((() => {
    const themes = [g.theme, ...SPRITE_NAMES.filter((n) => n !== g.theme).sort(() => Math.random() - 0.5)].slice(0, 6);
    const deck = [...themes, ...themes].sort(() => Math.random() - 0.5).map((theme, id) => ({ id, theme, up: true, found: false }));
    return { deck, open: [] as number[], lock: 1.6, pairs: 0, t: 0, over: false, peek: true };
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
    if (t >= T + 1.6) { s.over = true; done(s.pairs >= 4 ? 1 : 0); return false; }
  });
  const flip = (i: number) => {
    const s = st.current, c = s.deck[i]!;
    if (s.lock > 0 || c.up || c.found) return;
    c.up = true; s.open.push(i); sfx('paper');
    if (s.open.length === 2) {
      const [a, b] = s.open as [number, number];
      if (s.deck[a]!.theme === s.deck[b]!.theme) { s.deck[a]!.found = s.deck[b]!.found = true; s.pairs += 1; s.open = []; sfx('coin'); }
      else s.lock = 0.55;
    }
  };
  const s = st.current;
  return (
    <>
      <Hud left={T + 1.6 - s.t} total={T + 1.6}><b>{s.pairs}</b> of 6 pairs · all 6 for a clean job</Hud>
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
    if (hi - lo < top.w - 2) { s.wobble = 0.25; sfx('warn'); } else sfx('stamp');
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
      s.mistakes += 1; s.wrong = 0.4; sfx('warn');
      if (s.mistakes >= 2) { s.over = true; done(0); return; }
      newRound(s, s.t + 0.3);
      return;
    }
    s.input.push(i); sfx('tap');
    if (s.input.length === s.seq.length) {
      s.round += 1; sfx('coin');
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
  const pull = () => { const s = st.current; if (s.over) return; if (s.green) { s.bar += 3.6; sfx('tap'); } else { s.bar -= 12; s.oops = 0.3; sfx('warn'); } };
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

const HOW: Record<CardGame['type'], string> = {
  catch: 'Drag the basket. Catch the right things, dodge the wrong ones. 20 seconds.',
  dodge: 'Tap a lane to move. Don\'t crash. 20 seconds, and it speeds up.',
  whack: 'Tap the right ones as they pop up. Don\'t tap the wrong ones. 18 seconds.',
  match: 'You get a quick look, then find all six pairs. 28 seconds.',
  stack: 'Tap to drop each piece on the last. Ten pieces. Overhang is cut off.',
  simon: 'Watch the signals, then repeat them. Three rounds, each one longer.',
  tug: 'Tap fast on green. Stop on red. Hold the line for 18 seconds. It pulls harder as it goes.',
};
const CLIP_LINES = ['Meanwhile, outside…', 'It has begun.', 'Reports are coming in.', 'The situation has developed.', 'Nobody panic. Some panic.', 'This is happening now.'];

/** A short comic clip of the problem arriving, before the game. */
function Clip({ card, onEnd }: { card: Card; onEnd: () => void }) {
  const g = card.game!;
  useEffect(() => { sfx(card.who === 'gerald' ? 'honk' : 'drum'); const t = setTimeout(onEnd, 2800); return () => clearTimeout(t); }, []);
  const line = CLIP_LINES[(card.id.length + card.text.length) % CLIP_LINES.length]!;
  return (
    <button class="clip" onClick={onEnd} aria-label="Skip the clip">
      <span class="clip-cap">{line}</span>
      <span class="clip-stage">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => <span key={i} class="clip-run" style={{ 'animation-delay': `${i * 0.16}s`, top: `${18 + (i % 3) * 22}%` }}><span class="clip-bounce" style={{ 'animation-delay': `${i * 0.07}s` }}><Sprite theme={i % 4 === 3 && g.bad ? g.bad : g.theme} size={i % 2 ? 46 : 36} /></span></span>)}
        <span class="clip-who"><Portrait who={card.who} mood="annoyed" size={84} /><span class="clip-bang">!</span></span>
      </span>
      <span class="clip-title">{g.title}</span>
    </button>
  );
}

export function MiniGame({ card, onDone }: { card: Card; onDone: (skill: Skill) => void }) {
  const g = card.game!;
  const [stage, setStage] = useState<'clip' | 'how' | 'play' | 'end'>('clip');
  const [count, setCount] = useState(3);
  const [result, setResult] = useState<Skill | null>(null);
  // Test hook for the automated smoke test only (set from the test script, never from the UI).
  const auto = (globalThis as { __mgSkill?: Skill }).__mgSkill;
  useEffect(() => { if (auto !== undefined) { const t = setTimeout(() => onDone(auto), 250); return () => clearTimeout(t); } }, []);
  useEffect(() => {
    if (stage !== 'how' || count > 3) return;
    if (count === 0) { setStage('play'); return; }
    const t = setTimeout(() => { setCount(count - 1); sfx('tap'); }, 800);
    return () => clearTimeout(t);
  }, [stage, count]);
  const finish = (s: Skill) => {
    if (result !== null) return;
    setResult(s); setStage('end');
    sfx(s === 2 ? 'win' : s === 0 ? 'lose' : 'coin');
    setTimeout(() => onDone(s), 1100);
  };
  if (stage === 'clip') return <Clip card={card} onEnd={() => { setStage('how'); setCount(4); }} />;
  return (
    <div class="mg" data-game={g.type}>
      <div class="mg-head"><Sprite theme={g.theme} size={38} /><h2 class="display">{g.title}</h2></div>
      {stage === 'how' && (
        <div class="mg-how">
          <Portrait who={card.who} size={56} />
          <p class="bubble">{(NAMES[card.who] ?? '').split(',')[0]} is watching. {HOW[g.type]}</p>
          {count > 3 ? <button class="btn primary" autoFocus onClick={() => { setCount(3); sfx('tap'); }}>I'm ready</button> : <div class="mg-count" key={count}>{count}</div>}
          <p class="hint">A clean job gets exactly the deal you picked. A sloppy one costs extra. There's no way out of it.</p>
        </div>
      )}
      {stage === 'play' && (g.type === 'catch' ? <Catch g={g} done={finish} /> : g.type === 'dodge' ? <Dodge g={g} done={finish} /> : g.type === 'whack' ? <Whack g={g} done={finish} /> : g.type === 'match' ? <Match g={g} done={finish} /> : g.type === 'stack' ? <Stack g={g} done={finish} /> : g.type === 'simon' ? <Simon g={g} done={finish} /> : <Tug g={g} done={finish} />)}
      {stage === 'end' && <div class={`mg-result s${result}`}>{['Disaster.', 'Sloppy, but done.', 'A clean job!'][result ?? 0]}</div>}
    </div>
  );
}
