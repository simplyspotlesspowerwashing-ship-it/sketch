# Balance report: pack `week1`

5000 terms per policy. Tuning: {"people":0.5,"press":0.2,"business":0.1,"law":0.1,"objective":2,"brokenPromise":-4,"min":5,"max":95}.

| Policy | Win rate | Target | Mean vote | Vote p10 / p50 / p90 | Recalled | Bankrupt | Term ended early | Ending money $k p10 / p50 / p90 |
|---|---|---|---|---|---|---|---|---|
| random | 0.0% | on target | 16.2 | 13 / 17 / 19 | 100.0% | 1.1% | 93.7% | 20 / 20 / 20 |
| greedy-approval | 15.7% |  | 37.2 | 20 / 37 / 53 | 98.7% | 82.3% | 12.9% | -43 / -25 / 20 |
| miser | 0.0% |  | 14.4 | 13 / 13 / 17 | 100.0% | 0.0% | 100.0% | 20 / 20 / 20 |
| people-pleaser | 0.3% |  | 22.1 | 17 / 19 / 35 | 100.0% | 46.2% | 76.6% | -42 / 20 / 20 |
| dave-only | 0.0% | **off target** (5-10%) | 16.8 | 17 / 17 / 19 | 100.0% | 1.4% | 97.0% | 20 / 20 / 20 |
| sensible | 59.7% | on target | 52.3 | 36 / 53 / 68 | 10.6% | 0.3% | 0.0% | 7 / 38 / 88 |
| | | recalls on target (under 25%) | | | | | | |

## Non-dilemmas and other flags (sensible bot)

- `bandstand`: "One song is plenty" chosen 2% of the time (under 5%)
- `bankError`: "Keep it quiet" chosen 1% of the time (under 5%)
- `billboard`: "No billboard" chosen 2% of the time (under 5%)
- `catSinkhole`: "Move the town to the left" chosen 0% of the time (under 5%)
- `coneRally`: "Have the cone towed" chosen 1% of the time (under 5%)
- `curfew`: "Curfew at 9 pm" chosen 1% of the time (under 5%)
- `dogShow`: "Cancel the dog show" chosen 2% of the time (under 5%)
- `evFair`: "Eat for the town" chosen 90% of the time (over 85%)
- `evPower`: "Pay Chad's guy" chosen 85% of the time (over 85%)
- `evPower`: "Sit in the dark" chosen 0% of the time (under 5%)
- `flood`: "Rent the pumps" chosen 86% of the time (over 85%)
- `flood`: "Wait for it to dry" chosen 1% of the time (under 5%)
- `goosePond`: "Build the pond" chosen 98% of the time (over 85%)
- `goosePond`: "Pond in the park instead" chosen 1% of the time (under 5%)
- `goosePond`: "Refuse" chosen 2% of the time (under 5%)
- `karaoke`: "No singing in City Hall" chosen 2% of the time (under 5%)
- `lawTuesday`: "Hold firm" chosen 4% of the time (under 5%)
- `marathon`: "Postpone it" chosen 1% of the time (under 5%)
- `mascot`: "Welcome, Wet Sock" chosen 94% of the time (over 85%)
- `mascot`: "Hire a real designer" chosen 5% of the time (under 5%)
- `mascot`: "No mascot" chosen 1% of the time (under 5%)
- `mimeStrike`: "Ignore the mimes" chosen 4% of the time (under 5%)
- `monsterPta`: "Welcome the monster" chosen 93% of the time (over 85%)
- `opera`: "Ban the opera" chosen 1% of the time (under 5%)
- `parkingMeters`: "Install meters" chosen 5% of the time (under 5%)
- `parkWifi`: "Go outside and play" chosen 1% of the time (under 5%)
- `portrait`: "Burn it" chosen 2% of the time (under 5%)
- `roundabout`: "It's working as intended" chosen 4% of the time (under 5%)
- `schoolLunch`: "Paste builds character" chosen 2% of the time (under 5%)
- `secretStranger`: "Expose him in The Bugle" chosen 95% of the time (over 85%)
- `secretStranger`: "Take his hush money" chosen 5% of the time (under 5%)
- `statue`: "No statues" chosen 2% of the time (under 5%)
- `talentShow`: "Judge honestly" chosen 4% of the time (under 5%)
- `theWhistle`: "Shut down The Whistle" chosen 1% of the time (under 5%)
- `theWhistle`: "Buy The Whistle" chosen 86% of the time (over 85%)
- `tvStation`: "Refuse" chosen 0% of the time (under 5%)
- `twinTown`: "Throw a welcome party" chosen 88% of the time (over 85%)
- `twinTown`: "Lock the gates" chosen 0% of the time (under 5%)

## Unreachable desk cards (never drawn by any policy)

- `snowplow`
- `giantSpoon`
- `festival`
- `pieThief`
- `alienSignal`
- `recycling`
- `busRoute`
- `pothole`
- `fireworks`
- `radar`
- `nightLibrary`
- `gooseStrike`
- `strangerPrice`
- `haunted`
- `heatwave`
- `crossingGuard`
- `cheeseVault`
- `timeCapsule`
- `pigeonAide`
- `squirrelLoan`
- `buyout`
- `overreach`
- `goldenGoose`
- `lawHats`

## random

Projects built (share of terms): casino 20.2%, helicopter 8.9%, pond 4.3%, school 0.9%, tv 0.8%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 32.2% · Arcade, minus the engine: 33.4% · Firefighters only: 34.3% | 0.0% | 0.0% |
| auditor | 4801 | Open the books: 33.7% · Bribe him with cheese: 30.9% · Let Dave handle the audit: 35.4% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 32.8% · Teach them yourself: 33.6% · One song is plenty: 33.5% | 0.0% | 0.0% |
| bankError | 3180 | Keep it quiet: 37.0% · Give it back: 35.8% · Split it with Chad: 27.1% | 0.0% | 0.0% |
| bearStory | 42 | Yes, I wrestled a bear: 50.0% · Tell the truth: 50.0% | 0.0% | 0.0% |
| billboard | 56 | Allow the billboard: 33.9% · A small one, round the back: 28.6% · No billboard: 37.5% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 32.8% · Promise repairs soon: 34.4% · Put up a 'Good Luck' sign: 32.8% | 0.0% | 0.0% |
| buglePress | 1 | Buy a new press: 0.0% · Use the school copier: 100.0% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| campaign | 220 | Big rally: 21.4% · Call in every Favor: 7.7% · Attack ad about the cone: 34.1% · Just be yourself: 36.8% | 0.0% | 0.0% |
| campaignTruth | 96 | 'At least I'm not a goose': 40.6% · Promise a recount: 29.2% · Big rally: 25.0% · Call in every Favor: 5.2% | 0.0% | 0.0% |
| casinoCrime | 550 | Ban Linda from blackjack: 51.1% · Make her head of security: 48.9% | 0.0% | 0.0% |
| catGoose | 4996 | Negotiate with Gerald: 33.5% · Send in Barb: 33.0% · Let them have the bakery: 33.5% | 0.0% | 0.0% |
| catSinkhole | 1441 | Fill Kevin with concrete: 33.7% · Make Kevin an attraction: 32.7% · Move the town to the left: 33.7% | 0.0% | 0.0% |
| chadRocket | 2065 | Clear the launch: 32.9% · Launch from your own lawn: 34.1% · No rockets near children: 33.0% | 0.0% | 0.0% |
| clockWizard | 4999 | Evict the wizard: 33.1% · Charge him real rent: 32.7% · Make him town magician: 34.2% | 0.0% | 0.0% |
| coneRally | 688 | Hold a bigger rally: 30.2% · Debate the cone, live: 33.6% · Have the cone towed: 36.2% | 0.0% | 0.0% |
| curfew | 1105 | Curfew at 9 pm: 32.8% · Fund a youth centre: 34.9% · Let them stand: 32.3% | 0.0% | 0.0% |
| diaryLeak | 1955 | Apologise to everyone: 35.7% · Publish the whole diary: 31.7% · Blame the pigeon: 32.6% | 0.0% | 0.0% |
| dogShow | 4161 | Every dog wins: 32.7% · Find the real Biscuit: 33.9% · Cancel the dog show: 33.4% | 0.0% | 0.0% |
| duckDuel | 6 | Back Gerald: 83.3% · Back the duck: 16.7% · Stay out of bird politics: 0.0% | 0.0% | 0.0% |
| evBallots | 1474 | Tell the town: 47.8% · Put the boxes back: 52.2% | 0.0% | 0.0% |
| evBear | 19 | Apologise to the bear: 31.6% · Wrestle it for real: 68.4% | 0.0% | 0.0% |
| evDebate | 1166 | Debate with facts: 45.2% · Debate with insults: 54.8% | 0.0% | 0.0% |
| evFair | 1303 | Eat for the town: 53.8% · Decline politely: 46.2% | 0.0% | 0.0% |
| evNote | 4989 | Go and look: 49.7% · Burn the note: 50.3% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.6% · Buy a new float: 49.4% | 0.0% | 0.0% |
| evPower | 4449 | Pay Chad's guy: 34.1% · Hand out candles: 32.1% · Sit in the dark: 33.8% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 50.6% · Ignore Steve: 49.4% | 0.0% | 0.0% |
| farmersMarket | 4 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| flood | 3743 | Rent the pumps: 32.8% · Rename it 'Little Venice': 32.4% · Wait for it to dry: 34.8% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 33.8% · Run tours, stiff the ghost: 33.5% · No ghosts on the payroll: 32.7% | 0.0% | 0.0% |
| gooseOccupation | 206 | Pay them off in bread: 51.9% · Send Chief Barb: 48.1% | 0.0% | 0.0% |
| goosePond | 675 | Build the pond: 31.7% · Pond in the park instead: 34.1% · Refuse: 34.2% | 0.0% | 0.0% |
| greenLights | 1655 | Fix the lights: 34.0% · Leave them green: 33.8% · Replace them with Barb: 32.2% | 0.0% | 0.0% |
| helicopter | 1397 | Buy it: 32.0% · Lease one: 35.1% · Promise it next quarter: 32.9% | 0.0% | 0.0% |
| karaoke | 4952 | Sing the hard one: 32.7% · Lip-sync it: 33.5% · No singing in City Hall: 33.7% | 0.0% | 0.0% |
| lakeMonster | 2493 | Put it on the brochure: 32.4% · Protect its privacy: 33.4% · There is no monster: 34.2% | 0.0% | 0.0% |
| lawDogs | 282 | Overrule the dog: 31.6% · Promote the dog: 33.3% · Let justice take its course: 35.1% | 0.0% | 0.0% |
| lawGeese | 176 | Give Barb a whistle too: 33.5% · Goose lanes on every road: 31.3% · Let Gerald run it: 35.2% | 0.0% | 0.0% |
| lawSighs | 279 | Declare a free sigh day: 31.2% · Raise the sigh tax: 36.9% · Sigh for them: 31.9% | 0.0% | 0.0% |
| lawTuesday | 1580 | Give it back: 34.3% · Rename it Funday: 32.1% · Hold firm: 33.6% | 0.0% | 0.0% |
| libraryCasino | 2855 | Build the casino: 35.3% · Refuse: 32.6% · Casino night, once a year: 32.0% | 0.0% | 0.0% |
| mallParking | 510 | Pave the park: 38.0% · Only half the park: 28.2% · Hands off the park: 33.7% | 0.0% | 0.0% |
| marathon | 3619 | Run it yourself: 33.1% · Hand out water: 33.3% · Postpone it: 33.6% | 0.0% | 0.0% |
| mascot | 386 | Welcome, Wet Sock: 33.9% · Hire a real designer: 37.0% · No mascot: 29.0% | 0.0% | 0.0% |
| mimeStrike | 994 | Notice them, with a banner: 33.7% · Negotiate in mime: 32.6% · Ignore the mimes: 33.7% | 0.0% | 0.0% |
| monsterPta | 729 | Welcome the monster: 51.2% · Monsters can't be parents: 48.8% | 0.0% | 0.0% |
| moonClaim | 4654 | Plant the flag: 32.3% · Sell the moon to Chad: 34.0% · Give the moon back: 33.7% | 0.0% | 0.0% |
| moonRent | 1325 | Pay the moonlight bill: 48.5% · Charge him for the view: 51.5% | 0.0% | 0.0% |
| newSchool | 174 | Build a new school: 27.0% · Promise it by spring: 42.0% · Buy a second book: 31.0% | 0.0% | 0.0% |
| opera | 4382 | Attend and applaud: 34.1% · Pay for rewrites: 33.0% · Ban the opera: 32.9% | 0.0% | 0.0% |
| parkingMeters | 489 | Install meters: 41.9% · Meters for visitors only: 19.8% · Free parking forever: 38.2% | 0.0% | 0.0% |
| parkWifi | 1358 | Free park wifi: 35.6% · Wifi with Chad's ads: 32.2% · Go outside and play: 32.2% | 0.0% | 0.0% |
| pettyCrime | 2383 | Pay for overtime: 49.7% · Blame the next town over: 50.3% | 0.0% | 0.0% |
| portrait | 2834 | Hang it proudly: 32.5% · Pay for a repaint: 32.8% · Burn it: 34.7% | 0.0% | 0.0% |
| raccoonBins | 2584 | Raccoon-proof bins: 33.7% · Night patrols: 32.9% · They live here too: 33.4% | 0.0% | 0.0% |
| rocketLibrary | 660 | Rebuild the library: 52.3% · Leave the rocket in: 47.7% | 0.0% | 0.0% |
| roundabout | 100 | Rescue the drivers: 27.0% · Sell tickets to watch: 37.0% · It's working as intended: 36.0% | 0.0% | 0.0% |
| schoolLunch | 4975 | Pay for real food: 34.4% · Chad sponsors lunch: 32.9% · Paste builds character: 32.7% | 0.0% | 0.0% |
| secretStranger | 608 | Expose him in The Bugle: 47.0% · Take his hush money: 53.0% | 0.0% | 0.0% |
| speedTrap | 6 | Approve the speed trap: 16.7% · Warning signs only: 33.3% · No speed trap: 50.0% | 0.0% | 0.0% |
| statue | 1260 | Accept the statue: 33.1% · A statue of someone normal: 33.3% · No statues: 33.7% | 0.0% | 0.0% |
| talentShow | 2527 | Judge honestly: 32.7% · Everyone wins: 34.5% · Send Dave: 32.8% | 0.0% | 0.0% |
| taxBreak | 823 | Grant the tax break: 36.8% · Trade it for a donation: 24.9% · Refuse: 38.3% | 0.0% | 0.0% |
| theWhistle | 987 | Shut down The Whistle: 37.3% · Buy The Whistle: 30.9% · A free press is good: 31.8% | 0.0% | 0.0% |
| tvStation | 128 | Build the station: 30.5% · Lend her the roof: 39.8% · Refuse: 29.7% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 35.0% · Show them the pothole: 32.4% · Lock the gates: 32.5% | 0.0% | 0.0% |
| zebra | 384 | Hire a zebra wrangler: 32.8% · Make it official: 33.1% · Barb can arrest a zebra: 34.1% | 0.0% | 0.0% |

## greedy-approval

Projects built (share of terms): helicopter 67.7%, casino 64.2%, pond 13.1%, tv 5.4%, school 0.7%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 100.0% · Arcade, minus the engine: 0.0% · Firefighters only: 0.0% | 0.0% | 0.0% |
| auditor | 4989 | Open the books: 91.9% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 8.1% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 100.0% · Teach them yourself: 0.0% · One song is plenty: 0.0% | 0.0% | 0.0% |
| bankError | 4959 | Keep it quiet: 0.0% · Give it back: 100.0% · Split it with Chad: 0.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 100.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| campaignTruth | 4353 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| casinoCrime | 215 | Ban Linda from blackjack: 22.3% · Make her head of security: 77.7% | 0.0% | 0.0% |
| catGoose | 5000 | Negotiate with Gerald: 99.9% · Send in Barb: 0.0% · Let them have the bakery: 0.0% | 0.0% | 0.0% |
| catSinkhole | 4898 | Fill Kevin with concrete: 61.1% · Make Kevin an attraction: 38.9% · Move the town to the left: 0.0% | 0.0% | 0.0% |
| chadRocket | 1911 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| clockWizard | 5000 | Evict the wizard: 0.0% · Charge him real rent: 0.0% · Make him town magician: 100.0% | 0.0% | 0.0% |
| coneRally | 3400 | Hold a bigger rally: 82.3% · Debate the cone, live: 17.7% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| curfew | 3336 | Curfew at 9 pm: 0.0% · Fund a youth centre: 100.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 4661 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| dogShow | 4995 | Every dog wins: 70.6% · Find the real Biscuit: 29.4% · Cancel the dog show: 0.0% | 0.0% | 0.0% |
| entitled | 6 | Free ice cream: 33.3% · Say no nicely: 66.7% | 0.0% | 0.0% |
| evBallots | 4948 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evDebate | 4738 | Debate with facts: 100.0% · Debate with insults: 0.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 4996 | Pay Chad's guy: 83.5% · Hand out candles: 11.1% · Sit in the dark: 5.3% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| flood | 4917 | Rent the pumps: 64.2% · Rename it 'Little Venice': 35.8% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 100.0% · Run tours, stiff the ghost: 0.0% · No ghosts on the payroll: 0.0% | 0.0% | 0.0% |
| goosePond | 655 | Build the pond: 100.0% · Pond in the park instead: 0.0% · Refuse: 0.0% | 0.0% | 0.0% |
| greenLights | 4910 | Fix the lights: 85.5% · Leave them green: 0.0% · Replace them with Barb: 14.5% | 0.0% | 0.0% |
| helicopter | 3388 | Buy it: 99.9% · Lease one: 0.1% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| karaoke | 5000 | Sing the hard one: 100.0% · Lip-sync it: 0.0% · No singing in City Hall: 0.0% | 0.0% | 0.0% |
| lakeMonster | 4937 | Put it on the brochure: 80.5% · Protect its privacy: 19.5% · There is no monster: 0.0% | 0.0% | 0.0% |
| lawDogs | 374 | Overrule the dog: 26.7% · Promote the dog: 73.3% · Let justice take its course: 0.0% | 0.0% | 0.0% |
| lawTuesday | 557 | Give it back: 24.4% · Rename it Funday: 75.6% · Hold firm: 0.0% | 0.0% | 0.0% |
| libraryCasino | 4061 | Build the casino: 79.1% · Refuse: 0.0% · Casino night, once a year: 20.9% | 0.0% | 0.0% |
| mallParking | 103 | Pave the park: 0.0% · Only half the park: 100.0% · Hands off the park: 0.0% | 0.0% | 0.0% |
| marathon | 2199 | Run it yourself: 0.0% · Hand out water: 100.0% · Postpone it: 0.0% | 0.0% | 0.0% |
| mascot | 317 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 0.0% |
| mimeStrike | 4723 | Notice them, with a banner: 83.7% · Negotiate in mime: 16.3% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| monsterPta | 3962 | Welcome the monster: 100.0% · Monsters can't be parents: 0.0% | 0.0% | 0.0% |
| moonClaim | 4996 | Plant the flag: 82.8% · Sell the moon to Chad: 17.2% · Give the moon back: 0.0% | 0.0% | 0.0% |
| moonRent | 4126 | Pay the moonlight bill: 73.6% · Charge him for the view: 26.4% | 0.0% | 0.0% |
| newSchool | 55 | Build a new school: 61.8% · Promise it by spring: 38.2% · Buy a second book: 0.0% | 0.0% | 0.0% |
| opera | 4996 | Attend and applaud: 29.7% · Pay for rewrites: 70.3% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkingMeters | 4474 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 869 | Free park wifi: 91.3% · Wifi with Chad's ads: 8.7% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 147 | Pay for overtime: 38.1% · Blame the next town over: 61.9% | 0.0% | 0.0% |
| portrait | 1279 | Hang it proudly: 100.0% · Pay for a repaint: 0.0% · Burn it: 0.0% | 0.0% | 0.0% |
| raccoonBins | 4948 | Raccoon-proof bins: 81.0% · Night patrols: 19.0% · They live here too: 0.0% | 0.0% | 0.0% |
| rocketLibrary | 1911 | Rebuild the library: 86.9% · Leave the rocket in: 13.1% | 0.0% | 0.0% |
| roundabout | 508 | Rescue the drivers: 100.0% · Sell tickets to watch: 0.0% · It's working as intended: 0.0% | 0.0% | 0.0% |
| schoolLunch | 5000 | Pay for real food: 92.9% · Chad sponsors lunch: 7.1% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 4918 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| speedTrap | 337 | Approve the speed trap: 17.2% · Warning signs only: 82.8% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 1760 | Accept the statue: 17.0% · A statue of someone normal: 83.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 2075 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 4659 | Grant the tax break: 41.4% · Trade it for a donation: 58.6% · Refuse: 0.0% | 0.0% | 0.0% |
| theWhistle | 1043 | Shut down The Whistle: 0.7% · Buy The Whistle: 99.3% · A free press is good: 0.0% | 0.0% | 0.0% |
| tvStation | 269 | Build the station: 100.0% · Lend her the roof: 0.0% · Refuse: 0.0% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 100.0% · Show them the pothole: 0.0% · Lock the gates: 0.0% | 0.0% | 0.0% |
| zebra | 640 | Hire a zebra wrangler: 96.6% · Make it official: 3.4% · Barb can arrest a zebra: 0.0% | 0.0% | 0.0% |

## miser

Projects built (share of terms): casino 37.3%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 100.0% · Arcade, minus the engine: 0.0% · Firefighters only: 0.0% | 0.0% | 0.0% |
| auditor | 4842 | Open the books: 0.0% · Bribe him with cheese: 100.0% · Let Dave handle the audit: 0.0% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 0.0% · Teach them yourself: 100.0% · One song is plenty: 0.0% | 0.0% | 0.0% |
| bankError | 160 | Keep it quiet: 100.0% · Give it back: 0.0% · Split it with Chad: 0.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 0.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 100.0% | 0.0% | 0.0% |
| casinoCrime | 34 | Ban Linda from blackjack: 100.0% · Make her head of security: 0.0% | 0.0% | 0.0% |
| catGoose | 4998 | Negotiate with Gerald: 0.0% · Send in Barb: 0.0% · Let them have the bakery: 100.0% | 0.0% | 0.0% |
| catSinkhole | 2 | Fill Kevin with concrete: 0.0% · Make Kevin an attraction: 100.0% · Move the town to the left: 0.0% | 0.0% | 0.0% |
| chadRocket | 418 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| clockWizard | 4998 | Evict the wizard: 0.0% · Charge him real rent: 100.0% · Make him town magician: 0.0% | 0.0% | 0.0% |
| curfew | 2572 | Curfew at 9 pm: 100.0% · Fund a youth centre: 0.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 12 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| dogShow | 1817 | Every dog wins: 0.0% · Find the real Biscuit: 100.0% · Cancel the dog show: 0.0% | 0.0% | 0.0% |
| evBallots | 57 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evNote | 4988 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 100.0% · Buy a new float: 0.0% | 0.0% | 0.0% |
| evPower | 3356 | Pay Chad's guy: 0.0% · Hand out candles: 0.0% · Sit in the dark: 100.0% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 0.0% · Ignore Steve: 100.0% | 0.0% | 0.0% |
| flood | 569 | Rent the pumps: 0.0% · Rename it 'Little Venice': 100.0% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 0.0% · Run tours, stiff the ghost: 100.0% · No ghosts on the payroll: 0.0% | 0.0% | 0.0% |
| gooseOccupation | 49 | Pay them off in bread: 0.0% · Send Chief Barb: 100.0% | 0.0% | 0.0% |
| goosePond | 426 | Build the pond: 0.0% · Pond in the park instead: 0.0% · Refuse: 100.0% | 0.0% | 0.0% |
| greenLights | 6 | Fix the lights: 0.0% · Leave them green: 100.0% · Replace them with Barb: 0.0% | 0.0% | 0.0% |
| helicopter | 3328 | Buy it: 0.0% · Lease one: 2.1% · Promise it next quarter: 97.9% | 0.0% | 0.0% |
| karaoke | 4903 | Sing the hard one: 100.0% · Lip-sync it: 0.0% · No singing in City Hall: 0.0% | 0.0% | 0.0% |
| lakeMonster | 26 | Put it on the brochure: 0.0% · Protect its privacy: 100.0% · There is no monster: 0.0% | 0.0% | 0.0% |
| lawSighs | 306 | Declare a free sigh day: 0.0% · Raise the sigh tax: 100.0% · Sigh for them: 0.0% | 0.0% | 0.0% |
| libraryCasino | 2140 | Build the casino: 87.2% · Refuse: 0.0% · Casino night, once a year: 12.8% | 0.0% | 0.0% |
| mallParking | 2 | Pave the park: 100.0% · Only half the park: 0.0% · Hands off the park: 0.0% | 0.0% | 0.0% |
| marathon | 4339 | Run it yourself: 100.0% · Hand out water: 0.0% · Postpone it: 0.0% | 0.0% | 0.0% |
| moonClaim | 4468 | Plant the flag: 0.0% · Sell the moon to Chad: 100.0% · Give the moon back: 0.0% | 0.0% | 0.0% |
| opera | 2200 | Attend and applaud: 100.0% · Pay for rewrites: 0.0% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkWifi | 1748 | Free park wifi: 0.0% · Wifi with Chad's ads: 100.0% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 3949 | Pay for overtime: 0.0% · Blame the next town over: 100.0% | 0.0% | 0.0% |
| portrait | 1719 | Hang it proudly: 100.0% · Pay for a repaint: 0.0% · Burn it: 0.0% | 0.0% | 0.0% |
| raccoonBins | 57 | Raccoon-proof bins: 0.0% · Night patrols: 100.0% · They live here too: 0.0% | 0.0% | 0.0% |
| rocketLibrary | 261 | Rebuild the library: 0.0% · Leave the rocket in: 100.0% | 0.0% | 0.0% |
| roundabout | 51 | Rescue the drivers: 0.0% · Sell tickets to watch: 100.0% · It's working as intended: 0.0% | 0.0% | 0.0% |
| schoolLunch | 4964 | Pay for real food: 0.0% · Chad sponsors lunch: 100.0% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 22 | Expose him in The Bugle: 0.0% · Take his hush money: 100.0% | 0.0% | 0.0% |
| statue | 77 | Accept the statue: 100.0% · A statue of someone normal: 0.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 3123 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| theWhistle | 119 | Shut down The Whistle: 100.0% · Buy The Whistle: 0.0% · A free press is good: 0.0% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 0.0% · Show them the pothole: 100.0% · Lock the gates: 0.0% | 0.0% | 0.0% |
| zebra | 532 | Hire a zebra wrangler: 0.0% · Make it official: 100.0% · Barb can arrest a zebra: 0.0% | 0.0% | 0.0% |

## people-pleaser

Projects built (share of terms): tv 0.0%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 100.0% · Arcade, minus the engine: 0.0% · Firefighters only: 0.0% | 0.0% | 0.0% |
| auditor | 5000 | Open the books: 97.9% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 2.1% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 100.0% · Teach them yourself: 0.0% · One song is plenty: 0.0% | 0.0% | 0.0% |
| bankError | 4556 | Keep it quiet: 7.7% · Give it back: 0.0% · Split it with Chad: 92.3% | 0.0% | 0.0% |
| billboard | 1 | Allow the billboard: 100.0% · A small one, round the back: 0.0% · No billboard: 0.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 100.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| campaignTruth | 1171 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| catGoose | 5000 | Negotiate with Gerald: 100.0% · Send in Barb: 0.0% · Let them have the bakery: 0.0% | 0.0% | 0.0% |
| catSinkhole | 3683 | Fill Kevin with concrete: 77.9% · Make Kevin an attraction: 22.1% · Move the town to the left: 0.0% | 0.0% | 0.0% |
| chadRocket | 1224 | Clear the launch: 0.0% · Launch from your own lawn: 84.6% · No rockets near children: 15.4% | 0.0% | 0.0% |
| clockWizard | 5000 | Evict the wizard: 0.0% · Charge him real rent: 0.0% · Make him town magician: 100.0% | 0.0% | 0.0% |
| coneRally | 2246 | Hold a bigger rally: 65.6% · Debate the cone, live: 34.4% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| curfew | 3355 | Curfew at 9 pm: 0.0% · Fund a youth centre: 100.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 3932 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| dogShow | 4987 | Every dog wins: 98.8% · Find the real Biscuit: 1.2% · Cancel the dog show: 0.0% | 0.0% | 0.0% |
| entitled | 196 | Free ice cream: 99.5% · Say no nicely: 0.5% | 0.0% | 0.0% |
| evBallots | 4332 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evDebate | 3058 | Debate with facts: 0.0% · Debate with insults: 100.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 4987 | Pay Chad's guy: 99.7% · Hand out candles: 0.1% · Sit in the dark: 0.1% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| flood | 4914 | Rent the pumps: 32.6% · Rename it 'Little Venice': 67.4% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 100.0% · Run tours, stiff the ghost: 0.0% · No ghosts on the payroll: 0.0% | 0.0% | 0.0% |
| greenLights | 3817 | Fix the lights: 0.0% · Leave them green: 100.0% · Replace them with Barb: 0.0% | 0.0% | 0.0% |
| helicopter | 4215 | Buy it: 0.0% · Lease one: 100.0% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| karaoke | 5000 | Sing the hard one: 0.0% · Lip-sync it: 100.0% · No singing in City Hall: 0.0% | 0.0% | 0.0% |
| lakeMonster | 4300 | Put it on the brochure: 0.0% · Protect its privacy: 100.0% · There is no monster: 0.0% | 0.0% | 0.0% |
| lawDogs | 3 | Overrule the dog: 0.0% · Promote the dog: 0.0% · Let justice take its course: 100.0% | 0.0% | 0.0% |
| lawTuesday | 4503 | Give it back: 0.4% · Rename it Funday: 99.6% · Hold firm: 0.0% | 0.0% | 0.0% |
| libraryCasino | 4443 | Build the casino: 0.0% · Refuse: 100.0% · Casino night, once a year: 0.0% | 0.0% | 0.0% |
| mallParking | 163 | Pave the park: 0.0% · Only half the park: 0.0% · Hands off the park: 100.0% | 0.0% | 0.0% |
| marathon | 803 | Run it yourself: 100.0% · Hand out water: 0.0% · Postpone it: 0.0% | 0.0% | 0.0% |
| mascot | 94 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 0.0% |
| mimeStrike | 2839 | Notice them, with a banner: 87.8% · Negotiate in mime: 12.2% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 4992 | Plant the flag: 98.8% · Sell the moon to Chad: 0.0% · Give the moon back: 1.2% | 0.0% | 0.0% |
| moonRent | 4928 | Pay the moonlight bill: 94.7% · Charge him for the view: 5.3% | 0.0% | 0.0% |
| opera | 4987 | Attend and applaud: 0.0% · Pay for rewrites: 99.0% · Ban the opera: 1.0% | 0.0% | 0.0% |
| parkingMeters | 1797 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 5 | Free park wifi: 100.0% · Wifi with Chad's ads: 0.0% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 1705 | Pay for overtime: 47.0% · Blame the next town over: 53.0% | 0.0% | 0.0% |
| portrait | 1455 | Hang it proudly: 100.0% · Pay for a repaint: 0.0% · Burn it: 0.0% | 0.0% | 0.0% |
| raccoonBins | 4332 | Raccoon-proof bins: 95.1% · Night patrols: 0.0% · They live here too: 4.9% | 0.0% | 0.0% |
| roundabout | 390 | Rescue the drivers: 96.2% · Sell tickets to watch: 3.8% · It's working as intended: 0.0% | 0.0% | 0.0% |
| schoolLunch | 5000 | Pay for real food: 99.9% · Chad sponsors lunch: 0.1% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 3946 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| speedTrap | 2 | Approve the speed trap: 0.0% · Warning signs only: 100.0% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 235 | Accept the statue: 0.0% · A statue of someone normal: 96.6% · No statues: 3.4% | 0.0% | 0.0% |
| talentShow | 800 | Judge honestly: 0.0% · Everyone wins: 100.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 2701 | Grant the tax break: 0.0% · Trade it for a donation: 0.0% · Refuse: 100.0% | 0.0% | 0.0% |
| theWhistle | 810 | Shut down The Whistle: 0.0% · Buy The Whistle: 99.4% · A free press is good: 0.6% | 0.0% | 0.0% |
| tvStation | 1 | Build the station: 100.0% · Lend her the roof: 0.0% · Refuse: 0.0% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 100.0% · Show them the pothole: 0.0% · Lock the gates: 0.0% | 0.0% | 0.0% |
| zebra | 2749 | Hire a zebra wrangler: 0.0% · Make it official: 100.0% · Barb can arrest a zebra: 0.0% | 0.0% | 0.0% |

## dave-only

Projects built (share of terms): casino 19.3%, helicopter 8.6%, pond 5.1%, school 1.2%, tv 0.8%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 33.8% · Arcade, minus the engine: 32.8% · Firefighters only: 33.4% | 0.0% | 0.0% |
| auditor | 4634 | Open the books: 34.8% · Bribe him with cheese: 29.8% · Let Dave handle the audit: 35.3% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 34.3% · Teach them yourself: 32.4% · One song is plenty: 33.3% | 0.0% | 0.0% |
| bankError | 2574 | Keep it quiet: 37.8% · Give it back: 35.5% · Split it with Chad: 26.8% | 0.0% | 0.0% |
| bearStory | 38 | Yes, I wrestled a bear: 50.0% · Tell the truth: 50.0% | 0.0% | 0.0% |
| billboard | 43 | Allow the billboard: 51.2% · A small one, round the back: 23.3% · No billboard: 25.6% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 33.7% · Promise repairs soon: 32.9% · Put up a 'Good Luck' sign: 33.4% | 0.0% | 0.0% |
| buglePress | 1 | Buy a new press: 0.0% · Use the school copier: 100.0% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| campaign | 87 | Big rally: 0.0% · Call in every Favor: 0.0% · Attack ad about the cone: 0.0% · Just be yourself: 100.0% | 0.0% | 0.0% |
| campaignTruth | 64 | 'At least I'm not a goose': 0.0% · Promise a recount: 0.0% · Big rally: 65.6% · Call in every Favor: 34.4% | 0.0% | 0.0% |
| casinoCrime | 466 | Ban Linda from blackjack: 51.1% · Make her head of security: 48.9% | 0.0% | 0.0% |
| catGoose | 4995 | Negotiate with Gerald: 32.6% · Send in Barb: 34.3% · Let them have the bakery: 33.1% | 0.0% | 0.0% |
| catSinkhole | 895 | Fill Kevin with concrete: 30.3% · Make Kevin an attraction: 36.3% · Move the town to the left: 33.4% | 0.0% | 0.0% |
| chadRocket | 2190 | Clear the launch: 31.1% · Launch from your own lawn: 33.7% · No rockets near children: 35.3% | 0.0% | 0.0% |
| clockWizard | 5000 | Evict the wizard: 33.9% · Charge him real rent: 33.4% · Make him town magician: 32.7% | 0.0% | 0.0% |
| coneRally | 348 | Hold a bigger rally: 38.2% · Debate the cone, live: 30.7% · Have the cone towed: 31.0% | 0.0% | 0.0% |
| curfew | 1028 | Curfew at 9 pm: 30.1% · Fund a youth centre: 36.4% · Let them stand: 33.6% | 0.0% | 0.0% |
| diaryLeak | 1288 | Apologise to everyone: 34.2% · Publish the whole diary: 34.5% · Blame the pigeon: 31.4% | 0.0% | 0.0% |
| dogShow | 3762 | Every dog wins: 32.1% · Find the real Biscuit: 34.6% · Cancel the dog show: 33.3% | 0.0% | 0.0% |
| duckDuel | 19 | Back Gerald: 36.8% · Back the duck: 36.8% · Stay out of bird politics: 26.3% | 0.0% | 0.0% |
| evBallots | 1178 | Tell the town: 52.1% · Put the boxes back: 47.9% | 0.0% | 0.0% |
| evBear | 17 | Apologise to the bear: 29.4% · Wrestle it for real: 70.6% | 0.0% | 0.0% |
| evDebate | 657 | Debate with facts: 46.4% · Debate with insults: 53.6% | 0.0% | 0.0% |
| evFair | 1012 | Eat for the town: 50.7% · Decline politely: 49.3% | 0.0% | 0.0% |
| evNote | 4973 | Go and look: 49.9% · Burn the note: 50.1% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 48.8% · Buy a new float: 51.2% | 0.0% | 0.0% |
| evPower | 4195 | Pay Chad's guy: 33.5% · Hand out candles: 32.7% · Sit in the dark: 33.8% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 47.8% · Ignore Steve: 52.2% | 0.0% | 0.0% |
| flood | 3254 | Rent the pumps: 34.3% · Rename it 'Little Venice': 32.9% · Wait for it to dry: 32.8% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 32.8% · Run tours, stiff the ghost: 34.2% · No ghosts on the payroll: 33.1% | 0.0% | 0.0% |
| gooseOccupation | 201 | Pay them off in bread: 50.2% · Send Chief Barb: 49.8% | 0.0% | 0.0% |
| goosePond | 740 | Build the pond: 34.3% · Pond in the park instead: 33.5% · Refuse: 32.2% | 0.0% | 0.0% |
| greenLights | 1019 | Fix the lights: 32.3% · Leave them green: 35.0% · Replace them with Barb: 32.7% | 0.0% | 0.0% |
| helicopter | 1320 | Buy it: 32.5% · Lease one: 33.4% · Promise it next quarter: 34.1% | 0.0% | 0.0% |
| karaoke | 4885 | Sing the hard one: 33.4% · Lip-sync it: 32.0% · No singing in City Hall: 34.6% | 0.0% | 0.0% |
| lakeMonster | 1832 | Put it on the brochure: 33.5% · Protect its privacy: 33.3% · There is no monster: 33.2% | 0.0% | 0.0% |
| lawDogs | 193 | Overrule the dog: 31.1% · Promote the dog: 38.3% · Let justice take its course: 30.6% | 0.0% | 0.0% |
| lawGeese | 81 | Give Barb a whistle too: 39.5% · Goose lanes on every road: 37.0% · Let Gerald run it: 23.5% | 0.0% | 0.0% |
| lawSighs | 126 | Declare a free sigh day: 32.5% · Raise the sigh tax: 28.6% · Sigh for them: 38.9% | 0.0% | 0.0% |
| lawTuesday | 524 | Give it back: 32.6% · Rename it Funday: 35.7% · Hold firm: 31.7% | 0.0% | 0.0% |
| libraryCasino | 2923 | Build the casino: 33.0% · Refuse: 33.4% · Casino night, once a year: 33.6% | 0.0% | 0.0% |
| mallParking | 515 | Pave the park: 35.0% · Only half the park: 27.6% · Hands off the park: 37.5% | 0.0% | 0.0% |
| marathon | 3622 | Run it yourself: 32.1% · Hand out water: 35.6% · Postpone it: 32.3% | 0.0% | 0.0% |
| mascot | 389 | Welcome, Wet Sock: 34.7% · Hire a real designer: 32.4% · No mascot: 32.9% | 0.0% | 0.0% |
| mimeStrike | 531 | Notice them, with a banner: 33.1% · Negotiate in mime: 34.1% · Ignore the mimes: 32.8% | 0.0% | 0.0% |
| monsterPta | 508 | Welcome the monster: 51.4% · Monsters can't be parents: 48.6% | 0.0% | 0.0% |
| moonClaim | 4447 | Plant the flag: 32.7% · Sell the moon to Chad: 33.7% · Give the moon back: 33.6% | 0.0% | 0.0% |
| moonRent | 1214 | Pay the moonlight bill: 49.8% · Charge him for the view: 50.2% | 0.0% | 0.0% |
| newSchool | 190 | Build a new school: 32.1% · Promise it by spring: 33.7% · Buy a second book: 34.2% | 0.0% | 0.0% |
| opera | 4063 | Attend and applaud: 33.1% · Pay for rewrites: 33.4% · Ban the opera: 33.5% | 0.0% | 0.0% |
| parkingMeters | 225 | Install meters: 44.0% · Meters for visitors only: 23.6% · Free parking forever: 32.4% | 0.0% | 0.0% |
| parkWifi | 1406 | Free park wifi: 36.1% · Wifi with Chad's ads: 33.9% · Go outside and play: 30.0% | 0.0% | 0.0% |
| pettyCrime | 2343 | Pay for overtime: 51.5% · Blame the next town over: 48.5% | 0.0% | 0.0% |
| portrait | 2998 | Hang it proudly: 32.9% · Pay for a repaint: 33.9% · Burn it: 33.2% | 0.0% | 0.0% |
| raccoonBins | 1942 | Raccoon-proof bins: 34.9% · Night patrols: 32.2% · They live here too: 32.9% | 0.0% | 0.0% |
| rocketLibrary | 659 | Rebuild the library: 48.4% · Leave the rocket in: 51.6% | 0.0% | 0.0% |
| roundabout | 122 | Rescue the drivers: 36.1% · Sell tickets to watch: 27.9% · It's working as intended: 36.1% | 0.0% | 0.0% |
| schoolLunch | 4923 | Pay for real food: 33.5% · Chad sponsors lunch: 33.6% · Paste builds character: 32.9% | 0.0% | 0.0% |
| secretStranger | 514 | Expose him in The Bugle: 48.8% · Take his hush money: 51.2% | 0.0% | 0.0% |
| speedTrap | 2 | Approve the speed trap: 0.0% · Warning signs only: 100.0% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 1267 | Accept the statue: 32.4% · A statue of someone normal: 31.9% · No statues: 35.8% | 0.0% | 0.0% |
| talentShow | 2615 | Judge honestly: 32.1% · Everyone wins: 33.1% · Send Dave: 34.8% | 0.0% | 0.0% |
| taxBreak | 414 | Grant the tax break: 35.3% · Trade it for a donation: 21.7% · Refuse: 43.0% | 0.0% | 0.0% |
| theWhistle | 959 | Shut down The Whistle: 34.7% · Buy The Whistle: 33.2% · A free press is good: 32.1% | 0.0% | 0.0% |
| tvStation | 125 | Build the station: 32.8% · Lend her the roof: 26.4% · Refuse: 40.8% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 33.4% · Show them the pothole: 33.8% · Lock the gates: 32.8% | 0.0% | 0.0% |
| zebra | 431 | Hire a zebra wrangler: 29.2% · Make it official: 33.4% · Barb can arrest a zebra: 37.4% | 0.0% | 0.0% |

## sensible

Projects built (share of terms): casino 28.2%, helicopter 7.8%, tv 3.0%, pond 2.5%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 58.5% · Arcade, minus the engine: 33.9% · Firefighters only: 7.5% | 0.0% | 0.0% |
| auditor | 5000 | Open the books: 38.6% · Bribe him with cheese: 21.5% · Let Dave handle the audit: 40.0% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 76.9% · Teach them yourself: 21.0% · One song is plenty: 2.1% | 0.0% | 0.0% |
| bankError | 5000 | Keep it quiet: 1.4% · Give it back: 45.7% · Split it with Chad: 53.0% | 0.0% | 0.0% |
| bearStory | 35 | Yes, I wrestled a bear: 100.0% · Tell the truth: 0.0% | 0.0% | 0.0% |
| billboard | 107 | Allow the billboard: 43.0% · A small one, round the back: 55.1% · No billboard: 1.9% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 67.5% · Promise repairs soon: 22.8% · Put up a 'Good Luck' sign: 9.7% | 0.0% | 0.0% |
| buglePress | 2 | Buy a new press: 100.0% · Use the school copier: 0.0% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| campaign | 2837 | Big rally: 27.5% · Call in every Favor: 20.4% · Attack ad about the cone: 32.9% · Just be yourself: 19.1% | 0.0% | 0.0% |
| campaignTruth | 2162 | 'At least I'm not a goose': 17.1% · Promise a recount: 67.7% · Big rally: 8.8% · Call in every Favor: 6.4% | 0.0% | 0.0% |
| casinoCrime | 992 | Ban Linda from blackjack: 17.2% · Make her head of security: 82.8% | 0.0% | 0.0% |
| catGoose | 5000 | Negotiate with Gerald: 72.0% · Send in Barb: 13.3% · Let them have the bakery: 14.7% | 0.0% | 0.0% |
| catSinkhole | 5000 | Fill Kevin with concrete: 63.1% · Make Kevin an attraction: 36.7% · Move the town to the left: 0.2% | 0.0% | 0.0% |
| chadRocket | 1364 | Clear the launch: 68.6% · Launch from your own lawn: 24.4% · No rockets near children: 7.0% | 0.0% | 0.0% |
| clockWizard | 5000 | Evict the wizard: 18.7% · Charge him real rent: 6.6% · Make him town magician: 74.7% | 0.0% | 0.0% |
| coneRally | 4944 | Hold a bigger rally: 81.6% · Debate the cone, live: 17.3% · Have the cone towed: 1.1% | 0.0% | 0.0% |
| curfew | 3400 | Curfew at 9 pm: 0.8% · Fund a youth centre: 82.1% · Let them stand: 17.1% | 0.0% | 0.0% |
| diaryLeak | 5000 | Apologise to everyone: 56.3% · Publish the whole diary: 38.7% · Blame the pigeon: 5.0% | 0.0% | 0.0% |
| dogShow | 5000 | Every dog wins: 58.4% · Find the real Biscuit: 40.0% · Cancel the dog show: 1.6% | 0.0% | 0.0% |
| entitled | 167 | Free ice cream: 79.0% · Say no nicely: 21.0% | 0.0% | 0.0% |
| evBallots | 3111 | Tell the town: 69.5% · Put the boxes back: 30.5% | 0.0% | 0.0% |
| evBear | 29 | Apologise to the bear: 6.9% · Wrestle it for real: 93.1% | 0.0% | 0.0% |
| evDebate | 5000 | Debate with facts: 46.0% · Debate with insults: 54.0% | 0.0% | 0.0% |
| evFair | 1889 | Eat for the town: 90.4% · Decline politely: 9.6% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 62.2% · Burn the note: 37.8% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 46.9% · Buy a new float: 53.1% | 0.0% | 0.0% |
| evPower | 4971 | Pay Chad's guy: 85.2% · Hand out candles: 14.6% · Sit in the dark: 0.2% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 74.7% · Ignore Steve: 25.3% | 0.0% | 0.0% |
| farmersMarket | 11 | Protect the market: 27.3% · Ban the market: 45.5% · Market pays a fee: 27.3% | 0.0% | 0.0% |
| flood | 5000 | Rent the pumps: 86.3% · Rename it 'Little Venice': 12.4% · Wait for it to dry: 1.3% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 74.2% · Run tours, stiff the ghost: 11.2% · No ghosts on the payroll: 14.6% | 0.0% | 0.0% |
| gooseOccupation | 1 | Pay them off in bread: 100.0% · Send Chief Barb: 0.0% | 0.0% | 0.0% |
| goosePond | 129 | Build the pond: 97.7% · Pond in the park instead: 0.8% · Refuse: 1.6% | 0.0% | 0.0% |
| greenLights | 5000 | Fix the lights: 60.1% · Leave them green: 8.2% · Replace them with Barb: 31.7% | 0.0% | 0.0% |
| helicopter | 3775 | Buy it: 10.3% · Lease one: 19.7% · Promise it next quarter: 70.0% | 0.0% | 0.0% |
| karaoke | 5000 | Sing the hard one: 58.1% · Lip-sync it: 39.6% · No singing in City Hall: 2.2% | 0.0% | 0.0% |
| lakeMonster | 5000 | Put it on the brochure: 62.1% · Protect its privacy: 25.1% · There is no monster: 12.8% | 0.0% | 0.0% |
| lawDogs | 1620 | Overrule the dog: 10.9% · Promote the dog: 73.9% · Let justice take its course: 15.2% | 0.0% | 0.0% |
| lawGeese | 511 | Give Barb a whistle too: 24.3% · Goose lanes on every road: 51.3% · Let Gerald run it: 24.5% | 0.0% | 0.0% |
| lawSighs | 4 | Declare a free sigh day: 75.0% · Raise the sigh tax: 0.0% · Sigh for them: 25.0% | 0.0% | 0.0% |
| lawTuesday | 1879 | Give it back: 19.6% · Rename it Funday: 76.7% · Hold firm: 3.7% | 0.0% | 0.0% |
| libraryCasino | 3140 | Build the casino: 44.9% · Refuse: 15.0% · Casino night, once a year: 40.1% | 0.0% | 0.0% |
| mallParking | 425 | Pave the park: 42.8% · Only half the park: 49.9% · Hands off the park: 7.3% | 0.0% | 0.0% |
| marathon | 1421 | Run it yourself: 53.7% · Hand out water: 45.4% · Postpone it: 0.9% | 0.0% | 0.0% |
| mascot | 600 | Welcome, Wet Sock: 94.3% · Hire a real designer: 4.8% · No mascot: 0.8% | 0.0% | 0.0% |
| mimeStrike | 4999 | Notice them, with a banner: 78.2% · Negotiate in mime: 17.9% · Ignore the mimes: 3.9% | 0.0% | 0.0% |
| monsterPta | 3106 | Welcome the monster: 93.1% · Monsters can't be parents: 6.9% | 0.0% | 0.0% |
| moonClaim | 5000 | Plant the flag: 31.4% · Sell the moon to Chad: 46.1% · Give the moon back: 22.5% | 0.0% | 0.0% |
| moonRent | 1568 | Pay the moonlight bill: 68.8% · Charge him for the view: 31.2% | 0.0% | 0.0% |
| opera | 5000 | Attend and applaud: 29.1% · Pay for rewrites: 69.8% · Ban the opera: 1.1% | 0.0% | 0.0% |
| parkingMeters | 4999 | Install meters: 4.9% · Meters for visitors only: 19.3% · Free parking forever: 75.7% | 0.0% | 0.0% |
| parkWifi | 207 | Free park wifi: 79.7% · Wifi with Chad's ads: 18.8% · Go outside and play: 1.4% | 0.0% | 0.0% |
| pettyCrime | 2644 | Pay for overtime: 76.6% · Blame the next town over: 23.4% | 0.0% | 0.0% |
| policeDog | 19 | Buy a braver dog: 5.3% · Therapy for the old dog: 94.7% · One scared dog is plenty: 0.0% | 0.0% | 0.0% |
| portrait | 2353 | Hang it proudly: 64.3% · Pay for a repaint: 34.1% · Burn it: 1.6% | 0.0% | 0.0% |
| raccoonBins | 5000 | Raccoon-proof bins: 68.9% · Night patrols: 19.9% · They live here too: 11.2% | 0.0% | 0.0% |
| rocketLibrary | 856 | Rebuild the library: 82.8% · Leave the rocket in: 17.2% | 0.0% | 0.0% |
| roundabout | 1241 | Rescue the drivers: 66.4% · Sell tickets to watch: 29.2% · It's working as intended: 4.4% | 0.0% | 0.0% |
| scandal | 1 | Own it: 100.0% · Bury the story: 0.0% | 0.0% | 0.0% |
| schoolLunch | 5000 | Pay for real food: 77.4% · Chad sponsors lunch: 20.7% · Paste builds character: 1.9% | 0.0% | 0.0% |
| secretStranger | 2162 | Expose him in The Bugle: 95.1% · Take his hush money: 4.9% | 0.0% | 0.0% |
| speedTrap | 520 | Approve the speed trap: 14.2% · Warning signs only: 58.1% · No speed trap: 27.7% | 0.0% | 0.0% |
| statue | 884 | Accept the statue: 48.6% · A statue of someone normal: 49.2% · No statues: 2.1% | 0.0% | 0.0% |
| talentShow | 1184 | Judge honestly: 4.0% · Everyone wins: 39.9% · Send Dave: 56.2% | 0.0% | 0.0% |
| taxBreak | 4999 | Grant the tax break: 24.0% · Trade it for a donation: 48.4% · Refuse: 27.6% | 0.0% | 0.0% |
| theWhistle | 1456 | Shut down The Whistle: 1.0% · Buy The Whistle: 86.1% · A free press is good: 12.9% | 0.0% | 0.0% |
| tvStation | 202 | Build the station: 74.3% · Lend her the roof: 25.7% · Refuse: 0.0% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 87.7% · Show them the pothole: 12.0% · Lock the gates: 0.3% | 0.0% | 0.0% |
| zebra | 2068 | Hire a zebra wrangler: 47.3% · Make it official: 41.1% · Barb can arrest a zebra: 11.6% | 0.0% | 0.0% |
