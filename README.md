# Mayor of Bad Town (working title)

A daily comedy card game. One real week is one term in office. Each day you face 20 cards: someone asks for something and you say yes or no. Every answer moves five meters (People, Business, Law, Press, Treasury), and you only see which way after you have answered. Sunday is the election.

```bash
npm install
npm run dev         # play locally
npm test            # engine tests (Vitest)
npm run validate    # schema and story-integrity check of the week pack
npm run sim         # 5,000 terms per bot -> reports/balance.md
npm run build && npx vite preview --port 4173 &
node e2e/smoke.cjs /tmp/shots 1 390     # browser playthrough (MOTION=1 to keep animations on) to election night (dir, day offset, width)
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

- **Every card is a yes or a no.** Drag right to approve, left to reject (or tap, or press Y / N). A rubber stamp marks the card APPROVED or REJECTED; it then turns over to show the character's face, what they said, the bars that moved and how many mayors chose the same.
- **20 cards a day**, the same deck for every mayor (`dayDeck`). Each day opens with its main story, has one law to sign or refuse, one catastrophe and one sneak moment; side stories fill the rest. See CONTENT_GUIDE.md.
- **Rabbit holes.** Yes and no lead to different next cards, straight away (`then`), five or six deep in a day's main story. Some consequences come back the next morning (`next`).
- Five meters from 0 to 100. A group at 0 or 100 recalls you; the treasury only at 0. A recall ends that day; you return next day with every meter at 40 and Sunday's vote takes 8 points. A third recall ends the term.
- Pressure cards appear when a meter is very low or very high.
- **Daily score** (`src/engine/score.ts`): 10 per card, plus a bonus for choices few mayors made (under 5% +50, under 15% +30, under 35% +15, under 65% +5), minus 100 for a recall. The day-end panel has a spoiler-free share grid.
- **Sunday:** vote share = 21 + weighted distance of each meter from 50 + 3 per weekly goal + the election card − 8 per recall. 50 wins. Most mayors lose (`reports/balance.md`).
- You can start any day: Deputy Randy plays the days you missed and hands back a town with every meter between 35 and 65.
- First visit: a short opening, ending with the oath (your mayor's name, what the townsfolk are called, who voted for you).
- The next day opens at local midnight.

## Before launch

- **Crowd numbers are simulated** (`node sim/crowd.ts` writes `week1.crowd.json`; the game labels them "preview"). Real numbers need a small stats service (the brief suggests a Cloudflare Worker with D1). That is a network call and has not been added.
- While the crowd data is simulated, the day-end panel shows a "Testing: skip to the next day" link. It disappears when real data replaces the simulated file.
- Only week 1 exists. Each new week needs its own pack.
