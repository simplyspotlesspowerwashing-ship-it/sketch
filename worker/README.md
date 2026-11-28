# Bad Town stats

A Cloudflare Worker with one D1 table. It counts how many mayors answered each card yes or no, so the game can show real "% of mayors did this" numbers. It stores no cookies, IDs or IP addresses: only pack, week, card, answer and a count.

## Deploy (about ten minutes, needs a Cloudflare account)

```bash
cd worker
npx wrangler login
npx wrangler d1 create bad-town-stats
```

Copy the `database_id` it prints into `wrangler.toml`, then:

```bash
npx wrangler d1 execute bad-town-stats --remote --file=schema.sql
npx wrangler deploy
```

It prints the worker's URL, for example `https://bad-town-stats.<you>.workers.dev`. `ALLOWED_ORIGIN` in `wrangler.toml` is already set to `https://badtowngame.com` and `https://www.badtowngame.com`.

Build the game with that URL:

```bash
VITE_STATS_URL=https://bad-town-stats.<you>.workers.dev npm run build
```

## How the game uses it

- After every answer the game sends `POST /vote` and does not wait for it. Offline answers are simply not counted.
- At the start of each day it fetches `GET /crowd?pack=…&week=…`. A card shows the real share once at least 30 mayors have answered it (`MIN_SAMPLE` in `src/ui/platform.ts`). Until then it shows the simulated share, marked "preview".
- Without `VITE_STATS_URL` the game is a preview build: simulated shares only, plus a "skip to the next day" link and a developer panel (triple-tap the title) for testing.

## Limits

There is no protection against someone scripting fake votes. For a small launch that is acceptable; if it matters later, add Cloudflare's rate limiting rule on `/vote` or Turnstile.
