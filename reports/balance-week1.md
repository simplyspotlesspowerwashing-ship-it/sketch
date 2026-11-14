# Balance report: pack `week1`

5000 terms per policy. Tuning: {"people":0.5,"press":0.2,"business":0.1,"law":0.1,"objective":2,"brokenPromise":-4,"min":5,"max":95}.

| Policy | Win rate | Target | Mean vote | Vote p10 / p50 / p90 | Recalled | Bankrupt | Term ended early | Ending money $k p10 / p50 / p90 |
|---|---|---|---|---|---|---|---|---|
| random | 0.0% | on target | 16.2 | 5 / 17 / 27 | 99.0% | 0.7% | 25.7% | 4 / 23 / 66 |
| greedy-approval | 36.6% |  | 45.0 | 29 / 43 / 64 | 97.7% | 97.2% | 8.2% | -48 / 3 / 20 |
| miser | 0.0% |  | 17.0 | 17 / 17 / 17 | 100.0% | 0.0% | 100.0% | 20 / 20 / 20 |
| people-pleaser | 46.1% |  | 47.3 | 32 / 48 / 64 | 96.3% | 84.6% | 4.0% | -48 / -28 / 20 |
| dave-only | 0.0% | **off target** (5-10%) | 16.0 | 5 / 17 / 26 | 97.6% | 0.1% | 10.3% | 20 / 48 / 86 |
| sensible | 78.6% | **off target** (55-65%) | 57.6 | 44 / 58 / 70 | 0.2% | 0.2% | 0.0% | 12 / 35 / 60 |
| | | recalls on target (under 25%) | | | | | | |

## Non-dilemmas and other flags (sensible bot)

- `bankError`: "Keep it quiet" chosen 2% of the time (under 5%)
- `billboard`: "No billboard" chosen 2% of the time (under 5%)
- `bridge`: "Put up a 'Good Luck' sign" chosen 5% of the time (under 5%)
- `buglePress`: "Not the town's problem" chosen 3% of the time (under 5%)
- `campaign`: "Call in every Favor" chosen 4% of the time (under 5%)
- `campaignTruth`: "Call in every Favor" chosen 2% of the time (under 5%)
- `coneRally`: "Have the cone towed" chosen 3% of the time (under 5%)
- `crossingGuard`: "Hire a human" chosen 96% of the time (over 85%)
- `crossingGuard`: "Gerald it is" chosen 3% of the time (under 5%)
- `crossingGuard`: "Children can look both ways" chosen 1% of the time (under 5%)
- `diaryLeak`: "Blame the pigeon" chosen 3% of the time (under 5%)
- `fireworks`: "No fireworks" chosen 2% of the time (under 5%)
- `flood`: "Wait for it to dry" chosen 4% of the time (under 5%)
- `gooseOccupation`: "Pay them off in bread" chosen 91% of the time (over 85%)
- `gooseStrike`: "Wait them out" chosen 3% of the time (under 5%)
- `helicopter`: "Buy it" chosen 3% of the time (under 5%)
- `libraryCasino`: "Build the casino" chosen 5% of the time (under 5%)
- `mallParking`: "Hands off the park" chosen 3% of the time (under 5%)
- `mascot`: "Welcome, Wet Sock" chosen 88% of the time (over 85%)
- `mascot`: "No mascot" chosen 3% of the time (under 5%)
- `mimeStrike`: "Ignore the mimes" chosen 3% of the time (under 5%)
- `nightLibrary`: "Libraries close at five" chosen 3% of the time (under 5%)
- `parkingMeters`: "Install meters" chosen 1% of the time (under 5%)
- `parkingMeters`: "Free parking forever" chosen 89% of the time (over 85%)
- `policeDog`: "Therapy for the old dog" chosen 87% of the time (over 85%)
- `policeDog`: "One scared dog is plenty" chosen 4% of the time (under 5%)
- `radar`: "The finger is fine" chosen 5% of the time (under 5%)
- `rocketLibrary`: "Rebuild the library" chosen 91% of the time (over 85%)
- `secretStranger`: "Expose him in The Bugle" chosen 96% of the time (over 85%)
- `secretStranger`: "Take his hush money" chosen 4% of the time (under 5%)
- `tvStation`: "Lend her the roof" chosen 88% of the time (over 85%)
- `tvStation`: "Refuse" chosen 3% of the time (under 5%)
- `twinTown`: "Lock the gates" chosen 1% of the time (under 5%)

## Unreachable desk cards (never drawn by any policy)

- `snowplow`
- `pothole`
- `squirrelLoan`
- `opera`
- `buyout`
- `overreach`
- `goldenGoose`

## random

Projects built (share of terms): school 20.5%, pond 19.5%, tv 18.4%, helicopter 18.0%, spoon 10.5%, casino 5.5%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 36.1% · Bribe him with cheese: 28.0% · Let Dave handle the audit: 35.8% | 35.9% | 10.7% |
| bankError | 3776 | Keep it quiet: 36.9% · Give it back: 37.3% · Split it with Chad: 25.7% | 37.3% | 10.5% |
| bearStory | 5000 | Yes, I wrestled a bear: 50.1% · Tell the truth: 49.9% | 42.1% | 12.7% |
| billboard | 5000 | Allow the billboard: 34.4% · A small one, round the back: 32.7% · No billboard: 33.0% | 32.6% | 9.7% |
| bridge | 5000 | Repair the bridge: 33.4% · Promise repairs soon: 34.0% · Put up a 'Good Luck' sign: 32.6% | 32.3% | 10.7% |
| buglePress | 5000 | Buy a new press: 32.6% · Use the school copier: 33.4% · Not the town's problem: 34.0% | 30.1% | 10.3% |
| campaign | 2894 | Big rally: 29.1% · Call in every Favor: 11.5% · Attack ad about the cone: 28.2% · Just be yourself: 31.2% | 0.0% | 0.0% |
| campaignTruth | 823 | 'At least I'm not a goose': 30.3% · Promise a recount: 29.2% · Big rally: 28.2% · Call in every Favor: 12.4% | 0.0% | 0.0% |
| casinoCrime | 195 | Ban Linda from blackjack: 47.1% · Make her head of security: 52.9% | 44.6% | 10.8% |
| chadRocket | 5000 | Clear the launch: 33.7% · Launch from your own lawn: 33.2% · No rockets near children: 33.1% | 29.1% | 10.2% |
| cheeseVault | 4960 | Sell it, fast: 33.3% · Throw a cheese festival: 32.2% · Seal the vault: 34.4% | 34.5% | 9.8% |
| coneRally | 4542 | Hold a bigger rally: 33.0% · Debate the cone, live: 33.5% · Have the cone towed: 33.6% | 35.4% | 10.2% |
| crossingGuard | 5000 | Hire a human: 33.0% · Gerald it is: 32.8% · Children can look both ways: 34.2% | 32.2% | 9.6% |
| curfew | 5000 | Curfew at 9 pm: 32.8% · Fund a youth centre: 34.4% · Let them stand: 32.8% | 30.2% | 9.3% |
| diaryLeak | 4940 | Apologise to everyone: 34.2% · Publish the whole diary: 32.2% · Blame the pigeon: 33.6% | 36.8% | 10.4% |
| duckDuel | 1554 | Back Gerald: 34.8% · Back the duck: 32.2% · Stay out of bird politics: 33.0% | 34.8% | 11.0% |
| entitled | 20 | Free ice cream: 38.5% · Say no nicely: 61.5% | 30.0% | 5.0% |
| evBallots | 2477 | Tell the town: 53.3% · Put the boxes back: 46.7% | 21.1% | 0.0% |
| evBear | 1126 | Apologise to the bear: 47.9% · Wrestle it for real: 52.1% | 21.4% | 0.0% |
| evDebate | 4269 | Debate with facts: 50.5% · Debate with insults: 49.5% | 20.2% | 0.0% |
| evFair | 2299 | Eat for the town: 50.8% · Decline politely: 49.2% | 20.1% | 0.0% |
| evNote | 5000 | Go and look: 49.3% · Burn the note: 50.7% | 20.5% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.2% · Buy a new float: 49.8% | 20.3% | 0.0% |
| evPower | 3854 | Pay Chad's guy: 49.3% · Hand out candles: 50.7% | 19.8% | 0.0% |
| evStorm | 5000 | Buy sandbags: 49.9% · Ignore Steve: 50.1% | 19.7% | 0.0% |
| farmersMarket | 5000 | Protect the market: 34.8% · Ban the market: 35.4% · Market pays a fee: 29.9% | 37.2% | 10.0% |
| festival | 4999 | Fund Frog Day: 32.1% · Promise Frog Day soon: 32.9% · No Frog Day: 35.0% | 35.7% | 11.2% |
| fireworks | 3928 | Fireworks for Timmy: 34.5% · One sparkler: 32.1% · No fireworks: 33.4% | 34.5% | 9.1% |
| flood | 4999 | Rent the pumps: 33.4% · Rename it 'Little Venice': 33.1% · Wait for it to dry: 33.6% | 36.4% | 9.8% |
| giantSpoon | 2826 | Build the spoon: 32.7% · A normal-sized spoon: 33.3% · No spoon: 33.9% | 33.4% | 10.0% |
| gooseOccupation | 3307 | Pay them off in bread: 48.7% · Send Chief Barb: 51.3% | 44.3% | 12.8% |
| goosePond | 5000 | Build the pond: 34.6% · Pond in the park instead: 32.0% · Refuse: 33.4% | 33.1% | 10.7% |
| gooseStrike | 5000 | Meet their demands: 34.2% · Hire ducks instead: 30.9% · Wait them out: 34.9% | 33.2% | 8.9% |
| haunted | 5000 | Fund the ghost hunt: 34.2% · Seal the basement: 33.1% · There's nothing down there: 32.8% | 30.5% | 9.7% |
| heatwave | 4523 | Fix the pool: 33.1% · Sprinklers on Main Street: 32.8% · Tell them to drink water: 34.1% | 35.6% | 9.9% |
| helicopter | 4999 | Buy it: 33.6% · Lease one: 33.4% · Promise it next quarter: 33.0% | 36.2% | 10.2% |
| lakeMonster | 2113 | Put it on the brochure: 31.9% · Protect its privacy: 34.2% · There is no monster: 33.9% | 36.3% | 10.6% |
| libraryCasino | 1589 | Build the casino: 36.2% · Refuse: 39.8% · Casino night, once a year: 23.9% | 41.0% | 11.5% |
| mallParking | 4060 | Pave the park: 36.0% · Only half the park: 25.4% · Hands off the park: 38.6% | 38.7% | 10.9% |
| mascot | 1404 | Welcome, Wet Sock: 31.6% · Hire a real designer: 34.7% · No mascot: 33.8% | 34.2% | 10.5% |
| mimeStrike | 5000 | Notice them, with a banner: 34.1% · Negotiate in mime: 31.9% · Ignore the mimes: 34.0% | 33.1% | 9.9% |
| monsterPta | 358 | Welcome the monster: 52.4% · Monsters can't be parents: 47.6% | 48.0% | 12.0% |
| moonClaim | 3850 | Plant the flag: 32.1% · Sell the moon to Chad: 33.5% · Give the moon back: 34.3% | 30.2% | 10.2% |
| moonRent | 738 | Pay the moonlight bill: 47.8% · Charge him for the view: 52.2% | 35.0% | 12.3% |
| newSchool | 5000 | Build a new school: 32.8% · Promise it by spring: 33.9% · Buy a second book: 33.3% | 28.4% | 9.2% |
| nightLibrary | 5000 | Fund the night library: 35.5% · Let her run a 'truth club': 28.3% · Libraries close at five: 36.2% | 38.8% | 9.5% |
| parkingMeters | 5000 | Install meters: 32.9% · Meters for visitors only: 33.4% · Free parking forever: 33.7% | 28.6% | 10.5% |
| parkWifi | 4939 | Free park wifi: 32.5% · Wifi with Chad's ads: 34.2% · Go outside and play: 33.3% | 37.3% | 9.8% |
| pettyCrime | 22594 | Pay for overtime: 50.1% · Blame the next town over: 49.9% | 43.7% | 13.3% |
| pigeonAide | 4939 | Hire the pigeon: 31.9% · Let it sign today's stack: 33.7% · Evict the pigeon: 34.4% | 35.4% | 10.7% |
| policeDog | 4692 | Buy a braver dog: 32.6% · Therapy for the old dog: 32.7% · One scared dog is plenty: 34.7% | 35.8% | 9.1% |
| raccoonBins | 5000 | Raccoon-proof bins: 33.1% · Night patrols: 34.0% · They live here too: 33.0% | 33.0% | 9.9% |
| radar | 498 | Buy the radar: 33.3% · Promise it next quarter: 34.1% · The finger is fine: 32.6% | 33.3% | 11.2% |
| rocketLibrary | 1024 | Rebuild the library: 49.3% · Leave the rocket in: 50.7% | 41.4% | 14.3% |
| roundabout | 4969 | Rescue the drivers: 37.7% · Sell tickets to watch: 26.3% · It's working as intended: 36.0% | 36.2% | 11.2% |
| schoolLunch | 2004 | Pay for real food: 33.0% · Chad sponsors lunch: 33.9% · Paste builds character: 33.0% | 35.5% | 9.9% |
| secretStranger | 1031 | Expose him in The Bugle: 52.3% · Take his hush money: 47.7% | 44.1% | 11.7% |
| speedTrap | 4539 | Approve the speed trap: 34.0% · Warning signs only: 34.1% · No speed trap: 31.9% | 34.9% | 10.2% |
| statue | 5000 | Accept the statue: 33.5% · A statue of someone normal: 32.6% · No statues: 33.9% | 28.5% | 11.1% |
| strangerPrice | 4028 | Name a silly price: 33.6% · Throw him out: 32.5% · Hear him out: 33.9% | 35.6% | 10.1% |
| talentShow | 2199 | Judge honestly: 33.3% · Everyone wins: 32.6% · Send Dave: 34.1% | 33.8% | 10.6% |
| taxBreak | 5000 | Grant the tax break: 32.4% · Trade it for a donation: 34.0% · Refuse: 33.6% | 33.3% | 9.9% |
| theWhistle | 4721 | Shut down The Whistle: 34.3% · Buy The Whistle: 31.4% · A free press is good: 34.3% | 35.5% | 9.5% |
| timeCapsule | 5000 | Settle with Chad: 33.1% · Bury it again, deeper: 33.4% · Frame the note: 33.5% | 36.7% | 10.7% |
| tvStation | 4967 | Build the station: 33.0% · Lend her the roof: 32.4% · Refuse: 34.5% | 34.5% | 9.3% |
| twinTown | 1822 | Throw a welcome party: 32.9% · Show them the pothole: 34.4% · Lock the gates: 32.7% | 37.7% | 10.5% |

## greedy-approval

Projects built (share of terms): school 100.0%, pond 50.3%, helicopter 5.2%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 18.9% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 81.1% | 0.0% | 0.0% |
| bankError | 709 | Keep it quiet: 0.0% · Give it back: 100.0% · Split it with Chad: 0.0% | 0.0% | 81.0% |
| bearStory | 5000 | Yes, I wrestled a bear: 100.0% · Tell the truth: 0.0% | 0.0% | 35.7% |
| billboard | 5000 | Allow the billboard: - · A small one, round the back: - · No billboard: - | 0.0% | 100.0% |
| bridge | 5000 | Repair the bridge: 100.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| buglePress | 5000 | Buy a new press: 100.0% · Use the school copier: 0.0% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| campaignTruth | 4592 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: - · Launch from your own lawn: - · No rockets near children: - | 0.0% | 100.0% |
| cheeseVault | 3952 | Sell it, fast: 26.4% · Throw a cheese festival: 73.6% · Seal the vault: 0.0% | 0.0% | 0.0% |
| coneRally | 4967 | Hold a bigger rally: 45.8% · Debate the cone, live: 54.2% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| crossingGuard | 5000 | Hire a human: 100.0% · Gerald it is: 0.0% · Children can look both ways: 0.0% | 0.0% | 48.4% |
| curfew | 5000 | Curfew at 9 pm: 0.0% · Fund a youth centre: 100.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 4994 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| duckDuel | 3652 | Back Gerald: 100.0% · Back the duck: 0.0% · Stay out of bird politics: 0.0% | 0.0% | 80.9% |
| entitled | 8818 | Free ice cream: 78.7% · Say no nicely: 21.3% | 0.0% | 35.6% |
| evBallots | 4993 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evBear | 3216 | Apologise to the bear: 57.6% · Wrestle it for real: 42.4% | 0.0% | 0.0% |
| evDebate | 4911 | Debate with facts: 100.0% · Debate with insults: 0.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 1783 | Pay Chad's guy: 53.6% · Hand out candles: 46.4% | 21.9% | 0.0% |
| evStorm | 5000 | Buy sandbags: 77.6% · Ignore Steve: 22.4% | 0.0% | 0.0% |
| farmersMarket | 5000 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 15.5% |
| festival | 5000 | Fund Frog Day: 4.4% · Promise Frog Day soon: 95.6% · No Frog Day: 0.0% | 0.0% | 50.4% |
| fireworks | 4482 | Fireworks for Timmy: 83.3% · One sparkler: 16.7% · No fireworks: 0.0% | 0.0% | 6.2% |
| flood | 5000 | Rent the pumps: 24.8% · Rename it 'Little Venice': 75.2% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| giantSpoon | 3924 | Build the spoon: - · A normal-sized spoon: - · No spoon: - | 0.0% | 100.0% |
| gooseOccupation | 363 | Pay them off in bread: 88.4% · Send Chief Barb: 11.6% | 0.0% | 0.0% |
| goosePond | 5000 | Build the pond: 50.3% · Pond in the park instead: 42.5% · Refuse: 7.3% | 0.0% | 0.0% |
| gooseStrike | 5000 | Meet their demands: 92.0% · Hire ducks instead: 1.5% · Wait them out: 6.6% | 0.0% | 15.9% |
| haunted | 5000 | Fund the ghost hunt: 100.0% · Seal the basement: 0.0% · There's nothing down there: 0.0% | 0.0% | 6.0% |
| heatwave | 4967 | Fix the pool: 28.7% · Sprinklers on Main Street: 71.3% · Tell them to drink water: 0.0% | 0.0% | 35.3% |
| helicopter | 5000 | Buy it: 5.2% · Lease one: 94.8% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| lakeMonster | 2540 | Put it on the brochure: 100.0% · Protect its privacy: 0.0% · There is no monster: 0.0% | 0.0% | 11.5% |
| mallParking | 4757 | Pave the park: 0.9% · Only half the park: 99.1% · Hands off the park: 0.0% | 0.0% | 18.0% |
| mascot | 3293 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 0.0% |
| mimeStrike | 5000 | Notice them, with a banner: 99.7% · Negotiate in mime: 0.3% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| monsterPta | 2248 | Welcome the monster: 100.0% · Monsters can't be parents: 0.0% | 0.0% | 0.0% |
| moonClaim | 4700 | Plant the flag: - · Sell the moon to Chad: - · Give the moon back: - | 0.0% | 100.0% |
| newSchool | 5000 | Build a new school: 100.0% · Promise it by spring: 0.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 2.3% · Let her run a 'truth club': 97.7% · Libraries close at five: 0.0% | 0.0% | 6.6% |
| parkingMeters | 5000 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 4994 | Free park wifi: 3.7% · Wifi with Chad's ads: 96.3% · Go outside and play: 0.0% | 0.0% | 97.3% |
| pettyCrime | 16251 | Pay for overtime: 65.1% · Blame the next town over: 34.9% | 0.0% | 10.3% |
| pigeonAide | 4994 | Hire the pigeon: 100.0% · Let it sign today's stack: 0.0% · Evict the pigeon: 0.0% | 0.0% | 0.0% |
| policeDog | 4993 | Buy a braver dog: 77.1% · Therapy for the old dog: 22.9% · One scared dog is plenty: 0.0% | 0.0% | 21.9% |
| raccoonBins | 5000 | Raccoon-proof bins: 97.6% · Night patrols: 2.4% · They live here too: 0.0% | 0.0% | 21.5% |
| radar | 630 | Buy the radar: 33.7% · Promise it next quarter: 66.3% · The finger is fine: 0.0% | 0.0% | 9.0% |
| roundabout | 4999 | Rescue the drivers: 58.2% · Sell tickets to watch: 37.6% · It's working as intended: 4.2% | 0.0% | 0.0% |
| scandal | 44 | Own it: 100.0% · Bury the story: 0.0% | 0.0% | 15.9% |
| schoolLunch | 1253 | Pay for real food: 100.0% · Chad sponsors lunch: 0.0% · Paste builds character: 0.0% | 0.0% | 15.2% |
| secretStranger | 4993 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| speedTrap | 4967 | Approve the speed trap: 65.3% · Warning signs only: 34.7% · No speed trap: 0.0% | 0.0% | 63.5% |
| statue | 5000 | Accept the statue: 0.0% · A statue of someone normal: 100.0% · No statues: 0.0% | 0.0% | 0.0% |
| strangerPrice | 4757 | Name a silly price: 100.0% · Throw him out: 0.0% · Hear him out: 0.0% | 0.0% | 9.6% |
| talentShow | 1501 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 5000 | Grant the tax break: 12.2% · Trade it for a donation: 87.8% · Refuse: 0.0% | 0.0% | 0.0% |
| theWhistle | 4993 | Shut down The Whistle: 65.5% · Buy The Whistle: 34.5% · A free press is good: 0.0% | 0.0% | 66.6% |
| timeCapsule | 5000 | Settle with Chad: 68.3% · Bury it again, deeper: 0.0% · Frame the note: 31.7% | 0.0% | 58.8% |
| tvStation | 4995 | Build the station: 0.0% · Lend her the roof: 100.0% · Refuse: 0.0% | 0.0% | 69.4% |
| twinTown | 1102 | Throw a welcome party: 93.5% · Show them the pothole: 6.5% · Lock the gates: 0.0% | 0.0% | 0.2% |

## miser

Projects built (share of terms): spoon 75.5%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: - · Bribe him with cheese: - · Let Dave handle the audit: - | 100.0% | 0.0% |
| bankError | 291 | Keep it quiet: 100.0% · Give it back: 0.0% · Split it with Chad: 0.0% | 0.0% | 0.0% |
| bearStory | 5000 | Yes, I wrestled a bear: - · Tell the truth: - | 100.0% | 0.0% |
| billboard | 5000 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: - · Promise repairs soon: - · Put up a 'Good Luck' sign: - | 66.7% | 33.3% |
| buglePress | 5000 | Buy a new press: - · Use the school copier: - · Not the town's problem: - | 66.7% | 33.3% |
| chadRocket | 5000 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| cheeseVault | 1488 | Sell it, fast: - · Throw a cheese festival: - · Seal the vault: - | 75.8% | 24.2% |
| coneRally | 103 | Hold a bigger rally: - · Debate the cone, live: - · Have the cone towed: - | 100.0% | 0.0% |
| crossingGuard | 5000 | Hire a human: - · Gerald it is: - · Children can look both ways: - | 66.7% | 33.3% |
| curfew | 5000 | Curfew at 9 pm: - · Fund a youth centre: - · Let them stand: - | 0.0% | 100.0% |
| diaryLeak | 1132 | Apologise to everyone: - · Publish the whole diary: - · Blame the pigeon: - | 100.0% | 0.0% |
| evDebate | 29 | Debate with facts: - · Debate with insults: - | 100.0% | 0.0% |
| evFair | 564 | Eat for the town: - · Decline politely: - | 100.0% | 0.0% |
| evNote | 5000 | Go and look: - · Burn the note: - | 100.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: - · Buy a new float: - | 100.0% | 0.0% |
| evPower | 2887 | Pay Chad's guy: - · Hand out candles: - | 100.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: - · Ignore Steve: - | 100.0% | 0.0% |
| farmersMarket | 5000 | Protect the market: 0.0% · Ban the market: 0.0% · Market pays a fee: 100.0% | 0.0% | 0.0% |
| festival | 4967 | Fund Frog Day: - · Promise Frog Day soon: - · No Frog Day: - | 66.5% | 33.5% |
| flood | 4967 | Rent the pumps: - · Rename it 'Little Venice': - · Wait for it to dry: - | 100.0% | 0.0% |
| giantSpoon | 3774 | Build the spoon: 100.0% · A normal-sized spoon: 0.0% · No spoon: 0.0% | 0.0% | 0.0% |
| goosePond | 5000 | Build the pond: - · Pond in the park instead: - · Refuse: - | 0.0% | 100.0% |
| gooseStrike | 5000 | Meet their demands: - · Hire ducks instead: - · Wait them out: - | 0.0% | 100.0% |
| haunted | 5000 | Fund the ghost hunt: - · Seal the basement: - · There's nothing down there: - | 100.0% | 0.0% |
| heatwave | 117 | Fix the pool: - · Sprinklers on Main Street: - · Tell them to drink water: - | 0.0% | 100.0% |
| helicopter | 4979 | Buy it: - · Lease one: - · Promise it next quarter: - | 0.0% | 100.0% |
| lakeMonster | 1013 | Put it on the brochure: - · Protect its privacy: - · There is no monster: - | 100.0% | 0.0% |
| libraryCasino | 47 | Build the casino: 0.0% · Refuse: 0.0% · Casino night, once a year: 100.0% | 74.5% | 0.0% |
| mallParking | 17 | Pave the park: 100.0% · Only half the park: 0.0% · Hands off the park: 0.0% | 0.0% | 0.0% |
| mascot | 12 | Welcome, Wet Sock: - · Hire a real designer: - · No mascot: - | 0.0% | 100.0% |
| mimeStrike | 5000 | Notice them, with a banner: - · Negotiate in mime: - · Ignore the mimes: - | 0.0% | 100.0% |
| newSchool | 5000 | Build a new school: - · Promise it by spring: - · Buy a second book: - | 0.0% | 100.0% |
| nightLibrary | 5000 | Fund the night library: - · Let her run a 'truth club': - · Libraries close at five: - | 0.0% | 100.0% |
| parkingMeters | 5000 | Install meters: 100.0% · Meters for visitors only: 0.0% · Free parking forever: 0.0% | 0.0% | 0.0% |
| parkWifi | 1147 | Free park wifi: - · Wifi with Chad's ads: - · Go outside and play: - | 41.4% | 58.6% |
| pettyCrime | 11122 | Pay for overtime: - · Blame the next town over: - | 85.7% | 14.3% |
| pigeonAide | 1161 | Hire the pigeon: - · Let it sign today's stack: - · Evict the pigeon: - | 0.0% | 100.0% |
| policeDog | 287 | Buy a braver dog: - · Therapy for the old dog: - · One scared dog is plenty: - | 0.0% | 100.0% |
| raccoonBins | 5000 | Raccoon-proof bins: - · Night patrols: - · They live here too: - | 100.0% | 0.0% |
| radar | 3100 | Buy the radar: - · Promise it next quarter: - · The finger is fine: - | 100.0% | 0.0% |
| rocketLibrary | 5000 | Rebuild the library: - · Leave the rocket in: - | 100.0% | 0.0% |
| roundabout | 1700 | Rescue the drivers: 0.0% · Sell tickets to watch: 100.0% · It's working as intended: 0.0% | 0.0% | 46.7% |
| schoolLunch | 3083 | Pay for real food: - · Chad sponsors lunch: - · Paste builds character: - | 100.0% | 0.0% |
| speedTrap | 186 | Approve the speed trap: 100.0% · Warning signs only: 0.0% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 5000 | Accept the statue: 100.0% · A statue of someone normal: 0.0% · No statues: 0.0% | 0.0% | 0.0% |
| strangerPrice | 5 | Name a silly price: 0.0% · Throw him out: 0.0% · Hear him out: 100.0% | 0.0% | 0.0% |
| talentShow | 522 | Judge honestly: - · Everyone wins: - · Send Dave: - | 68.4% | 31.6% |
| taxBreak | 5000 | Grant the tax break: 0.0% · Trade it for a donation: 100.0% · Refuse: 0.0% | 0.0% | 0.0% |
| theWhistle | 270 | Shut down The Whistle: - · Buy The Whistle: - · A free press is good: - | 8.1% | 91.9% |
| timeCapsule | 4999 | Settle with Chad: - · Bury it again, deeper: - · Frame the note: - | 66.7% | 33.3% |
| tvStation | 1532 | Build the station: - · Lend her the roof: - · Refuse: - | 13.1% | 86.9% |
| twinTown | 262 | Throw a welcome party: - · Show them the pothole: - · Lock the gates: - | 100.0% | 0.0% |

## people-pleaser

Projects built (share of terms): school 100.0%, pond 49.4%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 21.2% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 78.8% | 0.0% | 63.7% |
| bankError | 387 | Keep it quiet: 0.0% · Give it back: 0.0% · Split it with Chad: 100.0% | 0.0% | 87.9% |
| bearStory | 5000 | Yes, I wrestled a bear: 0.0% · Tell the truth: 100.0% | 0.0% | 3.6% |
| billboard | 5000 | Allow the billboard: - · A small one, round the back: - · No billboard: - | 0.0% | 100.0% |
| bridge | 5000 | Repair the bridge: 100.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.1% |
| buglePress | 5000 | Buy a new press: 100.0% · Use the school copier: 0.0% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| campaign | 295 | Big rally: 34.2% · Call in every Favor: 36.9% · Attack ad about the cone: 10.8% · Just be yourself: 18.0% | 0.0% | 0.0% |
| campaignTruth | 4505 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: - · Launch from your own lawn: - · No rockets near children: - | 0.0% | 100.0% |
| cheeseVault | 3071 | Sell it, fast: 6.0% · Throw a cheese festival: 94.0% · Seal the vault: 0.0% | 0.0% | 0.0% |
| coneRally | 4974 | Hold a bigger rally: 47.8% · Debate the cone, live: 52.2% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| crossingGuard | 5000 | Hire a human: 39.0% · Gerald it is: 61.0% · Children can look both ways: 0.0% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 0.0% · Fund a youth centre: 100.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 4998 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| duckDuel | 1301 | Back Gerald: 100.0% · Back the duck: 0.0% · Stay out of bird politics: 0.0% | 0.0% | 0.0% |
| entitled | 11524 | Free ice cream: 40.6% · Say no nicely: 59.4% | 0.0% | 1.4% |
| evBallots | 4681 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evDebate | 4937 | Debate with facts: 0.0% · Debate with insults: 100.0% | 0.0% | 0.0% |
| evFair | 316 | Eat for the town: 100.0% · Decline politely: 0.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: - · Burn the note: - | 100.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 5000 | Pay Chad's guy: 55.6% · Hand out candles: 44.4% | 18.1% | 0.0% |
| evStorm | 5000 | Buy sandbags: 75.5% · Ignore Steve: 24.5% | 0.0% | 0.0% |
| farmersMarket | 5000 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| festival | 5000 | Fund Frog Day: 32.9% · Promise Frog Day soon: 67.1% · No Frog Day: 0.0% | 0.0% | 0.0% |
| fireworks | 3108 | Fireworks for Timmy: 94.8% · One sparkler: 5.2% · No fireworks: 0.0% | 0.0% | 26.5% |
| flood | 5000 | Rent the pumps: 28.3% · Rename it 'Little Venice': 71.7% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| giantSpoon | 3981 | Build the spoon: 0.0% · A normal-sized spoon: 100.0% · No spoon: 0.0% | 0.0% | 96.8% |
| gooseOccupation | 1942 | Pay them off in bread: 100.0% · Send Chief Barb: 0.0% | 0.0% | 83.6% |
| goosePond | 5000 | Build the pond: 49.4% · Pond in the park instead: 25.7% · Refuse: 24.9% | 0.0% | 0.0% |
| gooseStrike | 5000 | Meet their demands: 52.2% · Hire ducks instead: 40.6% · Wait them out: 7.2% | 0.0% | 19.2% |
| haunted | 5000 | Fund the ghost hunt: 100.0% · Seal the basement: 0.0% · There's nothing down there: 0.0% | 0.0% | 6.3% |
| heatwave | 4974 | Fix the pool: 41.4% · Sprinklers on Main Street: 58.6% · Tell them to drink water: 0.0% | 0.0% | 33.9% |
| helicopter | 5000 | Buy it: 0.0% · Lease one: 100.0% · Promise it next quarter: 0.0% | 0.0% | 58.7% |
| lakeMonster | 1996 | Put it on the brochure: 0.0% · Protect its privacy: 100.0% · There is no monster: 0.0% | 0.0% | 0.0% |
| libraryCasino | 17 | Build the casino: 0.0% · Refuse: 100.0% · Casino night, once a year: 0.0% | 0.0% | 0.0% |
| mallParking | 4919 | Pave the park: 0.0% · Only half the park: 0.0% · Hands off the park: 100.0% | 0.0% | 0.0% |
| mascot | 1870 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 76.4% |
| mimeStrike | 5000 | Notice them, with a banner: 100.0% · Negotiate in mime: 0.0% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 4684 | Plant the flag: - · Sell the moon to Chad: - · Give the moon back: - | 0.0% | 100.0% |
| newSchool | 5000 | Build a new school: 100.0% · Promise it by spring: 0.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 0.0% · Let her run a 'truth club': 100.0% · Libraries close at five: 0.0% | 0.0% | 0.0% |
| parkingMeters | 5000 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 4998 | Free park wifi: 59.3% · Wifi with Chad's ads: 40.7% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 22172 | Pay for overtime: 40.7% · Blame the next town over: 59.3% | 0.0% | 65.4% |
| pigeonAide | 4998 | Hire the pigeon: 100.0% · Let it sign today's stack: 0.0% · Evict the pigeon: 0.0% | 0.0% | 12.8% |
| policeDog | 4997 | Buy a braver dog: 0.0% · Therapy for the old dog: 99.8% · One scared dog is plenty: 0.2% | 0.0% | 25.4% |
| raccoonBins | 5000 | Raccoon-proof bins: 100.0% · Night patrols: 0.0% · They live here too: 0.0% | 0.0% | 8.8% |
| radar | 746 | Buy the radar: 99.2% · Promise it next quarter: 0.8% · The finger is fine: 0.0% | 0.0% | 0.0% |
| roundabout | 5000 | Rescue the drivers: 51.2% · Sell tickets to watch: 48.8% · It's working as intended: 0.0% | 0.0% | 1.6% |
| scandal | 4 | Own it: 100.0% · Bury the story: 0.0% | 0.0% | 0.0% |
| schoolLunch | 1135 | Pay for real food: 93.0% · Chad sponsors lunch: 7.0% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 4681 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| speedTrap | 4974 | Approve the speed trap: 31.3% · Warning signs only: 68.7% · No speed trap: 0.0% | 0.0% | 21.8% |
| statue | 5000 | Accept the statue: 0.0% · A statue of someone normal: 100.0% · No statues: 0.0% | 0.0% | 0.0% |
| strangerPrice | 4915 | Name a silly price: 100.0% · Throw him out: 0.0% · Hear him out: 0.0% | 0.0% | 48.2% |
| talentShow | 1317 | Judge honestly: 0.0% · Everyone wins: 97.2% · Send Dave: 2.8% | 0.0% | 0.0% |
| taxBreak | 5000 | Grant the tax break: 0.0% · Trade it for a donation: 0.0% · Refuse: 100.0% | 0.0% | 0.0% |
| theWhistle | 4997 | Shut down The Whistle: 0.0% · Buy The Whistle: 33.9% · A free press is good: 66.1% | 0.0% | 0.0% |
| timeCapsule | 5000 | Settle with Chad: 49.4% · Bury it again, deeper: 0.0% · Frame the note: 50.6% | 0.0% | 77.9% |
| tvStation | 5000 | Build the station: 0.0% · Lend her the roof: 100.0% · Refuse: 0.0% | 0.0% | 63.8% |
| twinTown | 860 | Throw a welcome party: 100.0% · Show them the pothole: 0.0% · Lock the gates: 0.0% | 0.0% | 28.5% |

## dave-only

Projects built (share of terms): tv 23.4%, school 22.8%, spoon 14.5%, casino 8.0%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 34.3% · Bribe him with cheese: 32.3% · Let Dave handle the audit: 33.5% | 28.0% | 0.0% |
| bankError | 4434 | Keep it quiet: 37.0% · Give it back: 33.8% · Split it with Chad: 29.2% | 31.1% | 0.0% |
| bearStory | 5000 | Yes, I wrestled a bear: 48.8% · Tell the truth: 51.2% | 44.9% | 0.0% |
| billboard | 5000 | Allow the billboard: 33.3% · A small one, round the back: 33.2% · No billboard: 33.5% | 29.5% | 0.0% |
| bridge | 5000 | Repair the bridge: 33.9% · Promise repairs soon: 33.1% · Put up a 'Good Luck' sign: 33.0% | 31.7% | 0.0% |
| buglePress | 5000 | Buy a new press: 33.9% · Use the school copier: 33.3% · Not the town's problem: 32.7% | 32.7% | 0.0% |
| campaign | 4008 | Big rally: 0.0% · Call in every Favor: 0.0% · Attack ad about the cone: 0.0% · Just be yourself: 100.0% | 0.0% | 0.0% |
| campaignTruth | 479 | 'At least I'm not a goose': 0.0% · Promise a recount: 0.0% · Big rally: 31.5% · Call in every Favor: 68.5% | 0.0% | 0.0% |
| casinoCrime | 380 | Ban Linda from blackjack: 56.3% · Make her head of security: 43.7% | 39.7% | 0.0% |
| chadRocket | 5000 | Clear the launch: 32.2% · Launch from your own lawn: 33.4% · No rockets near children: 34.3% | 33.0% | 0.0% |
| cheeseVault | 4995 | Sell it, fast: 31.1% · Throw a cheese festival: 35.1% · Seal the vault: 33.8% | 29.7% | 0.0% |
| coneRally | 4843 | Hold a bigger rally: 33.2% · Debate the cone, live: 32.5% · Have the cone towed: 34.3% | 29.4% | 0.0% |
| crossingGuard | 5000 | Hire a human: 33.4% · Gerald it is: 33.0% · Children can look both ways: 33.5% | 27.1% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: - · Fund a youth centre: - · Let them stand: - | 0.0% | 100.0% |
| diaryLeak | 4989 | Apologise to everyone: 32.3% · Publish the whole diary: 34.6% · Blame the pigeon: 33.1% | 28.9% | 0.0% |
| duckDuel | 1470 | Back Gerald: 34.7% · Back the duck: 32.4% · Stay out of bird politics: 32.9% | 33.3% | 0.0% |
| entitled | 1 | Free ice cream: - · Say no nicely: - | 100.0% | 0.0% |
| evBallots | 2100 | Tell the town: 50.3% · Put the boxes back: 49.7% | 50.8% | 0.0% |
| evBear | 1344 | Apologise to the bear: 50.9% · Wrestle it for real: 49.1% | 49.1% | 0.0% |
| evDebate | 4750 | Debate with facts: 49.4% · Debate with insults: 50.6% | 49.2% | 0.0% |
| evFair | 2844 | Eat for the town: 51.2% · Decline politely: 48.8% | 51.9% | 0.0% |
| evNote | 5000 | Go and look: 50.8% · Burn the note: 49.2% | 50.1% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.1% · Buy a new float: 49.9% | 49.4% | 0.0% |
| evPower | 3652 | Pay Chad's guy: 49.2% · Hand out candles: 50.8% | 50.4% | 0.0% |
| evStorm | 5000 | Buy sandbags: 51.9% · Ignore Steve: 48.1% | 50.1% | 0.0% |
| farmersMarket | 5000 | Protect the market: 35.7% · Ban the market: 34.4% · Market pays a fee: 29.9% | 31.5% | 0.0% |
| festival | 5000 | Fund Frog Day: 33.9% · Promise Frog Day soon: 32.6% · No Frog Day: 33.6% | 30.7% | 0.0% |
| fireworks | 4405 | Fireworks for Timmy: 34.1% · One sparkler: 33.2% · No fireworks: 32.6% | 28.8% | 0.0% |
| flood | 5000 | Rent the pumps: 34.2% · Rename it 'Little Venice': 32.7% · Wait for it to dry: 33.1% | 29.6% | 0.0% |
| giantSpoon | 3201 | Build the spoon: 33.8% · A normal-sized spoon: 33.0% · No spoon: 33.2% | 32.9% | 0.0% |
| goosePond | 5000 | Build the pond: - · Pond in the park instead: - · Refuse: - | 0.0% | 100.0% |
| gooseStrike | 5000 | Meet their demands: - · Hire ducks instead: - · Wait them out: - | 0.0% | 100.0% |
| haunted | 5000 | Fund the ghost hunt: 33.0% · Seal the basement: 32.8% · There's nothing down there: 34.3% | 31.1% | 0.0% |
| heatwave | 4868 | Fix the pool: - · Sprinklers on Main Street: - · Tell them to drink water: - | 0.0% | 100.0% |
| helicopter | 5000 | Buy it: - · Lease one: - · Promise it next quarter: - | 0.0% | 100.0% |
| lakeMonster | 1877 | Put it on the brochure: 32.6% · Protect its privacy: 33.6% · There is no monster: 33.8% | 33.9% | 0.0% |
| libraryCasino | 1649 | Build the casino: 36.2% · Refuse: 34.0% · Casino night, once a year: 29.8% | 33.1% | 0.0% |
| mallParking | 4702 | Pave the park: - · Only half the park: - · Hands off the park: - | 0.0% | 100.0% |
| mascot | 1660 | Welcome, Wet Sock: 35.8% · Hire a real designer: 32.6% · No mascot: 31.6% | 33.0% | 0.0% |
| mimeStrike | 5000 | Notice them, with a banner: - · Negotiate in mime: - · Ignore the mimes: - | 0.0% | 100.0% |
| monsterPta | 403 | Welcome the monster: 48.4% · Monsters can't be parents: 51.6% | 46.2% | 0.0% |
| moonClaim | 3757 | Plant the flag: 33.6% · Sell the moon to Chad: 33.3% · Give the moon back: 33.1% | 33.5% | 0.0% |
| moonRent | 839 | Pay the moonlight bill: 51.5% · Charge him for the view: 48.5% | 43.0% | 0.0% |
| newSchool | 5000 | Build a new school: 34.2% · Promise it by spring: 32.5% · Buy a second book: 33.4% | 33.2% | 0.0% |
| nightLibrary | 5000 | Fund the night library: - · Let her run a 'truth club': - · Libraries close at five: - | 0.0% | 100.0% |
| parkingMeters | 5000 | Install meters: 31.3% · Meters for visitors only: 35.9% · Free parking forever: 32.7% | 33.8% | 0.0% |
| parkWifi | 4991 | Free park wifi: 32.5% · Wifi with Chad's ads: 33.3% · Go outside and play: 34.1% | 29.5% | 0.0% |
| pettyCrime | 26101 | Pay for overtime: 50.1% · Blame the next town over: 49.9% | 44.5% | 0.0% |
| pigeonAide | 4993 | Hire the pigeon: - · Let it sign today's stack: - · Evict the pigeon: - | 0.0% | 100.0% |
| policeDog | 4927 | Buy a braver dog: - · Therapy for the old dog: - · One scared dog is plenty: - | 0.0% | 100.0% |
| raccoonBins | 5000 | Raccoon-proof bins: 34.3% · Night patrols: 32.2% · They live here too: 33.5% | 30.9% | 0.0% |
| radar | 1521 | Buy the radar: 34.7% · Promise it next quarter: 31.1% · The finger is fine: 34.2% | 30.7% | 0.0% |
| rocketLibrary | 1081 | Rebuild the library: 51.4% · Leave the rocket in: 48.6% | 45.4% | 0.0% |
| roundabout | 4996 | Rescue the drivers: - · Sell tickets to watch: - · It's working as intended: - | 0.0% | 100.0% |
| schoolLunch | 1924 | Pay for real food: 34.5% · Chad sponsors lunch: 33.0% · Paste builds character: 32.6% | 33.3% | 0.0% |
| secretStranger | 518 | Expose him in The Bugle: 52.6% · Take his hush money: 47.4% | 40.5% | 0.0% |
| speedTrap | 4848 | Approve the speed trap: 33.4% · Warning signs only: 32.8% · No speed trap: 33.8% | 29.4% | 0.0% |
| statue | 5000 | Accept the statue: - · A statue of someone normal: - · No statues: - | 0.0% | 100.0% |
| strangerPrice | 4651 | Name a silly price: 33.8% · Throw him out: 34.1% · Hear him out: 32.1% | 29.0% | 0.0% |
| talentShow | 2193 | Judge honestly: 34.6% · Everyone wins: 34.6% · Send Dave: 30.8% | 32.5% | 0.0% |
| taxBreak | 5000 | Grant the tax break: 33.1% · Trade it for a donation: 33.0% · Refuse: 33.8% | 31.2% | 0.0% |
| theWhistle | 4917 | Shut down The Whistle: 34.1% · Buy The Whistle: 32.8% · A free press is good: 33.1% | 27.2% | 0.0% |
| timeCapsule | 5000 | Settle with Chad: 34.4% · Bury it again, deeper: 32.8% · Frame the note: 32.8% | 27.8% | 0.0% |
| tvStation | 4995 | Build the station: 33.4% · Lend her the roof: 34.2% · Refuse: 32.4% | 30.0% | 0.0% |
| twinTown | 1481 | Throw a welcome party: 33.7% · Show them the pothole: 29.8% · Lock the gates: 36.5% | 34.0% | 0.0% |

## sensible

Projects built (share of terms): school 82.4%, pond 57.7%, spoon 12.6%, tv 2.6%, casino 0.2%, helicopter 0.1%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| auditor | 5000 | Open the books: 48.2% · Bribe him with cheese: 20.2% · Let Dave handle the audit: 31.7% | 0.0% | 2.3% |
| bankError | 2591 | Keep it quiet: 1.5% · Give it back: 75.3% · Split it with Chad: 23.2% | 0.2% | 9.9% |
| bearStory | 5000 | Yes, I wrestled a bear: 77.1% · Tell the truth: 22.9% | 0.1% | 31.1% |
| billboard | 5000 | Allow the billboard: 53.6% · A small one, round the back: 44.4% · No billboard: 2.1% | 0.1% | 38.0% |
| bridge | 5000 | Repair the bridge: 68.6% · Promise repairs soon: 26.5% · Put up a 'Good Luck' sign: 5.0% | 0.0% | 9.9% |
| buglePress | 5000 | Buy a new press: 75.5% · Use the school copier: 21.3% · Not the town's problem: 3.2% | 0.0% | 6.4% |
| campaign | 2572 | Big rally: 28.1% · Call in every Favor: 3.7% · Attack ad about the cone: 43.2% · Just be yourself: 25.0% | 0.0% | 0.0% |
| campaignTruth | 2428 | 'At least I'm not a goose': 19.2% · Promise a recount: 71.7% · Big rally: 7.0% · Call in every Favor: 2.2% | 0.0% | 0.0% |
| casinoCrime | 12 | Ban Linda from blackjack: 8.3% · Make her head of security: 91.7% | 0.0% | 0.0% |
| chadRocket | 5000 | Clear the launch: 36.1% · Launch from your own lawn: 35.9% · No rockets near children: 28.0% | 0.1% | 27.1% |
| cheeseVault | 4038 | Sell it, fast: 37.4% · Throw a cheese festival: 21.4% · Seal the vault: 41.3% | 0.0% | 7.5% |
| coneRally | 5000 | Hold a bigger rally: 61.4% · Debate the cone, live: 35.7% · Have the cone towed: 2.9% | 0.0% | 0.2% |
| crossingGuard | 5000 | Hire a human: 96.5% · Gerald it is: 2.7% · Children can look both ways: 0.8% | 0.0% | 42.3% |
| curfew | 5000 | Curfew at 9 pm: 6.4% · Fund a youth centre: 83.1% · Let them stand: 10.5% | 0.1% | 26.2% |
| diaryLeak | 5000 | Apologise to everyone: 41.1% · Publish the whole diary: 56.2% · Blame the pigeon: 2.7% | 0.0% | 0.0% |
| duckDuel | 1913 | Back Gerald: 52.5% · Back the duck: 35.4% · Stay out of bird politics: 12.1% | 0.1% | 21.2% |
| entitled | 6316 | Free ice cream: 72.7% · Say no nicely: 27.3% | 0.0% | 8.5% |
| evBallots | 3538 | Tell the town: 71.6% · Put the boxes back: 28.4% | 4.1% | 0.0% |
| evBear | 2654 | Apologise to the bear: 34.7% · Wrestle it for real: 65.3% | 6.8% | 0.0% |
| evDebate | 5000 | Debate with facts: 48.6% · Debate with insults: 51.4% | 0.7% | 0.0% |
| evFair | 1462 | Eat for the town: 84.3% · Decline politely: 15.7% | 6.9% | 0.0% |
| evNote | 5000 | Go and look: 48.3% · Burn the note: 51.7% | 10.2% | 0.0% |
| evParade | 5000 | Ride the float anyway: 48.4% · Buy a new float: 51.6% | 0.5% | 0.0% |
| evPower | 2346 | Pay Chad's guy: 70.3% · Hand out candles: 29.7% | 2.6% | 0.0% |
| evStorm | 5000 | Buy sandbags: 57.0% · Ignore Steve: 43.0% | 2.7% | 0.0% |
| farmersMarket | 5000 | Protect the market: 29.4% · Ban the market: 41.3% · Market pays a fee: 29.3% | 0.0% | 15.3% |
| festival | 5000 | Fund Frog Day: 19.5% · Promise Frog Day soon: 49.1% · No Frog Day: 31.3% | 4.8% | 11.4% |
| fireworks | 4297 | Fireworks for Timmy: 51.3% · One sparkler: 46.6% · No fireworks: 2.2% | 0.0% | 33.0% |
| flood | 5000 | Rent the pumps: 47.0% · Rename it 'Little Venice': 48.7% · Wait for it to dry: 4.3% | 0.0% | 0.0% |
| giantSpoon | 3556 | Build the spoon: 27.0% · A normal-sized spoon: 57.1% · No spoon: 15.9% | 0.1% | 34.2% |
| gooseOccupation | 1083 | Pay them off in bread: 90.9% · Send Chief Barb: 9.1% | 0.0% | 10.6% |
| goosePond | 5000 | Build the pond: 60.1% · Pond in the park instead: 27.1% · Refuse: 12.8% | 0.0% | 4.0% |
| gooseStrike | 5000 | Meet their demands: 65.5% · Hire ducks instead: 31.3% · Wait them out: 3.3% | 0.0% | 3.1% |
| haunted | 5000 | Fund the ghost hunt: 67.5% · Seal the basement: 19.0% · There's nothing down there: 13.5% | 0.0% | 29.4% |
| heatwave | 5000 | Fix the pool: 48.7% · Sprinklers on Main Street: 42.6% · Tell them to drink water: 8.7% | 1.3% | 55.9% |
| helicopter | 5000 | Buy it: 2.6% · Lease one: 40.0% · Promise it next quarter: 57.4% | 6.0% | 91.7% |
| lakeMonster | 1179 | Put it on the brochure: 46.0% · Protect its privacy: 45.9% · There is no monster: 8.1% | 0.3% | 25.2% |
| libraryCasino | 803 | Build the casino: 4.7% · Refuse: 55.7% · Casino night, once a year: 39.5% | 4.9% | 63.6% |
| mallParking | 5000 | Pave the park: 78.3% · Only half the park: 19.2% · Hands off the park: 2.6% | 0.2% | 20.1% |
| mascot | 3072 | Welcome, Wet Sock: 87.7% · Hire a real designer: 9.2% · No mascot: 3.1% | 1.1% | 19.8% |
| mimeStrike | 5000 | Notice them, with a banner: 75.7% · Negotiate in mime: 21.3% · Ignore the mimes: 3.0% | 0.0% | 3.7% |
| monsterPta | 404 | Welcome the monster: 79.9% · Monsters can't be parents: 20.1% | 0.0% | 10.1% |
| moonClaim | 3111 | Plant the flag: 42.5% · Sell the moon to Chad: 32.0% · Give the moon back: 25.5% | 0.1% | 46.1% |
| moonRent | 712 | Pay the moonlight bill: 62.3% · Charge him for the view: 37.7% | 0.0% | 2.4% |
| newSchool | 5000 | Build a new school: 82.4% · Promise it by spring: 10.3% · Buy a second book: 7.3% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 16.2% · Let her run a 'truth club': 80.8% · Libraries close at five: 3.1% | 1.0% | 42.7% |
| parkingMeters | 5000 | Install meters: 0.9% · Meters for visitors only: 9.7% · Free parking forever: 89.5% | 0.0% | 15.6% |
| parkWifi | 5000 | Free park wifi: 17.7% · Wifi with Chad's ads: 55.3% · Go outside and play: 26.9% | 0.1% | 73.2% |
| pettyCrime | 18853 | Pay for overtime: 72.8% · Blame the next town over: 27.2% | 0.0% | 1.6% |
| pigeonAide | 5000 | Hire the pigeon: 68.0% · Let it sign today's stack: 13.7% · Evict the pigeon: 18.3% | 0.1% | 20.0% |
| policeDog | 5000 | Buy a braver dog: 8.7% · Therapy for the old dog: 87.3% · One scared dog is plenty: 4.0% | 2.1% | 29.9% |
| raccoonBins | 5000 | Raccoon-proof bins: 76.0% · Night patrols: 16.5% · They live here too: 7.5% | 0.4% | 49.9% |
| radar | 1618 | Buy the radar: 63.8% · Promise it next quarter: 31.4% · The finger is fine: 4.8% | 1.4% | 62.2% |
| rocketLibrary | 1313 | Rebuild the library: 91.4% · Leave the rocket in: 8.6% | 0.0% | 0.0% |
| roundabout | 5000 | Rescue the drivers: 47.5% · Sell tickets to watch: 39.6% · It's working as intended: 12.9% | 0.0% | 5.1% |
| scandal | 6 | Own it: 80.0% · Bury the story: 20.0% | 0.0% | 16.7% |
| schoolLunch | 1931 | Pay for real food: 49.6% · Chad sponsors lunch: 42.8% · Paste builds character: 7.6% | 0.0% | 3.1% |
| secretStranger | 2428 | Expose him in The Bugle: 95.7% · Take his hush money: 4.3% | 0.0% | 1.7% |
| speedTrap | 5000 | Approve the speed trap: 15.5% · Warning signs only: 48.7% · No speed trap: 35.8% | 1.3% | 32.3% |
| statue | 5000 | Accept the statue: 12.5% · A statue of someone normal: 80.0% · No statues: 7.6% | 0.0% | 48.7% |
| strangerPrice | 5000 | Name a silly price: 53.8% · Throw him out: 35.7% · Hear him out: 10.5% | 0.1% | 37.9% |
| talentShow | 4068 | Judge honestly: 13.5% · Everyone wins: 37.0% · Send Dave: 49.5% | 0.0% | 1.3% |
| taxBreak | 5000 | Grant the tax break: 22.7% · Trade it for a donation: 66.6% · Refuse: 10.8% | 1.6% | 51.5% |
| theWhistle | 5000 | Shut down The Whistle: 32.2% · Buy The Whistle: 41.4% · A free press is good: 26.4% | 0.7% | 51.5% |
| timeCapsule | 5000 | Settle with Chad: 72.6% · Bury it again, deeper: 15.3% · Frame the note: 12.1% | 0.0% | 11.1% |
| tvStation | 5000 | Build the station: 9.2% · Lend her the roof: 88.2% · Refuse: 2.6% | 0.1% | 71.4% |
| twinTown | 1696 | Throw a welcome party: 77.4% · Show them the pothole: 21.2% · Lock the gates: 1.4% | 0.0% | 4.3% |
