# Mayor of Bad Town (working title)

A comedy town-management game played in 3-5 minutes a day. One real week is one term in office.

Status: **playable preview** (M1-M3 scope in rough form: full week, art, sound, crowd reveal with labelled preview data).

```bash
npm install
npm run dev         # play locally
npm test            # 44 engine tests (Vitest)
npm run validate    # schema-check the week pack
npm run sim         # 5,000 terms per bot -> reports/balance.md
node sim/stats.ts   # regenerate the labelled preview crowd data
npm run build && npx vite preview --port 4173 &
node e2e/smoke.cjs /tmp/shots 2    # browser playthrough to election night
```

Node 22.18+ is required: the simulator runs the TypeScript sources directly. Triple-tap the title in the game for the dev panel.

## Layout

```
src/engine/     pure rules engine: reduce(state, action, content, rng) -> state. No DOM.
  tuning.ts     every balance number in one place
src/content/    Zod schema, shared projects and combos, week packs (JSON)
src/ui/         Preact screen, SVG art (art.tsx), storage / calendar / sound / stats (platform.ts)
sim/            bot policies, balance simulator, preview-stats generator
e2e/            browser smoke test
tests/          engine unit tests
reports/        committed balance reports
CONTENT_GUIDE.md  how to write cards
```

## Rules as they stand (all open to change)

- Money is in $k. One approval arrow = 5 points, two = 10.
- A day is: today's three (the same for every mayor; the first is the day's own story card), midday (one of three activities, or rest), your town's three (drawn from your own situation), then the Mayor's Hour (up to two decrees from four on offer), then the poll. Sunday is the campaign card and the election.
- Midday activities (`pack.initiatives`) are the only place a mini-game can pay off: clean, sloppy and flop each have their own outcome.
- Two catastrophes a week (`pack.catastrophes`, on `TUNING.catastropheDays`, Wednesday and Saturday) head today's three. They are played as three games in a row; a sloppy or failed job costs every group and more money. Dave cannot take them.
- Enacting a decree sets flag `law:<id>`; follow-up cards react to it.
- Your town's three are, in order: cards that follow from your choices, late-week crises and group-pressure cards (all URGENT; one a day early in the week, two from Thursday), then ordinary cards from whichever groups like you least. Each carries a reason (`DeskSlot.why`) the UI shows.
- Nobody ends the month by hand: the desk closes when its three cards are done.
- Every desk has 3 requests and all 3 must be dealt with. There is no action limit and no ignoring.
- Every desk card is played through a mini-game (`Card.game`, sixteen types in `src/ui/minigames.tsx`: catch, dodge, whack, match, stack, simon, tug, flap, jump, snake, slice, invaders, breakout, rhythm, cross, sort). The UI passes a `skill` on the `choose` action: 2 clean, 1 sloppy, 0 flop. There is no bonus: clean gives exactly the chosen trade, sloppy costs 5 approval from the card's group, a flop costs 10 and $5k. Doubled on URGENT cards.
- Sending Deputy Dave instead costs 1 Favor (no game, random outcome from his table).
- Conditional cards (escalations, crises, group pressure, secrets) arrive URGENT; up to two a month from Thursday. A protest (People under 35) makes every card URGENT the next month.
- Approval fades after each desk (`TUNING.fade` 2.75, plus 0.1 per point above 50, never below 0).
- Gamble options show their odds and both outcomes; the roll is seeded per player.
- Decrees last the term, pay or cost every month, and appear in the law book and on the map's notice board.
- Town setup (names, base group, one head start) happens once, at the end of the first day played. Names can be changed later.
- You can start on any day. Deputy Dave governs missed days (`src/engine/dave.ts`); the handover floors approval at 45 and money at $40k, caps money at $90k, and wipes his recalls and broken promises.
- Promises still open at the election are paid if the money is there, otherwise broken.
- Many options set a flag that the town map draws (`Town` in `src/ui/art.tsx`).

Browser checks: `node e2e/smoke.cjs <dir> [dayOffset]` plays to election night (mini-games are auto-finished through a test hook); `node e2e/games.cjs <url> <dir> [idle]` plays each mini-game for real with a scripted player.
- Both ends are dangerous: a group at 0 or at 100 recalls you. Each cause (`low:<group>`, `high:<group>`, `bankrupt`) has its own named ending in `pack.endings`, as do the four ways a week can end (`term:*`).
- The scrapbook (book icon) keeps unlocked endings, a career record and twelve deeds across weeks in the save (`scrapbook`, `career`, `deeds`). Deeds are cosmetic so the shared daily content stays identical for everyone.
- Options can carry a `lasting` effect (a feud, a fan club, a deal) that ticks every month for a set number of months and shows as an alert while active.
- Like Reigns, a card does not show its effects before you choose. Options show only what you must know to pick (Favors needed, and whether it builds, promises, gambles or lingers); the game you'll play is revealed by the clip; where the effects landed is revealed afterwards, meter by meter. The Sunday campaign card still shows its effect on the vote.
- The day's agenda (today's three, midday, your town's three, tonight's laws) sits on the desk; midday and tonight can be previewed at any time (`agenda()` in the engine computes the same offers the engine will make).
- The town's weather follows the average mood (rain below 40, sunshine from 60), and after each choice a crowd runs to the affected group's building to cheer or protest.
