# Mayor of Bad Town (working title)

A daily comedy card game. Every day is a term in office; every night is a re-election. Each day you face 20 cards: someone asks for something and you say yes or no. Every answer moves five meters (People, Business, Law, Press, Treasury), and you only see which way after you have answered. Keep everyone calm, get 50% tonight, keep your streak. Each real week is a themed chapter with its own long story.

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

- **Every card is a yes or a no.** Drag right to approve, left to reject (or tap, or press Y / N). A rubber stamp marks the card APPROVED or REJECTED; it then turns over to show the character's face, what they said, the bars that moved and how many mayors chose the same.
- **20 cards a day, seven days a week**, the same deck for every mayor (`dayDeck`). Each day opens with its main story, has one law to sign or refuse, one catastrophe and one mini-game (sneak or ribbon); side stories fill the rest. See CONTENT_GUIDE.md.
- **Rabbit holes.** Yes and no lead to different next cards, straight away (`then`), four or five deep in a day's main story. Some consequences come back the next morning (`next`).
- **Every night is a re-election** (`src/engine/election.ts`). Tonight's vote = 20 + 0.2 × today's score + 3 per weekly goal met. 50% keeps the job and adds to your streak (🔥, kept in the save; Randy's covered days pause it). Lose and you get a "voted out" ending for the Scrapbook, blamed on the least happy group; tomorrow you run again with everything at 40.
- Five meters from 0 to 100. A group at 0 or 100 recalls you; the treasury only at 0. A recall ends the day on the spot and loses tonight's vote.
- **The week's theme** (`theme` in each pack) nudges one meter every third card: Goose Migration Week (Law down), Heatwave (Treasury down), Festival Week (Press up), The Big Freeze (Business down).
- **The week's saga**: one long story, one card a day from Monday (`day: 1, slot: 8`) to Sunday via `next`. Going along with it all the way leads to a **rare ending** (`ending: "rare:..."` on a choice): the day ends on the spot with a special Scrapbook page. Two per week; bots find them in about 3–6% of weeks.
- **Mini-games:** the sneak (hold, release while they look away) and the ribbon cut (stop the swinging scissors in the gold zone before Gerald cuts it with his face; three tries).
- Pressure cards appear when a meter is very low or very high.
- **Daily score** (`src/engine/score.ts`): points for keeping the town balanced. After every card each of the five meters earns 2 if it is calm (45–55), 1 if uneasy (35–65), 0 if in danger; the treasury only counts if it runs low. Up to 10 per card, 200 a day, +30 for ending a full day with nobody in danger, −100 for a recall. The crowd % is shown but not scored.
- **Weekly goals:** three per pack (`objectives`), shown in the morning paper, at day end and behind the ★ chip; each one met adds 3% to every night's vote.
- **Scrapbook:** rare endings, voted-out endings, recall endings, the oddballs you've met, deeds, nights won and streaks.
- **The week in review** after Sunday night: a nickname for the week, each night's result, your best day, your oddest call (lowest crowd %), the oddballs you dealt with and the endings you found.
- You can start any day: Deputy Randy plays the days you missed (he always wins his nights: he counts the votes) and hands back a town with every meter between 35 and 65.
- First visit: a short opening, ending with the oath (your mayor's name, what the townsfolk are called, who voted for you).
- The next day opens at local midnight.

## Weeks

Four week packs (`src/content/packs/week1.json` … `week4.json`), about 650 cards in all. Week 1 runs the week of `LAUNCH_MONDAY` (`src/content/index.ts`), week 2 the next, and so on; after week 4 they repeat. Each pack has a theme, seven main stories, seven laws, seven catastrophes, seven mini-games, a saga with two rare endings, oddball debuts, a pool of side stories and its own recall endings. Add a pack by writing `weekN.json`, running `PACK=weekN node sim/crowd.ts`, and listing it in `PACKS`.

Balance (`PACK=weekN npm run sim`, 250 weeks per bot): a careful bot that can see every effect is re-elected on 61–86% of nights depending on the week; random play on 16–35%. Real players sit in between.

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
