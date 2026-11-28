# Mayor of Bad Town (working title)

A daily comedy card game. Every day is a term in office; every night is a re-election. Your week starts the day you start: Day 1 to Day 7, one day per calendar day. Each day you face 20 cards: someone asks for something and you say yes or no. Every answer moves five meters (People, Business, Law, Press, Treasury), and you only see which way after you have answered. Keep everyone calm, get 50% tonight, keep your streak. Each real week is a themed chapter with its own long story.

```bash
npm install
npm run dev         # play locally
npm test            # engine tests (Vitest)
npm run validate    # schema and story-integrity check of the week pack
npm run sim         # 5,000 terms per bot -> reports/balance.md
npm run build:preview && npx vite preview --port 4173 &   # smoke test needs the preview build's skip links
node e2e/smoke.cjs /tmp/shots 1 390     # browser playthrough (MOTION=1 to keep animations on) to election night (dir, day offset, width)
npm run bundle                          # preview build + one self-contained dist/single.html
npm run scores                          # day-score distribution by play style
```

Node 22.18+ is required: the simulator runs the TypeScript sources directly. Triple-tap the title for the dev panel (dev and preview builds only).

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

- **Every card is a yes or a no.** Drag right to approve, left to reject (or tap, or press Y / N). Dragging part-way (or hovering a button) shows a dot on each meter the answer moves, bigger for a big move, but never which way: you work that out from the card and the characters. Effects are fixed, never random.
- **Not now** (button or D): twice a day, push a card back; it returns three decisions later. Not in the last four cards of the day. A rubber stamp marks the card APPROVED or REJECTED; it then turns over to show the character's face, what they said, the bars that moved and how many mayors chose the same.
- **20 cards a day, seven days a week**, the same deck for every mayor (`dayDeck`). Each day opens with its main story, has one law to sign or refuse, one catastrophe and one mini-game (sneak or ribbon); side stories fill the rest. See CONTENT_GUIDE.md.
- **Rabbit holes.** Yes and no lead to different next cards, straight away (`then`), four or five deep in a day's main story. Some consequences come back the next morning (`next`).
- **Every night is a re-election** (`src/engine/election.ts`). Tonight's vote = 13 + 0.2 × today's score + 5 per weekly goal met (so a good day alone isn't enough: you need about 185 points, or fewer with goals). 50% keeps the job and adds to your streak (🔥, kept in the save; Randy's covered days pause it). Lose and you get a "voted out" ending for the Scrapbook, blamed on the least happy group (three per group, depending on the night); tomorrow you run again with everything at 40.
- Five meters from 0 to 100. A group at 0 or 100 recalls you; the treasury only at 0. A recall ends the day on the spot and loses tonight's vote.
- **The week's theme** (`theme` in each pack) nudges one meter every third card: Goose Migration Week (Law down), Heatwave (Treasury down), Festival Week (Press up), The Big Freeze (Business down).
- **The week's saga**: one long story, one card a day from Monday (`day: 1, slot: 8`) to Sunday via `next`. Going along with it all the way leads to a **rare ending** (`ending: "rare:..."` on a choice): the day ends on the spot with a special Scrapbook page. Two per week; bots find them in about 3–6% of weeks.
- **Disasters** (`ending: "trap:..."`): once a day, pinned at a different slot each day, one card has an answer that ends the day on the spot with its own Scrapbook page (28 in all). The card text always states the danger plainly ('DO NOT FEED', 'THIN ICE. ESPECIALLY MAYORS.', 'Doug says nobody who goes in comes out'); the fatal answer is yes on some days and no on others, so neither 'always yes' nor 'always no' is safe. Randy never takes the bait.
- **Mini-games:** the sneak (hold, release while they look away; each card has its own fixed rhythm, the same every attempt, so it can be learned) and the ribbon cut (stop the swinging scissors in the gold zone before Gerald cuts it with his face; three tries).
- Pressure cards appear when a meter is very low or very high.
- **Daily score** (`src/engine/score.ts`): points for keeping the town balanced. After every card each of the five meters earns 2 if it is calm (45–55), 1 if uneasy (35–65), 0 if in danger; the treasury only counts if it runs low. Up to 10 per card, 200 a day, +30 for ending a full day with nobody in danger, −100 for a recall. The crowd % is shown but not scored.
- **Weekly goals:** three per pack (`objectives`), shown in the morning paper, at day end and behind the ★ chip; each one met adds 5% to every night's vote, so chasing them is part of the strategy.
- **Losing is winning:** every loss unlocks a collectible ending: 100 in all (8 rare, 28 disasters, 28 voted-out: 12 general plus 4 per week, and 9 recall endings per week, `low:people/week2` etc.). (tap to skip; off with reduced motion): the angry group marches you out, fans carry you off, ballots rain and an ✗ lands, a disaster flash-and-spin, or a golden morph into the culprit, then the Bugle headline. Faces follow what happened: on the result card a group's leader frowns if their group went down and smiles if it went up. Randy has a line on every ending (`src/content/randy.ts`). The ending screen celebrates it (NEW ENDING UNLOCKED, confetti, the character responsible, 'x of 84 collected', Share this ending); one you already have reads 'A CLASSIC. AGAIN.'
- **Scrapbook,** in tabs: Endings (filter: Rare, Disasters, Voted out, Recalled; hints for locked ones), Oddballs, Deeds, Record.
- **The week in review** after Sunday night: a nickname for the week, each night's result, your best day, your oddest call (lowest crowd %), the oddballs you dealt with and the endings you found.
- **Your own week.** A new player starts on Day 1 of week 1 (pack `week1`). The next day opens on a later calendar day than the one you finished the last on; missed days are just a gap, nobody plays them for you. After Day 7 comes the week in review, then the next week (packs rotate 1→4, then round again with a fresh shuffle). Everyone at the same point (say, week 2, Day 3) gets the same deck, so the crowd % still compares like with like.
- First visit: a short opening, ending with the oath (your mayor's name, what the townsfolk are called, who voted for you).
- **After Hours** (`src/content/afterHours.ts`, cards in `src/content/afterhours.json`): a chance to fix the day's mistakes. Only after a night you win, Days 1-6, once a night: 10 more cards if you want. Its own 70 cards, never the dailies: each round is 3 draft laws for tomorrow, 3 projects for tomorrow, 3 late-night visits and 1 After Hours disaster (7 of them, each with its own ending). A week of nights never repeats a card, and every night offers at least ±15 for each group (Law −10 on night 2). The round starts from tonight's meters; wherever it ends (clamped 10-90) is where tomorrow starts (engine action `overnight`, applied on `next`). Tonight's vote is never touched. A disaster or recall ends the round with its ending and carries nothing. Lost nights show 'After Hours opens on nights you win'. Check it with `node e2e/afterhours.cjs <dir> <left|right> [width] [lost]` (it seeds a won or lost Day 1 via `e2e/won-night.ts`).
- **Secret characters** (`secret` in each pack, `secretCheck` in `src/engine/engine.ts`): one per week, Moira the mole, Gloria the camel, The Great Zambini and Big Barry the yeti. Each week has a rule for the day's opener (slot 0) and law (slot 7), e.g. yes then no. Follow it on three of your own days in a row and the character's branching 3-card story starts two cards later; Randy's days never count. Players who aren't trying find one in roughly 3-7% of weeks; the Scrapbook (Oddballs tab) shows a riddle for each one not yet found, and finding one earns the Secret Friend deed. `node e2e/secret-save.ts <week>` prints a save where the secret is about to appear.
- **Your profile is kept:** name, townsfolk and voters are set once (in the opening) and reused every new week; rename from the Scrapbook.
- **Tap the points** for how they work and roughly how many you need tonight.

## Endings roadmap (for later)

Today: recall and voted-out endings come round every week; daily disasters come round with their week, and the 7 After Hours disasters come round once a week; the 8 rare endings come from each week's saga, so each is reachable once per four-week round. Next step: give every ending several routes (different cards on different days and weeks can lead to it), keeping the rarity, so a player who plays long enough can collect them all.

## Weeks

Four week packs (`src/content/packs/week1.json` … `week4.json`), about 650 cards in all. Week 1 runs the week of `LAUNCH_MONDAY` (`src/content/index.ts`), week 2 the next, and so on; after week 4 they repeat. Each pack has a theme, seven main stories, seven laws, seven catastrophes, seven mini-games, a saga with two rare endings, oddball debuts, a pool of side stories and its own recall endings. Add a pack by writing `weekN.json`, running `PACK=weekN node sim/crowd.ts`, and listing it in `PACKS`.

Balance (`PACK=weekN npm run sim`, 200–300 weeks per bot), nights re-elected: random play 4–7%; a reader bot that guesses each answer's direction from the text but not its size, misjudges one card in five and spots 85% of warnings 33–51%; bots that can see exact effects (players can't) 30–65% (careful) and 53–78% (expert: every warning, Not now, goals). Week 1 is the easiest; week 2 (Heatwave) the hardest.

Card supply (`npm run supply`): every week fills seven full days of 20 cards; a player who survives every day sees no repeated cards (week 4: 0.08 per week). That is 28 days of unique play at launch; week 5 repeats week 1 (with a new shuffle of side stories).

## Launch

```bash
npm install
npm run check                     # all packs valid, types, tests
PACK=week1 npm run sim            # balance report (repeat for week2..week4)
npm run crowd                     # regenerate simulated crowd shares for every pack
```

1. **Stats service** (optional but recommended): deploy `worker/` (see `worker/README.md`). It gives you a URL.
2. **Set the launch Monday** in `src/content/index.ts` (`LAUNCH_MONDAY`) to the Monday you go live.
3. **Build:** `VITE_STATS_URL=<worker url> npm run build`. Without the stats URL the game still works; the "% of mayors" figures are then simulated estimates and are labelled "estimate". Testing shortcuts (skip a day, dev panel) only exist in `npm run dev` and `npm run build:preview`, never in `npm run build`.
4. **Host `dist/`** on any static host. On Cloudflare Pages: build command `npm run build`, output `dist`, and the environment variable `VITE_STATS_URL`. `public/_headers` sets caching and security headers there.
5. **Share preview image:** `og:image` in `index.html` is relative (`/og.png`). Some sites need a full URL: change it to `https://<your domain>/og.png` once you know the domain.

What players' devices store: one save in `localStorage` (their progress, names and scrapbook). Nothing else. The game loads nothing from third parties: fonts and art are bundled.

`npm run bundle` makes a preview build and writes `dist/single.html`, one self-contained file for sharing a preview.
