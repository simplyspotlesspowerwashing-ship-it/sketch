# Balance report: pack `week1`

5000 terms per policy. Tuning: {"people":0.5,"press":0.2,"business":0.1,"law":0.1,"objective":2,"brokenPromise":-4,"min":5,"max":95}.

| Policy | Win rate | Target | Mean vote | Vote p10 / p50 / p90 | Recalled | Bankrupt | Term ended early | Ending money $k p10 / p50 / p90 |
|---|---|---|---|---|---|---|---|---|
| random | 0.0% | on target | 14.4 | 7 / 15 / 19 | 100.0% | 7.8% | 95.0% | 20 / 20 / 20 |
| greedy-approval | 11.6% |  | 30.6 | 17 / 23 / 50 | 100.0% | 91.6% | 54.7% | -44 / 20 / 20 |
| miser | 0.0% |  | 17.0 | 17 / 17 / 17 | 100.0% | 0.0% | 100.0% | 20 / 20 / 20 |
| people-pleaser | 0.0% |  | 14.7 | 11 / 13 / 19 | 100.0% | 90.6% | 100.0% | 20 / 20 / 20 |
| dave-only | 0.0% | **off target** (5-10%) | 15.0 | 7 / 17 / 19 | 100.0% | 11.5% | 98.4% | 20 / 20 / 20 |
| sensible | 38.8% | **off target** (55-65%) | 46.2 | 30 / 46 / 63 | 15.0% | 3.6% | 0.0% | -32 / 5 / 36 |
| | | recalls on target (under 25%) | | | | | | |

## Non-dilemmas and other flags (sensible bot)

- `billboard`: "No billboard" chosen 1% of the time (under 5%)
- `buglePress`: "Not the town's problem" chosen 4% of the time (under 5%)
- `campaignTruth`: "Big rally" chosen 2% of the time (under 5%)
- `campaignTruth`: "Call in every Favor" chosen 4% of the time (under 5%)
- `coneRally`: "Have the cone towed" chosen 1% of the time (under 5%)
- `crossingGuard`: "Children can look both ways" chosen 2% of the time (under 5%)
- `curfew`: "Fund a youth centre" chosen 86% of the time (over 85%)
- `diaryLeak`: "Blame the pigeon" chosen 4% of the time (under 5%)
- `evFair`: "Eat for the town" chosen 92% of the time (over 85%)
- `flood`: "Wait for it to dry" chosen 5% of the time (under 5%)
- `gooseOccupation`: "Pay them off in bread" chosen 88% of the time (over 85%)
- `gooseStrike`: "Wait them out" chosen 4% of the time (under 5%)
- `mascot`: "No mascot" chosen 3% of the time (under 5%)
- `mimeStrike`: "Notice them, with a banner" chosen 86% of the time (over 85%)
- `mimeStrike`: "Ignore the mimes" chosen 3% of the time (under 5%)
- `opera`: "Ban the opera" chosen 0% of the time (under 5%)
- `parkingMeters`: "Install meters" chosen 1% of the time (under 5%)
- `parkingMeters`: "Free parking forever" chosen 87% of the time (over 85%)
- `policeDog`: "One scared dog is plenty" chosen 2% of the time (under 5%)
- `rocketLibrary`: "Rebuild the library" chosen 88% of the time (over 85%)
- `roundabout`: "It's working as intended" chosen 3% of the time (under 5%)
- `schoolLunch`: "Paste builds character" chosen 2% of the time (under 5%)
- `secretStranger`: "Expose him in The Bugle" chosen 92% of the time (over 85%)
- `tvStation`: "Refuse" chosen 4% of the time (under 5%)
- `twinTown`: "Lock the gates" chosen 1% of the time (under 5%)

## Unreachable desk cards (never drawn by any policy)

- `pothole`
- `bankError`
- `strangerPrice`
- `heatwave`
- `squirrelLoan`
- `buyout`
- `overreach`
- `goldenGoose`

## random

Projects built (share of terms): school 34.2%, casino 30.7%, spoon 23.8%, pond 19.8%, helicopter 16.6%, tv 8.5%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 4404 | Open the books: 38.6% · Bribe him with cheese: 22.5% · Let Dave handle the audit: 38.9% | 0.0% | 0.0% |
| bearStory | 3063 | Yes, I wrestled a bear: 49.9% · Tell the truth: 50.1% | 0.0% | 0.0% |
| billboard | 2395 | Allow the billboard: 34.2% · A small one, round the back: 32.7% · No billboard: 33.2% | 0.0% | 0.0% |
| bridge | 4026 | Repair the bridge: 31.8% · Promise repairs soon: 33.6% · Put up a 'Good Luck' sign: 34.6% | 0.0% | 0.0% |
| buglePress | 4999 | Buy a new press: 32.1% · Use the school copier: 34.6% · Not the town's problem: 33.3% | 0.0% | 0.0% |
| campaign | 209 | Big rally: 26.3% · Call in every Favor: 9.6% · Attack ad about the cone: 32.5% · Just be yourself: 31.6% | 0.0% | 0.0% |
| campaignTruth | 39 | 'At least I'm not a goose': 17.9% · Promise a recount: 43.6% · Big rally: 30.8% · Call in every Favor: 7.7% | 0.0% | 0.0% |
| casinoCrime | 917 | Ban Linda from blackjack: 48.0% · Make her head of security: 52.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 35.0% · Launch from your own lawn: 32.4% · No rockets near children: 32.5% | 0.0% | 0.0% |
| cheeseVault | 39 | Sell it, fast: 30.8% · Throw a cheese festival: 25.6% · Seal the vault: 43.6% | 0.0% | 0.0% |
| coneRally | 553 | Hold a bigger rally: 35.6% · Debate the cone, live: 29.3% · Have the cone towed: 35.1% | 0.0% | 0.0% |
| crossingGuard | 759 | Hire a human: 31.8% · Gerald it is: 35.0% · Children can look both ways: 33.2% | 0.0% | 0.0% |
| curfew | 4999 | Curfew at 9 pm: 33.0% · Fund a youth centre: 32.9% · Let them stand: 34.1% | 0.0% | 0.0% |
| diaryLeak | 1476 | Apologise to everyone: 33.9% · Publish the whole diary: 33.1% · Blame the pigeon: 32.9% | 0.0% | 0.0% |
| duckDuel | 212 | Back Gerald: 33.5% · Back the duck: 35.8% · Stay out of bird politics: 30.7% | 0.0% | 0.0% |
| evBallots | 947 | Tell the town: 52.0% · Put the boxes back: 48.0% | 46.6% | 0.0% |
| evBear | 971 | Apologise to the bear: 49.9% · Wrestle it for real: 50.1% | 48.4% | 0.0% |
| evDebate | 635 | Debate with facts: 46.6% · Debate with insults: 53.4% | 46.3% | 0.0% |
| evFair | 820 | Eat for the town: 50.6% · Decline politely: 49.4% | 48.2% | 0.0% |
| evNote | 4769 | Go and look: 49.6% · Burn the note: 50.4% | 46.7% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.8% · Buy a new float: 49.2% | 47.3% | 0.0% |
| evPower | 2725 | Pay Chad's guy: 47.1% · Hand out candles: 52.9% | 48.8% | 0.0% |
| evStorm | 4999 | Buy sandbags: 49.3% · Ignore Steve: 50.7% | 46.5% | 0.0% |
| farmersMarket | 4411 | Protect the market: 34.3% · Ban the market: 34.3% · Market pays a fee: 31.4% | 0.0% | 0.0% |
| festival | 3455 | Fund Frog Day: 33.5% · Promise Frog Day soon: 33.5% · No Frog Day: 33.1% | 0.0% | 0.0% |
| fireworks | 558 | Fireworks for Timmy: 31.4% · One sparkler: 36.2% · No fireworks: 32.4% | 0.0% | 0.0% |
| flood | 3499 | Rent the pumps: 29.9% · Rename it 'Little Venice': 35.8% · Wait for it to dry: 34.3% | 0.0% | 0.0% |
| giantSpoon | 3816 | Build the spoon: 31.2% · A normal-sized spoon: 34.5% · No spoon: 34.3% | 0.0% | 0.0% |
| gooseOccupation | 750 | Pay them off in bread: 46.9% · Send Chief Barb: 53.1% | 0.0% | 0.0% |
| goosePond | 2649 | Build the pond: 37.4% · Pond in the park instead: 20.0% · Refuse: 42.5% | 0.0% | 0.0% |
| gooseStrike | 884 | Meet their demands: 33.9% · Hire ducks instead: 33.1% · Wait them out: 32.9% | 0.0% | 0.0% |
| haunted | 4944 | Fund the ghost hunt: 33.3% · Seal the basement: 33.8% · There's nothing down there: 32.9% | 0.0% | 0.0% |
| helicopter | 2795 | Buy it: 29.7% · Lease one: 35.9% · Promise it next quarter: 34.3% | 0.0% | 0.0% |
| lakeMonster | 8 | Put it on the brochure: 12.5% · Protect its privacy: 62.5% · There is no monster: 25.0% | 0.0% | 0.0% |
| libraryCasino | 4217 | Build the casino: 36.4% · Refuse: 37.4% · Casino night, once a year: 26.2% | 0.0% | 0.0% |
| mallParking | 3719 | Pave the park: 39.6% · Only half the park: 23.7% · Hands off the park: 36.8% | 0.0% | 0.0% |
| mascot | 336 | Welcome, Wet Sock: 37.5% · Hire a real designer: 25.9% · No mascot: 36.6% | 0.0% | 0.0% |
| mimeStrike | 4817 | Notice them, with a banner: 33.8% · Negotiate in mime: 32.4% · Ignore the mimes: 33.8% | 0.0% | 0.0% |
| moonClaim | 4894 | Plant the flag: 32.5% · Sell the moon to Chad: 34.1% · Give the moon back: 33.4% | 0.0% | 0.0% |
| moonRent | 1565 | Pay the moonlight bill: 50.7% · Charge him for the view: 49.3% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 34.2% · Promise it by spring: 33.3% · Buy a second book: 32.5% | 0.0% | 0.0% |
| nightLibrary | 1407 | Fund the night library: 38.7% · Let her run a 'truth club': 18.8% · Libraries close at five: 42.6% | 0.0% | 0.0% |
| opera | 2632 | Attend and applaud: 34.3% · Pay for rewrites: 32.6% · Ban the opera: 33.1% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 32.2% · Meters for visitors only: 33.4% · Free parking forever: 34.3% | 0.0% | 0.0% |
| parkWifi | 1773 | Free park wifi: 31.9% · Wifi with Chad's ads: 33.1% · Go outside and play: 35.0% | 0.0% | 0.0% |
| pettyCrime | 4453 | Pay for overtime: 48.7% · Blame the next town over: 51.3% | 0.0% | 0.0% |
| pigeonAide | 1 | Hire the pigeon: 0.0% · Let it sign today's stack: 100.0% · Evict the pigeon: 0.0% | 0.0% | 0.0% |
| policeDog | 1037 | Buy a braver dog: 29.1% · Therapy for the old dog: 34.0% · One scared dog is plenty: 36.8% | 0.0% | 0.0% |
| raccoonBins | 3929 | Raccoon-proof bins: 32.5% · Night patrols: 33.7% · They live here too: 33.7% | 0.0% | 0.0% |
| radar | 373 | Buy the radar: 32.4% · Promise it next quarter: 33.0% · The finger is fine: 34.6% | 0.0% | 0.0% |
| rocketLibrary | 1752 | Rebuild the library: 50.4% · Leave the rocket in: 49.6% | 0.0% | 0.0% |
| roundabout | 2105 | Rescue the drivers: 37.3% · Sell tickets to watch: 22.6% · It's working as intended: 40.1% | 0.0% | 0.0% |
| schoolLunch | 3069 | Pay for real food: 32.6% · Chad sponsors lunch: 34.1% · Paste builds character: 33.3% | 0.0% | 0.0% |
| secretStranger | 229 | Expose him in The Bugle: 49.3% · Take his hush money: 50.7% | 0.0% | 0.0% |
| snowplow | 102 | Plow the school road: 34.3% · Plow Chad Street: 33.3% · Rent a second plow: 32.4% | 0.0% | 0.0% |
| speedTrap | 628 | Approve the speed trap: 32.8% · Warning signs only: 30.9% · No speed trap: 36.3% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 34.2% · A statue of someone normal: 33.0% · No statues: 32.8% | 0.0% | 0.0% |
| talentShow | 989 | Judge honestly: 32.3% · Everyone wins: 36.0% · Send Dave: 31.7% | 0.0% | 0.0% |
| taxBreak | 2123 | Grant the tax break: 39.5% · Trade it for a donation: 18.3% · Refuse: 42.2% | 0.0% | 0.0% |
| theWhistle | 726 | Shut down The Whistle: 32.9% · Buy The Whistle: 32.5% · A free press is good: 34.6% | 0.0% | 0.0% |
| timeCapsule | 993 | Settle with Chad: 32.8% · Bury it again, deeper: 31.7% · Frame the note: 35.4% | 0.0% | 0.0% |
| tvStation | 1349 | Build the station: 31.6% · Lend her the roof: 33.4% · Refuse: 35.0% | 0.0% | 0.0% |
| twinTown | 1099 | Throw a welcome party: 30.8% · Show them the pothole: 33.1% · Lock the gates: 36.0% | 0.0% | 0.0% |

## greedy-approval

Projects built (share of terms): school 100.0%, casino 90.4%, helicopter 59.3%, pond 58.0%, tv 0.4%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 4972 | Open the books: 53.2% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 46.8% | 0.0% | 0.0% |
| bearStory | 2128 | Yes, I wrestled a bear: 100.0% · Tell the truth: 0.0% | 0.0% | 0.0% |
| billboard | 4690 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 0.0% |
| bridge | 4999 | Repair the bridge: 64.1% · Promise repairs soon: 35.9% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| buglePress | 5000 | Buy a new press: 98.9% · Use the school copier: 1.1% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| campaignTruth | 2265 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| casinoCrime | 2805 | Ban Linda from blackjack: 1.6% · Make her head of security: 98.4% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| cheeseVault | 11 | Sell it, fast: 27.3% · Throw a cheese festival: 72.7% · Seal the vault: 0.0% | 0.0% | 0.0% |
| coneRally | 3029 | Hold a bigger rally: 50.2% · Debate the cone, live: 49.8% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| crossingGuard | 3491 | Hire a human: 52.7% · Gerald it is: 47.3% · Children can look both ways: 0.0% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 0.4% · Fund a youth centre: 99.6% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 4231 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| duckDuel | 2 | Back Gerald: 100.0% · Back the duck: 0.0% · Stay out of bird politics: 0.0% | 0.0% | 0.0% |
| entitled | 2 | Free ice cream: 100.0% · Say no nicely: 0.0% | 0.0% | 0.0% |
| evBallots | 4537 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evBear | 45 | Apologise to the bear: 55.6% · Wrestle it for real: 44.4% | 0.0% | 0.0% |
| evDebate | 3167 | Debate with facts: 100.0% · Debate with insults: 0.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 4927 | Pay Chad's guy: 62.5% · Hand out candles: 37.5% | 25.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 94.9% · Ignore Steve: 5.1% | 0.0% | 0.0% |
| farmersMarket | 5000 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| festival | 2527 | Fund Frog Day: 72.4% · Promise Frog Day soon: 27.6% · No Frog Day: 0.0% | 0.0% | 0.0% |
| fireworks | 7 | Fireworks for Timmy: 42.9% · One sparkler: 42.9% · No fireworks: 14.3% | 0.0% | 0.0% |
| flood | 4942 | Rent the pumps: 43.8% · Rename it 'Little Venice': 56.2% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| giantSpoon | 4990 | Build the spoon: 0.0% · A normal-sized spoon: 90.9% · No spoon: 9.1% | 0.0% | 0.0% |
| gooseOccupation | 1100 | Pay them off in bread: 68.2% · Send Chief Barb: 31.8% | 0.0% | 0.0% |
| goosePond | 4845 | Build the pond: 59.9% · Pond in the park instead: 18.5% · Refuse: 21.6% | 0.0% | 0.0% |
| gooseStrike | 3857 | Meet their demands: 58.0% · Hire ducks instead: 18.3% · Wait them out: 23.7% | 0.0% | 0.0% |
| haunted | 5000 | Fund the ghost hunt: 97.4% · Seal the basement: 1.7% · There's nothing down there: 0.8% | 0.0% | 0.0% |
| helicopter | 4960 | Buy it: 59.7% · Lease one: 40.3% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| libraryCasino | 4995 | Build the casino: 90.5% · Refuse: 0.0% · Casino night, once a year: 9.5% | 0.0% | 0.0% |
| mallParking | 4794 | Pave the park: 0.3% · Only half the park: 99.7% · Hands off the park: 0.0% | 0.0% | 0.0% |
| mascot | 2 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 0.0% |
| mimeStrike | 5000 | Notice them, with a banner: 91.4% · Negotiate in mime: 8.6% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 5000 | Plant the flag: 87.3% · Sell the moon to Chad: 12.7% · Give the moon back: 0.0% | 0.0% | 0.0% |
| moonRent | 4363 | Pay the moonlight bill: 81.5% · Charge him for the view: 18.5% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 100.0% · Promise it by spring: 0.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| nightLibrary | 3324 | Fund the night library: 2.1% · Let her run a 'truth club': 96.8% · Libraries close at five: 1.0% | 0.0% | 0.0% |
| opera | 587 | Attend and applaud: 37.8% · Pay for rewrites: 62.2% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 298 | Free park wifi: 44.3% · Wifi with Chad's ads: 55.7% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 2821 | Pay for overtime: 65.6% · Blame the next town over: 34.4% | 0.0% | 0.0% |
| policeDog | 4041 | Buy a braver dog: 64.7% · Therapy for the old dog: 16.6% · One scared dog is plenty: 18.7% | 0.0% | 0.0% |
| raccoonBins | 4997 | Raccoon-proof bins: 54.4% · Night patrols: 45.6% · They live here too: 0.0% | 0.0% | 0.0% |
| radar | 478 | Buy the radar: 37.7% · Promise it next quarter: 62.3% · The finger is fine: 0.0% | 0.0% | 0.0% |
| rocketLibrary | 5000 | Rebuild the library: 100.0% · Leave the rocket in: 0.0% | 0.0% | 0.0% |
| roundabout | 4499 | Rescue the drivers: 87.9% · Sell tickets to watch: 11.8% · It's working as intended: 0.4% | 0.0% | 0.0% |
| schoolLunch | 1438 | Pay for real food: 51.2% · Chad sponsors lunch: 48.8% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 4435 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| snowplow | 70 | Plow the school road: 47.1% · Plow Chad Street: 0.0% · Rent a second plow: 52.9% | 0.0% | 0.0% |
| speedTrap | 2814 | Approve the speed trap: 21.3% · Warning signs only: 78.7% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 0.0% · A statue of someone normal: 100.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 4069 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 4672 | Grant the tax break: 69.2% · Trade it for a donation: 29.4% · Refuse: 1.4% | 0.0% | 0.0% |
| theWhistle | 14 | Shut down The Whistle: 100.0% · Buy The Whistle: 0.0% · A free press is good: 0.0% | 0.0% | 0.0% |
| timeCapsule | 1539 | Settle with Chad: 63.5% · Bury it again, deeper: 0.0% · Frame the note: 36.5% | 0.0% | 0.0% |
| tvStation | 82 | Build the station: 24.4% · Lend her the roof: 75.6% · Refuse: 0.0% | 0.0% | 0.0% |
| twinTown | 93 | Throw a welcome party: 38.7% · Show them the pothole: 61.3% · Lock the gates: 0.0% | 0.0% | 0.0% |

## miser

Projects built (share of terms): spoon 1.4%, casino 0.4%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 486 | Open the books: 0.0% · Bribe him with cheese: 100.0% · Let Dave handle the audit: 0.0% | 0.0% | 0.0% |
| bearStory | 456 | Yes, I wrestled a bear: 100.0% · Tell the truth: 0.0% | 0.0% | 0.0% |
| bridge | 127 | Repair the bridge: 0.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 100.0% | 0.0% | 0.0% |
| buglePress | 5000 | Buy a new press: 0.0% · Use the school copier: 100.0% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| casinoCrime | 12 | Ban Linda from blackjack: 100.0% · Make her head of security: 0.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 100.0% · Fund a youth centre: 0.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| duckDuel | 140 | Back Gerald: 100.0% · Back the duck: 0.0% · Stay out of bird politics: 0.0% | 0.0% | 0.0% |
| evBear | 45 | Apologise to the bear: - · Wrestle it for real: - | 100.0% | 0.0% |
| evNote | 594 | Go and look: - · Burn the note: - | 100.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: - · Buy a new float: - | 100.0% | 0.0% |
| evPower | 7 | Pay Chad's guy: - · Hand out candles: - | 100.0% | 0.0% |
| evStorm | 4999 | Buy sandbags: - · Ignore Steve: - | 100.0% | 0.0% |
| farmersMarket | 19 | Protect the market: 0.0% · Ban the market: 0.0% · Market pays a fee: 100.0% | 0.0% | 0.0% |
| festival | 4996 | Fund Frog Day: 0.0% · Promise Frog Day soon: 0.0% · No Frog Day: 100.0% | 0.0% | 0.0% |
| fireworks | 2765 | Fireworks for Timmy: 0.0% · One sparkler: 0.0% · No fireworks: 100.0% | 0.0% | 0.0% |
| flood | 5 | Rent the pumps: 0.0% · Rename it 'Little Venice': 100.0% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| giantSpoon | 72 | Build the spoon: 100.0% · A normal-sized spoon: 0.0% · No spoon: 0.0% | 0.0% | 0.0% |
| haunted | 2622 | Fund the ghost hunt: 0.0% · Seal the basement: 0.0% · There's nothing down there: 100.0% | 0.0% | 0.0% |
| helicopter | 4 | Buy it: 0.0% · Lease one: 100.0% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| libraryCasino | 19 | Build the casino: 100.0% · Refuse: 0.0% · Casino night, once a year: 0.0% | 0.0% | 0.0% |
| mallParking | 1 | Pave the park: 100.0% · Only half the park: 0.0% · Hands off the park: 0.0% | 0.0% | 0.0% |
| mascot | 2 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 0.0% |
| mimeStrike | 856 | Notice them, with a banner: 0.0% · Negotiate in mime: 100.0% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 1818 | Plant the flag: 0.0% · Sell the moon to Chad: 100.0% · Give the moon back: 0.0% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 0.0% · Promise it by spring: 0.0% · Buy a second book: 100.0% | 0.0% | 0.0% |
| nightLibrary | 787 | Fund the night library: 0.0% · Let her run a 'truth club': 100.0% · Libraries close at five: 0.0% | 0.0% | 0.0% |
| opera | 370 | Attend and applaud: 100.0% · Pay for rewrites: 0.0% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 100.0% · Meters for visitors only: 0.0% · Free parking forever: 0.0% | 0.0% | 0.0% |
| parkWifi | 3957 | Free park wifi: 0.0% · Wifi with Chad's ads: 100.0% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 408 | Pay for overtime: 0.0% · Blame the next town over: 100.0% | 0.0% | 0.0% |
| raccoonBins | 121 | Raccoon-proof bins: 0.0% · Night patrols: 100.0% · They live here too: 0.0% | 0.0% | 0.0% |
| radar | 773 | Buy the radar: 0.0% · Promise it next quarter: 0.0% · The finger is fine: 100.0% | 0.0% | 0.0% |
| rocketLibrary | 5000 | Rebuild the library: 0.0% · Leave the rocket in: 100.0% | 0.0% | 0.0% |
| roundabout | 3 | Rescue the drivers: 0.0% · Sell tickets to watch: 100.0% · It's working as intended: 0.0% | 0.0% | 0.0% |
| schoolLunch | 4994 | Pay for real food: 0.0% · Chad sponsors lunch: 100.0% · Paste builds character: 0.0% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 100.0% · A statue of someone normal: 0.0% · No statues: 0.0% | 0.0% | 0.0% |
| theWhistle | 2 | Shut down The Whistle: 100.0% · Buy The Whistle: 0.0% · A free press is good: 0.0% | 0.0% | 0.0% |
| timeCapsule | 776 | Settle with Chad: 0.0% · Bury it again, deeper: 100.0% · Frame the note: 0.0% | 0.0% | 0.0% |
| tvStation | 280 | Build the station: 0.0% · Lend her the roof: 100.0% · Refuse: 0.0% | 0.0% | 0.0% |
| twinTown | 3614 | Throw a welcome party: 0.0% · Show them the pothole: 100.0% · Lock the gates: 0.0% | 0.0% | 0.0% |

## people-pleaser

Projects built (share of terms): school 100.0%, tv 43.8%, pond 0.5%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 774 | Open the books: 26.2% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 73.8% | 0.0% | 0.0% |
| bearStory | 3669 | Yes, I wrestled a bear: 0.0% · Tell the truth: 100.0% | 0.0% | 0.0% |
| billboard | 127 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 0.0% |
| bridge | 3390 | Repair the bridge: 20.8% · Promise repairs soon: 79.2% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| buglePress | 4932 | Buy a new press: 15.4% · Use the school copier: 0.0% · Not the town's problem: 84.6% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 0.0% · Launch from your own lawn: 100.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| crossingGuard | 11 | Hire a human: 0.0% · Gerald it is: 100.0% · Children can look both ways: 0.0% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 0.0% · Fund a youth centre: 91.6% · Let them stand: 8.4% | 0.0% | 0.0% |
| diaryLeak | 46 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| entitled | 12 | Free ice cream: 100.0% · Say no nicely: 0.0% | 0.0% | 0.0% |
| evBallots | 49 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evDebate | 7 | Debate with facts: 0.0% · Debate with insults: 100.0% | 0.0% | 0.0% |
| evFair | 39 | Eat for the town: 100.0% · Decline politely: 0.0% | 0.0% | 0.0% |
| evNote | 4496 | Go and look: - · Burn the note: - | 100.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 1912 | Pay Chad's guy: 17.9% · Hand out candles: 82.1% | 48.9% | 0.0% |
| evStorm | 4889 | Buy sandbags: 63.5% · Ignore Steve: 36.5% | 0.0% | 0.0% |
| farmersMarket | 5000 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| flood | 417 | Rent the pumps: 13.7% · Rename it 'Little Venice': 86.3% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| giantSpoon | 2430 | Build the spoon: 0.0% · A normal-sized spoon: 73.9% · No spoon: 26.1% | 0.0% | 0.0% |
| gooseOccupation | 48 | Pay them off in bread: 39.6% · Send Chief Barb: 60.4% | 0.0% | 0.0% |
| goosePond | 142 | Build the pond: 18.3% · Pond in the park instead: 7.7% · Refuse: 73.9% | 0.0% | 0.0% |
| gooseStrike | 13 | Meet their demands: 0.0% · Hire ducks instead: 23.1% · Wait them out: 76.9% | 0.0% | 0.0% |
| haunted | 4671 | Fund the ghost hunt: 93.5% · Seal the basement: 6.2% · There's nothing down there: 0.2% | 0.0% | 0.0% |
| helicopter | 4393 | Buy it: 0.0% · Lease one: 100.0% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| libraryCasino | 4999 | Build the casino: 0.0% · Refuse: 100.0% · Casino night, once a year: 0.0% | 0.0% | 0.0% |
| mallParking | 4999 | Pave the park: 0.0% · Only half the park: 0.0% · Hands off the park: 100.0% | 0.0% | 0.0% |
| mascot | 120 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 0.0% |
| mimeStrike | 4571 | Notice them, with a banner: 93.0% · Negotiate in mime: 7.0% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 4624 | Plant the flag: 90.4% · Sell the moon to Chad: 0.0% · Give the moon back: 9.6% | 0.0% | 0.0% |
| moonRent | 4122 | Pay the moonlight bill: 87.2% · Charge him for the view: 12.8% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 100.0% · Promise it by spring: 0.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| nightLibrary | 627 | Fund the night library: 1.9% · Let her run a 'truth club': 96.8% · Libraries close at five: 1.3% | 0.0% | 0.0% |
| opera | 3585 | Attend and applaud: 0.0% · Pay for rewrites: 28.6% · Ban the opera: 71.4% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| pettyCrime | 1141 | Pay for overtime: 20.2% · Blame the next town over: 79.8% | 0.0% | 0.0% |
| policeDog | 1298 | Buy a braver dog: 0.0% · Therapy for the old dog: 89.4% · One scared dog is plenty: 10.6% | 0.0% | 0.0% |
| raccoonBins | 2948 | Raccoon-proof bins: 19.8% · Night patrols: 0.0% · They live here too: 80.2% | 0.0% | 0.0% |
| radar | 3 | Buy the radar: 66.7% · Promise it next quarter: 33.3% · The finger is fine: 0.0% | 0.0% | 0.0% |
| roundabout | 4254 | Rescue the drivers: 70.5% · Sell tickets to watch: 29.5% · It's working as intended: 0.0% | 0.0% | 0.0% |
| secretStranger | 31 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| snowplow | 1 | Plow the school road: 100.0% · Plow Chad Street: 0.0% · Rent a second plow: 0.0% | 0.0% | 0.0% |
| speedTrap | 863 | Approve the speed trap: 8.1% · Warning signs only: 91.9% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 0.0% · A statue of someone normal: 100.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 19 | Judge honestly: 0.0% · Everyone wins: 21.1% · Send Dave: 78.9% | 0.0% | 0.0% |
| taxBreak | 124 | Grant the tax break: 0.0% · Trade it for a donation: 0.0% · Refuse: 100.0% | 0.0% | 0.0% |
| theWhistle | 130 | Shut down The Whistle: 0.0% · Buy The Whistle: 51.5% · A free press is good: 48.5% | 0.0% | 0.0% |
| timeCapsule | 109 | Settle with Chad: 86.2% · Bury it again, deeper: 0.0% · Frame the note: 13.8% | 0.0% | 0.0% |
| tvStation | 2747 | Build the station: 79.7% · Lend her the roof: 20.3% · Refuse: 0.0% | 0.0% | 0.0% |

## dave-only

Projects built (share of terms): school 32.3%, casino 30.4%, spoon 19.0%, pond 15.9%, helicopter 14.1%, tv 8.0%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 4210 | Open the books: 38.1% · Bribe him with cheese: 22.1% · Let Dave handle the audit: 39.8% | 0.0% | 0.0% |
| bearStory | 3018 | Yes, I wrestled a bear: 49.2% · Tell the truth: 50.8% | 0.0% | 0.0% |
| billboard | 1858 | Allow the billboard: 31.8% · A small one, round the back: 33.4% · No billboard: 34.8% | 0.0% | 0.0% |
| bridge | 3715 | Repair the bridge: 30.2% · Promise repairs soon: 37.4% · Put up a 'Good Luck' sign: 32.4% | 0.0% | 0.0% |
| buglePress | 5000 | Buy a new press: 31.5% · Use the school copier: 32.8% · Not the town's problem: 35.7% | 0.0% | 0.0% |
| campaign | 70 | Big rally: 0.0% · Call in every Favor: 0.0% · Attack ad about the cone: 0.0% · Just be yourself: 100.0% | 0.0% | 0.0% |
| campaignTruth | 11 | 'At least I'm not a goose': 0.0% · Promise a recount: 9.1% · Big rally: 81.8% · Call in every Favor: 9.1% | 0.0% | 0.0% |
| casinoCrime | 826 | Ban Linda from blackjack: 49.0% · Make her head of security: 51.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 33.4% · Launch from your own lawn: 33.8% · No rockets near children: 32.8% | 0.0% | 0.0% |
| cheeseVault | 29 | Sell it, fast: 24.1% · Throw a cheese festival: 34.5% · Seal the vault: 41.4% | 0.0% | 0.0% |
| coneRally | 241 | Hold a bigger rally: 26.1% · Debate the cone, live: 36.9% · Have the cone towed: 36.9% | 0.0% | 0.0% |
| crossingGuard | 345 | Hire a human: 30.7% · Gerald it is: 32.2% · Children can look both ways: 37.1% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 33.2% · Fund a youth centre: 32.8% · Let them stand: 34.0% | 0.0% | 0.0% |
| diaryLeak | 993 | Apologise to everyone: 33.9% · Publish the whole diary: 33.6% · Blame the pigeon: 32.4% | 0.0% | 0.0% |
| duckDuel | 169 | Back Gerald: 31.4% · Back the duck: 33.1% · Stay out of bird politics: 35.5% | 0.0% | 0.0% |
| evBallots | 650 | Tell the town: 50.0% · Put the boxes back: 50.0% | 52.0% | 0.0% |
| evBear | 858 | Apologise to the bear: 60.0% · Wrestle it for real: 40.0% | 50.5% | 0.0% |
| evDebate | 278 | Debate with facts: 50.7% · Debate with insults: 49.3% | 51.8% | 0.0% |
| evFair | 540 | Eat for the town: 49.8% · Decline politely: 50.2% | 52.0% | 0.0% |
| evNote | 4689 | Go and look: 49.7% · Burn the note: 50.3% | 48.8% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.5% · Buy a new float: 49.5% | 49.5% | 0.0% |
| evPower | 2389 | Pay Chad's guy: 43.6% · Hand out candles: 56.4% | 53.0% | 0.0% |
| evStorm | 4998 | Buy sandbags: 49.0% · Ignore Steve: 51.0% | 49.9% | 0.0% |
| farmersMarket | 4439 | Protect the market: 35.1% · Ban the market: 35.2% · Market pays a fee: 29.7% | 0.0% | 0.0% |
| festival | 3343 | Fund Frog Day: 32.5% · Promise Frog Day soon: 34.2% · No Frog Day: 33.3% | 0.0% | 0.0% |
| fireworks | 461 | Fireworks for Timmy: 30.2% · One sparkler: 31.0% · No fireworks: 38.8% | 0.0% | 0.0% |
| flood | 2998 | Rent the pumps: 26.7% · Rename it 'Little Venice': 35.0% · Wait for it to dry: 38.3% | 0.0% | 0.0% |
| giantSpoon | 3439 | Build the spoon: 27.6% · A normal-sized spoon: 35.7% · No spoon: 36.7% | 0.0% | 0.0% |
| gooseOccupation | 487 | Pay them off in bread: 49.3% · Send Chief Barb: 50.7% | 0.0% | 0.0% |
| goosePond | 2120 | Build the pond: 37.4% · Pond in the park instead: 19.2% · Refuse: 43.4% | 0.0% | 0.0% |
| gooseStrike | 485 | Meet their demands: 29.1% · Hire ducks instead: 35.9% · Wait them out: 35.1% | 0.0% | 0.0% |
| haunted | 4897 | Fund the ghost hunt: 33.1% · Seal the basement: 33.8% · There's nothing down there: 33.1% | 0.0% | 0.0% |
| helicopter | 2478 | Buy it: 28.4% · Lease one: 35.2% · Promise it next quarter: 36.4% | 0.0% | 0.0% |
| lakeMonster | 5 | Put it on the brochure: 40.0% · Protect its privacy: 20.0% · There is no monster: 40.0% | 0.0% | 0.0% |
| libraryCasino | 4265 | Build the casino: 35.6% · Refuse: 37.3% · Casino night, once a year: 27.1% | 0.0% | 0.0% |
| mallParking | 3743 | Pave the park: 37.9% · Only half the park: 23.2% · Hands off the park: 38.9% | 0.0% | 0.0% |
| mascot | 297 | Welcome, Wet Sock: 31.6% · Hire a real designer: 29.3% · No mascot: 39.1% | 0.0% | 0.0% |
| mimeStrike | 4742 | Notice them, with a banner: 33.6% · Negotiate in mime: 33.9% · Ignore the mimes: 32.5% | 0.0% | 0.0% |
| moonClaim | 4842 | Plant the flag: 32.7% · Sell the moon to Chad: 34.1% · Give the moon back: 33.3% | 0.0% | 0.0% |
| moonRent | 1553 | Pay the moonlight bill: 47.1% · Charge him for the view: 52.9% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 32.3% · Promise it by spring: 33.9% · Buy a second book: 33.8% | 0.0% | 0.0% |
| nightLibrary | 1292 | Fund the night library: 39.1% · Let her run a 'truth club': 19.3% · Libraries close at five: 41.6% | 0.0% | 0.0% |
| opera | 2590 | Attend and applaud: 33.4% · Pay for rewrites: 34.2% · Ban the opera: 32.4% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 33.8% · Meters for visitors only: 32.8% · Free parking forever: 33.4% | 0.0% | 0.0% |
| parkWifi | 1535 | Free park wifi: 32.8% · Wifi with Chad's ads: 33.7% · Go outside and play: 33.4% | 0.0% | 0.0% |
| pettyCrime | 4218 | Pay for overtime: 48.6% · Blame the next town over: 51.4% | 0.0% | 0.0% |
| pigeonAide | 1 | Hire the pigeon: 0.0% · Let it sign today's stack: 0.0% · Evict the pigeon: 100.0% | 0.0% | 0.0% |
| policeDog | 788 | Buy a braver dog: 27.3% · Therapy for the old dog: 34.4% · One scared dog is plenty: 38.3% | 0.0% | 0.0% |
| raccoonBins | 3589 | Raccoon-proof bins: 29.2% · Night patrols: 33.7% · They live here too: 37.1% | 0.0% | 0.0% |
| radar | 333 | Buy the radar: 32.7% · Promise it next quarter: 30.0% · The finger is fine: 37.2% | 0.0% | 0.0% |
| rocketLibrary | 1670 | Rebuild the library: 49.2% · Leave the rocket in: 50.8% | 0.0% | 0.0% |
| roundabout | 1880 | Rescue the drivers: 38.4% · Sell tickets to watch: 23.1% · It's working as intended: 38.6% | 0.0% | 0.0% |
| schoolLunch | 3000 | Pay for real food: 34.1% · Chad sponsors lunch: 33.6% · Paste builds character: 32.2% | 0.0% | 0.0% |
| secretStranger | 135 | Expose him in The Bugle: 52.6% · Take his hush money: 47.4% | 0.0% | 0.0% |
| snowplow | 82 | Plow the school road: 37.8% · Plow Chad Street: 31.7% · Rent a second plow: 30.5% | 0.0% | 0.0% |
| speedTrap | 460 | Approve the speed trap: 32.4% · Warning signs only: 37.2% · No speed trap: 30.4% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 33.1% · A statue of someone normal: 33.3% · No statues: 33.7% | 0.0% | 0.0% |
| talentShow | 583 | Judge honestly: 29.5% · Everyone wins: 34.3% · Send Dave: 36.2% | 0.0% | 0.0% |
| taxBreak | 1573 | Grant the tax break: 37.5% · Trade it for a donation: 17.5% · Refuse: 44.9% | 0.0% | 0.0% |
| theWhistle | 701 | Shut down The Whistle: 36.5% · Buy The Whistle: 27.7% · A free press is good: 35.8% | 0.0% | 0.0% |
| timeCapsule | 919 | Settle with Chad: 32.0% · Bury it again, deeper: 34.3% · Frame the note: 33.7% | 0.0% | 0.0% |
| tvStation | 1314 | Build the station: 30.3% · Lend her the roof: 35.2% · Refuse: 34.6% | 0.0% | 0.0% |
| twinTown | 931 | Throw a welcome party: 32.9% · Show them the pothole: 33.5% · Lock the gates: 33.6% | 0.0% | 0.0% |

## sensible

Projects built (share of terms): school 52.6%, casino 45.8%, pond 25.3%, helicopter 14.3%, spoon 9.4%, tv 3.6%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 35.1% · Bribe him with cheese: 21.4% · Let Dave handle the audit: 43.6% | 0.0% | 0.0% |
| bearStory | 3282 | Yes, I wrestled a bear: 76.7% · Tell the truth: 23.3% | 0.0% | 0.0% |
| billboard | 5000 | Allow the billboard: 60.3% · A small one, round the back: 38.4% · No billboard: 1.3% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 60.4% · Promise repairs soon: 30.9% · Put up a 'Good Luck' sign: 8.8% | 0.0% | 0.0% |
| buglePress | 5000 | Buy a new press: 75.1% · Use the school copier: 20.6% · Not the town's problem: 4.4% | 0.0% | 0.0% |
| campaign | 2566 | Big rally: 8.5% · Call in every Favor: 12.7% · Attack ad about the cone: 37.8% · Just be yourself: 41.1% | 0.0% | 0.0% |
| campaignTruth | 2434 | 'At least I'm not a goose': 14.5% · Promise a recount: 79.8% · Big rally: 1.9% · Call in every Favor: 3.8% | 0.0% | 0.0% |
| casinoCrime | 1873 | Ban Linda from blackjack: 15.1% · Make her head of security: 84.9% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 52.3% · Launch from your own lawn: 33.6% · No rockets near children: 14.1% | 0.0% | 0.0% |
| cheeseVault | 175 | Sell it, fast: 34.9% · Throw a cheese festival: 38.9% · Seal the vault: 26.3% | 0.0% | 0.0% |
| coneRally | 4999 | Hold a bigger rally: 70.6% · Debate the cone, live: 28.1% · Have the cone towed: 1.3% | 0.0% | 0.0% |
| crossingGuard | 5000 | Hire a human: 84.9% · Gerald it is: 13.0% · Children can look both ways: 2.1% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 6.7% · Fund a youth centre: 86.2% · Let them stand: 7.1% | 0.0% | 0.0% |
| diaryLeak | 5000 | Apologise to everyone: 65.6% · Publish the whole diary: 30.5% · Blame the pigeon: 3.9% | 0.0% | 0.0% |
| duckDuel | 16 | Back Gerald: 56.3% · Back the duck: 31.3% · Stay out of bird politics: 12.5% | 0.0% | 0.0% |
| entitled | 33 | Free ice cream: 69.7% · Say no nicely: 30.3% | 0.0% | 0.0% |
| evBallots | 3309 | Tell the town: 75.5% · Put the boxes back: 24.5% | 2.6% | 0.0% |
| evBear | 692 | Apologise to the bear: 19.9% · Wrestle it for real: 80.1% | 1.3% | 0.0% |
| evDebate | 5000 | Debate with facts: 36.2% · Debate with insults: 63.8% | 0.1% | 0.0% |
| evFair | 1691 | Eat for the town: 92.4% · Decline politely: 7.6% | 2.5% | 0.0% |
| evNote | 5000 | Go and look: 38.8% · Burn the note: 61.2% | 10.5% | 0.0% |
| evParade | 5000 | Ride the float anyway: 45.8% · Buy a new float: 54.2% | 0.2% | 0.0% |
| evPower | 4308 | Pay Chad's guy: 77.2% · Hand out candles: 22.8% | 0.5% | 0.0% |
| evStorm | 5000 | Buy sandbags: 60.6% · Ignore Steve: 39.4% | 0.6% | 0.0% |
| farmersMarket | 4996 | Protect the market: 18.0% · Ban the market: 57.5% · Market pays a fee: 24.6% | 0.0% | 0.0% |
| festival | 1882 | Fund Frog Day: 68.8% · Promise Frog Day soon: 24.5% · No Frog Day: 6.7% | 0.0% | 0.0% |
| fireworks | 44 | Fireworks for Timmy: 79.5% · One sparkler: 18.2% · No fireworks: 2.3% | 0.0% | 0.0% |
| flood | 5000 | Rent the pumps: 68.9% · Rename it 'Little Venice': 26.3% · Wait for it to dry: 4.8% | 0.0% | 0.0% |
| giantSpoon | 5000 | Build the spoon: 9.4% · A normal-sized spoon: 64.9% · No spoon: 25.7% | 0.0% | 0.0% |
| gooseOccupation | 2825 | Pay them off in bread: 87.5% · Send Chief Barb: 12.5% | 0.0% | 0.0% |
| goosePond | 5000 | Build the pond: 25.3% · Pond in the park instead: 29.9% · Refuse: 44.8% | 0.0% | 0.0% |
| gooseStrike | 5000 | Meet their demands: 56.4% · Hire ducks instead: 40.0% · Wait them out: 3.5% | 0.0% | 0.0% |
| haunted | 5000 | Fund the ghost hunt: 44.3% · Seal the basement: 37.2% · There's nothing down there: 18.5% | 0.0% | 0.0% |
| helicopter | 4926 | Buy it: 14.6% · Lease one: 23.6% · Promise it next quarter: 61.8% | 0.0% | 0.0% |
| lakeMonster | 43 | Put it on the brochure: 74.4% · Protect its privacy: 20.9% · There is no monster: 4.7% | 0.0% | 0.0% |
| libraryCasino | 4961 | Build the casino: 46.2% · Refuse: 15.3% · Casino night, once a year: 38.5% | 0.0% | 0.0% |
| mallParking | 4918 | Pave the park: 49.7% · Only half the park: 43.2% · Hands off the park: 7.1% | 0.0% | 0.0% |
| mascot | 207 | Welcome, Wet Sock: 83.1% · Hire a real designer: 14.0% · No mascot: 2.9% | 0.0% | 0.0% |
| mimeStrike | 5000 | Notice them, with a banner: 85.9% · Negotiate in mime: 10.7% · Ignore the mimes: 3.4% | 0.0% | 0.0% |
| monsterPta | 6 | Welcome the monster: 100.0% · Monsters can't be parents: 0.0% | 0.0% | 0.0% |
| moonClaim | 5000 | Plant the flag: 39.9% · Sell the moon to Chad: 34.3% · Give the moon back: 25.8% | 0.0% | 0.0% |
| moonRent | 1995 | Pay the moonlight bill: 79.7% · Charge him for the view: 20.3% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 52.6% · Promise it by spring: 32.2% · Buy a second book: 15.2% | 0.0% | 0.0% |
| nightLibrary | 4121 | Fund the night library: 36.7% · Let her run a 'truth club': 51.8% · Libraries close at five: 11.5% | 0.0% | 0.0% |
| opera | 2329 | Attend and applaud: 42.4% · Pay for rewrites: 57.4% · Ban the opera: 0.2% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 1.0% · Meters for visitors only: 11.7% · Free parking forever: 87.3% | 0.0% | 0.0% |
| parkWifi | 324 | Free park wifi: 39.2% · Wifi with Chad's ads: 49.1% · Go outside and play: 11.7% | 0.0% | 0.0% |
| pettyCrime | 4712 | Pay for overtime: 66.9% · Blame the next town over: 33.1% | 0.0% | 0.0% |
| pigeonAide | 4 | Hire the pigeon: 100.0% · Let it sign today's stack: 0.0% · Evict the pigeon: 0.0% | 0.0% | 0.0% |
| policeDog | 4502 | Buy a braver dog: 23.8% · Therapy for the old dog: 74.5% · One scared dog is plenty: 1.7% | 0.0% | 0.0% |
| raccoonBins | 5000 | Raccoon-proof bins: 55.8% · Night patrols: 32.0% · They live here too: 12.2% | 0.0% | 0.0% |
| radar | 1554 | Buy the radar: 53.2% · Promise it next quarter: 24.5% · The finger is fine: 22.3% | 0.0% | 0.0% |
| rocketLibrary | 2617 | Rebuild the library: 88.5% · Leave the rocket in: 11.5% | 0.0% | 0.0% |
| roundabout | 4792 | Rescue the drivers: 72.6% · Sell tickets to watch: 24.7% · It's working as intended: 2.7% | 0.0% | 0.0% |
| scandal | 2 | Own it: 100.0% · Bury the story: 0.0% | 0.0% | 0.0% |
| schoolLunch | 1051 | Pay for real food: 63.7% · Chad sponsors lunch: 34.5% · Paste builds character: 1.8% | 0.0% | 0.0% |
| secretStranger | 2434 | Expose him in The Bugle: 92.4% · Take his hush money: 7.6% | 0.0% | 0.0% |
| snowplow | 583 | Plow the school road: 16.3% · Plow Chad Street: 46.3% · Rent a second plow: 37.4% | 0.0% | 0.0% |
| speedTrap | 4003 | Approve the speed trap: 12.2% · Warning signs only: 61.9% · No speed trap: 25.9% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 11.2% · A statue of someone normal: 73.8% · No statues: 15.1% | 0.0% | 0.0% |
| talentShow | 5000 | Judge honestly: 21.9% · Everyone wins: 29.7% · Send Dave: 48.4% | 0.0% | 0.0% |
| taxBreak | 5000 | Grant the tax break: 45.0% · Trade it for a donation: 37.1% · Refuse: 17.9% | 0.0% | 0.0% |
| theWhistle | 568 | Shut down The Whistle: 32.9% · Buy The Whistle: 52.1% · A free press is good: 15.0% | 0.0% | 0.0% |
| timeCapsule | 3007 | Settle with Chad: 74.4% · Bury it again, deeper: 19.0% · Frame the note: 6.6% | 0.0% | 0.0% |
| tvStation | 1087 | Build the station: 16.4% · Lend her the roof: 79.9% · Refuse: 3.7% | 0.0% | 0.0% |
| twinTown | 129 | Throw a welcome party: 80.6% · Show them the pothole: 18.6% · Lock the gates: 0.8% | 0.0% | 0.0% |
