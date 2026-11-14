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

Mark anything not yet edited by a human with `"draft": true`.
