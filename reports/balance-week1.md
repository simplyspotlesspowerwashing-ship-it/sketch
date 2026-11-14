# Balance report: pack `week1`

5000 terms per policy. Tuning: {"people":0.5,"press":0.2,"business":0.1,"law":0.1,"objective":2,"brokenPromise":-4,"min":5,"max":95}.

| Policy | Win rate | Target | Mean vote | Vote p10 / p50 / p90 | Recalled | Bankrupt | Term ended early | Ending money $k p10 / p50 / p90 |
|---|---|---|---|---|---|---|---|---|
| random | 0.0% | on target | 15.3 | 8 / 15 / 21 | 99.9% | 7.5% | 77.0% | 0 / 20 / 20 |
| greedy-approval | 6.8% |  | 27.8 | 19 / 23 / 47 | 100.0% | 97.0% | 70.7% | -45 / 20 / 20 |
| miser | 0.0% |  | 17.0 | 17 / 17 / 17 | 100.0% | 0.0% | 100.0% | 20 / 20 / 20 |
| people-pleaser | 0.4% |  | 20.3 | 15 / 21 / 23 | 100.0% | 93.1% | 93.8% | 0 / 20 / 20 |
| dave-only | 0.0% | **off target** (5-10%) | 16.2 | 12 / 17 / 19 | 100.0% | 10.7% | 88.2% | 0 / 20 / 20 |
| sensible | 55.1% | on target | 51.0 | 33 / 51 / 69 | 12.2% | 2.4% | 0.0% | -22 / 7 / 32 |
| | | recalls on target (under 25%) | | | | | | |

## Non-dilemmas and other flags (sensible bot)

- `billboard`: "No billboard" chosen 1% of the time (under 5%)
- `bridge`: "Put up a 'Good Luck' sign" chosen 5% of the time (under 5%)
- `campaignTruth`: "Big rally" chosen 2% of the time (under 5%)
- `coneRally`: "Have the cone towed" chosen 3% of the time (under 5%)
- `crossingGuard`: "Children can look both ways" chosen 3% of the time (under 5%)
- `flood`: "Wait for it to dry" chosen 4% of the time (under 5%)
- `gooseStrike`: "Wait them out" chosen 3% of the time (under 5%)
- `helicopter`: "Buy it" chosen 1% of the time (under 5%)
- `mimeStrike`: "Ignore the mimes" chosen 3% of the time (under 5%)
- `monsterPta`: "Welcome the monster" chosen 90% of the time (over 85%)
- `opera`: "Ban the opera" chosen 2% of the time (under 5%)
- `parkingMeters`: "Install meters" chosen 1% of the time (under 5%)
- `parkingMeters`: "Free parking forever" chosen 87% of the time (over 85%)
- `secretStranger`: "Expose him in The Bugle" chosen 89% of the time (over 85%)
- `twinTown`: "Lock the gates" chosen 3% of the time (under 5%)

## Unreachable desk cards (never drawn by any policy)

- `libraryCasino`
- `taxBreak`
- `pothole`
- `schoolLunch`
- `fireworks`
- `nightLibrary`
- `mallParking`
- `speedTrap`
- `mascot`
- `bankError`
- `strangerPrice`
- `policeDog`
- `heatwave`
- `theWhistle`
- `duckDuel`
- `pigeonAide`
- `casinoCrime`
- `buyout`
- `overreach`
- `goldenGoose`

## random

Projects built (share of terms): pond 34.5%, school 33.3%, helicopter 23.7%, spoon 16.6%, tv 8.8%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 4996 | Open the books: 34.7% · Bribe him with cheese: 30.2% · Let Dave handle the audit: 35.1% | 0.0% | 0.0% |
| bearStory | 4828 | Yes, I wrestled a bear: 50.1% · Tell the truth: 49.9% | 0.0% | 0.0% |
| billboard | 4998 | Allow the billboard: 33.0% · A small one, round the back: 33.3% · No billboard: 33.7% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 34.0% · Promise repairs soon: 32.0% · Put up a 'Good Luck' sign: 34.0% | 0.0% | 0.0% |
| buglePress | 3248 | Buy a new press: 33.8% · Use the school copier: 33.8% · Not the town's problem: 32.4% | 0.0% | 0.0% |
| campaign | 936 | Big rally: 26.0% · Call in every Favor: 10.5% · Attack ad about the cone: 32.2% · Just be yourself: 31.4% | 0.0% | 0.0% |
| campaignTruth | 214 | 'At least I'm not a goose': 30.4% · Promise a recount: 31.3% · Big rally: 26.2% · Call in every Favor: 12.1% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 35.0% · Launch from your own lawn: 32.4% · No rockets near children: 32.5% | 0.0% | 0.0% |
| cheeseVault | 2776 | Sell it, fast: 33.9% · Throw a cheese festival: 31.9% · Seal the vault: 34.3% | 0.0% | 0.0% |
| coneRally | 2294 | Hold a bigger rally: 30.6% · Debate the cone, live: 35.0% · Have the cone towed: 34.4% | 0.0% | 0.0% |
| crossingGuard | 2264 | Hire a human: 32.9% · Gerald it is: 33.6% · Children can look both ways: 33.6% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 33.8% · Fund a youth centre: 34.5% · Let them stand: 31.8% | 0.0% | 0.0% |
| diaryLeak | 3822 | Apologise to everyone: 34.9% · Publish the whole diary: 32.3% · Blame the pigeon: 32.8% | 0.0% | 0.0% |
| entitled | 11 | Free ice cream: 54.5% · Say no nicely: 45.5% | 0.0% | 0.0% |
| evBallots | 1896 | Tell the town: 51.0% · Put the boxes back: 49.0% | 46.1% | 0.0% |
| evBear | 2281 | Apologise to the bear: 49.9% · Wrestle it for real: 50.1% | 46.3% | 0.0% |
| evDebate | 1987 | Debate with facts: 51.1% · Debate with insults: 48.9% | 46.9% | 0.0% |
| evFair | 1702 | Eat for the town: 47.6% · Decline politely: 52.4% | 46.3% | 0.0% |
| evNote | 4977 | Go and look: 52.0% · Burn the note: 48.0% | 47.5% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.8% · Buy a new float: 49.2% | 47.3% | 0.0% |
| evPower | 2277 | Pay Chad's guy: 51.3% · Hand out candles: 48.7% | 47.6% | 0.0% |
| evStorm | 5000 | Buy sandbags: 50.5% · Ignore Steve: 49.5% | 47.0% | 0.0% |
| farmersMarket | 4528 | Protect the market: 36.5% · Ban the market: 38.2% · Market pays a fee: 25.3% | 0.0% | 0.0% |
| festival | 2775 | Fund Frog Day: 32.5% · Promise Frog Day soon: 34.3% · No Frog Day: 33.2% | 0.0% | 0.0% |
| flood | 4740 | Rent the pumps: 31.6% · Rename it 'Little Venice': 34.8% · Wait for it to dry: 33.7% | 0.0% | 0.0% |
| giantSpoon | 2541 | Build the spoon: 32.7% · A normal-sized spoon: 33.4% · No spoon: 33.9% | 0.0% | 0.0% |
| gooseOccupation | 2192 | Pay them off in bread: 51.5% · Send Chief Barb: 48.5% | 0.0% | 0.0% |
| goosePond | 4998 | Build the pond: 34.5% · Pond in the park instead: 30.3% · Refuse: 35.2% | 0.0% | 0.0% |
| gooseStrike | 4969 | Meet their demands: 33.5% · Hire ducks instead: 33.8% · Wait them out: 32.7% | 0.0% | 0.0% |
| haunted | 5000 | Fund the ghost hunt: 35.1% · Seal the basement: 33.0% · There's nothing down there: 31.9% | 0.0% | 0.0% |
| helicopter | 3983 | Buy it: 29.8% · Lease one: 34.4% · Promise it next quarter: 35.8% | 0.0% | 0.0% |
| lakeMonster | 918 | Put it on the brochure: 31.2% · Protect its privacy: 31.2% · There is no monster: 37.7% | 0.0% | 0.0% |
| mimeStrike | 3910 | Notice them, with a banner: 33.2% · Negotiate in mime: 34.0% · Ignore the mimes: 32.8% | 0.0% | 0.0% |
| monsterPta | 152 | Welcome the monster: 56.6% · Monsters can't be parents: 43.4% | 0.0% | 0.0% |
| moonClaim | 5000 | Plant the flag: 32.2% · Sell the moon to Chad: 34.3% · Give the moon back: 33.5% | 0.0% | 0.0% |
| moonRent | 1610 | Pay the moonlight bill: 49.4% · Charge him for the view: 50.6% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 33.3% · Promise it by spring: 33.1% · Buy a second book: 33.6% | 0.0% | 0.0% |
| opera | 3034 | Attend and applaud: 34.6% · Pay for rewrites: 32.8% · Ban the opera: 32.6% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 32.2% · Meters for visitors only: 33.4% · Free parking forever: 34.3% | 0.0% | 0.0% |
| parkWifi | 1800 | Free park wifi: 29.9% · Wifi with Chad's ads: 35.3% · Go outside and play: 34.8% | 0.0% | 0.0% |
| pettyCrime | 10428 | Pay for overtime: 47.3% · Blame the next town over: 52.7% | 0.0% | 0.0% |
| raccoonBins | 5000 | Raccoon-proof bins: 33.4% · Night patrols: 33.8% · They live here too: 32.8% | 0.0% | 0.0% |
| radar | 2742 | Buy the radar: 32.5% · Promise it next quarter: 33.7% · The finger is fine: 33.8% | 0.0% | 0.0% |
| rocketLibrary | 1752 | Rebuild the library: 48.6% · Leave the rocket in: 51.4% | 0.0% | 0.0% |
| roundabout | 2967 | Rescue the drivers: 37.8% · Sell tickets to watch: 23.2% · It's working as intended: 39.0% | 0.0% | 0.0% |
| scandal | 1 | Own it: 100.0% · Bury the story: 0.0% | 0.0% | 0.0% |
| secretStranger | 471 | Expose him in The Bugle: 49.0% · Take his hush money: 51.0% | 0.0% | 0.0% |
| snowplow | 3527 | Plow the school road: 34.2% · Plow Chad Street: 33.7% · Rent a second plow: 32.1% | 0.0% | 0.0% |
| squirrelLoan | 592 | Repossess the acorns: 33.1% · Forgive the loan: 34.3% · Send Dave to collect: 32.6% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 34.2% · A statue of someone normal: 33.0% · No statues: 32.8% | 0.0% | 0.0% |
| talentShow | 4977 | Judge honestly: 32.9% · Everyone wins: 34.8% · Send Dave: 32.3% | 0.0% | 0.0% |
| timeCapsule | 4389 | Settle with Chad: 32.8% · Bury it again, deeper: 33.7% · Frame the note: 33.5% | 0.0% | 0.0% |
| tvStation | 1510 | Build the station: 29.2% · Lend her the roof: 36.5% · Refuse: 34.3% | 0.0% | 0.0% |
| twinTown | 1479 | Throw a welcome party: 29.0% · Show them the pothole: 35.8% · Lock the gates: 35.2% | 0.0% | 0.0% |

## greedy-approval

Projects built (share of terms): school 100.0%, pond 74.8%, helicopter 32.7%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 100.0% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 0.0% | 0.0% | 0.0% |
| bearStory | 5000 | Yes, I wrestled a bear: 100.0% · Tell the truth: 0.0% | 0.0% | 0.0% |
| billboard | 5000 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 93.9% · Promise repairs soon: 6.1% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| campaignTruth | 1467 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| cheeseVault | 3047 | Sell it, fast: 33.5% · Throw a cheese festival: 66.5% · Seal the vault: 0.0% | 0.0% | 0.0% |
| coneRally | 2419 | Hold a bigger rally: 57.9% · Debate the cone, live: 42.1% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| crossingGuard | 3953 | Hire a human: 91.7% · Gerald it is: 8.3% · Children can look both ways: 0.0% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 0.0% · Fund a youth centre: 100.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 4625 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| entitled | 661 | Free ice cream: 37.7% · Say no nicely: 62.3% | 0.0% | 0.0% |
| evBallots | 4446 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evBear | 4996 | Apologise to the bear: 24.2% · Wrestle it for real: 75.8% | 0.0% | 0.0% |
| evDebate | 2198 | Debate with facts: 100.0% · Debate with insults: 0.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| farmersMarket | 4996 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| festival | 3750 | Fund Frog Day: 67.4% · Promise Frog Day soon: 32.6% · No Frog Day: 0.0% | 0.0% | 0.0% |
| flood | 5000 | Rent the pumps: 56.1% · Rename it 'Little Venice': 43.9% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| gooseOccupation | 674 | Pay them off in bread: 66.8% · Send Chief Barb: 33.2% | 0.0% | 0.0% |
| goosePond | 5000 | Build the pond: 74.8% · Pond in the park instead: 15.3% · Refuse: 9.9% | 0.0% | 0.0% |
| gooseStrike | 5000 | Meet their demands: 84.1% · Hire ducks instead: 11.5% · Wait them out: 4.4% | 0.0% | 0.0% |
| haunted | 5000 | Fund the ghost hunt: 100.0% · Seal the basement: 0.0% · There's nothing down there: 0.0% | 0.0% | 0.0% |
| helicopter | 4914 | Buy it: 33.3% · Lease one: 66.7% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| lakeMonster | 1145 | Put it on the brochure: 82.7% · Protect its privacy: 17.3% · There is no monster: 0.0% | 0.0% | 0.0% |
| mimeStrike | 4793 | Notice them, with a banner: 100.0% · Negotiate in mime: 0.0% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| monsterPta | 767 | Welcome the monster: 100.0% · Monsters can't be parents: 0.0% | 0.0% | 0.0% |
| moonClaim | 5000 | Plant the flag: 100.0% · Sell the moon to Chad: 0.0% · Give the moon back: 0.0% | 0.0% | 0.0% |
| moonRent | 5000 | Pay the moonlight bill: 52.0% · Charge him for the view: 48.0% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 100.0% · Promise it by spring: 0.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| opera | 4598 | Attend and applaud: 11.7% · Pay for rewrites: 88.3% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 2150 | Free park wifi: 38.0% · Wifi with Chad's ads: 62.0% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 8336 | Pay for overtime: 51.2% · Blame the next town over: 48.8% | 0.0% | 0.0% |
| raccoonBins | 5000 | Raccoon-proof bins: 69.5% · Night patrols: 30.5% · They live here too: 0.0% | 0.0% | 0.0% |
| radar | 2449 | Buy the radar: 76.4% · Promise it next quarter: 23.6% · The finger is fine: 0.0% | 0.0% | 0.0% |
| rocketLibrary | 5000 | Rebuild the library: 100.0% · Leave the rocket in: 0.0% | 0.0% | 0.0% |
| roundabout | 2297 | Rescue the drivers: 62.9% · Sell tickets to watch: 37.1% · It's working as intended: 0.0% | 0.0% | 0.0% |
| scandal | 147 | Own it: 100.0% · Bury the story: 0.0% | 0.0% | 0.0% |
| secretStranger | 3734 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| snowplow | 4227 | Plow the school road: 59.6% · Plow Chad Street: 0.0% · Rent a second plow: 40.4% | 0.0% | 0.0% |
| squirrelLoan | 271 | Repossess the acorns: 56.1% · Forgive the loan: 43.9% · Send Dave to collect: 0.0% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 0.0% · A statue of someone normal: 100.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 5000 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| timeCapsule | 4915 | Settle with Chad: 60.0% · Bury it again, deeper: 0.0% · Frame the note: 40.0% | 0.0% | 0.0% |
| twinTown | 1270 | Throw a welcome party: 18.1% · Show them the pothole: 81.9% · Lock the gates: 0.0% | 0.0% | 0.0% |

## miser

Projects built (share of terms): spoon 99.6%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 4155 | Open the books: 0.0% · Bribe him with cheese: 100.0% · Let Dave handle the audit: 0.0% | 0.0% | 0.0% |
| bearStory | 14 | Yes, I wrestled a bear: 100.0% · Tell the truth: 0.0% | 0.0% | 0.0% |
| billboard | 4155 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 0.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 100.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 100.0% · Fund a youth centre: 0.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| evBear | 1 | Apologise to the bear: - · Wrestle it for real: - | 100.0% | 0.0% |
| evNote | 3999 | Go and look: - · Burn the note: - | 100.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: - · Buy a new float: - | 100.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: - · Ignore Steve: - | 100.0% | 0.0% |
| farmersMarket | 1 | Protect the market: 0.0% · Ban the market: 0.0% · Market pays a fee: 100.0% | 0.0% | 0.0% |
| flood | 4 | Rent the pumps: 0.0% · Rename it 'Little Venice': 100.0% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| giantSpoon | 4978 | Build the spoon: 100.0% · A normal-sized spoon: 0.0% · No spoon: 0.0% | 0.0% | 0.0% |
| gooseOccupation | 903 | Pay them off in bread: 0.0% · Send Chief Barb: 100.0% | 0.0% | 0.0% |
| goosePond | 4820 | Build the pond: 0.0% · Pond in the park instead: 0.0% · Refuse: 100.0% | 0.0% | 0.0% |
| gooseStrike | 1978 | Meet their demands: 0.0% · Hire ducks instead: 0.0% · Wait them out: 100.0% | 0.0% | 0.0% |
| haunted | 5000 | Fund the ghost hunt: 0.0% · Seal the basement: 0.0% · There's nothing down there: 100.0% | 0.0% | 0.0% |
| mimeStrike | 5000 | Notice them, with a banner: 0.0% · Negotiate in mime: 100.0% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 5000 | Plant the flag: 0.0% · Sell the moon to Chad: 100.0% · Give the moon back: 0.0% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 0.0% · Promise it by spring: 0.0% · Buy a second book: 100.0% | 0.0% | 0.0% |
| opera | 14 | Attend and applaud: 100.0% · Pay for rewrites: 0.0% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 100.0% · Meters for visitors only: 0.0% · Free parking forever: 0.0% | 0.0% | 0.0% |
| pettyCrime | 22 | Pay for overtime: 0.0% · Blame the next town over: 100.0% | 0.0% | 0.0% |
| raccoonBins | 5000 | Raccoon-proof bins: 0.0% · Night patrols: 100.0% · They live here too: 0.0% | 0.0% | 0.0% |
| radar | 1 | Buy the radar: 0.0% · Promise it next quarter: 0.0% · The finger is fine: 100.0% | 0.0% | 0.0% |
| rocketLibrary | 5000 | Rebuild the library: 0.0% · Leave the rocket in: 100.0% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 100.0% · A statue of someone normal: 0.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 3441 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| timeCapsule | 1 | Settle with Chad: 0.0% · Bury it again, deeper: 100.0% · Frame the note: 0.0% | 0.0% | 0.0% |

## people-pleaser

Projects built (share of terms): school 100.0%, pond 78.6%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 100.0% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 0.0% | 0.0% | 0.0% |
| bearStory | 4984 | Yes, I wrestled a bear: 0.0% · Tell the truth: 100.0% | 0.0% | 0.0% |
| billboard | 5000 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 59.9% · Promise repairs soon: 40.1% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| buglePress | 5000 | Buy a new press: 100.0% · Use the school copier: 0.0% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| campaignTruth | 309 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 0.0% · Launch from your own lawn: 100.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| cheeseVault | 2288 | Sell it, fast: 48.0% · Throw a cheese festival: 52.0% · Seal the vault: 0.0% | 0.0% | 0.0% |
| coneRally | 1595 | Hold a bigger rally: 53.9% · Debate the cone, live: 46.1% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| crossingGuard | 4314 | Hire a human: 90.4% · Gerald it is: 9.6% · Children can look both ways: 0.0% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 0.0% · Fund a youth centre: 100.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 3992 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| entitled | 2357 | Free ice cream: 82.2% · Say no nicely: 17.8% | 0.0% | 0.0% |
| evBallots | 3694 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evDebate | 1393 | Debate with facts: 0.0% · Debate with insults: 100.0% | 0.0% | 0.0% |
| evNote | 4984 | Go and look: - · Burn the note: - | 100.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 4830 | Pay Chad's guy: 83.0% · Hand out candles: 17.0% | 6.1% | 0.0% |
| evStorm | 5000 | Buy sandbags: 97.6% · Ignore Steve: 2.4% | 0.0% | 0.0% |
| farmersMarket | 4821 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| festival | 4027 | Fund Frog Day: 67.2% · Promise Frog Day soon: 32.8% · No Frog Day: 0.0% | 0.0% | 0.0% |
| flood | 4927 | Rent the pumps: 58.4% · Rename it 'Little Venice': 41.6% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| gooseOccupation | 649 | Pay them off in bread: 63.6% · Send Chief Barb: 36.4% | 0.0% | 0.0% |
| goosePond | 5000 | Build the pond: 78.6% · Pond in the park instead: 11.8% · Refuse: 9.5% | 0.0% | 0.0% |
| gooseStrike | 4984 | Meet their demands: 84.9% · Hire ducks instead: 7.7% · Wait them out: 7.5% | 0.0% | 0.0% |
| haunted | 5000 | Fund the ghost hunt: 100.0% · Seal the basement: 0.0% · There's nothing down there: 0.0% | 0.0% | 0.0% |
| helicopter | 4230 | Buy it: 0.0% · Lease one: 100.0% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| lakeMonster | 734 | Put it on the brochure: 0.0% · Protect its privacy: 100.0% · There is no monster: 0.0% | 0.0% | 0.0% |
| mimeStrike | 3291 | Notice them, with a banner: 100.0% · Negotiate in mime: 0.0% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 5000 | Plant the flag: 100.0% · Sell the moon to Chad: 0.0% · Give the moon back: 0.0% | 0.0% | 0.0% |
| moonRent | 5000 | Pay the moonlight bill: 43.3% · Charge him for the view: 56.7% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 100.0% · Promise it by spring: 0.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| opera | 4633 | Attend and applaud: 0.0% · Pay for rewrites: 80.5% · Ban the opera: 19.5% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 1012 | Free park wifi: 20.8% · Wifi with Chad's ads: 79.2% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 4563 | Pay for overtime: 58.8% · Blame the next town over: 41.2% | 0.0% | 0.0% |
| raccoonBins | 5000 | Raccoon-proof bins: 61.9% · Night patrols: 0.0% · They live here too: 38.1% | 0.0% | 0.0% |
| radar | 4228 | Buy the radar: 62.9% · Promise it next quarter: 37.1% · The finger is fine: 0.0% | 0.0% | 0.0% |
| roundabout | 423 | Rescue the drivers: 63.6% · Sell tickets to watch: 31.7% · It's working as intended: 4.7% | 0.0% | 0.0% |
| secretStranger | 3100 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| snowplow | 3531 | Plow the school road: 100.0% · Plow Chad Street: 0.0% · Rent a second plow: 0.0% | 0.0% | 0.0% |
| squirrelLoan | 185 | Repossess the acorns: 0.0% · Forgive the loan: 36.2% · Send Dave to collect: 63.8% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 0.0% · A statue of someone normal: 100.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 4984 | Judge honestly: 0.0% · Everyone wins: 98.9% · Send Dave: 1.1% | 0.0% | 0.0% |
| timeCapsule | 4652 | Settle with Chad: 69.4% · Bury it again, deeper: 0.0% · Frame the note: 30.6% | 0.0% | 0.0% |
| twinTown | 598 | Throw a welcome party: 14.2% · Show them the pothole: 85.8% · Lock the gates: 0.0% | 0.0% | 0.0% |

## dave-only

Projects built (share of terms): pond 34.5%, school 33.3%, helicopter 22.4%, spoon 16.5%, tv 8.0%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 4994 | Open the books: 35.6% · Bribe him with cheese: 28.6% · Let Dave handle the audit: 35.9% | 0.0% | 0.0% |
| bearStory | 4825 | Yes, I wrestled a bear: 50.7% · Tell the truth: 49.3% | 0.0% | 0.0% |
| billboard | 4996 | Allow the billboard: 33.2% · A small one, round the back: 33.8% · No billboard: 33.0% | 0.0% | 0.0% |
| bridge | 4999 | Repair the bridge: 33.3% · Promise repairs soon: 33.9% · Put up a 'Good Luck' sign: 32.7% | 0.0% | 0.0% |
| buglePress | 3330 | Buy a new press: 33.5% · Use the school copier: 33.4% · Not the town's problem: 33.1% | 0.0% | 0.0% |
| campaign | 487 | Big rally: 0.0% · Call in every Favor: 0.0% · Attack ad about the cone: 0.0% · Just be yourself: 100.0% | 0.0% | 0.0% |
| campaignTruth | 102 | 'At least I'm not a goose': 0.0% · Promise a recount: 9.8% · Big rally: 52.0% · Call in every Favor: 38.2% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 33.4% · Launch from your own lawn: 33.8% · No rockets near children: 32.8% | 0.0% | 0.0% |
| cheeseVault | 2200 | Sell it, fast: 34.1% · Throw a cheese festival: 31.1% · Seal the vault: 34.8% | 0.0% | 0.0% |
| coneRally | 1667 | Hold a bigger rally: 26.7% · Debate the cone, live: 35.3% · Have the cone towed: 38.0% | 0.0% | 0.0% |
| crossingGuard | 2440 | Hire a human: 32.9% · Gerald it is: 35.2% · Children can look both ways: 31.8% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 32.5% · Fund a youth centre: 33.7% · Let them stand: 33.7% | 0.0% | 0.0% |
| diaryLeak | 3543 | Apologise to everyone: 35.0% · Publish the whole diary: 32.0% · Blame the pigeon: 33.1% | 0.0% | 0.0% |
| entitled | 4 | Free ice cream: 0.0% · Say no nicely: 100.0% | 0.0% | 0.0% |
| evBallots | 1626 | Tell the town: 51.9% · Put the boxes back: 48.1% | 50.3% | 0.0% |
| evBear | 2295 | Apologise to the bear: 51.2% · Wrestle it for real: 48.8% | 48.5% | 0.0% |
| evDebate | 1372 | Debate with facts: 52.6% · Debate with insults: 47.4% | 50.7% | 0.0% |
| evFair | 1574 | Eat for the town: 48.2% · Decline politely: 51.8% | 49.7% | 0.0% |
| evNote | 4976 | Go and look: 49.3% · Burn the note: 50.7% | 48.4% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.5% · Buy a new float: 49.5% | 49.5% | 0.0% |
| evPower | 2177 | Pay Chad's guy: 47.5% · Hand out candles: 52.5% | 50.3% | 0.0% |
| evStorm | 5000 | Buy sandbags: 48.6% · Ignore Steve: 51.4% | 49.7% | 0.0% |
| farmersMarket | 4438 | Protect the market: 37.2% · Ban the market: 37.4% · Market pays a fee: 25.4% | 0.0% | 0.0% |
| festival | 2766 | Fund Frog Day: 30.1% · Promise Frog Day soon: 33.7% · No Frog Day: 36.2% | 0.0% | 0.0% |
| flood | 4681 | Rent the pumps: 29.4% · Rename it 'Little Venice': 34.7% · Wait for it to dry: 35.9% | 0.0% | 0.0% |
| giantSpoon | 2426 | Build the spoon: 34.0% · A normal-sized spoon: 32.6% · No spoon: 33.3% | 0.0% | 0.0% |
| gooseOccupation | 2171 | Pay them off in bread: 45.9% · Send Chief Barb: 54.1% | 0.0% | 0.0% |
| goosePond | 4997 | Build the pond: 34.5% · Pond in the park instead: 31.0% · Refuse: 34.5% | 0.0% | 0.0% |
| gooseStrike | 4969 | Meet their demands: 32.8% · Hire ducks instead: 32.9% · Wait them out: 34.3% | 0.0% | 0.0% |
| haunted | 5000 | Fund the ghost hunt: 32.0% · Seal the basement: 34.4% · There's nothing down there: 33.6% | 0.0% | 0.0% |
| helicopter | 3758 | Buy it: 29.9% · Lease one: 34.8% · Promise it next quarter: 35.3% | 0.0% | 0.0% |
| lakeMonster | 598 | Put it on the brochure: 32.6% · Protect its privacy: 34.6% · There is no monster: 32.8% | 0.0% | 0.0% |
| mimeStrike | 3740 | Notice them, with a banner: 33.4% · Negotiate in mime: 33.0% · Ignore the mimes: 33.6% | 0.0% | 0.0% |
| monsterPta | 80 | Welcome the monster: 51.3% · Monsters can't be parents: 48.8% | 0.0% | 0.0% |
| moonClaim | 5000 | Plant the flag: 32.6% · Sell the moon to Chad: 34.1% · Give the moon back: 33.3% | 0.0% | 0.0% |
| moonRent | 1632 | Pay the moonlight bill: 51.7% · Charge him for the view: 48.3% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 33.3% · Promise it by spring: 33.4% · Buy a second book: 33.3% | 0.0% | 0.0% |
| opera | 2961 | Attend and applaud: 34.7% · Pay for rewrites: 32.9% · Ban the opera: 32.4% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 33.8% · Meters for visitors only: 32.8% · Free parking forever: 33.4% | 0.0% | 0.0% |
| parkWifi | 1214 | Free park wifi: 28.7% · Wifi with Chad's ads: 36.2% · Go outside and play: 35.0% | 0.0% | 0.0% |
| pettyCrime | 9261 | Pay for overtime: 45.6% · Blame the next town over: 54.4% | 0.0% | 0.0% |
| raccoonBins | 4999 | Raccoon-proof bins: 33.5% · Night patrols: 33.1% · They live here too: 33.4% | 0.0% | 0.0% |
| radar | 2816 | Buy the radar: 32.8% · Promise it next quarter: 34.0% · The finger is fine: 33.2% | 0.0% | 0.0% |
| rocketLibrary | 1670 | Rebuild the library: 50.7% · Leave the rocket in: 49.3% | 0.0% | 0.0% |
| roundabout | 2575 | Rescue the drivers: 37.6% · Sell tickets to watch: 21.3% · It's working as intended: 41.1% | 0.0% | 0.0% |
| secretStranger | 365 | Expose him in The Bugle: 51.8% · Take his hush money: 48.2% | 0.0% | 0.0% |
| snowplow | 3115 | Plow the school road: 35.6% · Plow Chad Street: 33.5% · Rent a second plow: 30.9% | 0.0% | 0.0% |
| squirrelLoan | 283 | Repossess the acorns: 34.3% · Forgive the loan: 32.2% · Send Dave to collect: 33.6% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 33.1% · A statue of someone normal: 33.3% · No statues: 33.7% | 0.0% | 0.0% |
| talentShow | 4974 | Judge honestly: 31.9% · Everyone wins: 33.6% · Send Dave: 34.5% | 0.0% | 0.0% |
| timeCapsule | 4269 | Settle with Chad: 31.8% · Bury it again, deeper: 34.5% · Frame the note: 33.7% | 0.0% | 0.0% |
| tvStation | 1322 | Build the station: 30.1% · Lend her the roof: 36.1% · Refuse: 33.8% | 0.0% | 0.0% |
| twinTown | 910 | Throw a welcome party: 26.8% · Show them the pothole: 37.6% · Lock the gates: 35.6% | 0.0% | 0.0% |

## sensible

Projects built (share of terms): pond 52.3%, school 45.6%, spoon 16.5%, tv 1.6%, helicopter 0.9%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 27.1% · Bribe him with cheese: 23.4% · Let Dave handle the audit: 49.5% | 0.0% | 0.0% |
| bearStory | 5000 | Yes, I wrestled a bear: 57.1% · Tell the truth: 42.9% | 0.0% | 0.0% |
| billboard | 5000 | Allow the billboard: 61.1% · A small one, round the back: 37.7% · No billboard: 1.3% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 67.7% · Promise repairs soon: 27.4% · Put up a 'Good Luck' sign: 4.9% | 0.0% | 0.0% |
| buglePress | 2383 | Buy a new press: 70.9% · Use the school copier: 22.9% · Not the town's problem: 6.2% | 0.0% | 0.0% |
| campaign | 2011 | Big rally: 7.0% · Call in every Favor: 34.6% · Attack ad about the cone: 30.4% · Just be yourself: 28.1% | 0.0% | 0.0% |
| campaignTruth | 2989 | 'At least I'm not a goose': 13.6% · Promise a recount: 73.2% · Big rally: 1.6% · Call in every Favor: 11.5% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 52.3% · Launch from your own lawn: 33.6% · No rockets near children: 14.1% | 0.0% | 0.0% |
| cheeseVault | 5000 | Sell it, fast: 27.2% · Throw a cheese festival: 35.6% · Seal the vault: 37.2% | 0.0% | 0.0% |
| coneRally | 5000 | Hold a bigger rally: 56.8% · Debate the cone, live: 40.2% · Have the cone towed: 2.9% | 0.0% | 0.0% |
| crossingGuard | 3184 | Hire a human: 83.8% · Gerald it is: 13.7% · Children can look both ways: 2.6% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 6.0% · Fund a youth centre: 80.0% · Let them stand: 14.0% | 0.0% | 0.0% |
| diaryLeak | 5000 | Apologise to everyone: 62.2% · Publish the whole diary: 32.5% · Blame the pigeon: 5.4% | 0.0% | 0.0% |
| entitled | 800 | Free ice cream: 71.3% · Say no nicely: 28.8% | 0.0% | 0.0% |
| evBallots | 4430 | Tell the town: 70.3% · Put the boxes back: 29.7% | 4.0% | 0.0% |
| evBear | 2856 | Apologise to the bear: 67.4% · Wrestle it for real: 32.6% | 8.4% | 0.0% |
| evDebate | 5000 | Debate with facts: 43.8% · Debate with insults: 56.3% | 0.2% | 0.0% |
| evFair | 570 | Eat for the town: 84.9% · Decline politely: 15.1% | 4.9% | 0.0% |
| evNote | 5000 | Go and look: 66.2% · Burn the note: 33.8% | 6.9% | 0.0% |
| evParade | 5000 | Ride the float anyway: 45.8% · Buy a new float: 54.2% | 0.2% | 0.0% |
| evPower | 2144 | Pay Chad's guy: 72.0% · Hand out candles: 28.0% | 0.9% | 0.0% |
| evStorm | 5000 | Buy sandbags: 62.1% · Ignore Steve: 37.9% | 0.5% | 0.0% |
| farmersMarket | 5000 | Protect the market: 14.5% · Ban the market: 54.9% · Market pays a fee: 30.6% | 0.0% | 0.0% |
| festival | 3445 | Fund Frog Day: 44.3% · Promise Frog Day soon: 35.4% · No Frog Day: 20.3% | 0.0% | 0.0% |
| flood | 5000 | Rent the pumps: 72.6% · Rename it 'Little Venice': 22.9% · Wait for it to dry: 4.5% | 0.0% | 0.0% |
| giantSpoon | 2675 | Build the spoon: 30.9% · A normal-sized spoon: 50.8% · No spoon: 18.3% | 0.0% | 0.0% |
| gooseOccupation | 1451 | Pay them off in bread: 82.1% · Send Chief Barb: 17.9% | 0.0% | 0.0% |
| goosePond | 5000 | Build the pond: 52.3% · Pond in the park instead: 33.4% · Refuse: 14.3% | 0.0% | 0.0% |
| gooseStrike | 5000 | Meet their demands: 55.3% · Hire ducks instead: 41.8% · Wait them out: 2.9% | 0.0% | 0.0% |
| haunted | 5000 | Fund the ghost hunt: 61.0% · Seal the basement: 23.0% · There's nothing down there: 16.0% | 0.0% | 0.0% |
| helicopter | 5000 | Buy it: 0.9% · Lease one: 59.0% · Promise it next quarter: 40.1% | 0.0% | 0.0% |
| lakeMonster | 2413 | Put it on the brochure: 40.4% · Protect its privacy: 49.4% · There is no monster: 10.3% | 0.0% | 0.0% |
| mimeStrike | 4621 | Notice them, with a banner: 81.2% · Negotiate in mime: 15.6% · Ignore the mimes: 3.2% | 0.0% | 0.0% |
| monsterPta | 974 | Welcome the monster: 89.5% · Monsters can't be parents: 10.5% | 0.0% | 0.0% |
| moonClaim | 5000 | Plant the flag: 38.1% · Sell the moon to Chad: 32.6% · Give the moon back: 29.3% | 0.0% | 0.0% |
| moonRent | 1905 | Pay the moonlight bill: 62.2% · Charge him for the view: 37.8% | 0.0% | 0.0% |
| newSchool | 5000 | Build a new school: 45.6% · Promise it by spring: 32.6% · Buy a second book: 21.8% | 0.0% | 0.0% |
| opera | 3381 | Attend and applaud: 34.6% · Pay for rewrites: 63.2% · Ban the opera: 2.2% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 1.0% · Meters for visitors only: 11.7% · Free parking forever: 87.3% | 0.0% | 0.0% |
| parkWifi | 5000 | Free park wifi: 33.7% · Wifi with Chad's ads: 41.2% · Go outside and play: 25.1% | 0.0% | 0.0% |
| pettyCrime | 12913 | Pay for overtime: 59.0% · Blame the next town over: 41.0% | 0.0% | 0.0% |
| raccoonBins | 5000 | Raccoon-proof bins: 67.7% · Night patrols: 16.5% · They live here too: 15.8% | 0.0% | 0.0% |
| radar | 3287 | Buy the radar: 37.9% · Promise it next quarter: 26.9% · The finger is fine: 35.2% | 0.0% | 0.0% |
| rocketLibrary | 2617 | Rebuild the library: 83.3% · Leave the rocket in: 16.7% | 0.0% | 0.0% |
| roundabout | 3194 | Rescue the drivers: 34.8% · Sell tickets to watch: 60.1% · It's working as intended: 5.1% | 0.0% | 0.0% |
| scandal | 54 | Own it: 64.8% · Bury the story: 35.2% | 0.0% | 0.0% |
| secretStranger | 2989 | Expose him in The Bugle: 89.3% · Take his hush money: 10.7% | 0.0% | 0.0% |
| snowplow | 5000 | Plow the school road: 19.1% · Plow Chad Street: 36.7% · Rent a second plow: 44.2% | 0.0% | 0.0% |
| squirrelLoan | 2073 | Repossess the acorns: 51.2% · Forgive the loan: 19.6% · Send Dave to collect: 29.2% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 11.2% · A statue of someone normal: 73.8% · No statues: 15.1% | 0.0% | 0.0% |
| talentShow | 5000 | Judge honestly: 19.5% · Everyone wins: 35.9% · Send Dave: 44.6% | 0.0% | 0.0% |
| timeCapsule | 4956 | Settle with Chad: 67.9% · Bury it again, deeper: 22.3% · Frame the note: 9.8% | 0.0% | 0.0% |
| tvStation | 1129 | Build the station: 7.3% · Lend her the roof: 74.0% · Refuse: 18.8% | 0.0% | 0.0% |
| twinTown | 4556 | Throw a welcome party: 62.3% · Show them the pothole: 34.3% · Lock the gates: 3.4% | 0.0% | 0.0% |
