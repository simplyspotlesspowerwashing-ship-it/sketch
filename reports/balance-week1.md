# Balance report: pack `week1`

5000 terms per policy. Tuning: {"people":0.5,"press":0.2,"business":0.1,"law":0.1,"objective":2,"brokenPromise":-4,"min":5,"max":95}.

| Policy | Win rate | Target | Mean vote | Vote p10 / p50 / p90 | Recalled | Bankrupt | Term ended early | Ending money $k p10 / p50 / p90 |
|---|---|---|---|---|---|---|---|---|
| random | 0.1% | on target | 15.2 | 5 / 17 / 23 | 99.5% | 0.4% | 43.5% | 13 / 20 / 67 |
| greedy-approval | 20.2% |  | 39.7 | 21 / 38 / 59 | 99.8% | 99.3% | 20.7% | -46 / 17 / 20 |
| miser | 0.0% |  | 17.0 | 17 / 17 / 17 | 100.0% | 0.0% | 100.0% | 20 / 20 / 20 |
| people-pleaser | 18.9% |  | 36.8 | 19 / 35 / 54 | 100.0% | 63.8% | 18.6% | -47 / 6 / 26 |
| dave-only | 0.0% | **off target** (5-10%) | 14.0 | 5 / 15 / 22 | 99.1% | 0.0% | 18.5% | 20 / 47 / 87 |
| sensible | 79.4% | **off target** (55-65%) | 58.2 | 44 / 59 / 71 | 0.1% | 0.1% | 0.0% | 11 / 34 / 62 |
| | | recalls on target (under 25%) | | | | | | |

## Non-dilemmas and other flags (sensible bot)

- `bankError`: "Keep it quiet" chosen 1% of the time (under 5%)
- `billboard`: "No billboard" chosen 1% of the time (under 5%)
- `bridge`: "Put up a 'Good Luck' sign" chosen 2% of the time (under 5%)
- `buglePress`: "Not the town's problem" chosen 2% of the time (under 5%)
- `campaignTruth`: "Call in every Favor" chosen 5% of the time (under 5%)
- `coneRally`: "Have the cone towed" chosen 3% of the time (under 5%)
- `crossingGuard`: "Hire a human" chosen 95% of the time (over 85%)
- `crossingGuard`: "Gerald it is" chosen 4% of the time (under 5%)
- `crossingGuard`: "Children can look both ways" chosen 1% of the time (under 5%)
- `curfew`: "Fund a youth centre" chosen 87% of the time (over 85%)
- `diaryLeak`: "Blame the pigeon" chosen 4% of the time (under 5%)
- `fireworks`: "No fireworks" chosen 2% of the time (under 5%)
- `flood`: "Wait for it to dry" chosen 4% of the time (under 5%)
- `gooseOccupation`: "Pay them off in bread" chosen 87% of the time (over 85%)
- `gooseStrike`: "Wait them out" chosen 3% of the time (under 5%)
- `mallParking`: "Hands off the park" chosen 1% of the time (under 5%)
- `mascot`: "No mascot" chosen 4% of the time (under 5%)
- `mimeStrike`: "Ignore the mimes" chosen 3% of the time (under 5%)
- `nightLibrary`: "Libraries close at five" chosen 3% of the time (under 5%)
- `parkingMeters`: "Install meters" chosen 0% of the time (under 5%)
- `parkingMeters`: "Free parking forever" chosen 92% of the time (over 85%)
- `policeDog`: "Therapy for the old dog" chosen 87% of the time (over 85%)
- `policeDog`: "One scared dog is plenty" chosen 3% of the time (under 5%)
- `rocketLibrary`: "Rebuild the library" chosen 87% of the time (over 85%)
- `secretStranger`: "Expose him in The Bugle" chosen 95% of the time (over 85%)
- `statue`: "No statues" chosen 5% of the time (under 5%)
- `taxBreak`: "Refuse" chosen 5% of the time (under 5%)
- `tvStation`: "Refuse" chosen 4% of the time (under 5%)
- `twinTown`: "Lock the gates" chosen 3% of the time (under 5%)

## Unreachable desk cards (never drawn by any policy)

- `snowplow`
- `pothole`
- `squirrelLoan`
- `opera`
- `buyout`
- `overreach`
- `goldenGoose`

## random

Projects built (share of terms): school 20.1%, pond 19.9%, tv 18.3%, helicopter 17.3%, spoon 9.2%, casino 4.2%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 35.8% · Bribe him with cheese: 29.4% · Let Dave handle the audit: 34.8% | 36.9% | 10.7% |
| bankError | 3525 | Keep it quiet: 38.4% · Give it back: 35.9% · Split it with Chad: 25.7% | 38.1% | 11.8% |
| bearStory | 5000 | Yes, I wrestled a bear: 50.5% · Tell the truth: 49.5% | 41.6% | 13.4% |
| billboard | 5000 | Allow the billboard: 34.2% · A small one, round the back: 33.0% · No billboard: 32.8% | 34.3% | 9.4% |
| bridge | 5000 | Repair the bridge: 34.4% · Promise repairs soon: 34.0% · Put up a 'Good Luck' sign: 31.6% | 33.1% | 10.9% |
| buglePress | 5000 | Buy a new press: 33.4% · Use the school copier: 32.1% · Not the town's problem: 34.6% | 30.1% | 10.0% |
| campaign | 2238 | Big rally: 29.6% · Call in every Favor: 11.5% · Attack ad about the cone: 29.8% · Just be yourself: 29.0% | 0.0% | 0.0% |
| campaignTruth | 587 | 'At least I'm not a goose': 28.6% · Promise a recount: 30.3% · Big rally: 27.4% · Call in every Favor: 13.6% | 0.0% | 0.0% |
| casinoCrime | 145 | Ban Linda from blackjack: 46.1% · Make her head of security: 53.9% | 37.2% | 10.3% |
| chadRocket | 5000 | Clear the launch: 32.9% · Launch from your own lawn: 32.7% · No rockets near children: 34.3% | 28.6% | 10.1% |
| cheeseVault | 4892 | Sell it, fast: 32.0% · Throw a cheese festival: 34.8% · Seal the vault: 33.2% | 34.9% | 9.9% |
| coneRally | 3984 | Hold a bigger rally: 33.5% · Debate the cone, live: 33.1% · Have the cone towed: 33.4% | 35.6% | 9.2% |
| crossingGuard | 5000 | Hire a human: 33.4% · Gerald it is: 33.7% · Children can look both ways: 32.9% | 32.6% | 9.3% |
| curfew | 5000 | Curfew at 9 pm: 33.4% · Fund a youth centre: 33.0% · Let them stand: 33.5% | 30.3% | 11.0% |
| diaryLeak | 4819 | Apologise to everyone: 32.9% · Publish the whole diary: 33.9% · Blame the pigeon: 33.2% | 37.9% | 10.4% |
| duckDuel | 1134 | Back Gerald: 33.3% · Back the duck: 33.6% · Stay out of bird politics: 33.1% | 36.8% | 11.0% |
| entitled | 48 | Free ice cream: 63.6% · Say no nicely: 36.4% | 35.4% | 18.8% |
| evBallots | 2325 | Tell the town: 48.6% · Put the boxes back: 51.4% | 21.0% | 0.0% |
| evBear | 1109 | Apologise to the bear: 50.8% · Wrestle it for real: 49.2% | 19.8% | 0.0% |
| evDebate | 3571 | Debate with facts: 49.8% · Debate with insults: 50.2% | 19.6% | 0.0% |
| evFair | 2166 | Eat for the town: 50.9% · Decline politely: 49.1% | 20.4% | 0.0% |
| evNote | 5000 | Go and look: 50.6% · Burn the note: 49.4% | 19.9% | 0.0% |
| evParade | 5000 | Ride the float anyway: 51.8% · Buy a new float: 48.2% | 20.3% | 0.0% |
| evPower | 3815 | Pay Chad's guy: 48.3% · Hand out candles: 51.7% | 19.8% | 0.0% |
| evStorm | 5000 | Buy sandbags: 49.6% · Ignore Steve: 50.4% | 19.0% | 0.0% |
| farmersMarket | 5000 | Protect the market: 35.2% · Ban the market: 36.1% · Market pays a fee: 28.7% | 38.4% | 11.1% |
| festival | 4994 | Fund Frog Day: 34.3% · Promise Frog Day soon: 32.3% · No Frog Day: 33.4% | 37.0% | 10.1% |
| fireworks | 3126 | Fireworks for Timmy: 35.3% · One sparkler: 32.3% · No fireworks: 32.4% | 36.6% | 9.4% |
| flood | 4995 | Rent the pumps: 32.4% · Rename it 'Little Venice': 33.6% · Wait for it to dry: 34.0% | 37.5% | 10.5% |
| giantSpoon | 2461 | Build the spoon: 33.4% · A normal-sized spoon: 32.8% · No spoon: 33.7% | 34.3% | 10.0% |
| gooseOccupation | 3346 | Pay them off in bread: 51.0% · Send Chief Barb: 49.0% | 45.1% | 12.8% |
| goosePond | 5000 | Build the pond: 36.0% · Pond in the park instead: 31.1% · Refuse: 32.8% | 34.9% | 9.8% |
| gooseStrike | 5000 | Meet their demands: 32.3% · Hire ducks instead: 33.1% · Wait them out: 34.6% | 32.3% | 9.1% |
| haunted | 5000 | Fund the ghost hunt: 32.3% · Seal the basement: 33.7% · There's nothing down there: 34.0% | 30.5% | 10.0% |
| heatwave | 3963 | Fix the pool: 33.1% · Sprinklers on Main Street: 33.8% · Tell them to drink water: 33.1% | 36.0% | 10.0% |
| helicopter | 4993 | Buy it: 32.5% · Lease one: 33.7% · Promise it next quarter: 33.8% | 35.9% | 10.9% |
| lakeMonster | 1708 | Put it on the brochure: 32.0% · Protect its privacy: 34.7% · There is no monster: 33.3% | 36.7% | 10.8% |
| libraryCasino | 1155 | Build the casino: 39.4% · Refuse: 35.8% · Casino night, once a year: 24.8% | 42.3% | 11.3% |
| mallParking | 3282 | Pave the park: 37.1% · Only half the park: 25.1% · Hands off the park: 37.8% | 38.3% | 9.9% |
| mascot | 1076 | Welcome, Wet Sock: 31.2% · Hire a real designer: 36.3% · No mascot: 32.6% | 34.8% | 12.2% |
| mimeStrike | 5000 | Notice them, with a banner: 34.7% · Negotiate in mime: 33.5% · Ignore the mimes: 31.8% | 33.5% | 9.6% |
| monsterPta | 282 | Welcome the monster: 50.8% · Monsters can't be parents: 49.2% | 46.5% | 11.0% |
| moonClaim | 3832 | Plant the flag: 32.9% · Sell the moon to Chad: 33.2% · Give the moon back: 34.0% | 31.6% | 10.2% |
| moonRent | 733 | Pay the moonlight bill: 52.1% · Charge him for the view: 47.9% | 38.1% | 13.0% |
| newSchool | 5000 | Build a new school: 33.6% · Promise it by spring: 33.0% · Buy a second book: 33.4% | 29.5% | 10.6% |
| nightLibrary | 5000 | Fund the night library: 35.1% · Let her run a 'truth club': 28.0% · Libraries close at five: 37.0% | 38.4% | 10.8% |
| parkingMeters | 5000 | Install meters: 32.2% · Meters for visitors only: 34.3% · Free parking forever: 33.5% | 29.6% | 10.7% |
| parkWifi | 4814 | Free park wifi: 33.9% · Wifi with Chad's ads: 33.2% · Go outside and play: 32.8% | 37.5% | 9.7% |
| pettyCrime | 24022 | Pay for overtime: 49.9% · Blame the next town over: 50.1% | 43.9% | 13.3% |
| pigeonAide | 4813 | Hire the pigeon: 32.8% · Let it sign today's stack: 33.5% · Evict the pigeon: 33.7% | 36.5% | 10.6% |
| policeDog | 4316 | Buy a braver dog: 34.1% · Therapy for the old dog: 33.3% · One scared dog is plenty: 32.6% | 35.2% | 9.1% |
| raccoonBins | 5000 | Raccoon-proof bins: 34.8% · Night patrols: 33.7% · They live here too: 31.4% | 32.7% | 10.9% |
| radar | 465 | Buy the radar: 34.8% · Promise it next quarter: 31.6% · The finger is fine: 33.6% | 35.5% | 9.5% |
| rocketLibrary | 1008 | Rebuild the library: 53.4% · Leave the rocket in: 46.6% | 40.9% | 13.6% |
| roundabout | 4906 | Rescue the drivers: 35.4% · Sell tickets to watch: 27.8% · It's working as intended: 36.7% | 36.5% | 10.9% |
| scandal | 1 | Own it: 100.0% · Bury the story: 0.0% | 0.0% | 0.0% |
| schoolLunch | 1768 | Pay for real food: 32.1% · Chad sponsors lunch: 33.8% · Paste builds character: 34.2% | 35.0% | 10.7% |
| secretStranger | 857 | Expose him in The Bugle: 47.0% · Take his hush money: 53.0% | 42.1% | 11.0% |
| speedTrap | 3977 | Approve the speed trap: 34.2% · Warning signs only: 33.8% · No speed trap: 32.0% | 36.3% | 11.2% |
| statue | 5000 | Accept the statue: 33.9% · A statue of someone normal: 32.8% · No statues: 33.3% | 28.7% | 9.7% |
| strangerPrice | 3252 | Name a silly price: 34.1% · Throw him out: 32.4% · Hear him out: 33.5% | 35.8% | 10.1% |
| talentShow | 1708 | Judge honestly: 34.2% · Everyone wins: 31.2% · Send Dave: 34.6% | 36.9% | 9.4% |
| taxBreak | 5000 | Grant the tax break: 34.3% · Trade it for a donation: 32.2% · Refuse: 33.5% | 33.9% | 10.3% |
| theWhistle | 4347 | Shut down The Whistle: 34.9% · Buy The Whistle: 32.3% · A free press is good: 32.8% | 34.7% | 9.1% |
| timeCapsule | 5000 | Settle with Chad: 33.9% · Bury it again, deeper: 33.7% · Frame the note: 32.5% | 36.8% | 10.2% |
| tvStation | 4902 | Build the station: 33.7% · Lend her the roof: 32.9% · Refuse: 33.4% | 35.1% | 9.6% |
| twinTown | 1274 | Throw a welcome party: 31.7% · Show them the pothole: 34.1% · Lock the gates: 34.2% | 39.5% | 10.0% |

## greedy-approval

Projects built (share of terms): school 100.0%, pond 50.4%, helicopter 7.8%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 14.8% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 85.2% | 0.0% | 0.3% |
| bankError | 711 | Keep it quiet: 0.0% · Give it back: 100.0% · Split it with Chad: 0.0% | 0.0% | 98.5% |
| bearStory | 5000 | Yes, I wrestled a bear: 100.0% · Tell the truth: 0.0% | 0.1% | 16.7% |
| billboard | 5000 | Allow the billboard: - · A small one, round the back: - · No billboard: - | 0.0% | 100.0% |
| bridge | 5000 | Repair the bridge: 100.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| buglePress | 5000 | Buy a new press: 100.0% · Use the school copier: 0.0% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| campaignTruth | 3967 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: - · Launch from your own lawn: - · No rockets near children: - | 0.0% | 100.0% |
| cheeseVault | 4148 | Sell it, fast: 16.9% · Throw a cheese festival: 83.1% · Seal the vault: 0.0% | 0.0% | 0.0% |
| coneRally | 4846 | Hold a bigger rally: 50.2% · Debate the cone, live: 49.8% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| crossingGuard | 5000 | Hire a human: 100.0% · Gerald it is: 0.0% · Children can look both ways: 0.0% | 0.0% | 65.8% |
| curfew | 5000 | Curfew at 9 pm: 0.0% · Fund a youth centre: 100.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 4977 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| duckDuel | 3615 | Back Gerald: 100.0% · Back the duck: 0.0% · Stay out of bird politics: 0.0% | 0.0% | 93.9% |
| entitled | 6472 | Free ice cream: 78.0% · Say no nicely: 22.0% | 0.0% | 24.9% |
| evBallots | 4971 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evBear | 4160 | Apologise to the bear: 57.0% · Wrestle it for real: 43.0% | 0.0% | 0.0% |
| evDebate | 4743 | Debate with facts: 100.0% · Debate with insults: 0.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 833 | Pay Chad's guy: 51.0% · Hand out candles: 49.0% | 14.2% | 0.0% |
| evStorm | 5000 | Buy sandbags: 77.9% · Ignore Steve: 22.1% | 0.0% | 0.0% |
| farmersMarket | 5000 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 17.5% |
| festival | 4999 | Fund Frog Day: 1.4% · Promise Frog Day soon: 98.6% · No Frog Day: 0.0% | 0.0% | 52.5% |
| fireworks | 4147 | Fireworks for Timmy: 89.7% · One sparkler: 10.3% · No fireworks: 0.0% | 0.0% | 6.4% |
| flood | 5000 | Rent the pumps: 24.6% · Rename it 'Little Venice': 75.4% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| giantSpoon | 2428 | Build the spoon: - · A normal-sized spoon: - · No spoon: - | 0.0% | 100.0% |
| gooseOccupation | 894 | Pay them off in bread: 25.7% · Send Chief Barb: 74.3% | 0.0% | 40.4% |
| goosePond | 5000 | Build the pond: 50.4% · Pond in the park instead: 40.3% · Refuse: 9.4% | 0.0% | 0.0% |
| gooseStrike | 5000 | Meet their demands: 50.8% · Hire ducks instead: 24.2% · Wait them out: 24.9% | 0.0% | 17.4% |
| haunted | 5000 | Fund the ghost hunt: 100.0% · Seal the basement: 0.0% · There's nothing down there: 0.0% | 0.0% | 6.9% |
| heatwave | 4846 | Fix the pool: 34.6% · Sprinklers on Main Street: 65.4% · Tell them to drink water: 0.0% | 0.0% | 39.2% |
| helicopter | 5000 | Buy it: 7.8% · Lease one: 92.2% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| lakeMonster | 3097 | Put it on the brochure: 100.0% · Protect its privacy: 0.0% · There is no monster: 0.0% | 0.1% | 9.7% |
| mallParking | 4244 | Pave the park: 0.3% · Only half the park: 99.7% · Hands off the park: 0.0% | 0.0% | 5.8% |
| mascot | 2735 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 0.0% |
| mimeStrike | 5000 | Notice them, with a banner: 98.9% · Negotiate in mime: 1.1% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| monsterPta | 2793 | Welcome the monster: 100.0% · Monsters can't be parents: 0.0% | 0.0% | 0.0% |
| moonClaim | 4653 | Plant the flag: - · Sell the moon to Chad: - · Give the moon back: - | 0.0% | 100.0% |
| newSchool | 5000 | Build a new school: 100.0% · Promise it by spring: 0.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 1.4% · Let her run a 'truth club': 98.6% · Libraries close at five: 0.0% | 0.0% | 4.5% |
| parkingMeters | 5000 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 4977 | Free park wifi: 6.9% · Wifi with Chad's ads: 93.1% · Go outside and play: 0.0% | 0.0% | 99.4% |
| pettyCrime | 19450 | Pay for overtime: 66.6% · Blame the next town over: 33.4% | 0.0% | 11.1% |
| pigeonAide | 4977 | Hire the pigeon: 100.0% · Let it sign today's stack: 0.0% · Evict the pigeon: 0.0% | 0.0% | 0.0% |
| policeDog | 4934 | Buy a braver dog: 72.5% · Therapy for the old dog: 27.5% · One scared dog is plenty: 0.0% | 0.0% | 19.9% |
| raccoonBins | 5000 | Raccoon-proof bins: 94.2% · Night patrols: 5.8% · They live here too: 0.0% | 0.0% | 51.4% |
| radar | 304 | Buy the radar: 70.2% · Promise it next quarter: 29.8% · The finger is fine: 0.0% | 0.0% | 6.3% |
| roundabout | 4993 | Rescue the drivers: 69.2% · Sell tickets to watch: 29.2% · It's working as intended: 1.6% | 0.0% | 0.0% |
| scandal | 99 | Own it: 100.0% · Bury the story: 0.0% | 0.0% | 15.2% |
| schoolLunch | 963 | Pay for real food: 100.0% · Chad sponsors lunch: 0.0% · Paste builds character: 0.0% | 0.0% | 14.4% |
| secretStranger | 4934 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| speedTrap | 4846 | Approve the speed trap: 71.5% · Warning signs only: 28.5% · No speed trap: 0.0% | 0.0% | 60.4% |
| statue | 5000 | Accept the statue: 0.0% · A statue of someone normal: 100.0% · No statues: 0.0% | 0.0% | 0.0% |
| strangerPrice | 4244 | Name a silly price: 100.0% · Throw him out: 0.0% · Hear him out: 0.0% | 0.0% | 4.5% |
| talentShow | 775 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 5000 | Grant the tax break: 8.8% · Trade it for a donation: 91.2% · Refuse: 0.0% | 0.0% | 0.0% |
| theWhistle | 4934 | Shut down The Whistle: 58.4% · Buy The Whistle: 41.6% · A free press is good: 0.0% | 0.0% | 65.9% |
| timeCapsule | 5000 | Settle with Chad: 70.0% · Bury it again, deeper: 0.0% · Frame the note: 30.0% | 0.0% | 62.4% |
| tvStation | 4982 | Build the station: 0.0% · Lend her the roof: 100.0% · Refuse: 0.0% | 0.0% | 74.9% |
| twinTown | 941 | Throw a welcome party: 96.3% · Show them the pothole: 3.7% · Lock the gates: 0.0% | 0.0% | 0.1% |

## miser

Projects built (share of terms): spoon 82.4%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: - · Bribe him with cheese: - · Let Dave handle the audit: - | 100.0% | 0.0% |
| bankError | 79 | Keep it quiet: 100.0% · Give it back: 0.0% · Split it with Chad: 0.0% | 0.0% | 0.0% |
| bearStory | 5000 | Yes, I wrestled a bear: - · Tell the truth: - | 100.0% | 0.0% |
| billboard | 5000 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: - · Promise repairs soon: - · Put up a 'Good Luck' sign: - | 66.7% | 33.3% |
| buglePress | 5000 | Buy a new press: - · Use the school copier: - · Not the town's problem: - | 66.7% | 33.3% |
| chadRocket | 5000 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| cheeseVault | 615 | Sell it, fast: - · Throw a cheese festival: - · Seal the vault: - | 72.7% | 27.3% |
| coneRally | 13 | Hold a bigger rally: - · Debate the cone, live: - · Have the cone towed: - | 100.0% | 0.0% |
| crossingGuard | 5000 | Hire a human: - · Gerald it is: - · Children can look both ways: - | 66.7% | 33.3% |
| curfew | 5000 | Curfew at 9 pm: - · Fund a youth centre: - · Let them stand: - | 0.0% | 100.0% |
| diaryLeak | 382 | Apologise to everyone: - · Publish the whole diary: - · Blame the pigeon: - | 100.0% | 0.0% |
| evDebate | 2 | Debate with facts: - · Debate with insults: - | 100.0% | 0.0% |
| evFair | 154 | Eat for the town: - · Decline politely: - | 100.0% | 0.0% |
| evNote | 4995 | Go and look: - · Burn the note: - | 100.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: - · Buy a new float: - | 100.0% | 0.0% |
| evPower | 1728 | Pay Chad's guy: - · Hand out candles: - | 100.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: - · Ignore Steve: - | 100.0% | 0.0% |
| farmersMarket | 4992 | Protect the market: 0.0% · Ban the market: 0.0% · Market pays a fee: 100.0% | 0.0% | 0.0% |
| festival | 4814 | Fund Frog Day: - · Promise Frog Day soon: - · No Frog Day: - | 66.1% | 33.9% |
| flood | 4804 | Rent the pumps: - · Rename it 'Little Venice': - · Wait for it to dry: - | 100.0% | 0.0% |
| giantSpoon | 4122 | Build the spoon: 100.0% · A normal-sized spoon: 0.0% · No spoon: 0.0% | 0.0% | 0.0% |
| goosePond | 5000 | Build the pond: - · Pond in the park instead: - · Refuse: - | 0.0% | 100.0% |
| gooseStrike | 5000 | Meet their demands: - · Hire ducks instead: - · Wait them out: - | 0.0% | 100.0% |
| haunted | 5000 | Fund the ghost hunt: - · Seal the basement: - · There's nothing down there: - | 100.0% | 0.0% |
| heatwave | 16 | Fix the pool: - · Sprinklers on Main Street: - · Tell them to drink water: - | 0.0% | 100.0% |
| helicopter | 4845 | Buy it: - · Lease one: - · Promise it next quarter: - | 0.0% | 100.0% |
| lakeMonster | 322 | Put it on the brochure: - · Protect its privacy: - · There is no monster: - | 100.0% | 0.0% |
| libraryCasino | 3 | Build the casino: - · Refuse: - · Casino night, once a year: - | 100.0% | 0.0% |
| mallParking | 1 | Pave the park: 100.0% · Only half the park: 0.0% · Hands off the park: 0.0% | 0.0% | 0.0% |
| mimeStrike | 5000 | Notice them, with a banner: - · Negotiate in mime: - · Ignore the mimes: - | 0.0% | 100.0% |
| newSchool | 5000 | Build a new school: - · Promise it by spring: - · Buy a second book: - | 0.0% | 100.0% |
| nightLibrary | 4992 | Fund the night library: - · Let her run a 'truth club': - · Libraries close at five: - | 0.0% | 100.0% |
| parkingMeters | 5000 | Install meters: 100.0% · Meters for visitors only: 0.0% · Free parking forever: 0.0% | 0.0% | 0.0% |
| parkWifi | 388 | Free park wifi: - · Wifi with Chad's ads: - · Go outside and play: - | 33.5% | 66.5% |
| pettyCrime | 11607 | Pay for overtime: - · Blame the next town over: - | 86.7% | 13.3% |
| pigeonAide | 397 | Hire the pigeon: - · Let it sign today's stack: - · Evict the pigeon: - | 0.0% | 100.0% |
| policeDog | 57 | Buy a braver dog: - · Therapy for the old dog: - · One scared dog is plenty: - | 0.0% | 100.0% |
| raccoonBins | 5000 | Raccoon-proof bins: - · Night patrols: - · They live here too: - | 100.0% | 0.0% |
| radar | 3279 | Buy the radar: - · Promise it next quarter: - · The finger is fine: - | 100.0% | 0.0% |
| rocketLibrary | 5000 | Rebuild the library: - · Leave the rocket in: - | 100.0% | 0.0% |
| roundabout | 736 | Rescue the drivers: 0.0% · Sell tickets to watch: 100.0% · It's working as intended: 0.0% | 0.0% | 50.5% |
| schoolLunch | 1072 | Pay for real food: - · Chad sponsors lunch: - · Paste builds character: - | 100.0% | 0.0% |
| speedTrap | 24 | Approve the speed trap: 100.0% · Warning signs only: 0.0% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 100.0% · A statue of someone normal: 0.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 416 | Judge honestly: - · Everyone wins: - · Send Dave: - | 66.1% | 33.9% |
| taxBreak | 5000 | Grant the tax break: 0.0% · Trade it for a donation: 100.0% · Refuse: 0.0% | 0.0% | 0.0% |
| theWhistle | 49 | Shut down The Whistle: - · Buy The Whistle: - · A free press is good: - | 0.0% | 100.0% |
| timeCapsule | 4990 | Settle with Chad: - · Bury it again, deeper: - · Frame the note: - | 66.6% | 33.4% |
| tvStation | 649 | Build the station: - · Lend her the roof: - · Refuse: - | 11.2% | 88.8% |
| twinTown | 25 | Throw a welcome party: - · Show them the pothole: - · Lock the gates: - | 100.0% | 0.0% |

## people-pleaser

Projects built (share of terms): school 100.0%, pond 40.2%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 4.6% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 95.4% | 0.0% | 57.6% |
| bankError | 613 | Keep it quiet: 0.0% · Give it back: 0.0% · Split it with Chad: 100.0% | 0.0% | 87.3% |
| bearStory | 5000 | Yes, I wrestled a bear: 0.0% · Tell the truth: 100.0% | 0.0% | 2.8% |
| billboard | 5000 | Allow the billboard: - · A small one, round the back: - · No billboard: - | 0.0% | 100.0% |
| bridge | 5000 | Repair the bridge: 95.7% · Promise repairs soon: 4.3% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 6.7% |
| buglePress | 5000 | Buy a new press: 100.0% · Use the school copier: 0.0% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| campaign | 1064 | Big rally: 37.8% · Call in every Favor: 43.7% · Attack ad about the cone: 9.6% · Just be yourself: 8.9% | 0.0% | 0.0% |
| campaignTruth | 3008 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: - · Launch from your own lawn: - · No rockets near children: - | 0.0% | 100.0% |
| cheeseVault | 4314 | Sell it, fast: 0.8% · Throw a cheese festival: 99.2% · Seal the vault: 0.0% | 0.0% | 0.0% |
| coneRally | 4816 | Hold a bigger rally: 34.2% · Debate the cone, live: 65.8% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| crossingGuard | 5000 | Hire a human: 42.0% · Gerald it is: 58.0% · Children can look both ways: 0.0% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 0.0% · Fund a youth centre: 100.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 4987 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| duckDuel | 715 | Back Gerald: 100.0% · Back the duck: 0.0% · Stay out of bird politics: 0.0% | 0.0% | 0.0% |
| entitled | 10269 | Free ice cream: 51.0% · Say no nicely: 49.0% | 0.0% | 0.3% |
| evBallots | 3629 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evDebate | 4718 | Debate with facts: 0.0% · Debate with insults: 100.0% | 0.0% | 0.0% |
| evFair | 1352 | Eat for the town: 100.0% · Decline politely: 0.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: - · Burn the note: - | 100.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 4996 | Pay Chad's guy: 79.4% · Hand out candles: 20.6% | 8.1% | 0.0% |
| evStorm | 5000 | Buy sandbags: 65.1% · Ignore Steve: 34.9% | 0.0% | 0.0% |
| farmersMarket | 5000 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| festival | 5000 | Fund Frog Day: 48.3% · Promise Frog Day soon: 51.7% · No Frog Day: 0.0% | 0.0% | 0.0% |
| fireworks | 1682 | Fireworks for Timmy: 96.1% · One sparkler: 3.9% · No fireworks: 0.0% | 0.0% | 6.1% |
| flood | 5000 | Rent the pumps: 48.7% · Rename it 'Little Venice': 51.3% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| giantSpoon | 1173 | Build the spoon: 0.0% · A normal-sized spoon: 100.0% · No spoon: 0.0% | 0.0% | 70.5% |
| gooseOccupation | 1963 | Pay them off in bread: 100.0% · Send Chief Barb: 0.0% | 0.0% | 84.7% |
| goosePond | 5000 | Build the pond: 40.2% · Pond in the park instead: 34.6% · Refuse: 25.2% | 0.0% | 0.0% |
| gooseStrike | 5000 | Meet their demands: 42.4% · Hire ducks instead: 40.6% · Wait them out: 17.0% | 0.0% | 27.2% |
| haunted | 5000 | Fund the ghost hunt: 100.0% · Seal the basement: 0.0% · There's nothing down there: 0.0% | 0.0% | 27.1% |
| heatwave | 4812 | Fix the pool: 45.5% · Sprinklers on Main Street: 54.5% · Tell them to drink water: 0.0% | 0.0% | 49.0% |
| helicopter | 5000 | Buy it: 0.0% · Lease one: 100.0% · Promise it next quarter: 0.0% | 0.0% | 75.0% |
| lakeMonster | 2569 | Put it on the brochure: 0.0% · Protect its privacy: 100.0% · There is no monster: 0.0% | 0.0% | 0.0% |
| libraryCasino | 93 | Build the casino: 0.0% · Refuse: 100.0% · Casino night, once a year: 0.0% | 0.0% | 0.0% |
| mallParking | 4550 | Pave the park: 0.0% · Only half the park: 0.0% · Hands off the park: 100.0% | 0.0% | 0.0% |
| mascot | 1167 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 85.2% |
| mimeStrike | 5000 | Notice them, with a banner: 100.0% · Negotiate in mime: 0.0% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 3645 | Plant the flag: - · Sell the moon to Chad: - · Give the moon back: - | 0.0% | 100.0% |
| newSchool | 5000 | Build a new school: 100.0% · Promise it by spring: 0.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 0.0% · Let her run a 'truth club': 100.0% · Libraries close at five: 0.0% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 4987 | Free park wifi: 74.2% · Wifi with Chad's ads: 25.8% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 28906 | Pay for overtime: 44.2% · Blame the next town over: 55.8% | 0.0% | 52.5% |
| pigeonAide | 4987 | Hire the pigeon: 100.0% · Let it sign today's stack: 0.0% · Evict the pigeon: 0.0% | 0.0% | 9.7% |
| policeDog | 4962 | Buy a braver dog: 0.0% · Therapy for the old dog: 99.9% · One scared dog is plenty: 0.1% | 0.0% | 26.0% |
| raccoonBins | 5000 | Raccoon-proof bins: 99.5% · Night patrols: 0.0% · They live here too: 0.5% | 0.0% | 35.3% |
| radar | 681 | Buy the radar: 100.0% · Promise it next quarter: 0.0% · The finger is fine: 0.0% | 0.0% | 0.0% |
| roundabout | 4996 | Rescue the drivers: 69.9% · Sell tickets to watch: 30.1% · It's working as intended: 0.0% | 0.0% | 2.7% |
| schoolLunch | 1231 | Pay for real food: 97.7% · Chad sponsors lunch: 2.3% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 3612 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| speedTrap | 4814 | Approve the speed trap: 47.4% · Warning signs only: 52.6% · No speed trap: 0.0% | 0.0% | 18.5% |
| statue | 5000 | Accept the statue: 0.0% · A statue of someone normal: 100.0% · No statues: 0.0% | 0.0% | 0.0% |
| strangerPrice | 4415 | Name a silly price: 100.0% · Throw him out: 0.0% · Hear him out: 0.0% | 0.0% | 55.9% |
| talentShow | 329 | Judge honestly: 0.0% · Everyone wins: 100.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 5000 | Grant the tax break: 0.0% · Trade it for a donation: 0.0% · Refuse: 100.0% | 0.0% | 0.0% |
| theWhistle | 4963 | Shut down The Whistle: 0.0% · Buy The Whistle: 27.5% · A free press is good: 72.5% | 0.0% | 0.0% |
| timeCapsule | 5000 | Settle with Chad: 68.8% · Bury it again, deeper: 0.0% · Frame the note: 31.2% | 0.0% | 65.5% |
| tvStation | 4996 | Build the station: 0.0% · Lend her the roof: 100.0% · Refuse: 0.0% | 0.0% | 71.5% |
| twinTown | 508 | Throw a welcome party: 100.0% · Show them the pothole: 0.0% · Lock the gates: 0.0% | 0.0% | 5.9% |

## dave-only

Projects built (share of terms): tv 23.8%, school 23.4%, spoon 11.8%, casino 6.5%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 34.1% · Bribe him with cheese: 31.2% · Let Dave handle the audit: 34.7% | 28.5% | 0.0% |
| bankError | 4348 | Keep it quiet: 36.0% · Give it back: 35.0% · Split it with Chad: 29.0% | 30.3% | 0.0% |
| bearStory | 5000 | Yes, I wrestled a bear: 52.4% · Tell the truth: 47.6% | 44.3% | 0.0% |
| billboard | 5000 | Allow the billboard: 34.0% · A small one, round the back: 33.0% · No billboard: 33.0% | 28.3% | 0.0% |
| bridge | 5000 | Repair the bridge: 32.7% · Promise repairs soon: 31.9% · Put up a 'Good Luck' sign: 35.5% | 31.1% | 0.0% |
| buglePress | 5000 | Buy a new press: 33.1% · Use the school copier: 35.3% · Not the town's problem: 31.6% | 31.6% | 0.0% |
| campaign | 3643 | Big rally: 0.0% · Call in every Favor: 0.0% · Attack ad about the cone: 0.0% · Just be yourself: 100.0% | 0.0% | 0.0% |
| campaignTruth | 432 | 'At least I'm not a goose': 0.0% · Promise a recount: 0.0% · Big rally: 30.1% · Call in every Favor: 69.9% | 0.0% | 0.0% |
| casinoCrime | 295 | Ban Linda from blackjack: 51.1% · Make her head of security: 48.9% | 41.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 35.4% · Launch from your own lawn: 32.6% · No rockets near children: 32.0% | 33.6% | 0.0% |
| cheeseVault | 4982 | Sell it, fast: 33.2% · Throw a cheese festival: 33.0% · Seal the vault: 33.8% | 29.1% | 0.0% |
| coneRally | 4704 | Hold a bigger rally: 34.4% · Debate the cone, live: 34.3% · Have the cone towed: 31.3% | 29.5% | 0.0% |
| crossingGuard | 5000 | Hire a human: 34.1% · Gerald it is: 32.9% · Children can look both ways: 33.0% | 27.1% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: - · Fund a youth centre: - · Let them stand: - | 0.0% | 100.0% |
| diaryLeak | 4967 | Apologise to everyone: 34.1% · Publish the whole diary: 32.4% · Blame the pigeon: 33.5% | 28.3% | 0.0% |
| duckDuel | 1229 | Back Gerald: 34.1% · Back the duck: 32.7% · Stay out of bird politics: 33.2% | 33.8% | 0.0% |
| entitled | 13 | Free ice cream: 33.3% · Say no nicely: 66.7% | 30.8% | 0.0% |
| evBallots | 2063 | Tell the town: 50.1% · Put the boxes back: 49.9% | 49.7% | 0.0% |
| evBear | 1455 | Apologise to the bear: 49.6% · Wrestle it for real: 50.4% | 52.2% | 0.0% |
| evDebate | 4522 | Debate with facts: 48.5% · Debate with insults: 51.5% | 49.3% | 0.0% |
| evFair | 2829 | Eat for the town: 48.3% · Decline politely: 51.7% | 51.5% | 0.0% |
| evNote | 5000 | Go and look: 50.3% · Burn the note: 49.7% | 49.7% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.9% · Buy a new float: 49.1% | 49.7% | 0.0% |
| evPower | 3535 | Pay Chad's guy: 49.4% · Hand out candles: 50.6% | 49.6% | 0.0% |
| evStorm | 5000 | Buy sandbags: 49.6% · Ignore Steve: 50.4% | 50.1% | 0.0% |
| farmersMarket | 5000 | Protect the market: 34.5% · Ban the market: 34.8% · Market pays a fee: 30.7% | 30.2% | 0.0% |
| festival | 4999 | Fund Frog Day: 32.5% · Promise Frog Day soon: 32.9% · No Frog Day: 34.5% | 29.0% | 0.0% |
| fireworks | 4115 | Fireworks for Timmy: 34.7% · One sparkler: 33.2% · No fireworks: 32.1% | 28.7% | 0.0% |
| flood | 5000 | Rent the pumps: 31.1% · Rename it 'Little Venice': 34.9% · Wait for it to dry: 34.0% | 29.1% | 0.0% |
| giantSpoon | 2727 | Build the spoon: 32.3% · A normal-sized spoon: 34.7% · No spoon: 32.9% | 33.0% | 0.0% |
| goosePond | 5000 | Build the pond: - · Pond in the park instead: - · Refuse: - | 0.0% | 100.0% |
| gooseStrike | 5000 | Meet their demands: - · Hire ducks instead: - · Wait them out: - | 0.0% | 100.0% |
| haunted | 5000 | Fund the ghost hunt: 33.9% · Seal the basement: 33.1% · There's nothing down there: 33.1% | 31.3% | 0.0% |
| heatwave | 4740 | Fix the pool: - · Sprinklers on Main Street: - · Tell them to drink water: - | 0.0% | 100.0% |
| helicopter | 5000 | Buy it: - · Lease one: - · Promise it next quarter: - | 0.0% | 100.0% |
| lakeMonster | 1515 | Put it on the brochure: 34.0% · Protect its privacy: 32.3% · There is no monster: 33.7% | 31.8% | 0.0% |
| libraryCasino | 1368 | Build the casino: 35.6% · Refuse: 34.9% · Casino night, once a year: 29.5% | 33.5% | 0.0% |
| mallParking | 4435 | Pave the park: - · Only half the park: - · Hands off the park: - | 0.0% | 100.0% |
| mascot | 1100 | Welcome, Wet Sock: 34.2% · Hire a real designer: 33.5% · No mascot: 32.3% | 35.2% | 0.0% |
| mimeStrike | 5000 | Notice them, with a banner: - · Negotiate in mime: - · Ignore the mimes: - | 0.0% | 100.0% |
| monsterPta | 350 | Welcome the monster: 53.8% · Monsters can't be parents: 46.2% | 44.3% | 0.0% |
| moonClaim | 3676 | Plant the flag: 32.6% · Sell the moon to Chad: 32.9% · Give the moon back: 34.6% | 34.3% | 0.0% |
| moonRent | 787 | Pay the moonlight bill: 53.3% · Charge him for the view: 46.7% | 42.8% | 0.0% |
| newSchool | 5000 | Build a new school: 34.6% · Promise it by spring: 33.0% · Buy a second book: 32.3% | 32.6% | 0.0% |
| nightLibrary | 5000 | Fund the night library: - · Let her run a 'truth club': - · Libraries close at five: - | 0.0% | 100.0% |
| parkingMeters | 5000 | Install meters: 33.7% · Meters for visitors only: 32.9% · Free parking forever: 33.4% | 33.8% | 0.0% |
| parkWifi | 4965 | Free park wifi: 34.6% · Wifi with Chad's ads: 32.2% · Go outside and play: 33.2% | 28.3% | 0.0% |
| pettyCrime | 29065 | Pay for overtime: 49.3% · Blame the next town over: 50.7% | 44.8% | 0.0% |
| pigeonAide | 4972 | Hire the pigeon: - · Let it sign today's stack: - · Evict the pigeon: - | 0.0% | 100.0% |
| policeDog | 4863 | Buy a braver dog: - · Therapy for the old dog: - · One scared dog is plenty: - | 0.0% | 100.0% |
| raccoonBins | 5000 | Raccoon-proof bins: 34.3% · Night patrols: 33.3% · They live here too: 32.5% | 31.0% | 0.0% |
| radar | 1371 | Buy the radar: 32.0% · Promise it next quarter: 34.2% · The finger is fine: 33.8% | 31.6% | 0.0% |
| rocketLibrary | 1174 | Rebuild the library: 49.4% · Leave the rocket in: 50.6% | 45.5% | 0.0% |
| roundabout | 4986 | Rescue the drivers: - · Sell tickets to watch: - · It's working as intended: - | 0.0% | 100.0% |
| schoolLunch | 1436 | Pay for real food: 31.9% · Chad sponsors lunch: 34.2% · Paste builds character: 33.9% | 35.5% | 0.0% |
| secretStranger | 517 | Expose him in The Bugle: 56.3% · Take his hush money: 43.7% | 37.1% | 0.0% |
| speedTrap | 4701 | Approve the speed trap: 33.4% · Warning signs only: 32.4% · No speed trap: 34.2% | 28.1% | 0.0% |
| statue | 5000 | Accept the statue: - · A statue of someone normal: - · No statues: - | 0.0% | 100.0% |
| strangerPrice | 4355 | Name a silly price: 32.5% · Throw him out: 34.2% · Hear him out: 33.3% | 27.4% | 0.0% |
| talentShow | 1648 | Judge honestly: 33.8% · Everyone wins: 31.3% · Send Dave: 34.9% | 32.3% | 0.0% |
| taxBreak | 5000 | Grant the tax break: 33.6% · Trade it for a donation: 31.5% · Refuse: 34.8% | 30.6% | 0.0% |
| theWhistle | 4828 | Shut down The Whistle: 34.4% · Buy The Whistle: 33.0% · A free press is good: 32.7% | 27.9% | 0.0% |
| timeCapsule | 5000 | Settle with Chad: 33.1% · Bury it again, deeper: 32.5% · Frame the note: 34.4% | 28.4% | 0.0% |
| tvStation | 4986 | Build the station: 34.1% · Lend her the roof: 34.3% · Refuse: 31.7% | 29.8% | 0.0% |
| twinTown | 1175 | Throw a welcome party: 33.2% · Show them the pothole: 33.6% · Lock the gates: 33.1% | 34.2% | 0.0% |

## sensible

Projects built (share of terms): school 76.1%, pond 45.4%, spoon 8.9%, tv 2.9%, casino 0.2%, helicopter 0.2%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 45.0% · Bribe him with cheese: 21.1% · Let Dave handle the audit: 33.9% | 0.0% | 1.6% |
| bankError | 2404 | Keep it quiet: 0.9% · Give it back: 75.9% · Split it with Chad: 23.2% | 0.0% | 8.2% |
| bearStory | 5000 | Yes, I wrestled a bear: 74.0% · Tell the truth: 26.0% | 0.1% | 36.7% |
| billboard | 5000 | Allow the billboard: 62.3% · A small one, round the back: 36.9% · No billboard: 0.8% | 0.0% | 36.3% |
| bridge | 5000 | Repair the bridge: 69.6% · Promise repairs soon: 28.0% · Put up a 'Good Luck' sign: 2.4% | 0.0% | 2.8% |
| buglePress | 5000 | Buy a new press: 80.9% · Use the school copier: 16.8% · Not the town's problem: 2.3% | 0.0% | 5.1% |
| campaign | 2868 | Big rally: 28.0% · Call in every Favor: 7.0% · Attack ad about the cone: 41.4% · Just be yourself: 23.6% | 0.0% | 0.0% |
| campaignTruth | 2132 | 'At least I'm not a goose': 20.7% · Promise a recount: 66.9% · Big rally: 7.8% · Call in every Favor: 4.5% | 0.0% | 0.0% |
| casinoCrime | 12 | Ban Linda from blackjack: 25.0% · Make her head of security: 75.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 53.8% · Launch from your own lawn: 30.5% · No rockets near children: 15.7% | 0.0% | 27.1% |
| cheeseVault | 3782 | Sell it, fast: 36.8% · Throw a cheese festival: 22.9% · Seal the vault: 40.3% | 0.0% | 6.4% |
| coneRally | 5000 | Hold a bigger rally: 58.1% · Debate the cone, live: 38.9% · Have the cone towed: 3.0% | 0.0% | 0.1% |
| crossingGuard | 5000 | Hire a human: 95.2% · Gerald it is: 3.5% · Children can look both ways: 1.2% | 0.0% | 41.5% |
| curfew | 5000 | Curfew at 9 pm: 6.9% · Fund a youth centre: 86.8% · Let them stand: 6.3% | 0.0% | 22.5% |
| diaryLeak | 5000 | Apologise to everyone: 46.3% · Publish the whole diary: 50.2% · Blame the pigeon: 3.5% | 0.0% | 0.0% |
| duckDuel | 1685 | Back Gerald: 56.4% · Back the duck: 34.8% · Stay out of bird politics: 8.8% | 0.0% | 24.0% |
| entitled | 7754 | Free ice cream: 76.6% · Say no nicely: 23.4% | 0.0% | 8.0% |
| evBallots | 3263 | Tell the town: 68.5% · Put the boxes back: 31.5% | 4.6% | 0.0% |
| evBear | 2339 | Apologise to the bear: 45.1% · Wrestle it for real: 54.9% | 8.8% | 0.0% |
| evDebate | 5000 | Debate with facts: 52.1% · Debate with insults: 47.9% | 0.6% | 0.0% |
| evFair | 1737 | Eat for the town: 82.4% · Decline politely: 17.6% | 6.6% | 0.0% |
| evNote | 5000 | Go and look: 45.7% · Burn the note: 54.3% | 10.1% | 0.0% |
| evParade | 5000 | Ride the float anyway: 47.5% · Buy a new float: 52.5% | 0.4% | 0.0% |
| evPower | 2661 | Pay Chad's guy: 70.0% · Hand out candles: 30.0% | 2.1% | 0.0% |
| evStorm | 5000 | Buy sandbags: 50.1% · Ignore Steve: 49.9% | 2.6% | 0.0% |
| farmersMarket | 5000 | Protect the market: 21.6% · Ban the market: 50.8% · Market pays a fee: 27.6% | 0.0% | 18.2% |
| festival | 5000 | Fund Frog Day: 24.1% · Promise Frog Day soon: 48.7% · No Frog Day: 27.2% | 3.9% | 10.5% |
| fireworks | 4048 | Fireworks for Timmy: 56.9% · One sparkler: 41.6% · No fireworks: 1.5% | 0.0% | 31.2% |
| flood | 5000 | Rent the pumps: 52.1% · Rename it 'Little Venice': 43.7% · Wait for it to dry: 4.2% | 0.0% | 0.0% |
| giantSpoon | 2364 | Build the spoon: 30.5% · A normal-sized spoon: 50.9% · No spoon: 18.6% | 0.0% | 38.5% |
| gooseOccupation | 1510 | Pay them off in bread: 86.8% · Send Chief Barb: 13.2% | 0.0% | 8.9% |
| goosePond | 5000 | Build the pond: 49.5% · Pond in the park instead: 32.5% · Refuse: 18.0% | 0.0% | 8.3% |
| gooseStrike | 5000 | Meet their demands: 59.1% · Hire ducks instead: 37.4% · Wait them out: 3.5% | 0.0% | 2.0% |
| haunted | 5000 | Fund the ghost hunt: 65.0% · Seal the basement: 20.7% · There's nothing down there: 14.4% | 0.0% | 38.3% |
| heatwave | 5000 | Fix the pool: 46.4% · Sprinklers on Main Street: 40.9% · Tell them to drink water: 12.8% | 1.5% | 59.7% |
| helicopter | 5000 | Buy it: 10.1% · Lease one: 52.3% · Promise it next quarter: 37.6% | 5.3% | 92.5% |
| lakeMonster | 841 | Put it on the brochure: 54.8% · Protect its privacy: 34.7% · There is no monster: 10.5% | 0.8% | 25.4% |
| libraryCasino | 564 | Build the casino: 6.5% · Refuse: 43.5% · Casino night, once a year: 50.0% | 3.5% | 63.8% |
| mallParking | 5000 | Pave the park: 76.6% · Only half the park: 22.0% · Hands off the park: 1.4% | 0.0% | 12.8% |
| mascot | 2438 | Welcome, Wet Sock: 82.3% · Hire a real designer: 13.2% · No mascot: 4.5% | 1.5% | 18.3% |
| mimeStrike | 5000 | Notice them, with a banner: 69.6% · Negotiate in mime: 27.2% · Ignore the mimes: 3.2% | 0.0% | 7.8% |
| monsterPta | 340 | Welcome the monster: 77.7% · Monsters can't be parents: 22.3% | 0.0% | 11.8% |
| moonClaim | 2469 | Plant the flag: 37.4% · Sell the moon to Chad: 38.3% · Give the moon back: 24.2% | 0.0% | 49.7% |
| moonRent | 465 | Pay the moonlight bill: 73.7% · Charge him for the view: 26.3% | 0.0% | 1.1% |
| newSchool | 5000 | Build a new school: 76.1% · Promise it by spring: 14.0% · Buy a second book: 9.9% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 13.6% · Let her run a 'truth club': 83.4% · Libraries close at five: 2.9% | 0.4% | 45.0% |
| parkingMeters | 5000 | Install meters: 0.4% · Meters for visitors only: 7.4% · Free parking forever: 92.2% | 0.1% | 12.0% |
| parkWifi | 5000 | Free park wifi: 16.7% · Wifi with Chad's ads: 63.6% · Go outside and play: 19.7% | 0.1% | 68.1% |
| pettyCrime | 24067 | Pay for overtime: 70.6% · Blame the next town over: 29.4% | 0.0% | 1.4% |
| pigeonAide | 5000 | Hire the pigeon: 66.4% · Let it sign today's stack: 13.5% · Evict the pigeon: 20.1% | 0.1% | 24.4% |
| policeDog | 5000 | Buy a braver dog: 9.8% · Therapy for the old dog: 87.4% · One scared dog is plenty: 2.8% | 2.2% | 32.4% |
| raccoonBins | 5000 | Raccoon-proof bins: 71.4% · Night patrols: 20.9% · They live here too: 7.7% | 0.3% | 57.6% |
| radar | 1013 | Buy the radar: 63.9% · Promise it next quarter: 29.3% · The finger is fine: 6.8% | 1.1% | 63.9% |
| rocketLibrary | 1961 | Rebuild the library: 87.5% · Leave the rocket in: 12.5% | 0.0% | 0.0% |
| roundabout | 5000 | Rescue the drivers: 44.6% · Sell tickets to watch: 43.9% · It's working as intended: 11.5% | 0.0% | 3.6% |
| scandal | 31 | Own it: 65.5% · Bury the story: 34.5% | 0.0% | 6.5% |
| schoolLunch | 1156 | Pay for real food: 48.1% · Chad sponsors lunch: 45.4% · Paste builds character: 6.5% | 0.0% | 2.2% |
| secretStranger | 2132 | Expose him in The Bugle: 94.9% · Take his hush money: 5.1% | 0.1% | 1.9% |
| speedTrap | 5000 | Approve the speed trap: 12.9% · Warning signs only: 50.0% · No speed trap: 37.1% | 2.1% | 31.2% |
| statue | 5000 | Accept the statue: 20.3% · A statue of someone normal: 75.0% · No statues: 4.8% | 0.0% | 49.5% |
| strangerPrice | 5000 | Name a silly price: 53.6% · Throw him out: 36.1% · Hear him out: 10.3% | 0.2% | 45.9% |
| talentShow | 2847 | Judge honestly: 20.7% · Everyone wins: 36.4% · Send Dave: 42.9% | 0.0% | 2.1% |
| taxBreak | 5000 | Grant the tax break: 38.5% · Trade it for a donation: 56.9% · Refuse: 4.6% | 0.6% | 44.1% |
| theWhistle | 5000 | Shut down The Whistle: 30.4% · Buy The Whistle: 44.9% · A free press is good: 24.7% | 1.2% | 53.0% |
| timeCapsule | 5000 | Settle with Chad: 78.3% · Bury it again, deeper: 13.2% · Frame the note: 8.4% | 0.0% | 10.9% |
| tvStation | 5000 | Build the station: 12.3% · Lend her the roof: 83.6% · Refuse: 4.1% | 0.0% | 76.2% |
| twinTown | 1117 | Throw a welcome party: 78.8% · Show them the pothole: 18.5% · Lock the gates: 2.7% | 0.0% | 4.3% |
