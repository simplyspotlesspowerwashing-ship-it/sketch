# Mayor of Bad Town (working title)

A comedy town-management game played in 3-5 minutes a day. One real week is one term in office.

Status: **M0** (engine, content schema, balance simulator, placeholder cards). No playable screen yet; that is M1.

```bash
npm install
npm test            # engine unit tests (Vitest)
npm run validate    # schema-check the week pack
npm run sim         # 5,000 terms per bot -> reports/balance.md   (npm run sim -- 500 out.md for a quick run)
npm run dev         # Vite dev server (placeholder page until M1)
```

Node 22.18+ is required: the simulator runs the TypeScript sources directly.

## Layout

```
src/engine/     pure rules engine: reduce(state, action, content, rng) -> state. No DOM.
  tuning.ts     every balance number in one place
src/content/    Zod schema, shared projects and combos, week packs (JSON)
sim/            bot policies and the balance simulator
tests/          engine unit tests
reports/        committed balance reports
CONTENT_GUIDE.md  how to write cards
```

## Rules decisions made in M0 (all open to change)

- Money is stored in $k. Approval arrows map to numbers: one arrow = 5, two arrows = 10.
- `Card.month` is 1 or 2 (which of the day's two months). `Option.monthly` was added for leases, `Option.campaign` for the Sunday card, `Card.repeatable` for group-pressure cards.
- A conditional card (escalation, low-Law crime, high-approval pressure, secret) takes the third desk slot, at most one per month. The fixed card it displaces is dropped without penalty.
- Combos pay out automatically at month end and appear in the month report.
- Promises still open at the election come due then: paid if the town has the money, otherwise broken.
- An option that would push Money straight below -$50k cannot be picked. Upkeep can still take you there.
- Deputy Dave's outcome is independent of the card he was given (one shared table).
