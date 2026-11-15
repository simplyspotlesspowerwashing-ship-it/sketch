# Content guide

A week is one JSON pack in `src/content/packs/`, checked by `npm run validate` (schema plus story integrity: every scheduled follow-up exists, every follow-up card is scheduled by something, every card has at least two directions).

## Writing cards

1. Short setup, clear ask. Card text max 150 characters, option labels max 30, reactions max 100.
2. Every direction should hurt somewhere. Players can't see effects, so the text and the character are their clues: keep them fair.
3. One joke per card, in the situation.
4. Characters stay in character: Pam (PTA, People), Chad (billionaire, Business), Barb (police chief, Law), Marge (The Bugle, Press), Doug (treasurer, money), Gerald (goose union), Linda (librarian, conspiracies), Steve (weather), Timmy (8), the Stranger, Deputy Dave (three raccoons in a coat).
5. Effects in steps of 5; ±15 or ±20 for big moments. Five meters: people, business, law, press, treasury.

## Stories

The heart of the game. A story is a chain of cards that remember what you chose.

- Start a story with a pinned card (`day`) so everyone begins it together, or put the opener in the open pool.
- Continue it with follow-up cards (`followUp: true`) scheduled by a choice: `then: [["g2", 5]]` puts card `g2` five cards from now.
- Branch by scheduling different follow-ups from different choices, or by setting flags (`set`) that a later card requires (`requires: { flags: [...] }`).
- Each beat should escalate or twist what came before, and mention it. The pond leaks *into the records room*; the bear *read the article*.
- Give each story a `story` id and a headline in `headlines`; the day review groups cards by story.

## Card kinds

- **Pinned**: `day` 1-6, shown first that day to every mayor, in pack order.
- **Follow-up**: `followUp: true`, only when scheduled.
- **Open pool**: no `day`, no `followUp`; drawn by weight, once each unless `repeat`.
- **Pressure**: `repeat`, a higher `weight`, and `requires.min`/`max` on a meter.
- **Campaign** (`campaign` list): Sunday; options carry `vote`.

Mark anything not yet edited by a human with a note in the commit; all of week 1 is a draft.
