# Balance report: pack `week1`

5000 terms per policy. Tuning: {"people":0.5,"press":0.2,"business":0.1,"law":0.1,"objective":2,"brokenPromise":-4,"min":5,"max":95}.

| Policy | Win rate | Target | Mean vote | Vote p10 / p50 / p90 | Recalled | Bankrupt | Term ended early | Ending money $k p10 / p50 / p90 |
|---|---|---|---|---|---|---|---|---|
| random | 0.3% | on target | 21.6 | 9 / 22 / 33 | 93.0% | 0.1% | 2.6% | 9 / 39 / 96 |
| greedy-approval | 70.4% |  | 56.7 | 43 / 56 / 72 | 71.5% | 71.4% | 0.2% | -46 / -31 / 4 |
| miser | 0.0% |  | 16.0 | 5 / 19 / 19 | 100.0% | 0.0% | 76.7% | 20 / 20 / 145 |
| people-pleaser | 76.7% |  | 53.2 | 39 / 56 / 64 | 58.1% | 45.2% | 0.1% | -49 / -45 / 0 |
| dave-only | 0.0% | **off target** (5-10%) | 22.3 | 13 / 23 / 31 | 84.7% | 0.0% | 0.9% | 33 / 65 / 178 |
| sensible | 96.8% | **off target** (55-65%) | 64.2 | 54 / 65 / 74 | 0.0% | 0.0% | 0.0% | 21 / 44 / 83 |
| | | recalls on target (under 25%) | | | | | | |

## Non-dilemmas and other flags (sensible bot)

- `bankError`: "Keep it quiet" chosen 2% of the time (under 5%)
- `billboard`: "No billboard" chosen 3% of the time (under 5%)
- `bridge`: "Put up a 'Good Luck' sign" chosen 5% of the time (under 5%)
- `buglePress`: "Not the town's problem" chosen 3% of the time (under 5%)
- `campaignTruth`: "Call in every Favor" chosen 3% of the time (under 5%)
- `casinoCrime`: "Make her head of security" chosen 89% of the time (over 85%)
- `crossingGuard`: "Children can look both ways" chosen 0% of the time (under 5%)
- `entitled`: "Free ice cream" chosen 86% of the time (over 85%)
- `festival`: "No Frog Day" chosen 1% of the time (under 5%)
- `fireworks`: "No fireworks" chosen 2% of the time (under 5%)
- `gooseOccupation`: "Pay them off in bread" chosen 98% of the time (over 85%)
- `gooseOccupation`: "Send Chief Barb" chosen 2% of the time (under 5%)
- `gooseStrike`: "Wait them out" chosen 1% of the time (under 5%)
- `heatwave`: "Tell them to drink water" chosen 1% of the time (under 5%)
- `libraryCasino`: "Build the casino" chosen 4% of the time (under 5%)
- `mascot`: "Welcome, Wet Sock" chosen 93% of the time (over 85%)
- `mascot`: "No mascot" chosen 1% of the time (under 5%)
- `nightLibrary`: "Libraries close at five" chosen 4% of the time (under 5%)
- `parkingMeters`: "Install meters" chosen 1% of the time (under 5%)
- `parkingMeters`: "Free parking forever" chosen 90% of the time (over 85%)
- `pothole`: "Fill in Kevin" chosen 88% of the time (over 85%)
- `pothole`: "Leave Kevin alone" chosen 1% of the time (under 5%)
- `raccoonBins`: "They live here too" chosen 3% of the time (under 5%)
- `radar`: "The finger is fine" chosen 4% of the time (under 5%)
- `schoolLunch`: "Paste builds character" chosen 3% of the time (under 5%)
- `secretStranger`: "Expose him in The Bugle" chosen 94% of the time (over 85%)
- `statue`: "No statues" chosen 4% of the time (under 5%)
- `strangerPrice`: "Hear him out" chosen 2% of the time (under 5%)
- `theWhistle`: "A free press is good" chosen 5% of the time (under 5%)
- `tvStation`: "Refuse" chosen 1% of the time (under 5%)

## Unreachable desk cards (never drawn by any policy)

- `scandal`
- `buyout`
- `overreach`
- `goldenGoose`

## random

Projects built (share of terms): casino 19.3%, pond 15.9%, helicopter 15.8%, spoon 15.2%, tv 15.1%, school 14.5%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| bankError | 4999 | Keep it quiet: 37.6% · Give it back: 37.3% · Split it with Chad: 25.0% | 41.4% | 13.5% |
| bearStory | 1384 | Yes, I wrestled a bear: 48.7% · Tell the truth: 51.3% | 49.5% | 16.1% |
| billboard | 5000 | Allow the billboard: 34.3% · A small one, round the back: 32.4% · No billboard: 33.3% | 38.5% | 13.6% |
| bridge | 2216 | Repair the bridge: 32.1% · Promise repairs soon: 33.4% · Put up a 'Good Luck' sign: 34.5% | 42.2% | 14.3% |
| buglePress | 4964 | Buy a new press: 32.7% · Use the school copier: 32.9% · Not the town's problem: 34.4% | 42.5% | 12.1% |
| campaign | 4070 | Big rally: 28.7% · Call in every Favor: 11.3% · Attack ad about the cone: 30.0% · Just be yourself: 30.0% | 0.0% | 0.0% |
| campaignTruth | 800 | 'At least I'm not a goose': 28.8% · Promise a recount: 28.1% · Big rally: 30.9% · Call in every Favor: 12.3% | 0.0% | 0.0% |
| casinoCrime | 903 | Ban Linda from blackjack: 49.4% · Make her head of security: 50.6% | 44.7% | 16.5% |
| crossingGuard | 5000 | Hire a human: 31.8% · Gerald it is: 34.1% · Children can look both ways: 34.0% | 30.0% | 13.4% |
| curfew | 4968 | Curfew at 9 pm: 35.3% · Fund a youth centre: 33.0% · Let them stand: 31.7% | 43.9% | 12.0% |
| entitled | 3 | Free ice cream: 0.0% · Say no nicely: 100.0% | 33.3% | 33.3% |
| evBallots | 1994 | Tell the town: 52.2% · Put the boxes back: 47.8% | 20.2% | 0.0% |
| evBear | 232 | Apologise to the bear: 47.8% · Wrestle it for real: 52.2% | 20.7% | 0.0% |
| evDebate | 4946 | Debate with facts: 50.2% · Debate with insults: 49.8% | 19.4% | 0.0% |
| evFair | 3003 | Eat for the town: 49.2% · Decline politely: 50.8% | 19.4% | 0.0% |
| evNote | 5000 | Go and look: 50.4% · Burn the note: 49.6% | 20.8% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.9% · Buy a new float: 49.1% | 20.0% | 0.0% |
| evPower | 4768 | Pay Chad's guy: 50.5% · Hand out candles: 49.5% | 19.9% | 0.0% |
| evStorm | 5000 | Buy sandbags: 49.4% · Ignore Steve: 50.6% | 20.7% | 0.0% |
| farmersMarket | 5000 | Protect the market: 35.8% · Ban the market: 35.9% · Market pays a fee: 28.3% | 40.1% | 13.4% |
| festival | 5000 | Fund Frog Day: 32.8% · Promise Frog Day soon: 34.9% · No Frog Day: 32.3% | 37.2% | 12.9% |
| fireworks | 1461 | Fireworks for Timmy: 35.7% · One sparkler: 34.3% · No fireworks: 30.0% | 40.8% | 11.5% |
| giantSpoon | 5000 | Build the spoon: 33.9% · A normal-sized spoon: 32.7% · No spoon: 33.4% | 42.1% | 13.1% |
| gooseOccupation | 3868 | Pay them off in bread: 51.6% · Send Chief Barb: 48.4% | 51.7% | 16.1% |
| goosePond | 5000 | Build the pond: 34.9% · Pond in the park instead: 31.9% · Refuse: 33.3% | 41.9% | 12.4% |
| gooseStrike | 5000 | Meet their demands: 33.0% · Hire ducks instead: 34.3% · Wait them out: 32.7% | 29.6% | 13.3% |
| haunted | 1648 | Fund the ghost hunt: 33.5% · Seal the basement: 34.8% · There's nothing down there: 31.7% | 46.0% | 12.9% |
| heatwave | 3236 | Fix the pool: 33.4% · Sprinklers on Main Street: 31.6% · Tell them to drink water: 35.0% | 45.3% | 12.9% |
| helicopter | 5000 | Buy it: 33.6% · Lease one: 33.4% · Promise it next quarter: 33.0% | 41.0% | 11.9% |
| libraryCasino | 5000 | Build the casino: 33.4% · Refuse: 34.4% · Casino night, once a year: 32.2% | 29.5% | 12.8% |
| mallParking | 1685 | Pave the park: 34.5% · Only half the park: 33.7% · Hands off the park: 31.8% | 37.2% | 12.9% |
| mascot | 4993 | Welcome, Wet Sock: 32.6% · Hire a real designer: 34.3% · No mascot: 33.1% | 42.0% | 13.1% |
| newSchool | 5000 | Build a new school: 32.7% · Promise it by spring: 34.5% · Buy a second book: 32.8% | 42.8% | 12.8% |
| nightLibrary | 5000 | Fund the night library: 37.3% · Let her run a 'truth club': 25.1% · Libraries close at five: 37.6% | 41.4% | 12.3% |
| parkingMeters | 2176 | Install meters: 34.5% · Meters for visitors only: 31.6% · Free parking forever: 33.9% | 43.3% | 13.1% |
| parkWifi | 1804 | Free park wifi: 32.5% · Wifi with Chad's ads: 35.3% · Go outside and play: 32.2% | 43.5% | 14.0% |
| pettyCrime | 25692 | Pay for overtime: 49.2% · Blame the next town over: 50.8% | 48.8% | 15.8% |
| policeDog | 5000 | Buy a braver dog: 33.9% · Therapy for the old dog: 33.3% · One scared dog is plenty: 32.8% | 29.9% | 12.7% |
| pothole | 5000 | Fill in Kevin: 36.0% · Sell tickets to see Kevin: 29.5% · Leave Kevin alone: 34.6% | 42.6% | 12.3% |
| raccoonBins | 2097 | Raccoon-proof bins: 34.7% · Night patrols: 33.0% · They live here too: 32.3% | 42.9% | 13.1% |
| radar | 4915 | Buy the radar: 33.4% · Promise it next quarter: 33.5% · The finger is fine: 33.1% | 42.4% | 12.5% |
| schoolLunch | 2215 | Pay for real food: 33.5% · Chad sponsors lunch: 34.0% · Paste builds character: 32.6% | 39.0% | 12.5% |
| secretStranger | 395 | Expose him in The Bugle: 53.3% · Take his hush money: 46.7% | 46.3% | 19.5% |
| snowplow | 4990 | Plow the school road: 32.8% · Plow Chad Street: 34.7% · Rent a second plow: 32.5% | 41.3% | 12.5% |
| speedTrap | 5000 | Approve the speed trap: 32.3% · Warning signs only: 34.0% · No speed trap: 33.7% | 43.3% | 12.6% |
| statue | 4926 | Accept the statue: 33.5% · A statue of someone normal: 33.7% · No statues: 32.8% | 44.1% | 11.9% |
| strangerPrice | 4088 | Name a silly price: 34.0% · Throw him out: 31.9% · Hear him out: 34.2% | 31.7% | 13.7% |
| talentShow | 5000 | Judge honestly: 32.8% · Everyone wins: 33.4% · Send Dave: 33.8% | 30.5% | 13.4% |
| taxBreak | 5000 | Grant the tax break: 33.8% · Trade it for a donation: 31.6% · Refuse: 34.7% | 37.8% | 12.4% |
| theWhistle | 5000 | Shut down The Whistle: 33.4% · Buy The Whistle: 33.4% · A free press is good: 33.2% | 43.7% | 13.0% |
| tvStation | 5000 | Build the station: 32.9% · Lend her the roof: 33.9% · Refuse: 33.2% | 42.7% | 11.5% |

## greedy-approval

Projects built (share of terms): school 100.0%, pond 99.0%, helicopter 0.5%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| bankError | 5000 | Keep it quiet: 0.0% · Give it back: 100.0% · Split it with Chad: 0.0% | 0.0% | 43.0% |
| bearStory | 1434 | Yes, I wrestled a bear: - · Tell the truth: - | 0.0% | 100.0% |
| billboard | 5000 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 99.9% |
| bridge | 1685 | Repair the bridge: 31.2% · Promise repairs soon: 68.8% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| buglePress | 5000 | Buy a new press: 46.0% · Use the school copier: 54.0% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| campaignTruth | 4992 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| crossingGuard | 5000 | Hire a human: 100.0% · Gerald it is: 0.0% · Children can look both ways: 0.0% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 82.6% · Fund a youth centre: 17.4% · Let them stand: 0.0% | 0.0% | 78.0% |
| entitled | 8119 | Free ice cream: 58.3% · Say no nicely: 41.7% | 0.0% | 38.4% |
| evBallots | 5000 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evDebate | 5000 | Debate with facts: 100.0% · Debate with insults: 0.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 5000 | Pay Chad's guy: 61.6% · Hand out candles: 38.4% | 12.6% | 0.0% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| farmersMarket | 5000 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| festival | 5000 | Fund Frog Day: 100.0% · Promise Frog Day soon: 0.0% · No Frog Day: 0.0% | 0.0% | 0.0% |
| fireworks | 1406 | Fireworks for Timmy: 67.7% · One sparkler: 32.3% · No fireworks: 0.0% | 0.0% | 0.3% |
| giantSpoon | 5000 | Build the spoon: 0.0% · A normal-sized spoon: 100.0% · No spoon: 0.0% | 0.0% | 14.6% |
| goosePond | 5000 | Build the pond: 99.0% · Pond in the park instead: 1.0% · Refuse: 0.0% | 0.0% | 0.0% |
| gooseStrike | 5000 | Meet their demands: 100.0% · Hire ducks instead: 0.0% · Wait them out: 0.0% | 0.0% | 0.0% |
| heatwave | 5000 | Fix the pool: 100.0% · Sprinklers on Main Street: 0.0% · Tell them to drink water: 0.0% | 0.0% | 0.0% |
| helicopter | 5000 | Buy it: 0.8% · Lease one: 99.2% · Promise it next quarter: 0.0% | 0.0% | 40.6% |
| libraryCasino | 5000 | Build the casino: - · Refuse: - · Casino night, once a year: - | 0.0% | 100.0% |
| mallParking | 5000 | Pave the park: - · Only half the park: - · Hands off the park: - | 0.0% | 100.0% |
| mascot | 5000 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 49.2% |
| newSchool | 5000 | Build a new school: 100.0% · Promise it by spring: 0.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 0.0% · Let her run a 'truth club': 100.0% · Libraries close at five: 0.0% | 0.0% | 0.1% |
| parkingMeters | 4318 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 98.9% |
| parkWifi | 2157 | Free park wifi: 73.2% · Wifi with Chad's ads: 26.8% · Go outside and play: 0.0% | 0.0% | 11.5% |
| pettyCrime | 15838 | Pay for overtime: 58.6% · Blame the next town over: 41.4% | 0.0% | 27.2% |
| policeDog | 5000 | Buy a braver dog: 100.0% · Therapy for the old dog: 0.0% · One scared dog is plenty: 0.0% | 0.0% | 0.0% |
| pothole | 5000 | Fill in Kevin: 93.3% · Sell tickets to see Kevin: 6.7% · Leave Kevin alone: 0.0% | 0.0% | 1.4% |
| raccoonBins | 387 | Raccoon-proof bins: 100.0% · Night patrols: 0.0% · They live here too: 0.0% | 0.0% | 94.3% |
| radar | 5000 | Buy the radar: 43.9% · Promise it next quarter: 56.1% · The finger is fine: 0.0% | 0.0% | 0.0% |
| schoolLunch | 1035 | Pay for real food: 100.0% · Chad sponsors lunch: 0.0% · Paste builds character: 0.0% | 0.0% | 27.9% |
| secretStranger | 3621 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| snowplow | 5000 | Plow the school road: 55.1% · Plow Chad Street: 0.0% · Rent a second plow: 44.9% | 0.0% | 0.0% |
| speedTrap | 5000 | Approve the speed trap: - · Warning signs only: - · No speed trap: - | 0.0% | 100.0% |
| statue | 5000 | Accept the statue: 0.0% · A statue of someone normal: 100.0% · No statues: 0.0% | 0.0% | 92.6% |
| strangerPrice | 5000 | Name a silly price: - · Throw him out: - · Hear him out: - | 0.0% | 100.0% |
| talentShow | 5000 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 5000 | Grant the tax break: 100.0% · Trade it for a donation: 0.0% · Refuse: 0.0% | 0.0% | 0.0% |
| theWhistle | 5000 | Shut down The Whistle: 0.0% · Buy The Whistle: 100.0% · A free press is good: 0.0% | 0.0% | 84.3% |
| tvStation | 5000 | Build the station: 0.0% · Lend her the roof: 100.0% · Refuse: 0.0% | 0.0% | 15.7% |

## miser

Projects built (share of terms): casino 100.0%, spoon 89.6%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| bankError | 4998 | Keep it quiet: 100.0% · Give it back: 0.0% · Split it with Chad: 0.0% | 0.0% | 0.0% |
| bearStory | 1807 | Yes, I wrestled a bear: - · Tell the truth: - | 100.0% | 0.0% |
| billboard | 5000 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 0.0% |
| bridge | 490 | Repair the bridge: - · Promise repairs soon: - · Put up a 'Good Luck' sign: - | 100.0% | 0.0% |
| buglePress | 3852 | Buy a new press: - · Use the school copier: - · Not the town's problem: - | 0.0% | 100.0% |
| campaign | 1166 | Big rally: 0.0% · Call in every Favor: 5.5% · Attack ad about the cone: 0.0% · Just be yourself: 94.5% | 0.0% | 0.0% |
| casinoCrime | 4843 | Ban Linda from blackjack: - · Make her head of security: - | 100.0% | 0.0% |
| crossingGuard | 5000 | Hire a human: - · Gerald it is: - · Children can look both ways: - | 100.0% | 0.0% |
| curfew | 3766 | Curfew at 9 pm: - · Fund a youth centre: - · Let them stand: - | 100.0% | 0.0% |
| evDebate | 3052 | Debate with facts: - · Debate with insults: - | 100.0% | 0.0% |
| evFair | 4918 | Eat for the town: - · Decline politely: - | 100.0% | 0.0% |
| evNote | 5000 | Go and look: - · Burn the note: - | 100.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: - · Buy a new float: - | 100.0% | 0.0% |
| evPower | 5000 | Pay Chad's guy: - · Hand out candles: - | 100.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: - · Ignore Steve: - | 100.0% | 0.0% |
| farmersMarket | 5000 | Protect the market: 0.0% · Ban the market: 0.0% · Market pays a fee: 100.0% | 0.0% | 99.9% |
| festival | 5000 | Fund Frog Day: - · Promise Frog Day soon: - · No Frog Day: - | 0.0% | 100.0% |
| fireworks | 939 | Fireworks for Timmy: - · One sparkler: - · No fireworks: - | 100.0% | 0.0% |
| giantSpoon | 5000 | Build the spoon: 100.0% · A normal-sized spoon: 0.0% · No spoon: 0.0% | 10.4% | 0.0% |
| goosePond | 5000 | Build the pond: - · Pond in the park instead: - · Refuse: - | 0.0% | 100.0% |
| gooseStrike | 5000 | Meet their demands: - · Hire ducks instead: - · Wait them out: - | 0.0% | 100.0% |
| haunted | 2323 | Fund the ghost hunt: - · Seal the basement: - · There's nothing down there: - | 100.0% | 0.0% |
| heatwave | 145 | Fix the pool: - · Sprinklers on Main Street: - · Tell them to drink water: - | 100.0% | 0.0% |
| helicopter | 5000 | Buy it: - · Lease one: - · Promise it next quarter: - | 0.0% | 100.0% |
| libraryCasino | 5000 | Build the casino: 100.0% · Refuse: 0.0% · Casino night, once a year: 0.0% | 0.0% | 0.0% |
| mascot | 4557 | Welcome, Wet Sock: - · Hire a real designer: - · No mascot: - | 100.0% | 0.0% |
| newSchool | 5000 | Build a new school: - · Promise it by spring: - · Buy a second book: - | 0.0% | 100.0% |
| nightLibrary | 4992 | Fund the night library: - · Let her run a 'truth club': - · Libraries close at five: - | 0.0% | 100.0% |
| parkingMeters | 532 | Install meters: 100.0% · Meters for visitors only: 0.0% · Free parking forever: 0.0% | 0.0% | 0.0% |
| parkWifi | 11 | Free park wifi: - · Wifi with Chad's ads: - · Go outside and play: - | 100.0% | 0.0% |
| pettyCrime | 31513 | Pay for overtime: - · Blame the next town over: - | 100.0% | 0.0% |
| policeDog | 5000 | Buy a braver dog: - · Therapy for the old dog: - · One scared dog is plenty: - | 100.0% | 0.0% |
| pothole | 5000 | Fill in Kevin: 0.0% · Sell tickets to see Kevin: 100.0% · Leave Kevin alone: 0.0% | 0.0% | 0.0% |
| raccoonBins | 1833 | Raccoon-proof bins: - · Night patrols: - · They live here too: - | 100.0% | 0.0% |
| radar | 1814 | Buy the radar: - · Promise it next quarter: - · The finger is fine: - | 0.0% | 100.0% |
| schoolLunch | 1678 | Pay for real food: - · Chad sponsors lunch: - · Paste builds character: - | 100.0% | 0.0% |
| snowplow | 4611 | Plow the school road: - · Plow Chad Street: - · Rent a second plow: - | 0.0% | 100.0% |
| speedTrap | 5000 | Approve the speed trap: 100.0% · Warning signs only: 0.0% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 2582 | Accept the statue: 100.0% · A statue of someone normal: 0.0% · No statues: 0.0% | 0.0% | 0.0% |
| strangerPrice | 3884 | Name a silly price: 0.0% · Throw him out: 0.0% · Hear him out: 100.0% | 0.0% | 0.0% |
| talentShow | 5000 | Judge honestly: - · Everyone wins: - · Send Dave: - | 0.0% | 100.0% |
| taxBreak | 5000 | Grant the tax break: 0.0% · Trade it for a donation: 100.0% · Refuse: 0.0% | 0.0% | 0.0% |
| theWhistle | 5000 | Shut down The Whistle: - · Buy The Whistle: - · A free press is good: - | 0.0% | 100.0% |
| tvStation | 5000 | Build the station: - · Lend her the roof: - · Refuse: - | 100.0% | 0.0% |

## people-pleaser

Projects built (share of terms): school 100.0%, pond 100.0%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| bankError | 5000 | Keep it quiet: 0.0% · Give it back: 0.0% · Split it with Chad: 100.0% | 0.0% | 82.0% |
| bearStory | 17 | Yes, I wrestled a bear: 0.0% · Tell the truth: 100.0% | 0.0% | 0.0% |
| billboard | 5000 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 99.9% |
| bridge | 285 | Repair the bridge: 93.7% · Promise repairs soon: 6.3% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| buglePress | 5000 | Buy a new press: 100.0% · Use the school copier: 0.0% · Not the town's problem: 0.0% | 0.0% | 92.5% |
| campaign | 4996 | Big rally: 27.2% · Call in every Favor: 16.4% · Attack ad about the cone: 37.8% · Just be yourself: 18.6% | 0.0% | 0.0% |
| crossingGuard | 5000 | Hire a human: 100.0% · Gerald it is: 0.0% · Children can look both ways: 0.0% | 0.0% | 0.0% |
| curfew | 5000 | Curfew at 9 pm: 0.0% · Fund a youth centre: 43.3% · Let them stand: 56.7% | 0.0% | 0.0% |
| entitled | 19017 | Free ice cream: 69.2% · Say no nicely: 30.8% | 0.0% | 0.0% |
| evDebate | 4999 | Debate with facts: 0.0% · Debate with insults: 100.0% | 0.0% | 0.0% |
| evFair | 5000 | Eat for the town: 100.0% · Decline politely: 0.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: - · Burn the note: - | 100.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 5000 | Pay Chad's guy: 50.0% · Hand out candles: 50.0% | 17.9% | 0.0% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| farmersMarket | 5000 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| festival | 5000 | Fund Frog Day: 100.0% · Promise Frog Day soon: 0.0% · No Frog Day: 0.0% | 0.0% | 0.0% |
| fireworks | 757 | Fireworks for Timmy: 97.1% · One sparkler: 2.9% · No fireworks: 0.0% | 0.0% | 0.5% |
| giantSpoon | 5000 | Build the spoon: 0.0% · A normal-sized spoon: 100.0% · No spoon: 0.0% | 0.0% | 81.9% |
| goosePond | 5000 | Build the pond: 100.0% · Pond in the park instead: 0.0% · Refuse: 0.0% | 0.0% | 0.0% |
| gooseStrike | 5000 | Meet their demands: 100.0% · Hire ducks instead: 0.0% · Wait them out: 0.0% | 0.0% | 0.0% |
| haunted | 308 | Fund the ghost hunt: - · Seal the basement: - · There's nothing down there: - | 0.0% | 100.0% |
| heatwave | 2985 | Fix the pool: 100.0% · Sprinklers on Main Street: 0.0% · Tell them to drink water: 0.0% | 0.0% | 0.0% |
| helicopter | 5000 | Buy it: 0.0% · Lease one: 100.0% · Promise it next quarter: 0.0% | 0.0% | 93.2% |
| libraryCasino | 5000 | Build the casino: - · Refuse: - · Casino night, once a year: - | 0.0% | 100.0% |
| mallParking | 5000 | Pave the park: - · Only half the park: - · Hands off the park: - | 0.0% | 100.0% |
| mascot | 5000 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 70.2% |
| newSchool | 5000 | Build a new school: 100.0% · Promise it by spring: 0.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| nightLibrary | 5000 | Fund the night library: 0.0% · Let her run a 'truth club': 100.0% · Libraries close at five: 0.0% | 0.0% | 0.0% |
| parkingMeters | 211 | Install meters: - · Meters for visitors only: - · Free parking forever: - | 0.0% | 100.0% |
| parkWifi | 1487 | Free park wifi: 98.1% · Wifi with Chad's ads: 1.9% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 17554 | Pay for overtime: 54.5% · Blame the next town over: 45.5% | 0.0% | 31.4% |
| policeDog | 5000 | Buy a braver dog: 0.0% · Therapy for the old dog: 100.0% · One scared dog is plenty: 0.0% | 0.0% | 0.0% |
| pothole | 5000 | Fill in Kevin: 63.4% · Sell tickets to see Kevin: 36.6% · Leave Kevin alone: 0.0% | 0.0% | 0.0% |
| raccoonBins | 1569 | Raccoon-proof bins: 95.2% · Night patrols: 0.0% · They live here too: 4.8% | 0.0% | 0.0% |
| radar | 4998 | Buy the radar: 39.1% · Promise it next quarter: 60.9% · The finger is fine: 0.0% | 0.0% | 10.3% |
| schoolLunch | 808 | Pay for real food: 75.0% · Chad sponsors lunch: 25.0% · Paste builds character: 0.0% | 0.0% | 0.0% |
| snowplow | 5000 | Plow the school road: 100.0% · Plow Chad Street: 0.0% · Rent a second plow: 0.0% | 0.0% | 0.0% |
| speedTrap | 5000 | Approve the speed trap: 0.0% · Warning signs only: 100.0% · No speed trap: 0.0% | 0.0% | 98.8% |
| statue | 4998 | Accept the statue: 0.0% · A statue of someone normal: 100.0% · No statues: 0.0% | 0.0% | 72.9% |
| strangerPrice | 5000 | Name a silly price: - · Throw him out: - · Hear him out: - | 0.0% | 100.0% |
| talentShow | 5000 | Judge honestly: 0.0% · Everyone wins: 100.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 5000 | Grant the tax break: 0.0% · Trade it for a donation: 0.0% · Refuse: 100.0% | 0.0% | 0.0% |
| theWhistle | 5000 | Shut down The Whistle: 0.0% · Buy The Whistle: 27.1% · A free press is good: 72.9% | 0.0% | 0.0% |
| tvStation | 5000 | Build the station: 0.0% · Lend her the roof: 100.0% · Refuse: 0.0% | 0.0% | 77.4% |

## dave-only

Projects built (share of terms): tv 18.4%, school 18.0%, spoon 17.8%, casino 16.5%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| bankError | 5000 | Keep it quiet: 35.7% · Give it back: 34.8% · Split it with Chad: 29.5% | 45.4% | 0.0% |
| bearStory | 2239 | Yes, I wrestled a bear: 48.4% · Tell the truth: 51.6% | 58.7% | 0.0% |
| billboard | 5000 | Allow the billboard: - · A small one, round the back: - · No billboard: - | 0.0% | 100.0% |
| bridge | 1981 | Repair the bridge: 33.4% · Promise repairs soon: 31.9% · Put up a 'Good Luck' sign: 34.7% | 49.4% | 0.0% |
| buglePress | 4994 | Buy a new press: - · Use the school copier: - · Not the town's problem: - | 0.0% | 100.0% |
| campaign | 4628 | Big rally: 0.0% · Call in every Favor: 0.0% · Attack ad about the cone: 0.0% · Just be yourself: 100.0% | 0.0% | 0.0% |
| campaignTruth | 327 | 'At least I'm not a goose': 0.0% · Promise a recount: 0.0% · Big rally: 45.9% · Call in every Favor: 54.1% | 0.0% | 0.0% |
| casinoCrime | 801 | Ban Linda from blackjack: 47.4% · Make her head of security: 52.6% | 62.0% | 0.0% |
| crossingGuard | 5000 | Hire a human: 33.1% · Gerald it is: 33.6% · Children can look both ways: 33.3% | 47.7% | 0.0% |
| curfew | 4992 | Curfew at 9 pm: 33.2% · Fund a youth centre: 32.7% · Let them stand: 34.1% | 44.6% | 0.0% |
| evBallots | 1275 | Tell the town: 51.1% · Put the boxes back: 48.9% | 49.0% | 0.0% |
| evBear | 448 | Apologise to the bear: 46.8% · Wrestle it for real: 53.2% | 48.0% | 0.0% |
| evDebate | 4984 | Debate with facts: 50.0% · Debate with insults: 50.0% | 51.0% | 0.0% |
| evFair | 3724 | Eat for the town: 50.8% · Decline politely: 49.2% | 49.7% | 0.0% |
| evNote | 5000 | Go and look: 49.8% · Burn the note: 50.2% | 48.8% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.3% · Buy a new float: 49.7% | 50.1% | 0.0% |
| evPower | 4552 | Pay Chad's guy: 50.0% · Hand out candles: 50.0% | 50.2% | 0.0% |
| evStorm | 5000 | Buy sandbags: 50.4% · Ignore Steve: 49.6% | 50.8% | 0.0% |
| farmersMarket | 5000 | Protect the market: 35.2% · Ban the market: 34.5% · Market pays a fee: 30.2% | 44.3% | 0.0% |
| festival | 5000 | Fund Frog Day: - · Promise Frog Day soon: - · No Frog Day: - | 0.0% | 100.0% |
| fireworks | 1492 | Fireworks for Timmy: 34.6% · One sparkler: 33.8% · No fireworks: 31.6% | 48.5% | 0.0% |
| giantSpoon | 5000 | Build the spoon: 33.0% · A normal-sized spoon: 33.8% · No spoon: 33.2% | 46.1% | 0.0% |
| goosePond | 5000 | Build the pond: - · Pond in the park instead: - · Refuse: - | 0.0% | 100.0% |
| gooseStrike | 5000 | Meet their demands: - · Hire ducks instead: - · Wait them out: - | 0.0% | 100.0% |
| haunted | 1930 | Fund the ghost hunt: 32.6% · Seal the basement: 33.7% · There's nothing down there: 33.7% | 47.7% | 0.0% |
| heatwave | 3387 | Fix the pool: 33.4% · Sprinklers on Main Street: 35.2% · Tell them to drink water: 31.4% | 48.2% | 0.0% |
| helicopter | 5000 | Buy it: - · Lease one: - · Promise it next quarter: - | 0.0% | 100.0% |
| libraryCasino | 5000 | Build the casino: 33.7% · Refuse: 34.0% · Casino night, once a year: 32.3% | 51.2% | 0.0% |
| mallParking | 3439 | Pave the park: 34.7% · Only half the park: 32.1% · Hands off the park: 33.2% | 49.9% | 0.0% |
| mascot | 4999 | Welcome, Wet Sock: 32.1% · Hire a real designer: 33.9% · No mascot: 34.0% | 44.5% | 0.0% |
| newSchool | 5000 | Build a new school: 34.8% · Promise it by spring: 33.5% · Buy a second book: 31.7% | 48.2% | 0.0% |
| nightLibrary | 5000 | Fund the night library: - · Let her run a 'truth club': - · Libraries close at five: - | 0.0% | 100.0% |
| parkingMeters | 3018 | Install meters: 33.6% · Meters for visitors only: 31.9% · Free parking forever: 34.5% | 49.7% | 0.0% |
| parkWifi | 1684 | Free park wifi: 34.5% · Wifi with Chad's ads: 32.8% · Go outside and play: 32.8% | 51.8% | 0.0% |
| pettyCrime | 26400 | Pay for overtime: 49.4% · Blame the next town over: 50.6% | 59.1% | 0.0% |
| policeDog | 5000 | Buy a braver dog: 34.2% · Therapy for the old dog: 33.2% · One scared dog is plenty: 32.6% | 48.8% | 0.0% |
| pothole | 5000 | Fill in Kevin: 32.1% · Sell tickets to see Kevin: 31.9% · Leave Kevin alone: 36.0% | 41.6% | 0.0% |
| raccoonBins | 2130 | Raccoon-proof bins: 31.4% · Night patrols: 33.8% · They live here too: 34.8% | 50.3% | 0.0% |
| radar | 4981 | Buy the radar: - · Promise it next quarter: - · The finger is fine: - | 0.0% | 100.0% |
| schoolLunch | 2045 | Pay for real food: 32.5% · Chad sponsors lunch: 32.4% · Paste builds character: 35.2% | 50.0% | 0.0% |
| secretStranger | 162 | Expose him in The Bugle: 52.9% · Take his hush money: 47.1% | 56.8% | 0.0% |
| snowplow | 4999 | Plow the school road: - · Plow Chad Street: - · Rent a second plow: - | 0.0% | 100.0% |
| speedTrap | 5000 | Approve the speed trap: - · Warning signs only: - · No speed trap: - | 0.0% | 100.0% |
| statue | 4977 | Accept the statue: 32.6% · A statue of someone normal: 34.0% · No statues: 33.4% | 43.5% | 0.0% |
| strangerPrice | 4258 | Name a silly price: 32.3% · Throw him out: 34.0% · Hear him out: 33.7% | 51.1% | 0.0% |
| talentShow | 5000 | Judge honestly: - · Everyone wins: - · Send Dave: - | 0.0% | 100.0% |
| taxBreak | 5000 | Grant the tax break: 33.3% · Trade it for a donation: 33.5% · Refuse: 33.2% | 47.1% | 0.0% |
| theWhistle | 5000 | Shut down The Whistle: - · Buy The Whistle: - · A free press is good: - | 0.0% | 100.0% |
| tvStation | 5000 | Build the station: 33.0% · Lend her the roof: 33.0% · Refuse: 34.0% | 44.2% | 0.0% |

## sensible

Projects built (share of terms): pond 56.5%, school 37.1%, spoon 30.0%, tv 21.8%, helicopter 2.2%, casino 1.3%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| bankError | 5000 | Keep it quiet: 2.3% · Give it back: 78.4% · Split it with Chad: 19.3% | 1.1% | 34.4% |
| bearStory | 1851 | Yes, I wrestled a bear: 74.4% · Tell the truth: 25.6% | 0.1% | 10.0% |
| billboard | 5000 | Allow the billboard: 37.3% · A small one, round the back: 59.3% · No billboard: 3.4% | 1.4% | 66.0% |
| bridge | 2373 | Repair the bridge: 63.4% · Promise repairs soon: 32.0% · Put up a 'Good Luck' sign: 4.7% | 0.0% | 8.8% |
| buglePress | 5000 | Buy a new press: 68.8% · Use the school copier: 28.1% · Not the town's problem: 3.1% | 0.0% | 5.7% |
| campaign | 3118 | Big rally: 36.1% · Call in every Favor: 8.0% · Attack ad about the cone: 36.5% · Just be yourself: 19.4% | 0.0% | 0.0% |
| campaignTruth | 1882 | 'At least I'm not a goose': 18.8% · Promise a recount: 66.3% · Big rally: 11.8% · Call in every Favor: 3.1% | 0.0% | 0.0% |
| casinoCrime | 66 | Ban Linda from blackjack: 10.9% · Make her head of security: 89.1% | 0.0% | 3.0% |
| crossingGuard | 5000 | Hire a human: 80.3% · Gerald it is: 19.4% · Children can look both ways: 0.2% | 0.0% | 12.0% |
| curfew | 5000 | Curfew at 9 pm: 13.3% · Fund a youth centre: 78.9% · Let them stand: 7.9% | 0.2% | 74.1% |
| entitled | 5706 | Free ice cream: 86.3% · Say no nicely: 13.7% | 0.0% | 4.8% |
| evBallots | 2688 | Tell the town: 73.2% · Put the boxes back: 26.8% | 4.4% | 0.0% |
| evBear | 1239 | Apologise to the bear: 31.8% · Wrestle it for real: 68.2% | 3.1% | 0.0% |
| evDebate | 5000 | Debate with facts: 37.9% · Debate with insults: 62.1% | 0.5% | 0.0% |
| evFair | 2312 | Eat for the town: 81.5% · Decline politely: 18.5% | 5.5% | 0.0% |
| evNote | 5000 | Go and look: 58.3% · Burn the note: 41.7% | 7.8% | 0.0% |
| evParade | 5000 | Ride the float anyway: 46.4% · Buy a new float: 53.6% | 0.2% | 0.0% |
| evPower | 3761 | Pay Chad's guy: 72.6% · Hand out candles: 27.4% | 0.7% | 0.0% |
| evStorm | 5000 | Buy sandbags: 74.1% · Ignore Steve: 25.9% | 1.5% | 0.0% |
| farmersMarket | 5000 | Protect the market: 24.3% · Ban the market: 43.4% · Market pays a fee: 32.2% | 0.0% | 16.5% |
| festival | 5000 | Fund Frog Day: 61.5% · Promise Frog Day soon: 37.7% · No Frog Day: 0.8% | 0.0% | 1.3% |
| fireworks | 1959 | Fireworks for Timmy: 49.9% · One sparkler: 47.8% · No fireworks: 2.3% | 0.2% | 29.2% |
| giantSpoon | 5000 | Build the spoon: 54.8% · A normal-sized spoon: 34.8% · No spoon: 10.4% | 0.0% | 45.3% |
| gooseOccupation | 1315 | Pay them off in bread: 97.7% · Send Chief Barb: 2.3% | 0.0% | 1.5% |
| goosePond | 5000 | Build the pond: 63.3% · Pond in the park instead: 24.5% · Refuse: 12.1% | 0.0% | 10.8% |
| gooseStrike | 5000 | Meet their demands: 81.8% · Hire ducks instead: 17.1% · Wait them out: 1.2% | 0.0% | 0.1% |
| haunted | 1129 | Fund the ghost hunt: 64.5% · Seal the basement: 19.3% · There's nothing down there: 16.2% | 0.0% | 62.8% |
| heatwave | 3726 | Fix the pool: 80.0% · Sprinklers on Main Street: 19.5% · Tell them to drink water: 0.6% | 0.0% | 13.5% |
| helicopter | 5000 | Buy it: 22.2% · Lease one: 34.3% · Promise it next quarter: 43.5% | 0.4% | 89.7% |
| libraryCasino | 5000 | Build the casino: 4.1% · Refuse: 59.6% · Casino night, once a year: 36.3% | 0.0% | 68.0% |
| mallParking | 3908 | Pave the park: 20.5% · Only half the park: 47.8% · Hands off the park: 31.7% | 7.0% | 55.1% |
| mascot | 5000 | Welcome, Wet Sock: 93.4% · Hire a real designer: 5.8% · No mascot: 0.8% | 0.0% | 50.7% |
| newSchool | 5000 | Build a new school: 39.1% · Promise it by spring: 33.5% · Buy a second book: 27.4% | 0.0% | 5.1% |
| nightLibrary | 5000 | Fund the night library: 44.2% · Let her run a 'truth club': 52.3% · Libraries close at five: 3.5% | 0.3% | 56.3% |
| parkingMeters | 3301 | Install meters: 0.8% · Meters for visitors only: 9.0% · Free parking forever: 90.2% | 0.2% | 50.1% |
| parkWifi | 3333 | Free park wifi: 44.4% · Wifi with Chad's ads: 44.1% · Go outside and play: 11.5% | 0.2% | 15.7% |
| pettyCrime | 15498 | Pay for overtime: 84.4% · Blame the next town over: 15.6% | 0.0% | 1.5% |
| policeDog | 5000 | Buy a braver dog: 11.7% · Therapy for the old dog: 82.1% · One scared dog is plenty: 6.2% | 0.0% | 22.8% |
| pothole | 5000 | Fill in Kevin: 87.7% · Sell tickets to see Kevin: 11.3% · Leave Kevin alone: 1.0% | 0.0% | 2.0% |
| raccoonBins | 1979 | Raccoon-proof bins: 75.6% · Night patrols: 21.4% · They live here too: 3.0% | 1.5% | 32.6% |
| radar | 5000 | Buy the radar: 76.1% · Promise it next quarter: 20.1% · The finger is fine: 3.8% | 1.1% | 39.2% |
| schoolLunch | 2516 | Pay for real food: 84.9% · Chad sponsors lunch: 12.6% · Paste builds character: 2.5% | 0.0% | 6.6% |
| secretStranger | 1594 | Expose him in The Bugle: 94.0% · Take his hush money: 6.0% | 0.0% | 13.3% |
| snowplow | 5000 | Plow the school road: 18.9% · Plow Chad Street: 17.5% · Rent a second plow: 63.5% | 0.0% | 22.5% |
| speedTrap | 5000 | Approve the speed trap: 14.2% · Warning signs only: 64.9% · No speed trap: 20.8% | 0.0% | 77.5% |
| statue | 5000 | Accept the statue: 54.6% · A statue of someone normal: 41.6% · No statues: 3.8% | 1.7% | 47.3% |
| strangerPrice | 4746 | Name a silly price: 63.8% · Throw him out: 34.1% · Hear him out: 2.1% | 0.0% | 79.1% |
| talentShow | 5000 | Judge honestly: 6.7% · Everyone wins: 35.1% · Send Dave: 58.2% | 0.0% | 0.1% |
| taxBreak | 5000 | Grant the tax break: 44.4% · Trade it for a donation: 40.2% · Refuse: 15.4% | 0.0% | 51.4% |
| theWhistle | 5000 | Shut down The Whistle: 10.4% · Buy The Whistle: 84.6% · A free press is good: 5.0% | 0.1% | 45.4% |
| tvStation | 5000 | Build the station: 38.3% · Lend her the roof: 60.7% · Refuse: 0.9% | 0.8% | 42.3% |
