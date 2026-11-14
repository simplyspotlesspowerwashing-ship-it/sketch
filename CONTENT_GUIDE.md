# Content guide

Content is data. A week is one JSON pack in `src/content/packs/`, checked by `npm run validate`.

## Writing rules

1. Short setup, clear ask. Card text is 140 characters at most; option labels 28.
2. Both options hurt. If one option is obviously right, rewrite the card. `npm run sim` flags any option the sensible bot picks over 85% or under 5% of the time.
3. One joke per card, and it lives in the situation, not in a pun.
4. Recurring characters stay in character (see the cast below).
5. Never punch at real groups. No real politics, parties, countries or public figures. PG throughout.
6. Reading level about age 10. Short words, short sentences.
7. Every option needs a `reaction`: the requester's one line after you choose.
8. Costs are exact. Money in $k as a signed number (`-20` costs $20k). Approval in steps of 5: 5 shows as one arrow, 10 as two.

## Cast

| Id | Who | Voice |
|---|---|---|
| pam | PTA president, leads People | Organised, relentless, always has a clipboard |
| chad | Billionaire, leads Business | Cheerful, transactional, owns the shop that sells the thing |
| barb | Police chief, leads Law | Loves order and equipment in equal measure |
| marge | Editor of The Bugle, leads Press | Will print anything, prefers it exciting |
| gerald | Goose union president | Speaks through demands and honking |
| dave | Deputy Dave | Visibly three raccoons in a trench coat. Nobody mentions it |
| linda | Librarian | Conspiracy enthusiast. Never explains |
| doug | Treasurer | Anxious. Loves coins |
| steve | Stormy Steve, weather | Vague and worried |
| timmy | Age 8 | Has already told everyone |
| stranger | The Stranger | Asks odd questions about the town's price |

## Card kinds

- **Fixed**: has `day` (1-6) and `month` (1 or 2). Three per month.
- **Pool**: neither `day` nor `requires`. Fills the desk when a month has fewer than three fixed cards.
- **Conditional**: has `requires` (flags, projects, approval thresholds). Takes the third desk slot when its condition holds. Fires once unless `repeatable`.
- **Rare**: `rare: true`. Shared 1-in-50 draw each month.
- **Secret**: `secret: true` with `requires.flags: ["obj:<objective id>"]`.

## Option kinds

`pay` (money and/or favors now), `project` (needs `project`; build cost and upkeep come from `src/content/core.ts`), `promise` (needs `promise: { dueIn, money }`; the effects are the benefit now), `refuse` (must be free), `favor` (must cost Favors).

## Gambles

An option may carry `gamble: { chance, win, lose }`. Both outcomes are shown before the player chooses, with the odds. Each outcome has `text` (max 90 characters), and optional `money`, `effects`, `setFlag`. Use them for the absurd bets, not for ordinary choices.

## Mini-games

Every desk card needs `game: { type, theme, bad?, title, flop }`.

- `type`: `catch` (slide a basket), `dodge` (three lanes), `whack` (tap the right ones), `match` (pairs), `stack` (drop pieces), `simon` (repeat signals), `tug` (tap on green), `flap` (tap to fly through gaps), `jump` (runner), `snake` (steer and collect), `slice` (swipe, avoid bombs), `invaders` (move and shoot).
- `theme` is the sprite the player handles; `bad` is the one to avoid (catch, dodge, whack). Sprites are in `src/ui/art.tsx`.
- `title` (max 40) is the job, written as something the mayor physically does: "Herd the geese to the pond".
- `flop` (max 90) is the comic line when it goes wrong.
- The game should be the card. If the card is about geese, the player handles geese.
- Every card also needs one option that costs no money or Favors up front, so the desk can always be cleared.

## Catastrophes and midday activities

A catastrophe is a card with `major: true` and `stages` (three games). Its options should all hurt; the games decide how much more. Midday activities (`initiatives`) have a `game` and three outcomes, `clean`, `sloppy` and `flop`, and should be things the mayor chooses to go and do.

## Decrees

`decrees` in the pack are things the mayor does unprompted: a `tax`, a `law` or a `stunt`. Same rule as cards: it should be absurd and it should cost someone. Name max 28 characters, text max 120.

## Making the map react

If a choice should leave a mark on the town, set a flag and draw it in `Town` (`src/ui/art.tsx`). A card that changes the map feels heavier than one that only moves a meter.

Mark anything not yet edited by a human with `"draft": true`.
