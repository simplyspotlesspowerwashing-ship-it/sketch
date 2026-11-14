# Balance report: pack `week1`

5000 terms per policy. Tuning: {"people":0.5,"press":0.2,"business":0.1,"law":0.1,"objective":2,"brokenPromise":-4,"min":5,"max":95}.

| Policy | Win rate | Target | Mean vote | Vote p10 / p50 / p90 | Recalled | Bankrupt | Term ended early | Ending money $k p10 / p50 / p90 |
|---|---|---|---|---|---|---|---|---|
| random | 0.0% | on target | 16.1 | 13 / 17 / 17 | 100.0% | 1.2% | 96.9% | 20 / 20 / 20 |
| greedy-approval | 6.7% |  | 33.0 | 19 / 34 / 47 | 99.6% | 81.6% | 17.6% | -43 / -23 / 20 |
| miser | 0.0% |  | 14.4 | 13 / 13 / 17 | 100.0% | 0.0% | 100.0% | 20 / 20 / 20 |
| people-pleaser | 0.0% |  | 20.8 | 17 / 19 / 30 | 100.0% | 44.4% | 81.8% | -41 / 20 / 20 |
| dave-only | 0.0% | **off target** (5-10%) | 16.9 | 17 / 17 / 17 | 100.0% | 1.2% | 98.8% | 20 / 20 / 20 |
| sensible | 34.0% | **off target** (55-65%) | 44.4 | 29 / 44 / 61 | 13.8% | 0.7% | 0.0% | -2 / 29 / 69 |
| | | recalls on target (under 25%) | | | | | | |

## Non-dilemmas and other flags (sensible bot)

- `bandstand`: "One song is plenty" chosen 2% of the time (under 5%)
- `bankError`: "Keep it quiet" chosen 1% of the time (under 5%)
- `billboard`: "No billboard" chosen 1% of the time (under 5%)
- `catSinkhole`: "Move the town to the left" chosen 0% of the time (under 5%)
- `chadRocket`: "No rockets near children" chosen 5% of the time (under 5%)
- `coneRally`: "Have the cone towed" chosen 1% of the time (under 5%)
- `curfew`: "Curfew at 9 pm" chosen 1% of the time (under 5%)
- `diaryLeak`: "Blame the pigeon" chosen 3% of the time (under 5%)
- `dogShow`: "Cancel the dog show" chosen 1% of the time (under 5%)
- `evFair`: "Eat for the town" chosen 90% of the time (over 85%)
- `evPower`: "Pay Chad's guy" chosen 89% of the time (over 85%)
- `evPower`: "Sit in the dark" chosen 0% of the time (under 5%)
- `flood`: "Rent the pumps" chosen 88% of the time (over 85%)
- `flood`: "Wait for it to dry" chosen 1% of the time (under 5%)
- `goosePond`: "Build the pond" chosen 97% of the time (over 85%)
- `goosePond`: "Pond in the park instead" chosen 3% of the time (under 5%)
- `goosePond`: "Refuse" chosen 0% of the time (under 5%)
- `karaoke`: "No singing in City Hall" chosen 2% of the time (under 5%)
- `lawTuesday`: "Hold firm" chosen 3% of the time (under 5%)
- `marathon`: "Postpone it" chosen 1% of the time (under 5%)
- `mascot`: "Welcome, Wet Sock" chosen 95% of the time (over 85%)
- `mascot`: "Hire a real designer" chosen 4% of the time (under 5%)
- `mascot`: "No mascot" chosen 1% of the time (under 5%)
- `mimeStrike`: "Ignore the mimes" chosen 3% of the time (under 5%)
- `monsterPta`: "Welcome the monster" chosen 93% of the time (over 85%)
- `opera`: "Ban the opera" chosen 1% of the time (under 5%)
- `parkWifi`: "Go outside and play" chosen 3% of the time (under 5%)
- `portrait`: "Burn it" chosen 1% of the time (under 5%)
- `roundabout`: "It's working as intended" chosen 5% of the time (under 5%)
- `schoolLunch`: "Paste builds character" chosen 2% of the time (under 5%)
- `secretStranger`: "Expose him in The Bugle" chosen 97% of the time (over 85%)
- `secretStranger`: "Take his hush money" chosen 3% of the time (under 5%)
- `statue`: "No statues" chosen 2% of the time (under 5%)
- `talentShow`: "Judge honestly" chosen 3% of the time (under 5%)
- `theWhistle`: "Shut down The Whistle" chosen 0% of the time (under 5%)
- `theWhistle`: "Buy The Whistle" chosen 87% of the time (over 85%)
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
- `scandal`
- `buyout`
- `overreach`
- `goldenGoose`
- `lawHats`

## random

Projects built (share of terms): casino 20.1%, helicopter 9.0%, pond 3.7%, school 0.7%, tv 0.7%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 32.2% · Arcade, minus the engine: 33.4% · Firefighters only: 34.3% | 0.0% | 0.0% |
| auditor | 4761 | Open the books: 33.6% · Bribe him with cheese: 31.0% · Let Dave handle the audit: 35.4% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 32.8% · Teach them yourself: 33.6% · One song is plenty: 33.5% | 0.0% | 0.0% |
| bankError | 2786 | Keep it quiet: 37.1% · Give it back: 35.4% · Split it with Chad: 27.5% | 0.0% | 0.0% |
| bearStory | 40 | Yes, I wrestled a bear: 50.0% · Tell the truth: 50.0% | 0.0% | 0.0% |
| billboard | 42 | Allow the billboard: 31.0% · A small one, round the back: 31.0% · No billboard: 38.1% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 32.8% · Promise repairs soon: 34.4% · Put up a 'Good Luck' sign: 32.8% | 0.0% | 0.0% |
| campaign | 118 | Big rally: 28.0% · Call in every Favor: 9.3% · Attack ad about the cone: 27.1% · Just be yourself: 35.6% | 0.0% | 0.0% |
| campaignTruth | 37 | 'At least I'm not a goose': 37.8% · Promise a recount: 18.9% · Big rally: 35.1% · Call in every Favor: 8.1% | 0.0% | 0.0% |
| casinoCrime | 497 | Ban Linda from blackjack: 52.5% · Make her head of security: 47.5% | 0.0% | 0.0% |
| catGoose | 4993 | Negotiate with Gerald: 33.6% · Send in Barb: 32.9% · Let them have the bakery: 33.5% | 0.0% | 0.0% |
| catSinkhole | 1008 | Fill Kevin with concrete: 33.6% · Make Kevin an attraction: 32.4% · Move the town to the left: 33.9% | 0.0% | 0.0% |
| chadRocket | 2064 | Clear the launch: 33.1% · Launch from your own lawn: 34.3% · No rockets near children: 32.6% | 0.0% | 0.0% |
| clockWizard | 4998 | Evict the wizard: 33.1% · Charge him real rent: 32.7% · Make him town magician: 34.2% | 0.0% | 0.0% |
| coneRally | 418 | Hold a bigger rally: 29.7% · Debate the cone, live: 34.9% · Have the cone towed: 35.4% | 0.0% | 0.0% |
| curfew | 1012 | Curfew at 9 pm: 32.7% · Fund a youth centre: 34.8% · Let them stand: 32.5% | 0.0% | 0.0% |
| diaryLeak | 1500 | Apologise to everyone: 33.9% · Publish the whole diary: 32.3% · Blame the pigeon: 33.9% | 0.0% | 0.0% |
| dogShow | 3948 | Every dog wins: 32.6% · Find the real Biscuit: 34.1% · Cancel the dog show: 33.2% | 0.0% | 0.0% |
| duckDuel | 3 | Back Gerald: 100.0% · Back the duck: 0.0% · Stay out of bird politics: 0.0% | 0.0% | 0.0% |
| evBallots | 1273 | Tell the town: 47.8% · Put the boxes back: 52.2% | 0.0% | 0.0% |
| evBear | 19 | Apologise to the bear: 31.6% · Wrestle it for real: 68.4% | 0.0% | 0.0% |
| evDebate | 793 | Debate with facts: 45.4% · Debate with insults: 54.6% | 0.0% | 0.0% |
| evFair | 1087 | Eat for the town: 54.0% · Decline politely: 46.0% | 0.0% | 0.0% |
| evNote | 4980 | Go and look: 49.8% · Burn the note: 50.2% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.6% · Buy a new float: 49.4% | 0.0% | 0.0% |
| evPower | 4326 | Pay Chad's guy: 34.1% · Hand out candles: 32.2% · Sit in the dark: 33.7% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 50.6% · Ignore Steve: 49.4% | 0.0% | 0.0% |
| farmersMarket | 2 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| flood | 3440 | Rent the pumps: 32.1% · Rename it 'Little Venice': 32.2% · Wait for it to dry: 35.7% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 33.8% · Run tours, stiff the ghost: 33.5% · No ghosts on the payroll: 32.7% | 0.0% | 0.0% |
| gooseOccupation | 174 | Pay them off in bread: 54.0% · Send Chief Barb: 46.0% | 0.0% | 0.0% |
| goosePond | 600 | Build the pond: 30.8% · Pond in the park instead: 35.5% · Refuse: 33.7% | 0.0% | 0.0% |
| greenLights | 1221 | Fix the lights: 34.4% · Leave them green: 33.3% · Replace them with Barb: 32.4% | 0.0% | 0.0% |
| helicopter | 1408 | Buy it: 32.0% · Lease one: 35.7% · Promise it next quarter: 32.3% | 0.0% | 0.0% |
| karaoke | 4932 | Sing the hard one: 32.7% · Lip-sync it: 33.6% · No singing in City Hall: 33.7% | 0.0% | 0.0% |
| lakeMonster | 2045 | Put it on the brochure: 33.0% · Protect its privacy: 32.8% · There is no monster: 34.2% | 0.0% | 0.0% |
| lawDogs | 212 | Overrule the dog: 29.2% · Promote the dog: 35.8% · Let justice take its course: 34.9% | 0.0% | 0.0% |
| lawGeese | 123 | Give Barb a whistle too: 34.1% · Goose lanes on every road: 26.0% · Let Gerald run it: 39.8% | 0.0% | 0.0% |
| lawSighs | 204 | Declare a free sigh day: 30.4% · Raise the sigh tax: 34.8% · Sigh for them: 34.8% | 0.0% | 0.0% |
| lawTuesday | 1420 | Give it back: 33.9% · Rename it Funday: 32.3% · Hold firm: 33.9% | 0.0% | 0.0% |
| libraryCasino | 2870 | Build the casino: 35.0% · Refuse: 32.6% · Casino night, once a year: 32.4% | 0.0% | 0.0% |
| mallParking | 451 | Pave the park: 39.7% · Only half the park: 26.4% · Hands off the park: 33.9% | 0.0% | 0.0% |
| marathon | 3635 | Run it yourself: 32.6% · Hand out water: 33.3% · Postpone it: 34.1% | 0.0% | 0.0% |
| mascot | 356 | Welcome, Wet Sock: 36.0% · Hire a real designer: 35.4% · No mascot: 28.7% | 0.0% | 0.0% |
| mimeStrike | 659 | Notice them, with a banner: 34.1% · Negotiate in mime: 31.7% · Ignore the mimes: 34.1% | 0.0% | 0.0% |
| monsterPta | 573 | Welcome the monster: 51.0% · Monsters can't be parents: 49.0% | 0.0% | 0.0% |
| moonClaim | 4559 | Plant the flag: 32.0% · Sell the moon to Chad: 34.3% · Give the moon back: 33.7% | 0.0% | 0.0% |
| moonRent | 1237 | Pay the moonlight bill: 49.2% · Charge him for the view: 50.8% | 0.0% | 0.0% |
| newSchool | 134 | Build a new school: 27.6% · Promise it by spring: 42.5% · Buy a second book: 29.9% | 0.0% | 0.0% |
| opera | 4232 | Attend and applaud: 33.8% · Pay for rewrites: 33.0% · Ban the opera: 33.2% | 0.0% | 0.0% |
| parkingMeters | 275 | Install meters: 40.4% · Meters for visitors only: 18.2% · Free parking forever: 41.5% | 0.0% | 0.0% |
| parkWifi | 1271 | Free park wifi: 35.6% · Wifi with Chad's ads: 32.4% · Go outside and play: 31.9% | 0.0% | 0.0% |
| pettyCrime | 2655 | Pay for overtime: 49.1% · Blame the next town over: 50.9% | 0.0% | 0.0% |
| portrait | 2865 | Hang it proudly: 32.8% · Pay for a repaint: 32.4% · Burn it: 34.8% | 0.0% | 0.0% |
| raccoonBins | 2161 | Raccoon-proof bins: 33.5% · Night patrols: 32.7% · They live here too: 33.7% | 0.0% | 0.0% |
| rocketLibrary | 666 | Rebuild the library: 51.8% · Leave the rocket in: 48.2% | 0.0% | 0.0% |
| roundabout | 60 | Rescue the drivers: 21.7% · Sell tickets to watch: 38.3% · It's working as intended: 40.0% | 0.0% | 0.0% |
| schoolLunch | 4960 | Pay for real food: 34.2% · Chad sponsors lunch: 33.0% · Paste builds character: 32.8% | 0.0% | 0.0% |
| secretStranger | 491 | Expose him in The Bugle: 46.4% · Take his hush money: 53.6% | 0.0% | 0.0% |
| speedTrap | 2 | Approve the speed trap: 50.0% · Warning signs only: 0.0% · No speed trap: 50.0% | 0.0% | 0.0% |
| statue | 1241 | Accept the statue: 33.2% · A statue of someone normal: 33.9% · No statues: 32.9% | 0.0% | 0.0% |
| talentShow | 2474 | Judge honestly: 32.7% · Everyone wins: 34.7% · Send Dave: 32.5% | 0.0% | 0.0% |
| taxBreak | 531 | Grant the tax break: 33.9% · Trade it for a donation: 25.6% · Refuse: 40.5% | 0.0% | 0.0% |
| theWhistle | 964 | Shut down The Whistle: 35.8% · Buy The Whistle: 32.1% · A free press is good: 32.2% | 0.0% | 0.0% |
| tvStation | 116 | Build the station: 30.2% · Lend her the roof: 38.8% · Refuse: 31.0% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 35.0% · Show them the pothole: 32.4% · Lock the gates: 32.5% | 0.0% | 0.0% |
| zebra | 313 | Hire a zebra wrangler: 33.2% · Make it official: 32.6% · Barb can arrest a zebra: 34.2% | 0.0% | 0.0% |

## greedy-approval

Projects built (share of terms): helicopter 67.6%, casino 63.0%, pond 12.5%, tv 5.4%, school 0.6%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 100.0% · Arcade, minus the engine: 0.0% · Firefighters only: 0.0% | 0.0% | 0.0% |
| auditor | 4987 | Open the books: 89.4% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 10.6% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 100.0% · Teach them yourself: 0.0% · One song is plenty: 0.0% | 0.0% | 0.0% |
| bankError | 4946 | Keep it quiet: 0.0% · Give it back: 100.0% · Split it with Chad: 0.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 100.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| campaignTruth | 4121 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| casinoCrime | 184 | Ban Linda from blackjack: 20.7% · Make her head of security: 79.3% | 0.0% | 0.0% |
| catGoose | 5000 | Negotiate with Gerald: 99.9% · Send in Barb: 0.1% · Let them have the bakery: 0.0% | 0.0% | 0.0% |
| catSinkhole | 4853 | Fill Kevin with concrete: 61.9% · Make Kevin an attraction: 38.1% · Move the town to the left: 0.0% | 0.0% | 0.0% |
| chadRocket | 1880 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| clockWizard | 5000 | Evict the wizard: 0.0% · Charge him real rent: 0.0% · Make him town magician: 100.0% | 0.0% | 0.0% |
| coneRally | 3290 | Hold a bigger rally: 81.4% · Debate the cone, live: 18.6% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| curfew | 3328 | Curfew at 9 pm: 0.0% · Fund a youth centre: 100.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 4525 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| dogShow | 4991 | Every dog wins: 72.6% · Find the real Biscuit: 27.4% · Cancel the dog show: 0.0% | 0.0% | 0.0% |
| evBallots | 4929 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evDebate | 4636 | Debate with facts: 100.0% · Debate with insults: 0.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 4995 | Pay Chad's guy: 85.1% · Hand out candles: 10.0% · Sit in the dark: 4.9% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| flood | 4880 | Rent the pumps: 63.6% · Rename it 'Little Venice': 36.4% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 100.0% · Run tours, stiff the ghost: 0.0% · No ghosts on the payroll: 0.0% | 0.0% | 0.0% |
| goosePond | 626 | Build the pond: 100.0% · Pond in the park instead: 0.0% · Refuse: 0.0% | 0.0% | 0.0% |
| greenLights | 4873 | Fix the lights: 86.3% · Leave them green: 0.0% · Replace them with Barb: 13.7% | 0.0% | 0.0% |
| helicopter | 3382 | Buy it: 99.9% · Lease one: 0.1% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| karaoke | 5000 | Sing the hard one: 100.0% · Lip-sync it: 0.0% · No singing in City Hall: 0.0% | 0.0% | 0.0% |
| lakeMonster | 4915 | Put it on the brochure: 79.5% · Protect its privacy: 20.5% · There is no monster: 0.0% | 0.0% | 0.0% |
| lawDogs | 338 | Overrule the dog: 19.8% · Promote the dog: 80.2% · Let justice take its course: 0.0% | 0.0% | 0.0% |
| lawTuesday | 560 | Give it back: 27.3% · Rename it Funday: 72.7% · Hold firm: 0.0% | 0.0% | 0.0% |
| libraryCasino | 3996 | Build the casino: 78.8% · Refuse: 0.0% · Casino night, once a year: 21.2% | 0.0% | 0.0% |
| mallParking | 93 | Pave the park: 0.0% · Only half the park: 100.0% · Hands off the park: 0.0% | 0.0% | 0.0% |
| marathon | 2249 | Run it yourself: 0.0% · Hand out water: 100.0% · Postpone it: 0.0% | 0.0% | 0.0% |
| mascot | 328 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 0.0% |
| mimeStrike | 4611 | Notice them, with a banner: 84.3% · Negotiate in mime: 15.7% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| monsterPta | 3892 | Welcome the monster: 100.0% · Monsters can't be parents: 0.0% | 0.0% | 0.0% |
| moonClaim | 4996 | Plant the flag: 83.3% · Sell the moon to Chad: 16.7% · Give the moon back: 0.0% | 0.0% | 0.0% |
| moonRent | 4146 | Pay the moonlight bill: 75.7% · Charge him for the view: 24.3% | 0.0% | 0.0% |
| newSchool | 40 | Build a new school: 70.0% · Promise it by spring: 30.0% · Buy a second book: 0.0% | 0.0% | 0.0% |
| opera | 4992 | Attend and applaud: 27.1% · Pay for rewrites: 72.9% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkingMeters | 4284 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 879 | Free park wifi: 89.8% · Wifi with Chad's ads: 10.2% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 231 | Pay for overtime: 43.7% · Blame the next town over: 56.3% | 0.0% | 0.0% |
| portrait | 1338 | Hang it proudly: 100.0% · Pay for a repaint: 0.0% · Burn it: 0.0% | 0.0% | 0.0% |
| raccoonBins | 4928 | Raccoon-proof bins: 80.5% · Night patrols: 19.5% · They live here too: 0.0% | 0.0% | 0.0% |
| rocketLibrary | 1880 | Rebuild the library: 85.2% · Leave the rocket in: 14.8% | 0.0% | 0.0% |
| roundabout | 512 | Rescue the drivers: 100.0% · Sell tickets to watch: 0.0% · It's working as intended: 0.0% | 0.0% | 0.0% |
| schoolLunch | 5000 | Pay for real food: 92.7% · Chad sponsors lunch: 7.3% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 4886 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| speedTrap | 339 | Approve the speed trap: 15.0% · Warning signs only: 85.0% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 1745 | Accept the statue: 18.2% · A statue of someone normal: 81.8% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 2105 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 4531 | Grant the tax break: 42.7% · Trade it for a donation: 57.3% · Refuse: 0.0% | 0.0% | 0.0% |
| theWhistle | 1066 | Shut down The Whistle: 0.7% · Buy The Whistle: 99.3% · A free press is good: 0.0% | 0.0% | 0.0% |
| tvStation | 271 | Build the station: 100.0% · Lend her the roof: 0.0% · Refuse: 0.0% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 100.0% · Show them the pothole: 0.0% · Lock the gates: 0.0% | 0.0% | 0.0% |
| zebra | 628 | Hire a zebra wrangler: 97.1% · Make it official: 2.9% · Barb can arrest a zebra: 0.0% | 0.0% | 0.0% |

## miser

Projects built (share of terms): casino 35.2%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 100.0% · Arcade, minus the engine: 0.0% · Firefighters only: 0.0% | 0.0% | 0.0% |
| auditor | 4778 | Open the books: 0.0% · Bribe him with cheese: 100.0% · Let Dave handle the audit: 0.0% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 0.0% · Teach them yourself: 100.0% · One song is plenty: 0.0% | 0.0% | 0.0% |
| bankError | 94 | Keep it quiet: 100.0% · Give it back: 0.0% · Split it with Chad: 0.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 0.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 100.0% | 0.0% | 0.0% |
| casinoCrime | 12 | Ban Linda from blackjack: 100.0% · Make her head of security: 0.0% | 0.0% | 0.0% |
| catGoose | 4998 | Negotiate with Gerald: 0.0% · Send in Barb: 0.0% · Let them have the bakery: 100.0% | 0.0% | 0.0% |
| catSinkhole | 1 | Fill Kevin with concrete: 0.0% · Make Kevin an attraction: 100.0% · Move the town to the left: 0.0% | 0.0% | 0.0% |
| chadRocket | 394 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| clockWizard | 4998 | Evict the wizard: 0.0% · Charge him real rent: 100.0% · Make him town magician: 0.0% | 0.0% | 0.0% |
| curfew | 2097 | Curfew at 9 pm: 100.0% · Fund a youth centre: 0.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 10 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| dogShow | 1615 | Every dog wins: 0.0% · Find the real Biscuit: 100.0% · Cancel the dog show: 0.0% | 0.0% | 0.0% |
| evBallots | 35 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evNote | 4973 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 100.0% · Buy a new float: 0.0% | 0.0% | 0.0% |
| evPower | 3194 | Pay Chad's guy: 0.0% · Hand out candles: 0.0% · Sit in the dark: 100.0% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 0.0% · Ignore Steve: 100.0% | 0.0% | 0.0% |
| flood | 520 | Rent the pumps: 0.0% · Rename it 'Little Venice': 100.0% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 0.0% · Run tours, stiff the ghost: 100.0% · No ghosts on the payroll: 0.0% | 0.0% | 0.0% |
| gooseOccupation | 28 | Pay them off in bread: 0.0% · Send Chief Barb: 100.0% | 0.0% | 0.0% |
| goosePond | 356 | Build the pond: 0.0% · Pond in the park instead: 0.0% · Refuse: 100.0% | 0.0% | 0.0% |
| greenLights | 6 | Fix the lights: 0.0% · Leave them green: 100.0% · Replace them with Barb: 0.0% | 0.0% | 0.0% |
| helicopter | 3256 | Buy it: 0.0% · Lease one: 2.2% · Promise it next quarter: 97.8% | 0.0% | 0.0% |
| karaoke | 4859 | Sing the hard one: 100.0% · Lip-sync it: 0.0% · No singing in City Hall: 0.0% | 0.0% | 0.0% |
| lakeMonster | 15 | Put it on the brochure: 0.0% · Protect its privacy: 100.0% · There is no monster: 0.0% | 0.0% | 0.0% |
| lawSighs | 283 | Declare a free sigh day: 0.0% · Raise the sigh tax: 100.0% · Sigh for them: 0.0% | 0.0% | 0.0% |
| libraryCasino | 2030 | Build the casino: 86.8% · Refuse: 0.0% · Casino night, once a year: 13.2% | 0.0% | 0.0% |
| mallParking | 2 | Pave the park: 100.0% · Only half the park: 0.0% · Hands off the park: 0.0% | 0.0% | 0.0% |
| marathon | 4286 | Run it yourself: 100.0% · Hand out water: 0.0% · Postpone it: 0.0% | 0.0% | 0.0% |
| moonClaim | 4324 | Plant the flag: 0.0% · Sell the moon to Chad: 100.0% · Give the moon back: 0.0% | 0.0% | 0.0% |
| opera | 2037 | Attend and applaud: 100.0% · Pay for rewrites: 0.0% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkWifi | 1491 | Free park wifi: 0.0% · Wifi with Chad's ads: 100.0% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 5536 | Pay for overtime: 0.0% · Blame the next town over: 100.0% | 0.0% | 0.0% |
| portrait | 1605 | Hang it proudly: 100.0% · Pay for a repaint: 0.0% · Burn it: 0.0% | 0.0% | 0.0% |
| raccoonBins | 35 | Raccoon-proof bins: 0.0% · Night patrols: 100.0% · They live here too: 0.0% | 0.0% | 0.0% |
| rocketLibrary | 251 | Rebuild the library: 0.0% · Leave the rocket in: 100.0% | 0.0% | 0.0% |
| roundabout | 16 | Rescue the drivers: 0.0% · Sell tickets to watch: 100.0% · It's working as intended: 0.0% | 0.0% | 0.0% |
| schoolLunch | 4938 | Pay for real food: 0.0% · Chad sponsors lunch: 100.0% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 14 | Expose him in The Bugle: 0.0% · Take his hush money: 100.0% | 0.0% | 0.0% |
| statue | 91 | Accept the statue: 100.0% · A statue of someone normal: 0.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 2912 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| theWhistle | 63 | Shut down The Whistle: 100.0% · Buy The Whistle: 0.0% · A free press is good: 0.0% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 0.0% · Show them the pothole: 100.0% · Lock the gates: 0.0% | 0.0% | 0.0% |
| zebra | 328 | Hire a zebra wrangler: 0.0% · Make it official: 100.0% · Barb can arrest a zebra: 0.0% | 0.0% | 0.0% |

## people-pleaser

Projects built (share of terms): none

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 100.0% · Arcade, minus the engine: 0.0% · Firefighters only: 0.0% | 0.0% | 0.0% |
| auditor | 5000 | Open the books: 98.1% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 1.9% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 100.0% · Teach them yourself: 0.0% · One song is plenty: 0.0% | 0.0% | 0.0% |
| bankError | 4584 | Keep it quiet: 6.4% · Give it back: 0.0% · Split it with Chad: 93.6% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 100.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| campaignTruth | 911 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| catGoose | 5000 | Negotiate with Gerald: 100.0% · Send in Barb: 0.0% · Let them have the bakery: 0.0% | 0.0% | 0.0% |
| catSinkhole | 3771 | Fill Kevin with concrete: 82.6% · Make Kevin an attraction: 17.4% · Move the town to the left: 0.0% | 0.0% | 0.0% |
| chadRocket | 870 | Clear the launch: 0.0% · Launch from your own lawn: 87.9% · No rockets near children: 12.1% | 0.0% | 0.0% |
| clockWizard | 5000 | Evict the wizard: 0.0% · Charge him real rent: 0.0% · Make him town magician: 100.0% | 0.0% | 0.0% |
| coneRally | 2071 | Hold a bigger rally: 63.3% · Debate the cone, live: 36.7% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| curfew | 3315 | Curfew at 9 pm: 0.0% · Fund a youth centre: 100.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 3991 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| dogShow | 4992 | Every dog wins: 98.3% · Find the real Biscuit: 1.7% · Cancel the dog show: 0.0% | 0.0% | 0.0% |
| entitled | 95 | Free ice cream: 100.0% · Say no nicely: 0.0% | 0.0% | 0.0% |
| evBallots | 4395 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evDebate | 2992 | Debate with facts: 0.0% · Debate with insults: 100.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 4992 | Pay Chad's guy: 99.9% · Hand out candles: 0.1% · Sit in the dark: 0.0% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| flood | 4930 | Rent the pumps: 34.0% · Rename it 'Little Venice': 66.0% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 100.0% · Run tours, stiff the ghost: 0.0% · No ghosts on the payroll: 0.0% | 0.0% | 0.0% |
| greenLights | 3855 | Fix the lights: 0.0% · Leave them green: 100.0% · Replace them with Barb: 0.0% | 0.0% | 0.0% |
| helicopter | 4261 | Buy it: 0.0% · Lease one: 100.0% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| karaoke | 5000 | Sing the hard one: 0.0% · Lip-sync it: 100.0% · No singing in City Hall: 0.0% | 0.0% | 0.0% |
| lakeMonster | 4364 | Put it on the brochure: 0.0% · Protect its privacy: 100.0% · There is no monster: 0.0% | 0.0% | 0.0% |
| lawTuesday | 4155 | Give it back: 0.2% · Rename it Funday: 99.8% · Hold firm: 0.0% | 0.0% | 0.0% |
| libraryCasino | 4413 | Build the casino: 0.0% · Refuse: 100.0% · Casino night, once a year: 0.0% | 0.0% | 0.0% |
| mallParking | 164 | Pave the park: 0.0% · Only half the park: 0.0% · Hands off the park: 100.0% | 0.0% | 0.0% |
| marathon | 803 | Run it yourself: 100.0% · Hand out water: 0.0% · Postpone it: 0.0% | 0.0% | 0.0% |
| mascot | 84 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 0.0% |
| mimeStrike | 2736 | Notice them, with a banner: 88.7% · Negotiate in mime: 11.3% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 4996 | Plant the flag: 99.0% · Sell the moon to Chad: 0.0% · Give the moon back: 1.0% | 0.0% | 0.0% |
| moonRent | 4941 | Pay the moonlight bill: 92.5% · Charge him for the view: 7.5% | 0.0% | 0.0% |
| opera | 4992 | Attend and applaud: 0.0% · Pay for rewrites: 98.8% · Ban the opera: 1.2% | 0.0% | 0.0% |
| parkingMeters | 1593 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 4 | Free park wifi: 100.0% · Wifi with Chad's ads: 0.0% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 2291 | Pay for overtime: 57.9% · Blame the next town over: 42.1% | 0.0% | 0.0% |
| portrait | 1415 | Hang it proudly: 100.0% · Pay for a repaint: 0.0% · Burn it: 0.0% | 0.0% | 0.0% |
| raccoonBins | 4395 | Raccoon-proof bins: 96.0% · Night patrols: 0.0% · They live here too: 4.0% | 0.0% | 0.0% |
| roundabout | 429 | Rescue the drivers: 97.0% · Sell tickets to watch: 3.0% · It's working as intended: 0.0% | 0.0% | 0.0% |
| schoolLunch | 5000 | Pay for real food: 99.8% · Chad sponsors lunch: 0.2% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 4010 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| speedTrap | 1 | Approve the speed trap: 0.0% · Warning signs only: 100.0% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 215 | Accept the statue: 0.0% · A statue of someone normal: 98.6% · No statues: 1.4% | 0.0% | 0.0% |
| talentShow | 800 | Judge honestly: 0.0% · Everyone wins: 100.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 2601 | Grant the tax break: 0.0% · Trade it for a donation: 0.0% · Refuse: 100.0% | 0.0% | 0.0% |
| theWhistle | 809 | Shut down The Whistle: 0.0% · Buy The Whistle: 99.3% · A free press is good: 0.7% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 100.0% · Show them the pothole: 0.0% · Lock the gates: 0.0% | 0.0% | 0.0% |
| zebra | 2825 | Hire a zebra wrangler: 0.0% · Make it official: 100.0% · Barb can arrest a zebra: 0.0% | 0.0% | 0.0% |

## dave-only

Projects built (share of terms): casino 19.4%, helicopter 8.9%, pond 4.4%, school 0.9%, tv 0.6%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 33.8% · Arcade, minus the engine: 32.8% · Firefighters only: 33.4% | 0.0% | 0.0% |
| auditor | 4600 | Open the books: 35.1% · Bribe him with cheese: 29.8% · Let Dave handle the audit: 35.1% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 34.3% · Teach them yourself: 32.4% · One song is plenty: 33.3% | 0.0% | 0.0% |
| bankError | 2199 | Keep it quiet: 37.8% · Give it back: 35.1% · Split it with Chad: 27.1% | 0.0% | 0.0% |
| bearStory | 37 | Yes, I wrestled a bear: 51.4% · Tell the truth: 48.6% | 0.0% | 0.0% |
| billboard | 24 | Allow the billboard: 45.8% · A small one, round the back: 20.8% · No billboard: 33.3% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 33.7% · Promise repairs soon: 32.9% · Put up a 'Good Luck' sign: 33.4% | 0.0% | 0.0% |
| buglePress | 3 | Buy a new press: 0.0% · Use the school copier: 33.3% · Not the town's problem: 66.7% | 0.0% | 0.0% |
| campaign | 40 | Big rally: 0.0% · Call in every Favor: 0.0% · Attack ad about the cone: 0.0% · Just be yourself: 100.0% | 0.0% | 0.0% |
| campaignTruth | 21 | 'At least I'm not a goose': 0.0% · Promise a recount: 0.0% · Big rally: 61.9% · Call in every Favor: 38.1% | 0.0% | 0.0% |
| casinoCrime | 409 | Ban Linda from blackjack: 50.1% · Make her head of security: 49.9% | 0.0% | 0.0% |
| catGoose | 4992 | Negotiate with Gerald: 32.6% · Send in Barb: 34.3% · Let them have the bakery: 33.1% | 0.0% | 0.0% |
| catSinkhole | 599 | Fill Kevin with concrete: 31.1% · Make Kevin an attraction: 37.1% · Move the town to the left: 31.9% | 0.0% | 0.0% |
| chadRocket | 2163 | Clear the launch: 30.9% · Launch from your own lawn: 33.9% · No rockets near children: 35.2% | 0.0% | 0.0% |
| clockWizard | 5000 | Evict the wizard: 33.9% · Charge him real rent: 33.4% · Make him town magician: 32.7% | 0.0% | 0.0% |
| coneRally | 193 | Hold a bigger rally: 33.7% · Debate the cone, live: 33.2% · Have the cone towed: 33.2% | 0.0% | 0.0% |
| curfew | 957 | Curfew at 9 pm: 29.9% · Fund a youth centre: 36.4% · Let them stand: 33.8% | 0.0% | 0.0% |
| diaryLeak | 945 | Apologise to everyone: 32.6% · Publish the whole diary: 34.4% · Blame the pigeon: 33.0% | 0.0% | 0.0% |
| dogShow | 3507 | Every dog wins: 31.9% · Find the real Biscuit: 34.8% · Cancel the dog show: 33.3% | 0.0% | 0.0% |
| duckDuel | 9 | Back Gerald: 66.7% · Back the duck: 22.2% · Stay out of bird politics: 11.1% | 0.0% | 0.0% |
| evBallots | 1002 | Tell the town: 51.7% · Put the boxes back: 48.3% | 0.0% | 0.0% |
| evBear | 16 | Apologise to the bear: 31.3% · Wrestle it for real: 68.8% | 0.0% | 0.0% |
| evDebate | 403 | Debate with facts: 46.7% · Debate with insults: 53.3% | 0.0% | 0.0% |
| evFair | 809 | Eat for the town: 49.1% · Decline politely: 50.9% | 0.0% | 0.0% |
| evNote | 4967 | Go and look: 49.8% · Burn the note: 50.2% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 48.8% · Buy a new float: 51.2% | 0.0% | 0.0% |
| evPower | 4031 | Pay Chad's guy: 33.1% · Hand out candles: 32.9% · Sit in the dark: 34.0% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 47.8% · Ignore Steve: 52.2% | 0.0% | 0.0% |
| flood | 2945 | Rent the pumps: 34.5% · Rename it 'Little Venice': 32.9% · Wait for it to dry: 32.6% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 32.8% · Run tours, stiff the ghost: 34.2% · No ghosts on the payroll: 33.1% | 0.0% | 0.0% |
| gooseOccupation | 165 | Pay them off in bread: 49.7% · Send Chief Barb: 50.3% | 0.0% | 0.0% |
| goosePond | 637 | Build the pond: 34.5% · Pond in the park instead: 33.3% · Refuse: 32.2% | 0.0% | 0.0% |
| greenLights | 711 | Fix the lights: 31.5% · Leave them green: 33.3% · Replace them with Barb: 35.2% | 0.0% | 0.0% |
| helicopter | 1330 | Buy it: 33.3% · Lease one: 33.8% · Promise it next quarter: 32.9% | 0.0% | 0.0% |
| karaoke | 4863 | Sing the hard one: 33.5% · Lip-sync it: 32.0% · No singing in City Hall: 34.5% | 0.0% | 0.0% |
| lakeMonster | 1446 | Put it on the brochure: 34.3% · Protect its privacy: 32.8% · There is no monster: 32.8% | 0.0% | 0.0% |
| lawDogs | 141 | Overrule the dog: 29.8% · Promote the dog: 36.9% · Let justice take its course: 33.3% | 0.0% | 0.0% |
| lawGeese | 62 | Give Barb a whistle too: 41.9% · Goose lanes on every road: 35.5% · Let Gerald run it: 22.6% | 0.0% | 0.0% |
| lawSighs | 81 | Declare a free sigh day: 34.6% · Raise the sigh tax: 27.2% · Sigh for them: 38.3% | 0.0% | 0.0% |
| lawTuesday | 453 | Give it back: 32.7% · Rename it Funday: 35.3% · Hold firm: 32.0% | 0.0% | 0.0% |
| libraryCasino | 2964 | Build the casino: 32.7% · Refuse: 33.5% · Casino night, once a year: 33.8% | 0.0% | 0.0% |
| mallParking | 444 | Pave the park: 36.3% · Only half the park: 28.6% · Hands off the park: 35.1% | 0.0% | 0.0% |
| marathon | 3607 | Run it yourself: 32.4% · Hand out water: 35.6% · Postpone it: 32.0% | 0.0% | 0.0% |
| mascot | 372 | Welcome, Wet Sock: 38.2% · Hire a real designer: 29.8% · No mascot: 32.0% | 0.0% | 0.0% |
| mimeStrike | 314 | Notice them, with a banner: 33.1% · Negotiate in mime: 33.4% · Ignore the mimes: 33.4% | 0.0% | 0.0% |
| monsterPta | 394 | Welcome the monster: 52.8% · Monsters can't be parents: 47.2% | 0.0% | 0.0% |
| moonClaim | 4327 | Plant the flag: 32.7% · Sell the moon to Chad: 34.0% · Give the moon back: 33.3% | 0.0% | 0.0% |
| moonRent | 1129 | Pay the moonlight bill: 49.3% · Charge him for the view: 50.7% | 0.0% | 0.0% |
| newSchool | 143 | Build a new school: 30.1% · Promise it by spring: 35.7% · Buy a second book: 34.3% | 0.0% | 0.0% |
| opera | 3861 | Attend and applaud: 33.1% · Pay for rewrites: 33.3% · Ban the opera: 33.7% | 0.0% | 0.0% |
| parkingMeters | 114 | Install meters: 43.0% · Meters for visitors only: 26.3% · Free parking forever: 30.7% | 0.0% | 0.0% |
| parkWifi | 1308 | Free park wifi: 35.9% · Wifi with Chad's ads: 33.9% · Go outside and play: 30.2% | 0.0% | 0.0% |
| pettyCrime | 2665 | Pay for overtime: 50.8% · Blame the next town over: 49.2% | 0.0% | 0.0% |
| portrait | 3015 | Hang it proudly: 32.9% · Pay for a repaint: 33.2% · Burn it: 33.9% | 0.0% | 0.0% |
| raccoonBins | 1569 | Raccoon-proof bins: 35.0% · Night patrols: 32.8% · They live here too: 32.2% | 0.0% | 0.0% |
| rocketLibrary | 648 | Rebuild the library: 47.5% · Leave the rocket in: 52.5% | 0.0% | 0.0% |
| roundabout | 71 | Rescue the drivers: 38.0% · Sell tickets to watch: 32.4% · It's working as intended: 29.6% | 0.0% | 0.0% |
| schoolLunch | 4909 | Pay for real food: 33.4% · Chad sponsors lunch: 33.8% · Paste builds character: 32.9% | 0.0% | 0.0% |
| secretStranger | 395 | Expose him in The Bugle: 50.1% · Take his hush money: 49.9% | 0.0% | 0.0% |
| speedTrap | 1 | Approve the speed trap: 0.0% · Warning signs only: 100.0% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 1227 | Accept the statue: 33.0% · A statue of someone normal: 31.9% · No statues: 35.0% | 0.0% | 0.0% |
| talentShow | 2571 | Judge honestly: 32.2% · Everyone wins: 32.7% · Send Dave: 35.1% | 0.0% | 0.0% |
| taxBreak | 242 | Grant the tax break: 38.0% · Trade it for a donation: 21.5% · Refuse: 40.5% | 0.0% | 0.0% |
| theWhistle | 943 | Shut down The Whistle: 34.7% · Buy The Whistle: 33.8% · A free press is good: 31.5% | 0.0% | 0.0% |
| tvStation | 112 | Build the station: 27.7% · Lend her the roof: 31.3% · Refuse: 41.1% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 33.4% · Show them the pothole: 33.8% · Lock the gates: 32.8% | 0.0% | 0.0% |
| zebra | 361 | Hire a zebra wrangler: 29.9% · Make it official: 31.6% · Barb can arrest a zebra: 38.5% | 0.0% | 0.0% |

## sensible

Projects built (share of terms): casino 27.0%, helicopter 8.0%, tv 2.9%, pond 2.9%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 58.5% · Arcade, minus the engine: 33.9% · Firefighters only: 7.5% | 0.0% | 0.0% |
| auditor | 5000 | Open the books: 39.2% · Bribe him with cheese: 21.5% · Let Dave handle the audit: 39.4% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 78.7% · Teach them yourself: 19.0% · One song is plenty: 2.3% | 0.0% | 0.0% |
| bankError | 5000 | Keep it quiet: 0.8% · Give it back: 45.0% · Split it with Chad: 54.1% | 0.0% | 0.0% |
| bearStory | 32 | Yes, I wrestled a bear: 100.0% · Tell the truth: 0.0% | 0.0% | 0.0% |
| billboard | 98 | Allow the billboard: 49.0% · A small one, round the back: 50.0% · No billboard: 1.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 69.0% · Promise repairs soon: 23.3% · Put up a 'Good Luck' sign: 7.7% | 0.0% | 0.0% |
| buglePress | 1 | Buy a new press: 100.0% · Use the school copier: 0.0% · Not the town's problem: 0.0% | 0.0% | 0.0% |
| campaign | 2860 | Big rally: 20.1% · Call in every Favor: 18.0% · Attack ad about the cone: 38.5% · Just be yourself: 23.4% | 0.0% | 0.0% |
| campaignTruth | 2139 | 'At least I'm not a goose': 17.2% · Promise a recount: 70.9% · Big rally: 6.1% · Call in every Favor: 5.8% | 0.0% | 0.0% |
| casinoCrime | 814 | Ban Linda from blackjack: 15.1% · Make her head of security: 84.9% | 0.0% | 0.0% |
| catGoose | 5000 | Negotiate with Gerald: 75.6% · Send in Barb: 14.8% · Let them have the bakery: 9.6% | 0.0% | 0.0% |
| catSinkhole | 5000 | Fill Kevin with concrete: 60.5% · Make Kevin an attraction: 39.3% · Move the town to the left: 0.3% | 0.0% | 0.0% |
| chadRocket | 1332 | Clear the launch: 72.5% · Launch from your own lawn: 22.5% · No rockets near children: 5.0% | 0.0% | 0.0% |
| clockWizard | 5000 | Evict the wizard: 19.0% · Charge him real rent: 6.7% · Make him town magician: 74.3% | 0.0% | 0.0% |
| coneRally | 4941 | Hold a bigger rally: 83.4% · Debate the cone, live: 15.6% · Have the cone towed: 1.0% | 0.0% | 0.0% |
| curfew | 3299 | Curfew at 9 pm: 1.0% · Fund a youth centre: 82.8% · Let them stand: 16.2% | 0.0% | 0.0% |
| diaryLeak | 5000 | Apologise to everyone: 57.0% · Publish the whole diary: 39.8% · Blame the pigeon: 3.2% | 0.0% | 0.0% |
| dogShow | 5000 | Every dog wins: 54.2% · Find the real Biscuit: 44.4% · Cancel the dog show: 1.4% | 0.0% | 0.0% |
| entitled | 63 | Free ice cream: 79.4% · Say no nicely: 20.6% | 0.0% | 0.0% |
| evBallots | 3112 | Tell the town: 68.8% · Put the boxes back: 31.2% | 0.0% | 0.0% |
| evBear | 27 | Apologise to the bear: 18.5% · Wrestle it for real: 81.5% | 0.0% | 0.0% |
| evDebate | 5000 | Debate with facts: 48.8% · Debate with insults: 51.2% | 0.0% | 0.0% |
| evFair | 1888 | Eat for the town: 90.4% · Decline politely: 9.6% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 62.2% · Burn the note: 37.8% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 46.9% · Buy a new float: 53.1% | 0.0% | 0.0% |
| evPower | 4973 | Pay Chad's guy: 88.6% · Hand out candles: 11.3% · Sit in the dark: 0.1% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 76.6% · Ignore Steve: 23.4% | 0.0% | 0.0% |
| farmersMarket | 9 | Protect the market: 11.1% · Ban the market: 44.4% · Market pays a fee: 44.4% | 0.0% | 0.0% |
| flood | 5000 | Rent the pumps: 87.8% · Rename it 'Little Venice': 11.2% · Wait for it to dry: 1.0% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 74.4% · Run tours, stiff the ghost: 10.9% · No ghosts on the payroll: 14.6% | 0.0% | 0.0% |
| goosePond | 147 | Build the pond: 97.3% · Pond in the park instead: 2.7% · Refuse: 0.0% | 0.0% | 0.0% |
| greenLights | 5000 | Fix the lights: 61.0% · Leave them green: 6.0% · Replace them with Barb: 33.0% | 0.0% | 0.0% |
| helicopter | 3725 | Buy it: 10.8% · Lease one: 19.0% · Promise it next quarter: 70.2% | 0.0% | 0.0% |
| karaoke | 5000 | Sing the hard one: 60.4% · Lip-sync it: 37.6% · No singing in City Hall: 2.0% | 0.0% | 0.0% |
| lakeMonster | 5000 | Put it on the brochure: 66.0% · Protect its privacy: 22.1% · There is no monster: 11.9% | 0.0% | 0.0% |
| lawDogs | 1449 | Overrule the dog: 10.5% · Promote the dog: 79.0% · Let justice take its course: 10.5% | 0.0% | 0.0% |
| lawGeese | 285 | Give Barb a whistle too: 29.5% · Goose lanes on every road: 46.0% · Let Gerald run it: 24.6% | 0.0% | 0.0% |
| lawSighs | 2 | Declare a free sigh day: 100.0% · Raise the sigh tax: 0.0% · Sigh for them: 0.0% | 0.0% | 0.0% |
| lawTuesday | 1563 | Give it back: 18.8% · Rename it Funday: 78.2% · Hold firm: 2.9% | 0.0% | 0.0% |
| libraryCasino | 3102 | Build the casino: 43.6% · Refuse: 13.1% · Casino night, once a year: 43.3% | 0.0% | 0.0% |
| mallParking | 421 | Pave the park: 42.3% · Only half the park: 51.8% · Hands off the park: 5.9% | 0.0% | 0.0% |
| marathon | 1436 | Run it yourself: 54.2% · Hand out water: 44.9% · Postpone it: 0.8% | 0.0% | 0.0% |
| mascot | 578 | Welcome, Wet Sock: 95.0% · Hire a real designer: 4.2% · No mascot: 0.9% | 0.0% | 0.0% |
| mimeStrike | 5000 | Notice them, with a banner: 81.8% · Negotiate in mime: 14.9% · Ignore the mimes: 3.3% | 0.0% | 0.0% |
| monsterPta | 3300 | Welcome the monster: 92.7% · Monsters can't be parents: 7.3% | 0.0% | 0.0% |
| moonClaim | 5000 | Plant the flag: 28.8% · Sell the moon to Chad: 48.9% · Give the moon back: 22.3% | 0.0% | 0.0% |
| moonRent | 1442 | Pay the moonlight bill: 72.7% · Charge him for the view: 27.3% | 0.0% | 0.0% |
| newSchool | 1 | Build a new school: 0.0% · Promise it by spring: 0.0% · Buy a second book: 100.0% | 0.0% | 0.0% |
| opera | 5000 | Attend and applaud: 30.1% · Pay for rewrites: 69.2% · Ban the opera: 0.7% | 0.0% | 0.0% |
| parkingMeters | 4999 | Install meters: 5.3% · Meters for visitors only: 18.3% · Free parking forever: 76.4% | 0.0% | 0.0% |
| parkWifi | 234 | Free park wifi: 80.3% · Wifi with Chad's ads: 17.1% · Go outside and play: 2.6% | 0.0% | 0.0% |
| pettyCrime | 4117 | Pay for overtime: 76.8% · Blame the next town over: 23.2% | 0.0% | 0.0% |
| policeDog | 9 | Buy a braver dog: 11.1% · Therapy for the old dog: 88.9% · One scared dog is plenty: 0.0% | 0.0% | 0.0% |
| portrait | 2340 | Hang it proudly: 65.5% · Pay for a repaint: 33.1% · Burn it: 1.4% | 0.0% | 0.0% |
| raccoonBins | 5000 | Raccoon-proof bins: 70.9% · Night patrols: 20.9% · They live here too: 8.2% | 0.0% | 0.0% |
| rocketLibrary | 910 | Rebuild the library: 82.0% · Leave the rocket in: 18.0% | 0.0% | 0.0% |
| roundabout | 1065 | Rescue the drivers: 62.2% · Sell tickets to watch: 33.1% · It's working as intended: 4.8% | 0.0% | 0.0% |
| schoolLunch | 5000 | Pay for real food: 81.2% · Chad sponsors lunch: 17.0% · Paste builds character: 1.9% | 0.0% | 0.0% |
| secretStranger | 2140 | Expose him in The Bugle: 97.4% · Take his hush money: 2.6% | 0.0% | 0.0% |
| speedTrap | 427 | Approve the speed trap: 18.0% · Warning signs only: 56.0% · No speed trap: 26.0% | 0.0% | 0.0% |
| statue | 915 | Accept the statue: 54.6% · A statue of someone normal: 43.7% · No statues: 1.6% | 0.0% | 0.0% |
| talentShow | 1193 | Judge honestly: 3.4% · Everyone wins: 40.4% · Send Dave: 56.2% | 0.0% | 0.0% |
| taxBreak | 5000 | Grant the tax break: 24.5% · Trade it for a donation: 49.8% · Refuse: 25.7% | 0.0% | 0.0% |
| theWhistle | 1489 | Shut down The Whistle: 0.5% · Buy The Whistle: 86.6% · A free press is good: 12.9% | 0.0% | 0.0% |
| tvStation | 195 | Build the station: 73.8% · Lend her the roof: 26.2% · Refuse: 0.0% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 87.7% · Show them the pothole: 12.0% · Lock the gates: 0.3% | 0.0% | 0.0% |
| zebra | 1924 | Hire a zebra wrangler: 49.5% · Make it official: 37.1% · Barb can arrest a zebra: 13.5% | 0.0% | 0.0% |
