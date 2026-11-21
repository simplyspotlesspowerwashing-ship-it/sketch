# Content guide

Week packs live in `src/content/packs/`. `npm run validate` checks a pack; `npm run sim` shows how hard it is.

## The rules of a card

1. **Every card is a yes or a no.** Two options only: `right` approves, `left` rejects. The card's text ends on the question. Labels are short variations of yes and no ("Yes, build the pond" / "No ponds indoors"), 30 characters at most.
2. **One joke per line.** The card sets up the problem (150 characters at most); each reaction lands a punchline (100 at most). Deadpan beats wacky. Be specific: "eleven crisps", not "some snacks".
3. **Effects are never shown on the card.** Each option moves one to three of the five meters (people, business, law, press, treasury) by 5, 10 or 15. Neither answer should be free.
4. **PG. No real people, real politics, gambling or purchases.** No words or framing borrowed from other games.

## Rabbit holes

A choice can lead somewhere:

- `then: [["cardId", 1]]` makes that card the very next one. Yes and no should usually lead to *different* next cards.
- `next: ["cardId"]` brings that card back tomorrow morning.
- A card reached this way is marked `followUp: true` and never appears on its own.

Each beat should escalate the one before and mention it. The pond leaks *into the records room*; Randy, having been refused the keys, has *moved City Hall into his coat*.

## What a day is made of (20 cards, Monday to Sunday)

| Slot | What | How it is marked |
|---|---|---|
| 1 | The day's main story: four or five cards deep, back to back | `day: n, slot: 0` |
| 2 | Yesterday's carry-overs (`next`), including the saga | arrive at the start of the day |
| 8 | A law you can sign or refuse | `day: n, slot: 7`, `who: "desk"`, story `law` |
| 9 | The saga's first card (Monday only) | `day: 1, slot: 8` |
| 10 | An oddball's story starter (some weeks) | `day: n, slot: 9` |
| 12 | The day's one catastrophe, with a beat after it | `day: n, slot: 11` |
| 16 | The mini-game: sneak (`sneak: true`) or ribbon (`ribbon: true`). Right = success, left = failure | `day: n, slot: 15` |
| the rest | Side stories from the shared pool, one to three beats each | no `day` |

Pressure cards (`repeat: true` with `requires.min` / `max`) cut in when a meter is very low or very high. The pack checker (`src/content/schema.ts`) refuses a week without an opener, law and catastrophe at slots 0/7/11 and a mini-game on all seven days.

## The saga and rare endings

Each week has one saga that runs a card a day, Monday to Sunday, using `next`. Write it in two lanes: a calm lane (both choices stay calm) and a strange lane (one choice goes back to calm, the other goes deeper). Only the strange lane can reach a rare ending: a choice with `"ending": "rare:<id>"` whose text is in the pack's `endings`. Keep entry into the strange lane deliberate so the endings stay rare; the simulator prints how often bots find them.

## Disasters (one a day)

Each day has exactly one disaster card (`day: n`, any free slot from 10 up, never 0–9 so it can't cut into the main story). One answer has `"ending": "trap:<id>"`; the other is safe. Rules, enforced by the pack checker:

- The text must give the warning away to anyone who reads it: a sign, a label, a 'probably fine'. Unfair traps are no fun.
- The fatal answer should be the reckless one, and it must be yes on some days and no on others (at least two of each per week).
- The fatal option's label should look ordinary. The ending text goes in the pack's `endings` (title 40 characters, text 160).
- Don't make the disaster card look different from other cards: noticing is the game.

## Keep a week balanced

Effects lean on the meters. Across a week, the average effect per option should stay near week 1's (People +0.6, Law +0.4, Press +0.4 to +0.8, Business about 0, Treasury about −0.3), allowing for the theme's nudge. If too many "yes" answers give +10, every meter drifts above the calm zone and even careful players lose nights. Check with `PACK=weekN npm run sim`.

## The cast

The funniest cards belong to the oddballs: Deputy Randy (a raccoon, ex-mayor, coat full of associates), Gerald (Goose Union), Mr Whiskers Esq. (cat, lawyer, also the judge), Kevin (a pothole; says nothing), the Cheese (hums), Clive (a traffic cone; your opponent; says nothing), Mr Nutkins (squirrel banker), Inspector Biscuit (a dog who outranks Barb), Bev (97, scooter), Councillor Pebbles (a goat; eats motions), Mr Flaps (pelican postmaster; the post is in his beak), Wendy (a ghost; wants a pension), Big Carl (lifeguard; there is no pool), Lorraine (a seagull who runs the seafront), Professor Hoot (owl headteacher, nocturnal), Trevor (a moth in love with a lamp), Toby (an oak tree who wants to move). The humans mostly report what the oddballs have done: Doug (treasurer, cries), Barb (police), Pam (PTA), Marge (the Bugle), Chad (billionaire), Linda (librarian), Steve (weather), Timmy (8), Dr Nora, Sal, Coach Dunk, Brayden, Marcel.

A new character needs a portrait in `CAST` and a name in `NAMES` (`src/ui/art.tsx`). Oddballs (animals, objects, ghosts: the Randy and Pebbles kind) also go in `ODDBALLS`: the first card a player sees from one gets a "New face" badge, and the scrapbook collects them. `tests/cast.test.ts` fails if anyone in a pack has no portrait or name.

Each week the newer oddballs debut on pinned cards (`slot: 9` on days 1-5, `slot: 13` on days 1-4), after the day's main story and the law, so every player meets them.

Cards can say `{mayor}` and `{folk}` for the player's names.
