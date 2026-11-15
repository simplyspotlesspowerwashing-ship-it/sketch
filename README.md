# Mayor of Bad Town (working title)

A daily comedy card game. One real week is one term in office. Each day you play a run of cards: a character asks for something and you swipe the card left, right, up or down. Every choice moves five meters (People, Business, Law, Press, Treasury), and you don't see which way until you've chosen. Sunday is the election.

```bash
npm install
npm run dev         # play locally
npm test            # engine tests (Vitest)
npm run validate    # schema and story-integrity check of the week pack
npm run sim         # 5,000 terms per bot -> reports/balance.md
npm run build && npx vite preview --port 4173 &
node e2e/smoke.cjs /tmp/shots 1 390     # browser playthrough to election night (dir, day offset, width)
python3 sim/bundle.py                   # one self-contained dist/single.html
```

Node 22.18+ is required: the simulator runs the TypeScript sources directly. Triple-tap the title for the dev panel.

## Layout

```
src/engine/     pure rules engine: reduce(state, action, pack, rng) -> state. No DOM.
  tuning.ts     every balance number in one place
src/content/    Zod schema with story-integrity checks, the week pack (JSON)
src/ui/         Preact screen (App.tsx), SVG art and the town map (art.tsx), storage / calendar / sound (platform.ts)
sim/            balance simulator, validator, single-file bundler
e2e/            browser smoke test
CONTENT_GUIDE.md  how to write cards and stories
```

## Rules

- Each day is a run of 10 cards (`TUNING.cardsPerDay`). The day's first cards are pinned and the same for every mayor; they start the week's stories. The rest come from your own story so far.
- **Stories build.** A choice can schedule follow-up cards a few cards later (`then: [[cardId, cardsFromNow]]`) and set flags that later cards require. The goose pond goes: demand → the contractor is a goose → grand opening → it leaks into the records room → goose poop on every floor → forty goslings want a second pond. Refuse the pond and you get the car park occupation and the goose war instead.
- Five meters from 0 to 100. A group at 0 or 100 recalls you; the treasury only at 0. Each cause has its own named ending.
- A recall ends that day's run. You come back the next day as Acting Mayor with every meter at 40, and Sunday's vote takes 8 points. A third recall ends the term.
- Cards show no effects. Dragging shows which meters will move (a dot, bigger for a big change), not which way. After each swipe the meters move and the character reacts; at the end of the day the Bugle reviews every card, story by story, with what each choice did.
- Pressure cards appear when a meter is very low or very high (crime wave, protest, the treasury running dry, Chad trying to buy the town).
- Vote share = 42 + weighted distance of each meter from 50 + 3 per weekly goal + the campaign card − 8 per recall. 50 wins. The baseline below 50 means doing "fine" loses.
- You can start any day; Deputy Dave plays the missed days and hands back a town with every meter between 35 and 65.
- Names and the group that elected you are set at the end of the first day you play.
- The scrapbook keeps unlocked endings, a career record and deeds across weeks.
