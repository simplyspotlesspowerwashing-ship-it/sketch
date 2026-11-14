# Balance report: pack `week1`

5000 terms per policy. Tuning: {"people":0.5,"press":0.2,"business":0.1,"law":0.1,"objective":2,"brokenPromise":-4,"min":5,"max":95}.

| Policy | Win rate | Target | Mean vote | Vote p10 / p50 / p90 | Recalled | Bankrupt | Term ended early | Ending money $k p10 / p50 / p90 |
|---|---|---|---|---|---|---|---|---|
| random | 0.0% | on target | 15.1 | 9 / 17 / 19 | 100.0% | 9.2% | 94.5% | 0 / 20 / 20 |
| greedy-approval | 8.6% |  | 26.7 | 13 / 21 / 48 | 100.0% | 94.8% | 64.1% | -44 / 20 / 20 |
| miser | 0.0% |  | 17.0 | 17 / 17 / 17 | 100.0% | 0.0% | 100.0% | 20 / 20 / 20 |
| people-pleaser | 0.0% |  | 16.5 | 13 / 17 / 19 | 100.0% | 86.3% | 99.7% | 0 / 20 / 20 |
| dave-only | 0.0% | **off target** (5-10%) | 15.7 | 11 / 17 / 19 | 100.0% | 13.0% | 98.5% | 0 / 20 / 20 |
| sensible | 38.0% | **off target** (55-65%) | 45.8 | 30 / 45 / 62 | 20.5% | 5.1% | 0.0% | -26 / 11 / 40 |
| | | recalls on target (under 25%) | | | | | | |

## Non-dilemmas and other flags (sensible bot)

- `billboard`: "No billboard" chosen 1% of the time (under 5%)
- `buglePress`: "Not the town's problem" chosen 2% of the time (under 5%)
- `campaignTruth`: "Big rally" chosen 2% of the time (under 5%)
- `casinoCrime`: "Make her head of security" chosen 88% of the time (over 85%)
- `catGoose`: "Let them have the bakery" chosen 3% of the time (under 5%)
- `catSinkhole`: "Move the town to the left" chosen 1% of the time (under 5%)
- `coneRally`: "Have the cone towed" chosen 1% of the time (under 5%)
- `evFair`: "Eat for the town" chosen 92% of the time (over 85%)
- `evPower`: "Sit in the dark" chosen 0% of the time (under 5%)
- `flood`: "Wait for it to dry" chosen 1% of the time (under 5%)
- `giantSpoon`: "Build the spoon" chosen 4% of the time (under 5%)
- `lawTuesday`: "Hold firm" chosen 4% of the time (under 5%)
- `mimeStrike`: "Ignore the mimes" chosen 4% of the time (under 5%)
- `nightLibrary`: "Libraries close at five" chosen 1% of the time (under 5%)
- `opera`: "Ban the opera" chosen 0% of the time (under 5%)
- `parkingMeters`: "Install meters" chosen 1% of the time (under 5%)
- `parkingMeters`: "Free parking forever" chosen 87% of the time (over 85%)
- `policeDog`: "One scared dog is plenty" chosen 0% of the time (under 5%)
- `rocketLibrary`: "Rebuild the library" chosen 90% of the time (over 85%)
- `roundabout`: "It's working as intended" chosen 3% of the time (under 5%)
- `secretStranger`: "Expose him in The Bugle" chosen 89% of the time (over 85%)
- `talentShow`: "Judge honestly" chosen 1% of the time (under 5%)
- `timeCapsule`: "Settle with Chad" chosen 88% of the time (over 85%)
- `tvStation`: "Refuse" chosen 0% of the time (under 5%)

## Unreachable desk cards (never drawn by any policy)

- `pothole`
- `fireworks`
- `bankError`
- `strangerPrice`
- `parkWifi`
- `heatwave`
- `duckDuel`
- `pigeonAide`
- `squirrelLoan`
- `twinTown`
- `monsterPta`
- `scandal`
- `buyout`
- `overreach`
- `goldenGoose`
- `lawHats`

## random

Projects built (share of terms): school 32.8%, pond 19.8%, casino 12.2%, helicopter 7.5%, spoon 4.2%, tv 1.4%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 4578 | Open the books: 37.2% · Bribe him with cheese: 22.8% · Let Dave handle the audit: 40.0% | 0.0% | 0.0% |
| bearStory | 2272 | Yes, I wrestled a bear: 50.6% · Tell the truth: 49.4% | 0.0% | 0.0% |
| billboard | 4519 | Allow the billboard: 33.6% · A small one, round the back: 33.6% · No billboard: 32.7% | 0.0% | 0.0% |
| bridge | 1945 | Repair the bridge: 29.0% · Promise repairs soon: 36.6% · Put up a 'Good Luck' sign: 34.3% | 0.0% | 0.0% |
| buglePress | 4862 | Buy a new press: 31.1% · Use the school copier: 34.9% · Not the town's problem: 34.1% | 0.0% | 0.0% |
| campaign | 162 | Big rally: 30.2% · Call in every Favor: 6.2% · Attack ad about the cone: 29.0% · Just be yourself: 34.6% | 0.0% | 0.0% |
| campaignTruth | 112 | 'At least I'm not a goose': 29.5% · Promise a recount: 33.9% · Big rally: 26.8% · Call in every Favor: 9.8% | 0.0% | 0.0% |
| casinoCrime | 208 | Ban Linda from blackjack: 52.9% · Make her head of security: 47.1% | 0.0% | 0.0% |
| catGoose | 4971 | Negotiate with Gerald: 33.0% · Send in Barb: 33.0% · Let them have the bakery: 34.0% | 0.0% | 0.0% |
| catSinkhole | 1192 | Fill Kevin with concrete: 33.4% · Make Kevin an attraction: 32.2% · Move the town to the left: 34.4% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 35.8% · Launch from your own lawn: 27.8% · No rockets near children: 36.4% | 0.0% | 0.0% |
| cheeseVault | 1429 | Sell it, fast: 33.8% · Throw a cheese festival: 31.6% · Seal the vault: 34.6% | 0.0% | 0.0% |
| coneRally | 516 | Hold a bigger rally: 33.1% · Debate the cone, live: 35.7% · Have the cone towed: 31.2% | 0.0% | 0.0% |
| crossingGuard | 159 | Hire a human: 32.7% · Gerald it is: 33.3% · Children can look both ways: 34.0% | 0.0% | 0.0% |
| curfew | 4877 | Curfew at 9 pm: 35.0% · Fund a youth centre: 31.2% · Let them stand: 33.8% | 0.0% | 0.0% |
| diaryLeak | 1751 | Apologise to everyone: 35.0% · Publish the whole diary: 32.4% · Blame the pigeon: 32.7% | 0.0% | 0.0% |
| evBallots | 1680 | Tell the town: 51.0% · Put the boxes back: 49.0% | 0.0% | 0.0% |
| evBear | 968 | Apologise to the bear: 52.7% · Wrestle it for real: 47.3% | 0.0% | 0.0% |
| evDebate | 932 | Debate with facts: 51.8% · Debate with insults: 48.2% | 0.0% | 0.0% |
| evFair | 709 | Eat for the town: 49.9% · Decline politely: 50.1% | 0.0% | 0.0% |
| evNote | 4901 | Go and look: 49.8% · Burn the note: 50.2% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.6% · Buy a new float: 49.4% | 0.0% | 0.0% |
| evPower | 3297 | Pay Chad's guy: 33.1% · Hand out candles: 32.5% · Sit in the dark: 34.5% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 50.6% · Ignore Steve: 49.4% | 0.0% | 0.0% |
| farmersMarket | 2657 | Protect the market: 39.0% · Ban the market: 38.5% · Market pays a fee: 22.5% | 0.0% | 0.0% |
| festival | 22 | Fund Frog Day: 31.8% · Promise Frog Day soon: 40.9% · No Frog Day: 27.3% | 0.0% | 0.0% |
| flood | 3398 | Rent the pumps: 31.5% · Rename it 'Little Venice': 32.9% · Wait for it to dry: 35.5% | 0.0% | 0.0% |
| giantSpoon | 640 | Build the spoon: 33.0% · A normal-sized spoon: 32.0% · No spoon: 35.0% | 0.0% | 0.0% |
| gooseOccupation | 890 | Pay them off in bread: 49.6% · Send Chief Barb: 50.4% | 0.0% | 0.0% |
| goosePond | 2707 | Build the pond: 36.6% · Pond in the park instead: 26.3% · Refuse: 37.1% | 0.0% | 0.0% |
| gooseStrike | 561 | Meet their demands: 33.2% · Hire ducks instead: 33.0% · Wait them out: 33.9% | 0.0% | 0.0% |
| haunted | 4094 | Fund the ghost hunt: 32.1% · Seal the basement: 33.7% · There's nothing down there: 34.2% | 0.0% | 0.0% |
| helicopter | 1289 | Buy it: 28.9% · Lease one: 35.2% · Promise it next quarter: 35.8% | 0.0% | 0.0% |
| lakeMonster | 374 | Put it on the brochure: 30.2% · Protect its privacy: 33.2% · There is no monster: 36.6% | 0.0% | 0.0% |
| lawDogs | 108 | Overrule the dog: 29.6% · Promote the dog: 25.0% · Let justice take its course: 45.4% | 0.0% | 0.0% |
| lawGeese | 23 | Give Barb a whistle too: 47.8% · Goose lanes on every road: 21.7% · Let Gerald run it: 30.4% | 0.0% | 0.0% |
| lawSighs | 171 | Declare a free sigh day: 28.1% · Raise the sigh tax: 38.6% · Sigh for them: 33.3% | 0.0% | 0.0% |
| lawTuesday | 121 | Give it back: 38.0% · Rename it Funday: 28.9% · Hold firm: 33.1% | 0.0% | 0.0% |
| libraryCasino | 1617 | Build the casino: 37.7% · Refuse: 42.5% · Casino night, once a year: 19.8% | 0.0% | 0.0% |
| mallParking | 407 | Pave the park: 45.7% · Only half the park: 13.3% · Hands off the park: 41.0% | 0.0% | 0.0% |
| mascot | 6 | Welcome, Wet Sock: 33.3% · Hire a real designer: 16.7% · No mascot: 50.0% | 0.0% | 0.0% |
| mimeStrike | 2227 | Notice them, with a banner: 31.3% · Negotiate in mime: 34.8% · Ignore the mimes: 33.9% | 0.0% | 0.0% |
| moonClaim | 3912 | Plant the flag: 30.9% · Sell the moon to Chad: 34.1% · Give the moon back: 35.0% | 0.0% | 0.0% |
| moonRent | 1153 | Pay the moonlight bill: 48.8% · Charge him for the view: 51.2% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 32.8% · Promise it by spring: 34.4% · Buy a second book: 32.8% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 35.2% · Let her run a 'truth club': 30.6% · Libraries close at five: 34.2% | 0.0% | 0.0% |
| opera | 670 | Attend and applaud: 33.7% · Pay for rewrites: 31.0% · Ban the opera: 35.2% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 35.0% · Meters for visitors only: 32.4% · Free parking forever: 32.5% | 0.0% | 0.0% |
| pettyCrime | 1892 | Pay for overtime: 47.3% · Blame the next town over: 52.7% | 0.0% | 0.0% |
| policeDog | 149 | Buy a braver dog: 29.5% · Therapy for the old dog: 29.5% · One scared dog is plenty: 40.9% | 0.0% | 0.0% |
| raccoonBins | 773 | Raccoon-proof bins: 30.8% · Night patrols: 31.6% · They live here too: 37.6% | 0.0% | 0.0% |
| radar | 4419 | Buy the radar: 31.0% · Promise it next quarter: 34.5% · The finger is fine: 34.5% | 0.0% | 0.0% |
| rocketLibrary | 1766 | Rebuild the library: 50.3% · Leave the rocket in: 49.7% | 0.0% | 0.0% |
| roundabout | 454 | Rescue the drivers: 34.8% · Sell tickets to watch: 31.9% · It's working as intended: 33.3% | 0.0% | 0.0% |
| secretStranger | 708 | Expose him in The Bugle: 50.0% · Take his hush money: 50.0% | 0.0% | 0.0% |
| snowplow | 2918 | Plow the school road: 33.5% · Plow Chad Street: 35.4% · Rent a second plow: 31.1% | 0.0% | 0.0% |
| speedTrap | 33 | Approve the speed trap: 51.5% · Warning signs only: 27.3% · No speed trap: 21.2% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 32.2% · A statue of someone normal: 33.4% · No statues: 34.3% | 0.0% | 0.0% |
| talentShow | 1470 | Judge honestly: 34.4% · Everyone wins: 33.5% · Send Dave: 32.1% | 0.0% | 0.0% |
| taxBreak | 4089 | Grant the tax break: 33.2% · Trade it for a donation: 33.6% · Refuse: 33.2% | 0.0% | 0.0% |
| theWhistle | 39 | Shut down The Whistle: 46.2% · Buy The Whistle: 30.8% · A free press is good: 23.1% | 0.0% | 0.0% |
| timeCapsule | 4989 | Settle with Chad: 32.4% · Bury it again, deeper: 33.1% · Frame the note: 34.6% | 0.0% | 0.0% |
| tvStation | 200 | Build the station: 36.0% · Lend her the roof: 29.0% · Refuse: 35.0% | 0.0% | 0.0% |

## greedy-approval

Projects built (share of terms): school 100.0%, casino 23.0%, helicopter 21.8%, pond 19.4%, tv 0.2%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 78.3% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 21.7% | 0.0% | 0.0% |
| bearStory | 1280 | Yes, I wrestled a bear: 100.0% · Tell the truth: 0.0% | 0.0% | 0.0% |
| billboard | 4888 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 0.0% |
| bridge | 4591 | Repair the bridge: 47.6% · Promise repairs soon: 52.4% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| buglePress | 5000 | Buy a new press: 69.9% · Use the school copier: 30.1% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| campaignTruth | 1795 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| casinoCrime | 480 | Ban Linda from blackjack: 32.3% · Make her head of security: 67.7% | 0.0% | 0.0% |
| catGoose | 5000 | Negotiate with Gerald: 98.5% · Send in Barb: 1.1% · Let them have the bakery: 0.4% | 0.0% | 0.0% |
| catSinkhole | 4051 | Fill Kevin with concrete: 59.8% · Make Kevin an attraction: 40.2% · Move the town to the left: 0.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| cheeseVault | 4234 | Sell it, fast: 23.5% · Throw a cheese festival: 76.5% · Seal the vault: 0.0% | 0.0% | 0.0% |
| coneRally | 2831 | Hold a bigger rally: 41.4% · Debate the cone, live: 58.6% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 12.0% · Fund a youth centre: 88.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 4265 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| entitled | 2 | Free ice cream: 50.0% · Say no nicely: 50.0% | 0.0% | 0.0% |
| evBallots | 4783 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evBear | 618 | Apologise to the bear: 27.0% · Wrestle it for real: 73.0% | 0.0% | 0.0% |
| evDebate | 3467 | Debate with facts: 100.0% · Debate with insults: 0.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 4381 | Pay Chad's guy: 76.6% · Hand out candles: 19.4% · Sit in the dark: 4.0% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| farmersMarket | 4158 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| flood | 4969 | Rent the pumps: 43.2% · Rename it 'Little Venice': 56.8% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| giantSpoon | 3161 | Build the spoon: 0.0% · A normal-sized spoon: 90.1% · No spoon: 9.9% | 0.0% | 0.0% |
| gooseOccupation | 98 | Pay them off in bread: 99.0% · Send Chief Barb: 1.0% | 0.0% | 0.0% |
| goosePond | 1087 | Build the pond: 89.3% · Pond in the park instead: 1.3% · Refuse: 9.4% | 0.0% | 0.0% |
| gooseStrike | 5 | Meet their demands: 60.0% · Hire ducks instead: 0.0% · Wait them out: 40.0% | 0.0% | 0.0% |
| haunted | 4993 | Fund the ghost hunt: 68.5% · Seal the basement: 12.3% · There's nothing down there: 19.2% | 0.0% | 0.0% |
| helicopter | 2028 | Buy it: 53.7% · Lease one: 46.3% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| lakeMonster | 2301 | Put it on the brochure: 36.5% · Protect its privacy: 63.5% · There is no monster: 0.0% | 0.0% | 0.0% |
| libraryCasino | 2309 | Build the casino: 49.7% · Refuse: 0.0% · Casino night, once a year: 50.3% | 0.0% | 0.0% |
| mallParking | 187 | Pave the park: 51.9% · Only half the park: 48.1% · Hands off the park: 0.0% | 0.0% | 0.0% |
| mimeStrike | 4734 | Notice them, with a banner: 70.6% · Negotiate in mime: 29.4% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 4981 | Plant the flag: 72.9% · Sell the moon to Chad: 27.1% · Give the moon back: 0.0% | 0.0% | 0.0% |
| moonRent | 3630 | Pay the moonlight bill: 92.3% · Charge him for the view: 7.7% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 100.0% · Promise it by spring: 0.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 0.0% · Let her run a 'truth club': 100.0% · Libraries close at five: 0.0% | 0.0% | 0.0% |
| opera | 284 | Attend and applaud: 33.1% · Pay for rewrites: 66.9% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| pettyCrime | 1713 | Pay for overtime: 36.0% · Blame the next town over: 64.0% | 0.0% | 0.0% |
| policeDog | 130 | Buy a braver dog: 91.5% · Therapy for the old dog: 4.6% · One scared dog is plenty: 3.8% | 0.0% | 0.0% |
| raccoonBins | 3376 | Raccoon-proof bins: 60.2% · Night patrols: 39.8% · They live here too: 0.0% | 0.0% | 0.0% |
| radar | 5000 | Buy the radar: 72.9% · Promise it next quarter: 27.1% · The finger is fine: 0.0% | 0.0% | 0.0% |
| rocketLibrary | 5000 | Rebuild the library: 100.0% · Leave the rocket in: 0.0% | 0.0% | 0.0% |
| roundabout | 350 | Rescue the drivers: 86.3% · Sell tickets to watch: 13.4% · It's working as intended: 0.3% | 0.0% | 0.0% |
| secretStranger | 4363 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| snowplow | 4948 | Plow the school road: 52.5% · Plow Chad Street: 0.0% · Rent a second plow: 47.5% | 0.0% | 0.0% |
| speedTrap | 58 | Approve the speed trap: 3.4% · Warning signs only: 96.6% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 0.0% · A statue of someone normal: 100.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 91 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 4806 | Grant the tax break: 99.4% · Trade it for a donation: 0.6% · Refuse: 0.0% | 0.0% | 0.0% |
| theWhistle | 5 | Shut down The Whistle: 40.0% · Buy The Whistle: 60.0% · A free press is good: 0.0% | 0.0% | 0.0% |
| timeCapsule | 5000 | Settle with Chad: 99.4% · Bury it again, deeper: 0.0% · Frame the note: 0.6% | 0.0% | 0.0% |
| tvStation | 37 | Build the station: 21.6% · Lend her the roof: 78.4% · Refuse: 0.0% | 0.0% | 0.0% |

## miser

Projects built (share of terms): casino 0.1%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 84 | Open the books: 0.0% · Bribe him with cheese: 41.7% · Let Dave handle the audit: 58.3% | 0.0% | 0.0% |
| bearStory | 507 | Yes, I wrestled a bear: 100.0% · Tell the truth: 0.0% | 0.0% | 0.0% |
| billboard | 886 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 0.0% |
| bridge | 2 | Repair the bridge: 0.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 100.0% | 0.0% | 0.0% |
| buglePress | 2583 | Buy a new press: 0.0% · Use the school copier: 100.0% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| catGoose | 3531 | Negotiate with Gerald: 0.0% · Send in Barb: 0.0% · Let them have the bakery: 100.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| crossingGuard | 104 | Hire a human: 0.0% · Gerald it is: 100.0% · Children can look both ways: 0.0% | 0.0% | 0.0% |
| curfew | 2924 | Curfew at 9 pm: 100.0% · Fund a youth centre: 0.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 1 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| evBallots | 4 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evBear | 208 | Apologise to the bear: 100.0% · Wrestle it for real: 0.0% | 0.0% | 0.0% |
| evNote | 3185 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 100.0% · Buy a new float: 0.0% | 0.0% | 0.0% |
| evPower | 118 | Pay Chad's guy: 0.0% · Hand out candles: 0.0% · Sit in the dark: 100.0% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 0.0% · Ignore Steve: 100.0% | 0.0% | 0.0% |
| farmersMarket | 82 | Protect the market: 65.9% · Ban the market: 0.0% · Market pays a fee: 34.1% | 0.0% | 0.0% |
| flood | 11 | Rent the pumps: 0.0% · Rename it 'Little Venice': 100.0% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| gooseOccupation | 4827 | Pay them off in bread: 0.0% · Send Chief Barb: 100.0% | 0.0% | 0.0% |
| goosePond | 4965 | Build the pond: 0.0% · Pond in the park instead: 0.0% · Refuse: 100.0% | 0.0% | 0.0% |
| gooseStrike | 3639 | Meet their demands: 0.0% · Hire ducks instead: 0.0% · Wait them out: 100.0% | 0.0% | 0.0% |
| haunted | 119 | Fund the ghost hunt: 0.0% · Seal the basement: 0.0% · There's nothing down there: 100.0% | 0.0% | 0.0% |
| helicopter | 24 | Buy it: 0.0% · Lease one: 100.0% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| libraryCasino | 4 | Build the casino: 100.0% · Refuse: 0.0% · Casino night, once a year: 0.0% | 0.0% | 0.0% |
| mimeStrike | 4 | Notice them, with a banner: 0.0% · Negotiate in mime: 100.0% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 54 | Plant the flag: 0.0% · Sell the moon to Chad: 100.0% · Give the moon back: 0.0% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 0.0% · Promise it by spring: 0.0% · Buy a second book: 100.0% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 0.0% · Let her run a 'truth club': 100.0% · Libraries close at five: 0.0% | 0.0% | 0.0% |
| opera | 10 | Attend and applaud: 100.0% · Pay for rewrites: 0.0% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 100.0% · Meters for visitors only: 0.0% · Free parking forever: 0.0% | 0.0% | 0.0% |
| radar | 607 | Buy the radar: 0.0% · Promise it next quarter: 0.0% · The finger is fine: 100.0% | 0.0% | 0.0% |
| rocketLibrary | 1502 | Rebuild the library: 0.0% · Leave the rocket in: 100.0% | 0.0% | 0.0% |
| secretStranger | 1 | Expose him in The Bugle: 0.0% · Take his hush money: 100.0% | 0.0% | 0.0% |
| snowplow | 7 | Plow the school road: 100.0% · Plow Chad Street: 0.0% · Rent a second plow: 0.0% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 100.0% · A statue of someone normal: 0.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 4634 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 437 | Grant the tax break: 0.0% · Trade it for a donation: 100.0% · Refuse: 0.0% | 0.0% | 0.0% |
| timeCapsule | 3764 | Settle with Chad: 0.0% · Bury it again, deeper: 100.0% · Frame the note: 0.0% | 0.0% | 0.0% |

## people-pleaser

Projects built (share of terms): school 100.0%, pond 8.5%, tv 0.1%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 4825 | Open the books: 73.5% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 26.5% | 0.0% | 0.0% |
| bearStory | 865 | Yes, I wrestled a bear: 0.0% · Tell the truth: 100.0% | 0.0% | 0.0% |
| billboard | 4975 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 0.0% |
| bridge | 865 | Repair the bridge: 16.1% · Promise repairs soon: 83.9% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| buglePress | 4949 | Buy a new press: 53.6% · Use the school copier: 0.0% · Not the town's problem: 46.4% | 0.0% | 0.0% |
| campaignTruth | 13 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| catGoose | 4998 | Negotiate with Gerald: 70.7% · Send in Barb: 0.0% · Let them have the bakery: 29.3% | 0.0% | 0.0% |
| catSinkhole | 279 | Fill Kevin with concrete: 49.5% · Make Kevin an attraction: 50.5% · Move the town to the left: 0.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 0.0% · Launch from your own lawn: 100.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| cheeseVault | 421 | Sell it, fast: 56.5% · Throw a cheese festival: 43.5% · Seal the vault: 0.0% | 0.0% | 0.0% |
| coneRally | 72 | Hold a bigger rally: 20.8% · Debate the cone, live: 79.2% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| curfew | 4968 | Curfew at 9 pm: 0.0% · Fund a youth centre: 70.8% · Let them stand: 29.2% | 0.0% | 0.0% |
| diaryLeak | 470 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| entitled | 48 | Free ice cream: 95.8% · Say no nicely: 4.2% | 0.0% | 0.0% |
| evBallots | 1060 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evDebate | 184 | Debate with facts: 0.0% · Debate with insults: 100.0% | 0.0% | 0.0% |
| evNote | 4973 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 3623 | Pay Chad's guy: 54.2% · Hand out candles: 25.1% · Sit in the dark: 20.8% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| farmersMarket | 2942 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| flood | 2007 | Rent the pumps: 28.3% · Rename it 'Little Venice': 71.7% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| giantSpoon | 134 | Build the spoon: 0.0% · A normal-sized spoon: 85.8% · No spoon: 14.2% | 0.0% | 0.0% |
| goosePond | 426 | Build the pond: 100.0% · Pond in the park instead: 0.0% · Refuse: 0.0% | 0.0% | 0.0% |
| gooseStrike | 3 | Meet their demands: 100.0% · Hire ducks instead: 0.0% · Wait them out: 0.0% | 0.0% | 0.0% |
| haunted | 3184 | Fund the ghost hunt: 54.0% · Seal the basement: 10.5% · There's nothing down there: 35.5% | 0.0% | 0.0% |
| helicopter | 3281 | Buy it: 0.0% · Lease one: 100.0% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| lakeMonster | 41 | Put it on the brochure: 0.0% · Protect its privacy: 100.0% · There is no monster: 0.0% | 0.0% | 0.0% |
| lawDogs | 6 | Overrule the dog: 0.0% · Promote the dog: 0.0% · Let justice take its course: 100.0% | 0.0% | 0.0% |
| lawTuesday | 266 | Give it back: 51.9% · Rename it Funday: 48.1% · Hold firm: 0.0% | 0.0% | 0.0% |
| libraryCasino | 2352 | Build the casino: 0.0% · Refuse: 100.0% · Casino night, once a year: 0.0% | 0.0% | 0.0% |
| mallParking | 698 | Pave the park: 0.0% · Only half the park: 0.0% · Hands off the park: 100.0% | 0.0% | 0.0% |
| mimeStrike | 994 | Notice them, with a banner: 71.4% · Negotiate in mime: 28.6% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 2783 | Plant the flag: 58.4% · Sell the moon to Chad: 0.0% · Give the moon back: 41.6% | 0.0% | 0.0% |
| moonRent | 1597 | Pay the moonlight bill: 88.4% · Charge him for the view: 11.6% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 100.0% · Promise it by spring: 0.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 0.0% · Let her run a 'truth club': 100.0% · Libraries close at five: 0.0% | 0.0% | 0.0% |
| opera | 94 | Attend and applaud: 0.0% · Pay for rewrites: 100.0% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| pettyCrime | 325 | Pay for overtime: 52.3% · Blame the next town over: 47.7% | 0.0% | 0.0% |
| policeDog | 1281 | Buy a braver dog: 0.0% · Therapy for the old dog: 76.0% · One scared dog is plenty: 24.0% | 0.0% | 0.0% |
| raccoonBins | 163 | Raccoon-proof bins: 44.8% · Night patrols: 0.0% · They live here too: 55.2% | 0.0% | 0.0% |
| radar | 4117 | Buy the radar: 53.9% · Promise it next quarter: 46.1% · The finger is fine: 0.0% | 0.0% | 0.0% |
| roundabout | 2297 | Rescue the drivers: 100.0% · Sell tickets to watch: 0.0% · It's working as intended: 0.0% | 0.0% | 0.0% |
| secretStranger | 504 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| snowplow | 1673 | Plow the school road: 100.0% · Plow Chad Street: 0.0% · Rent a second plow: 0.0% | 0.0% | 0.0% |
| speedTrap | 18 | Approve the speed trap: 16.7% · Warning signs only: 83.3% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 0.0% · A statue of someone normal: 100.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 227 | Judge honestly: 0.0% · Everyone wins: 100.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 4911 | Grant the tax break: 0.0% · Trade it for a donation: 0.0% · Refuse: 100.0% | 0.0% | 0.0% |
| theWhistle | 5 | Shut down The Whistle: 0.0% · Buy The Whistle: 100.0% · A free press is good: 0.0% | 0.0% | 0.0% |
| timeCapsule | 4999 | Settle with Chad: 81.2% · Bury it again, deeper: 0.0% · Frame the note: 18.8% | 0.0% | 0.0% |
| tvStation | 15 | Build the station: 40.0% · Lend her the roof: 60.0% · Refuse: 0.0% | 0.0% | 0.0% |

## dave-only

Projects built (share of terms): school 33.6%, pond 20.7%, casino 11.2%, helicopter 5.5%, spoon 1.4%, tv 1.2%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 4345 | Open the books: 38.7% · Bribe him with cheese: 21.1% · Let Dave handle the audit: 40.2% | 0.0% | 0.0% |
| bearStory | 2392 | Yes, I wrestled a bear: 49.6% · Tell the truth: 50.4% | 0.0% | 0.0% |
| billboard | 4520 | Allow the billboard: 32.4% · A small one, round the back: 34.1% · No billboard: 33.5% | 0.0% | 0.0% |
| bridge | 1219 | Repair the bridge: 26.8% · Promise repairs soon: 36.1% · Put up a 'Good Luck' sign: 37.1% | 0.0% | 0.0% |
| buglePress | 4793 | Buy a new press: 30.4% · Use the school copier: 34.8% · Not the town's problem: 34.8% | 0.0% | 0.0% |
| campaign | 40 | Big rally: 0.0% · Call in every Favor: 0.0% · Attack ad about the cone: 0.0% · Just be yourself: 100.0% | 0.0% | 0.0% |
| campaignTruth | 33 | 'At least I'm not a goose': 0.0% · Promise a recount: 9.1% · Big rally: 60.6% · Call in every Favor: 30.3% | 0.0% | 0.0% |
| casinoCrime | 142 | Ban Linda from blackjack: 50.0% · Make her head of security: 50.0% | 0.0% | 0.0% |
| catGoose | 4960 | Negotiate with Gerald: 32.1% · Send in Barb: 34.2% · Let them have the bakery: 33.7% | 0.0% | 0.0% |
| catSinkhole | 598 | Fill Kevin with concrete: 31.1% · Make Kevin an attraction: 36.1% · Move the town to the left: 32.8% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 37.0% · Launch from your own lawn: 26.8% · No rockets near children: 36.2% | 0.0% | 0.0% |
| cheeseVault | 760 | Sell it, fast: 30.9% · Throw a cheese festival: 32.4% · Seal the vault: 36.7% | 0.0% | 0.0% |
| coneRally | 177 | Hold a bigger rally: 27.1% · Debate the cone, live: 41.8% · Have the cone towed: 31.1% | 0.0% | 0.0% |
| crossingGuard | 137 | Hire a human: 31.4% · Gerald it is: 26.3% · Children can look both ways: 42.3% | 0.0% | 0.0% |
| curfew | 4817 | Curfew at 9 pm: 34.9% · Fund a youth centre: 31.6% · Let them stand: 33.5% | 0.0% | 0.0% |
| diaryLeak | 1035 | Apologise to everyone: 34.2% · Publish the whole diary: 33.0% · Blame the pigeon: 32.8% | 0.0% | 0.0% |
| evBallots | 1234 | Tell the town: 50.7% · Put the boxes back: 49.3% | 0.0% | 0.0% |
| evBear | 978 | Apologise to the bear: 50.8% · Wrestle it for real: 49.2% | 0.0% | 0.0% |
| evDebate | 396 | Debate with facts: 51.3% · Debate with insults: 48.7% | 0.0% | 0.0% |
| evFair | 558 | Eat for the town: 50.2% · Decline politely: 49.8% | 0.0% | 0.0% |
| evNote | 4833 | Go and look: 49.9% · Burn the note: 50.1% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 48.8% · Buy a new float: 51.2% | 0.0% | 0.0% |
| evPower | 2894 | Pay Chad's guy: 31.5% · Hand out candles: 32.6% · Sit in the dark: 35.9% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 47.8% · Ignore Steve: 52.2% | 0.0% | 0.0% |
| farmersMarket | 2517 | Protect the market: 39.1% · Ban the market: 38.2% · Market pays a fee: 22.7% | 0.0% | 0.0% |
| festival | 10 | Fund Frog Day: 10.0% · Promise Frog Day soon: 70.0% · No Frog Day: 20.0% | 0.0% | 0.0% |
| flood | 2737 | Rent the pumps: 32.2% · Rename it 'Little Venice': 33.3% · Wait for it to dry: 34.5% | 0.0% | 0.0% |
| giantSpoon | 239 | Build the spoon: 28.5% · A normal-sized spoon: 28.5% · No spoon: 43.1% | 0.0% | 0.0% |
| gooseOccupation | 912 | Pay them off in bread: 48.6% · Send Chief Barb: 51.4% | 0.0% | 0.0% |
| goosePond | 2857 | Build the pond: 36.2% · Pond in the park instead: 26.1% · Refuse: 37.7% | 0.0% | 0.0% |
| gooseStrike | 583 | Meet their demands: 30.2% · Hire ducks instead: 34.1% · Wait them out: 35.7% | 0.0% | 0.0% |
| haunted | 3651 | Fund the ghost hunt: 31.0% · Seal the basement: 33.8% · There's nothing down there: 35.2% | 0.0% | 0.0% |
| helicopter | 997 | Buy it: 27.7% · Lease one: 37.6% · Promise it next quarter: 34.7% | 0.0% | 0.0% |
| lakeMonster | 111 | Put it on the brochure: 27.9% · Protect its privacy: 34.2% · There is no monster: 37.8% | 0.0% | 0.0% |
| lawDogs | 14 | Overrule the dog: 64.3% · Promote the dog: 28.6% · Let justice take its course: 7.1% | 0.0% | 0.0% |
| lawGeese | 12 | Give Barb a whistle too: 25.0% · Goose lanes on every road: 16.7% · Let Gerald run it: 58.3% | 0.0% | 0.0% |
| lawSighs | 1 | Declare a free sigh day: 0.0% · Raise the sigh tax: 0.0% · Sigh for them: 100.0% | 0.0% | 0.0% |
| lawTuesday | 44 | Give it back: 40.9% · Rename it Funday: 20.5% · Hold firm: 38.6% | 0.0% | 0.0% |
| libraryCasino | 1425 | Build the casino: 39.2% · Refuse: 41.5% · Casino night, once a year: 19.4% | 0.0% | 0.0% |
| mallParking | 299 | Pave the park: 41.8% · Only half the park: 14.0% · Hands off the park: 44.1% | 0.0% | 0.0% |
| mascot | 2 | Welcome, Wet Sock: 0.0% · Hire a real designer: 0.0% · No mascot: 100.0% | 0.0% | 0.0% |
| mimeStrike | 1548 | Notice them, with a banner: 31.1% · Negotiate in mime: 35.7% · Ignore the mimes: 33.3% | 0.0% | 0.0% |
| moonClaim | 3351 | Plant the flag: 29.5% · Sell the moon to Chad: 35.2% · Give the moon back: 35.4% | 0.0% | 0.0% |
| moonRent | 932 | Pay the moonlight bill: 48.4% · Charge him for the view: 51.6% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 33.6% · Promise it by spring: 33.0% · Buy a second book: 33.4% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 34.0% · Let her run a 'truth club': 31.5% · Libraries close at five: 34.5% | 0.0% | 0.0% |
| opera | 687 | Attend and applaud: 33.3% · Pay for rewrites: 32.8% · Ban the opera: 33.9% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 33.4% · Meters for visitors only: 33.8% · Free parking forever: 32.8% | 0.0% | 0.0% |
| pettyCrime | 1600 | Pay for overtime: 50.8% · Blame the next town over: 49.2% | 0.0% | 0.0% |
| policeDog | 109 | Buy a braver dog: 32.1% · Therapy for the old dog: 33.0% · One scared dog is plenty: 34.9% | 0.0% | 0.0% |
| raccoonBins | 286 | Raccoon-proof bins: 34.3% · Night patrols: 37.4% · They live here too: 28.3% | 0.0% | 0.0% |
| radar | 4083 | Buy the radar: 31.0% · Promise it next quarter: 34.4% · The finger is fine: 34.7% | 0.0% | 0.0% |
| rocketLibrary | 1820 | Rebuild the library: 49.0% · Leave the rocket in: 51.0% | 0.0% | 0.0% |
| roundabout | 324 | Rescue the drivers: 36.4% · Sell tickets to watch: 32.1% · It's working as intended: 31.5% | 0.0% | 0.0% |
| schoolLunch | 1 | Pay for real food: 0.0% · Chad sponsors lunch: 100.0% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 426 | Expose him in The Bugle: 46.2% · Take his hush money: 53.8% | 0.0% | 0.0% |
| snowplow | 2304 | Plow the school road: 36.4% · Plow Chad Street: 35.6% · Rent a second plow: 28.0% | 0.0% | 0.0% |
| speedTrap | 24 | Approve the speed trap: 20.8% · Warning signs only: 50.0% · No speed trap: 29.2% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 33.8% · A statue of someone normal: 32.8% · No statues: 33.4% | 0.0% | 0.0% |
| talentShow | 1597 | Judge honestly: 31.4% · Everyone wins: 34.8% · Send Dave: 33.8% | 0.0% | 0.0% |
| taxBreak | 4080 | Grant the tax break: 31.3% · Trade it for a donation: 33.1% · Refuse: 35.6% | 0.0% | 0.0% |
| theWhistle | 24 | Shut down The Whistle: 54.2% · Buy The Whistle: 20.8% · A free press is good: 25.0% | 0.0% | 0.0% |
| timeCapsule | 4980 | Settle with Chad: 33.0% · Bury it again, deeper: 33.7% · Frame the note: 33.3% | 0.0% | 0.0% |
| tvStation | 173 | Build the station: 34.7% · Lend her the roof: 30.6% · Refuse: 34.7% | 0.0% | 0.0% |

## sensible

Projects built (share of terms): school 53.4%, casino 21.9%, pond 10.1%, helicopter 6.6%, spoon 3.7%, tv 1.1%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 31.0% · Bribe him with cheese: 16.9% · Let Dave handle the audit: 52.1% | 0.0% | 0.0% |
| bearStory | 1875 | Yes, I wrestled a bear: 80.5% · Tell the truth: 19.5% | 0.0% | 0.0% |
| billboard | 4796 | Allow the billboard: 50.9% · A small one, round the back: 47.8% · No billboard: 1.4% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 52.1% · Promise repairs soon: 18.4% · Put up a 'Good Luck' sign: 29.5% | 0.0% | 0.0% |
| buglePress | 5000 | Buy a new press: 70.2% · Use the school copier: 27.8% · Not the town's problem: 2.0% | 0.0% | 0.0% |
| campaign | 2001 | Big rally: 9.7% · Call in every Favor: 19.9% · Attack ad about the cone: 35.8% · Just be yourself: 34.5% | 0.0% | 0.0% |
| campaignTruth | 2997 | 'At least I'm not a goose': 15.8% · Promise a recount: 75.4% · Big rally: 2.5% · Call in every Favor: 6.3% | 0.0% | 0.0% |
| casinoCrime | 778 | Ban Linda from blackjack: 12.1% · Make her head of security: 87.9% | 0.0% | 0.0% |
| catGoose | 5000 | Negotiate with Gerald: 75.2% · Send in Barb: 21.3% · Let them have the bakery: 3.5% | 0.0% | 0.0% |
| catSinkhole | 5000 | Fill Kevin with concrete: 42.6% · Make Kevin an attraction: 56.8% · Move the town to the left: 0.6% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 42.8% · Launch from your own lawn: 34.9% · No rockets near children: 22.3% | 0.0% | 0.0% |
| cheeseVault | 5000 | Sell it, fast: 27.7% · Throw a cheese festival: 48.7% · Seal the vault: 23.6% | 0.0% | 0.0% |
| coneRally | 4999 | Hold a bigger rally: 73.1% · Debate the cone, live: 25.6% · Have the cone towed: 1.3% | 0.0% | 0.0% |
| crossingGuard | 4 | Hire a human: 100.0% · Gerald it is: 0.0% · Children can look both ways: 0.0% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 16.4% · Fund a youth centre: 72.3% · Let them stand: 11.3% | 0.0% | 0.0% |
| diaryLeak | 5000 | Apologise to everyone: 68.9% · Publish the whole diary: 25.7% · Blame the pigeon: 5.4% | 0.0% | 0.0% |
| entitled | 23 | Free ice cream: 65.2% · Say no nicely: 34.8% | 0.0% | 0.0% |
| evBallots | 4060 | Tell the town: 73.8% · Put the boxes back: 26.2% | 0.0% | 0.0% |
| evBear | 1066 | Apologise to the bear: 18.7% · Wrestle it for real: 81.3% | 0.0% | 0.0% |
| evDebate | 5000 | Debate with facts: 35.6% · Debate with insults: 64.4% | 0.0% | 0.0% |
| evFair | 940 | Eat for the town: 92.0% · Decline politely: 8.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 57.6% · Burn the note: 42.4% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 46.9% · Buy a new float: 53.1% | 0.0% | 0.0% |
| evPower | 3934 | Pay Chad's guy: 80.8% · Hand out candles: 18.8% · Sit in the dark: 0.4% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 76.6% · Ignore Steve: 23.4% | 0.0% | 0.0% |
| farmersMarket | 3439 | Protect the market: 17.7% · Ban the market: 66.0% · Market pays a fee: 16.3% | 0.0% | 0.0% |
| flood | 5000 | Rent the pumps: 76.3% · Rename it 'Little Venice': 22.3% · Wait for it to dry: 1.4% | 0.0% | 0.0% |
| giantSpoon | 4999 | Build the spoon: 3.7% · A normal-sized spoon: 71.3% · No spoon: 24.9% | 0.0% | 0.0% |
| gooseOccupation | 36 | Pay them off in bread: 97.2% · Send Chief Barb: 2.8% | 0.0% | 0.0% |
| goosePond | 674 | Build the pond: 75.1% · Pond in the park instead: 16.8% · Refuse: 8.2% | 0.0% | 0.0% |
| gooseStrike | 14 | Meet their demands: 100.0% · Hire ducks instead: 0.0% · Wait them out: 0.0% | 0.0% | 0.0% |
| haunted | 5000 | Fund the ghost hunt: 50.3% · Seal the basement: 29.4% · There's nothing down there: 20.3% | 0.0% | 0.0% |
| helicopter | 2619 | Buy it: 12.5% · Lease one: 25.6% · Promise it next quarter: 61.9% | 0.0% | 0.0% |
| lakeMonster | 4999 | Put it on the brochure: 36.7% · Protect its privacy: 55.1% · There is no monster: 8.2% | 0.0% | 0.0% |
| lawDogs | 839 | Overrule the dog: 9.9% · Promote the dog: 75.3% · Let justice take its course: 14.8% | 0.0% | 0.0% |
| lawGeese | 124 | Give Barb a whistle too: 33.9% · Goose lanes on every road: 46.0% · Let Gerald run it: 20.2% | 0.0% | 0.0% |
| lawSighs | 23 | Declare a free sigh day: 95.7% · Raise the sigh tax: 0.0% · Sigh for them: 4.3% | 0.0% | 0.0% |
| lawTuesday | 616 | Give it back: 39.3% · Rename it Funday: 56.5% · Hold firm: 4.2% | 0.0% | 0.0% |
| libraryCasino | 2131 | Build the casino: 51.3% · Refuse: 20.1% · Casino night, once a year: 28.6% | 0.0% | 0.0% |
| mallParking | 978 | Pave the park: 55.6% · Only half the park: 30.2% · Hands off the park: 14.2% | 0.0% | 0.0% |
| mascot | 6 | Welcome, Wet Sock: 83.3% · Hire a real designer: 16.7% · No mascot: 0.0% | 0.0% | 0.0% |
| mimeStrike | 5000 | Notice them, with a banner: 77.5% · Negotiate in mime: 18.4% · Ignore the mimes: 4.2% | 0.0% | 0.0% |
| moonClaim | 5000 | Plant the flag: 24.5% · Sell the moon to Chad: 55.5% · Give the moon back: 20.0% | 0.0% | 0.0% |
| moonRent | 1225 | Pay the moonlight bill: 67.9% · Charge him for the view: 32.1% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 53.4% · Promise it by spring: 32.4% · Buy a second book: 14.2% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 25.9% · Let her run a 'truth club': 72.8% · Libraries close at five: 1.3% | 0.0% | 0.0% |
| opera | 860 | Attend and applaud: 28.3% · Pay for rewrites: 71.7% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 1.2% · Meters for visitors only: 11.8% · Free parking forever: 86.9% | 0.0% | 0.0% |
| pettyCrime | 6014 | Pay for overtime: 70.1% · Blame the next town over: 29.9% | 0.0% | 0.0% |
| policeDog | 977 | Buy a braver dog: 27.6% · Therapy for the old dog: 72.2% · One scared dog is plenty: 0.2% | 0.0% | 0.0% |
| raccoonBins | 4999 | Raccoon-proof bins: 60.0% · Night patrols: 30.2% · They live here too: 9.8% | 0.0% | 0.0% |
| radar | 5000 | Buy the radar: 65.8% · Promise it next quarter: 28.0% · The finger is fine: 6.2% | 0.0% | 0.0% |
| rocketLibrary | 2140 | Rebuild the library: 90.2% · Leave the rocket in: 9.8% | 0.0% | 0.0% |
| roundabout | 1714 | Rescue the drivers: 68.2% · Sell tickets to watch: 28.4% · It's working as intended: 3.4% | 0.0% | 0.0% |
| secretStranger | 2998 | Expose him in The Bugle: 88.7% · Take his hush money: 11.3% | 0.0% | 0.0% |
| snowplow | 5000 | Plow the school road: 24.2% · Plow Chad Street: 28.0% · Rent a second plow: 47.9% | 0.0% | 0.0% |
| speedTrap | 403 | Approve the speed trap: 14.4% · Warning signs only: 65.3% · No speed trap: 20.3% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 10.9% · A statue of someone normal: 72.8% · No statues: 16.3% | 0.0% | 0.0% |
| talentShow | 166 | Judge honestly: 0.6% · Everyone wins: 39.2% · Send Dave: 60.2% | 0.0% | 0.0% |
| taxBreak | 4284 | Grant the tax break: 69.9% · Trade it for a donation: 24.6% · Refuse: 5.5% | 0.0% | 0.0% |
| theWhistle | 37 | Shut down The Whistle: 16.2% · Buy The Whistle: 83.8% · A free press is good: 0.0% | 0.0% | 0.0% |
| timeCapsule | 5000 | Settle with Chad: 87.8% · Bury it again, deeper: 5.5% · Frame the note: 6.7% | 0.0% | 0.0% |
| tvStation | 206 | Build the station: 27.7% · Lend her the roof: 72.3% · Refuse: 0.0% | 0.0% | 0.0% |
