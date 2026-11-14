# Mayor of Bad Town (working title)

A comedy town-management game played in 3-5 minutes a day. One real week is one term in office.

Status: **playable preview** (M1-M3 scope in rough form: full week, art, sound, crowd reveal with labelled preview data).

```bash
npm install
npm run dev         # play locally
npm test            # 41 engine tests (Vitest)
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

## Rules decisions so far (all open to change)

- Money is stored in $k. Approval arrows map to numbers: one arrow = 5, two arrows = 10.
- `Card.month` is 1 or 2 (which of the day's two months). `Option.monthly` was added for leases, `Option.campaign` for the Sunday card, `Card.repeatable` for group-pressure cards.
- A conditional card (escalation, low-Law crime, high-approval pressure, secret) takes the third desk slot, at most one per month. The fixed card it displaces is dropped without penalty.
- Combos pay out automatically at month end and appear in the month report.
- Promises still open at the election come due then: paid if the town has the money, otherwise broken.
- An option that would push Money straight below -$50k cannot be picked. Upkeep can still take you there.
- Deputy Dave's outcome is independent of the card he was given (one shared table).
- Approval fades every month (`TUNING.fade` 5, plus 0.2 per point above 50, less below 50, never under 0). Shown in the month report as "the mood this month".
- A conditional card arrives stamped URGENT; ignoring it costs double.
- You can start on any day. Deputy Dave governs the days you missed (`src/engine/dave.ts`); the town is handed back with every group at 45 or more, money between $40k and $90k, and no recalls or broken promises from his watch.
- The desk shows 4 requests and you get 3 actions a month (6 decisions a day plus Dave and the daily event).
- Town setup once per term (`setup` action): mayor name, town name, the group that elected you (+8, its rival -4) and one head start (+$30k, +2 Favors, or Dave takes two requests a month). Names can be changed later (`rename`).
- Gamble options show their odds and both outcomes before you choose; the roll is seeded per player.
- From Thursday (month 7) a second URGENT card can land each month. Late-week crisis cards use `requires.fromMonth`.
- Many options set a flag that the town map draws (see `Town` in `src/ui/art.tsx`): the moon flag, Kevin the pothole, the roundabout, the flood, the monster and so on.
