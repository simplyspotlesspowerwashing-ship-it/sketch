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

## What a day is made of (20 cards)

| Slot | What | How it is marked |
|---|---|---|
| 1 | The day's main story: five or six cards deep, back to back | `day: n, slot: 0` |
| 8 | A law you can sign or refuse | `day: n, slot: 7`, `who: "desk"`, story `law` |
| 12 | The day's one catastrophe, with two beats after it | `day: n, slot: 11` |
| 16 | The sneak moment (hold, release while they look away) | `day: n, slot: 15`, `sneak: true` |
| the rest | Side stories from the shared pool, two or three beats each | no `day` |

Pressure cards (`repeat: true` with `requires.min` / `max`) cut in when a meter is very low or very high. Sunday has one election card in `campaign`, whose options carry `vote`.

## The cast

The funniest cards belong to the oddballs: Deputy Randy (a raccoon, ex-mayor, coat full of associates), Gerald (Goose Union), Mr Whiskers Esq. (cat, lawyer, also the judge), Kevin (a pothole; says nothing), the Cheese (hums), Clive (a traffic cone; your opponent; says nothing), Mr Nutkins (squirrel banker), Inspector Biscuit (a dog who outranks Barb), Bev (97, scooter). The humans mostly report what the oddballs have done: Doug (treasurer, cries), Barb (police), Pam (PTA), Marge (the Bugle), Chad (billionaire), Linda (librarian), Steve (weather), Timmy (8), Dr Nora, Sal, Coach Dunk, Brayden, Marcel.

Cards can say `{mayor}` and `{folk}` for the player's names.
