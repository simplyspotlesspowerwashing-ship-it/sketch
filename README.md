# Mayor of Bad Town (working title)

A daily comedy card game. One real week is one term in office. Each day you face 20 cards: someone asks for something and you say yes or no. Every answer moves five meters (People, Business, Law, Press, Treasury), and you only see which way after you have answered. Sunday is the election.

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
- **20 cards a day**, the same deck for every mayor (`dayDeck`). Each day opens with its main story, has one law to sign or refuse, one catastrophe and one sneak moment; side stories fill the rest. See CONTENT_GUIDE.md.
- **Rabbit holes.** Yes and no lead to different next cards, straight away (`then`), five or six deep in a day's main story. Some consequences come back the next morning (`next`).
- Five meters from 0 to 100. A group at 0 or 100 recalls you; the treasury only at 0. A recall ends that day; you return next day with every meter at 40 and Sunday's vote takes 8 points. A third recall ends the term.
- Pressure cards appear when a meter is very low or very high.
- **Daily score** (`src/engine/score.ts`): points for keeping the town balanced. After every card each of the five meters earns 2 if it is calm (45–55), 1 if uneasy (35–65), 0 if in danger; the treasury only counts if it runs low. Up to 10 per card, 200 a day, +30 for ending a full day with nobody in danger, −100 for a recall. The crowd % (how many mayors made the same call) is shown but not scored. The day-end share grid has one row per group (🧑 💼 👮 📰 💰), one square per two cards: 🟩 calm, 🟨 uneasy, 🟥 in danger, ⬜ not played.
- **Weekly goals:** three per pack (`objectives`), shown in the morning paper, at day end and behind the ★ chip in the header; each one met is +3 votes on Sunday and is announced on the card that met it.
- **Scrapbook:** endings, deeds, and the oddballs you've met.
- **Sunday:** vote share = 21 + weighted distance of each meter from 50 + 3 per weekly goal + the election card − 8 per recall. 50 wins. Most mayors lose (`reports/balance.md`).
- You can start any day: Deputy Randy plays the days you missed and hands back a town with every meter between 35 and 65.
- First visit: a short opening, ending with the oath (your mayor's name, what the townsfolk are called, who voted for you).
- The next day opens at local midnight.

## Weeks

There are two week packs (`src/content/packs/week1.json`, `week2.json`). Week 1 runs the week of `LAUNCH_MONDAY` (`src/content/index.ts`), week 2 the next, then they repeat. Each pack has six main stories (one a day, five or six cards deep), six catastrophes, six laws, six sneak moments, a pool of side stories and a Sunday election with its own opponent (week 1: Clive, a traffic cone; week 2: Gary, a vending machine). Add a pack by writing `weekN.json`, running `PACK=weekN node sim/crowd.ts`, and listing it in `PACKS`.

## Launch

```bash
npm install
npm run check                     # both packs valid, types, tests
PACK=week1 npm run sim            # balance report (repeat with PACK=week2)
npm run crowd                     # regenerate simulated crowd shares for both packs
```

1. **Stats service** (optional but recommended): deploy `worker/` (see `worker/README.md`). It gives you a URL.
2. **Set the launch Monday** in `src/content/index.ts` (`LAUNCH_MONDAY`) to the Monday you go live.
3. **Build:** `VITE_STATS_URL=<worker url> npm run build`. Without the stats URL the game still works; the "% of mayors" figures are then simulated estimates and are labelled "estimate". Testing shortcuts (skip a day, dev panel) only exist in `npm run dev` and `npm run build:preview`, never in `npm run build`.
4. **Host `dist/`** on any static host. On Cloudflare Pages: build command `npm run build`, output `dist`, and the environment variable `VITE_STATS_URL`. `public/_headers` sets caching and security headers there.
5. **Share preview image:** `og:image` in `index.html` is relative (`/og.png`). Some sites need a full URL: change it to `https://<your domain>/og.png` once you know the domain.

What players' devices store: one save in `localStorage` (their progress, names and scrapbook). Nothing else. The game loads nothing from third parties: fonts and art are bundled.

`npm run bundle` makes a preview build and writes `dist/single.html`, one self-contained file for sharing a preview.
