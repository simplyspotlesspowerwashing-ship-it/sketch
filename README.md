# Mayor of Bad Town (working title)

A daily comedy card game. One real week is one term in office. Each day you play a run of cards: a character asks for something and you swipe the card left, right, up or down. Every choice moves five meters (People, Business, Law, Press, Treasury), and you don't see which way until you've chosen. Sunday is the election.

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

- Each day is a run of 25 cards (`TUNING.cardsPerDay`), dealt from one shared deck per day (`dayDeck`): every mayor sees the same cards in the same order. Your own follow-ups and pressure cards take positions in it, so runs diverge only through your choices. Pinned day cards (story beats, the sneak moment) always keep their position.
- **Stories build.** A choice can schedule follow-up cards a few cards later (`then: [[cardId, cardsFromNow]]`) and set flags that later cards require. The goose pond goes: demand → the contractor is a goose → grand opening → it leaks into the records room → goose poop on every floor → forty goslings want a second pond. Refuse the pond and you get the car park occupation and the goose war instead.
- Five meters from 0 to 100. A group at 0 or 100 recalls you; the treasury only at 0. Each cause has its own named ending.
- A recall ends that day's run. You come back the next day as Acting Mayor with every meter at 40, and Sunday's vote takes 8 points. A third recall ends the term.
- Cards show no effects. Dragging shows which meters will move (a dot, bigger for a big change), not which way. After each swipe a full-screen reveal shows each meter that moved (▲/▼ and the amount), the character's reaction and how many mayors chose the same. Tap to skip. At the end of the day the Bugle shows the poll, your score, the share grid and a line about tomorrow.
- **Daily score** (`src/engine/score.ts`): 10 per card, plus a rarity bonus for choices few mayors made (under 5% +50, under 15% +30, under 35% +15, under 65% +5), minus 100 for a recall. Tiers run from Rubber Stamp to One in a Million Mayor. The day review gives a spoiler-free share grid with one square per card.
- **Crowd numbers are simulated** (`node sim/crowd.ts` -> `week1.crowd.json`, labelled "preview data" in the game) until a stats backend is approved.
- **Sneak moment**: one card a day (slot 13) is a hold-and-release: wind up, let go while the character isn't looking. Getting away with it is the `right` option, getting caught the `left` one.
- Pressure cards appear when a meter is very low or very high (crime wave, protest, the treasury running dry, Chad trying to buy the town).
- Vote share = 32 + weighted distance of each meter from 50 + 3 per weekly goal + the campaign card − 8 per recall. 50 wins. The baseline below 50 means doing "fine" loses.
- You can start any day; Deputy Randy plays the missed days and hands back a town with every meter between 35 and 65.
- **First visit:** a six-slide opening (Bad Town, Randy the raccoon ex-mayor who stepped down and stayed on as deputy, the one-vote win over a traffic cone, the five meters, how to swipe) ending with the oath: you name your mayor and what the townsfolk are called, and pick who voted for you. The game is always "Mayor of Bad Town". Later terms offer the same names again. Cards can say `{mayor}` and `{folk}`.
- **After every card** the town scene plays: the camera moves to the building of the group most affected, the camera visits each group that moved, in turn, and that group acts it out (src/ui/acts.tsx): People crowd the school cheering or protesting under a storm; Business lights up with money bags and a limo, or goes dark with a CLOSED sign and a tumbleweed; Law gets a police car arriving and a burglar led away, or raccoons escaping with swag; the Bugle throws out HOORAY or SCANDAL papers; coins rain into a pile or fly off on wings. The story's creatures parade past. Then each meter change counts up, and the crowd share is shown.
- The scrapbook keeps unlocked endings, a career record and deeds across weeks.

## After a choice

A rubber stamp comes down on the card and leaves DONE; the card then turns over to show the character's portrait with their expression, what they said, the bars that moved and how many mayors chose the same. Next moves on.

## Stories carry

- A choice can lead straight to the next beat (`then`) or bring a card back tomorrow morning (`next`). In week 1, beats alternate: the first follow-up is the very next card, the one after that opens the next day.
- Each day's deck brings up to four story starters into the first ten cards, so everyone meets a storyline early.
- The end-of-day panel lists what is waiting for you tomorrow.
- Every storyline has an ending: short ones get a finale the next day, and a refusal usually brings a comeback card instead of ending the story.
