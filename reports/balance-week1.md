# Balance report: pack `week1`

5000 terms per policy. Tuning: {"people":0.5,"press":0.2,"business":0.1,"law":0.1,"objective":2,"brokenPromise":-4,"min":5,"max":95}.

| Policy | Win rate | Target | Mean vote | Vote p10 / p50 / p90 | Recalled | Bankrupt | Term ended early | Ending money $k p10 / p50 / p90 |
|---|---|---|---|---|---|---|---|---|
| random | 0.0% | on target | 16.0 | 13 / 17 / 19 | 100.0% | 1.6% | 97.6% | 20 / 20 / 20 |
| greedy-approval | 3.4% |  | 30.5 | 19 / 30 / 44 | 99.6% | 81.5% | 22.4% | -43 / -21 / 20 |
| miser | 0.0% |  | 14.4 | 13 / 13 / 17 | 100.0% | 0.0% | 100.0% | 20 / 20 / 20 |
| people-pleaser | 0.0% |  | 20.2 | 17 / 19 / 27 | 100.0% | 44.0% | 84.7% | -40 / 20 / 20 |
| dave-only | 0.0% | **off target** (5-10%) | 16.8 | 17 / 17 / 19 | 100.0% | 1.5% | 99.4% | 20 / 20 / 20 |
| sensible | 23.1% | **off target** (55-65%) | 40.9 | 26 / 41 / 56 | 19.3% | 0.8% | 0.0% | -5 / 26 / 63 |
| | | recalls on target (under 25%) | | | | | | |

## Non-dilemmas and other flags (sensible bot)

- `bandstand`: "One song is plenty" chosen 2% of the time (under 5%)
- `bankError`: "Keep it quiet" chosen 1% of the time (under 5%)
- `billboard`: "No billboard" chosen 1% of the time (under 5%)
- `catSinkhole`: "Move the town to the left" chosen 0% of the time (under 5%)
- `coneRally`: "Hold a bigger rally" chosen 86% of the time (over 85%)
- `coneRally`: "Have the cone towed" chosen 1% of the time (under 5%)
- `curfew`: "Curfew at 9 pm" chosen 1% of the time (under 5%)
- `diaryLeak`: "Blame the pigeon" chosen 2% of the time (under 5%)
- `dogShow`: "Cancel the dog show" chosen 1% of the time (under 5%)
- `evFair`: "Eat for the town" chosen 91% of the time (over 85%)
- `evPower`: "Pay Chad's guy" chosen 90% of the time (over 85%)
- `evPower`: "Sit in the dark" chosen 0% of the time (under 5%)
- `flood`: "Rent the pumps" chosen 89% of the time (over 85%)
- `flood`: "Wait for it to dry" chosen 1% of the time (under 5%)
- `goosePond`: "Build the pond" chosen 95% of the time (over 85%)
- `goosePond`: "Pond in the park instead" chosen 5% of the time (under 5%)
- `goosePond`: "Refuse" chosen 0% of the time (under 5%)
- `karaoke`: "No singing in City Hall" chosen 2% of the time (under 5%)
- `lawTuesday`: "Hold firm" chosen 2% of the time (under 5%)
- `marathon`: "Postpone it" chosen 1% of the time (under 5%)
- `mascot`: "Welcome, Wet Sock" chosen 90% of the time (over 85%)
- `mascot`: "No mascot" chosen 1% of the time (under 5%)
- `mimeStrike`: "Ignore the mimes" chosen 3% of the time (under 5%)
- `monsterPta`: "Welcome the monster" chosen 92% of the time (over 85%)
- `opera`: "Ban the opera" chosen 1% of the time (under 5%)
- `parkWifi`: "Go outside and play" chosen 3% of the time (under 5%)
- `portrait`: "Burn it" chosen 1% of the time (under 5%)
- `roundabout`: "It's working as intended" chosen 4% of the time (under 5%)
- `schoolLunch`: "Paste builds character" chosen 1% of the time (under 5%)
- `secretStranger`: "Expose him in The Bugle" chosen 98% of the time (over 85%)
- `secretStranger`: "Take his hush money" chosen 2% of the time (under 5%)
- `statue`: "No statues" chosen 2% of the time (under 5%)
- `talentShow`: "Judge honestly" chosen 4% of the time (under 5%)
- `theWhistle`: "Shut down The Whistle" chosen 1% of the time (under 5%)
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

Projects built (share of terms): casino 15.3%, tv 11.7%, helicopter 9.5%, pond 4.7%, school 2.3%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 32.2% · Arcade, minus the engine: 33.4% · Firefighters only: 34.3% | 0.0% | 0.0% |
| auditor | 4697 | Open the books: 33.6% · Bribe him with cheese: 31.1% · Let Dave handle the audit: 35.3% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 32.8% · Teach them yourself: 33.6% · One song is plenty: 33.5% | 0.0% | 0.0% |
| bankError | 2565 | Keep it quiet: 37.6% · Give it back: 35.5% · Split it with Chad: 26.9% | 0.0% | 0.0% |
| bearStory | 50 | Yes, I wrestled a bear: 56.0% · Tell the truth: 44.0% | 0.0% | 0.0% |
| billboard | 38 | Allow the billboard: 31.6% · A small one, round the back: 34.2% · No billboard: 34.2% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 32.8% · Promise repairs soon: 34.4% · Put up a 'Good Luck' sign: 32.8% | 0.0% | 0.0% |
| campaign | 84 | Big rally: 21.4% · Call in every Favor: 15.5% · Attack ad about the cone: 29.8% · Just be yourself: 33.3% | 0.0% | 0.0% |
| campaignTruth | 35 | 'At least I'm not a goose': 34.3% · Promise a recount: 22.9% · Big rally: 31.4% · Call in every Favor: 11.4% | 0.0% | 0.0% |
| casinoCrime | 158 | Ban Linda from blackjack: 55.7% · Make her head of security: 44.3% | 0.0% | 0.0% |
| catGoose | 4994 | Negotiate with Gerald: 33.6% · Send in Barb: 32.9% · Let them have the bakery: 33.5% | 0.0% | 0.0% |
| catSinkhole | 811 | Fill Kevin with concrete: 33.0% · Make Kevin an attraction: 32.2% · Move the town to the left: 34.8% | 0.0% | 0.0% |
| chadRocket | 2089 | Clear the launch: 35.3% · Launch from your own lawn: 32.2% · No rockets near children: 32.6% | 0.0% | 0.0% |
| clockWizard | 4998 | Evict the wizard: 33.1% · Charge him real rent: 32.7% · Make him town magician: 34.2% | 0.0% | 0.0% |
| coneRally | 307 | Hold a bigger rally: 30.3% · Debate the cone, live: 34.5% · Have the cone towed: 35.2% | 0.0% | 0.0% |
| curfew | 985 | Curfew at 9 pm: 32.8% · Fund a youth centre: 34.8% · Let them stand: 32.4% | 0.0% | 0.0% |
| diaryLeak | 1267 | Apologise to everyone: 34.3% · Publish the whole diary: 32.6% · Blame the pigeon: 33.1% | 0.0% | 0.0% |
| dogShow | 3805 | Every dog wins: 33.1% · Find the real Biscuit: 33.6% · Cancel the dog show: 33.3% | 0.0% | 0.0% |
| duckDuel | 4 | Back Gerald: 75.0% · Back the duck: 25.0% · Stay out of bird politics: 0.0% | 0.0% | 0.0% |
| evBallots | 1130 | Tell the town: 48.9% · Put the boxes back: 51.1% | 0.0% | 0.0% |
| evBear | 19 | Apologise to the bear: 31.6% · Wrestle it for real: 68.4% | 0.0% | 0.0% |
| evDebate | 607 | Debate with facts: 48.4% · Debate with insults: 51.6% | 0.0% | 0.0% |
| evFair | 956 | Eat for the town: 54.6% · Decline politely: 45.4% | 0.0% | 0.0% |
| evNote | 4982 | Go and look: 49.9% · Burn the note: 50.1% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 50.6% · Buy a new float: 49.4% | 0.0% | 0.0% |
| evPower | 4222 | Pay Chad's guy: 34.4% · Hand out candles: 31.6% · Sit in the dark: 34.0% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 50.6% · Ignore Steve: 49.4% | 0.0% | 0.0% |
| farmersMarket | 2 | Protect the market: 100.0% · Ban the market: 0.0% · Market pays a fee: 0.0% | 0.0% | 0.0% |
| flood | 3233 | Rent the pumps: 31.2% · Rename it 'Little Venice': 33.1% · Wait for it to dry: 35.7% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 33.8% · Run tours, stiff the ghost: 33.5% · No ghosts on the payroll: 32.7% | 0.0% | 0.0% |
| gooseOccupation | 226 | Pay them off in bread: 50.9% · Send Chief Barb: 49.1% | 0.0% | 0.0% |
| goosePond | 738 | Build the pond: 31.8% · Pond in the park instead: 34.0% · Refuse: 34.1% | 0.0% | 0.0% |
| greenLights | 998 | Fix the lights: 34.5% · Leave them green: 34.9% · Replace them with Barb: 30.7% | 0.0% | 0.0% |
| helicopter | 1469 | Buy it: 32.3% · Lease one: 35.6% · Promise it next quarter: 32.1% | 0.0% | 0.0% |
| karaoke | 4924 | Sing the hard one: 32.7% · Lip-sync it: 33.7% · No singing in City Hall: 33.6% | 0.0% | 0.0% |
| lakeMonster | 1800 | Put it on the brochure: 34.2% · Protect its privacy: 32.6% · There is no monster: 33.2% | 0.0% | 0.0% |
| lawDogs | 156 | Overrule the dog: 31.4% · Promote the dog: 38.5% · Let justice take its course: 30.1% | 0.0% | 0.0% |
| lawGeese | 76 | Give Barb a whistle too: 32.9% · Goose lanes on every road: 31.6% · Let Gerald run it: 35.5% | 0.0% | 0.0% |
| lawSighs | 154 | Declare a free sigh day: 31.2% · Raise the sigh tax: 32.5% · Sigh for them: 36.4% | 0.0% | 0.0% |
| lawTuesday | 1405 | Give it back: 33.0% · Rename it Funday: 32.0% · Hold firm: 35.1% | 0.0% | 0.0% |
| libraryCasino | 2269 | Build the casino: 33.7% · Refuse: 33.6% · Casino night, once a year: 32.7% | 0.0% | 0.0% |
| mallParking | 473 | Pave the park: 35.5% · Only half the park: 28.8% · Hands off the park: 35.7% | 0.0% | 0.0% |
| marathon | 3750 | Run it yourself: 33.4% · Hand out water: 33.1% · Postpone it: 33.5% | 0.0% | 0.0% |
| mascot | 480 | Welcome, Wet Sock: 38.5% · Hire a real designer: 33.3% · No mascot: 28.1% | 0.0% | 0.0% |
| mimeStrike | 496 | Notice them, with a banner: 35.7% · Negotiate in mime: 31.7% · Ignore the mimes: 32.7% | 0.0% | 0.0% |
| monsterPta | 501 | Welcome the monster: 51.7% · Monsters can't be parents: 48.3% | 0.0% | 0.0% |
| moonClaim | 4490 | Plant the flag: 31.7% · Sell the moon to Chad: 34.4% · Give the moon back: 33.8% | 0.0% | 0.0% |
| moonRent | 1173 | Pay the moonlight bill: 48.1% · Charge him for the view: 51.9% | 0.0% | 0.0% |
| newSchool | 382 | Build a new school: 29.8% · Promise it by spring: 40.3% · Buy a second book: 29.8% | 0.0% | 0.0% |
| opera | 4118 | Attend and applaud: 33.5% · Pay for rewrites: 33.3% · Ban the opera: 33.1% | 0.0% | 0.0% |
| parkingMeters | 204 | Install meters: 42.2% · Meters for visitors only: 21.6% · Free parking forever: 36.3% | 0.0% | 0.0% |
| parkWifi | 1729 | Free park wifi: 33.8% · Wifi with Chad's ads: 32.9% · Go outside and play: 33.3% | 0.0% | 0.0% |
| pettyCrime | 2794 | Pay for overtime: 49.6% · Blame the next town over: 50.4% | 0.0% | 0.0% |
| portrait | 1240 | Hang it proudly: 33.6% · Pay for a repaint: 34.1% · Burn it: 32.3% | 0.0% | 0.0% |
| raccoonBins | 1899 | Raccoon-proof bins: 32.5% · Night patrols: 33.1% · They live here too: 34.4% | 0.0% | 0.0% |
| rocketLibrary | 717 | Rebuild the library: 51.2% · Leave the rocket in: 48.8% | 0.0% | 0.0% |
| roundabout | 56 | Rescue the drivers: 23.2% · Sell tickets to watch: 37.5% · It's working as intended: 39.3% | 0.0% | 0.0% |
| schoolLunch | 4956 | Pay for real food: 33.9% · Chad sponsors lunch: 33.1% · Paste builds character: 32.9% | 0.0% | 0.0% |
| secretStranger | 448 | Expose him in The Bugle: 47.3% · Take his hush money: 52.7% | 0.0% | 0.0% |
| speedTrap | 2 | Approve the speed trap: 50.0% · Warning signs only: 0.0% · No speed trap: 50.0% | 0.0% | 0.0% |
| statue | 1690 | Accept the statue: 32.4% · A statue of someone normal: 33.7% · No statues: 33.8% | 0.0% | 0.0% |
| talentShow | 1799 | Judge honestly: 32.2% · Everyone wins: 35.7% · Send Dave: 32.0% | 0.0% | 0.0% |
| taxBreak | 385 | Grant the tax break: 35.3% · Trade it for a donation: 26.2% · Refuse: 38.4% | 0.0% | 0.0% |
| theWhistle | 468 | Shut down The Whistle: 36.5% · Buy The Whistle: 33.5% · A free press is good: 29.9% | 0.0% | 0.0% |
| tvStation | 1801 | Build the station: 32.5% · Lend her the roof: 33.3% · Refuse: 34.1% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 35.0% · Show them the pothole: 32.4% · Lock the gates: 32.5% | 0.0% | 0.0% |
| zebra | 355 | Hire a zebra wrangler: 31.8% · Make it official: 32.4% · Barb can arrest a zebra: 35.8% | 0.0% | 0.0% |

## greedy-approval

Projects built (share of terms): helicopter 70.9%, casino 63.8%, pond 11.8%, tv 6.7%, school 0.8%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 100.0% · Arcade, minus the engine: 0.0% · Firefighters only: 0.0% | 0.0% | 0.0% |
| auditor | 4984 | Open the books: 87.9% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 12.1% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 100.0% · Teach them yourself: 0.0% · One song is plenty: 0.0% | 0.0% | 0.0% |
| bankError | 4935 | Keep it quiet: 0.0% · Give it back: 100.0% · Split it with Chad: 0.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 100.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| campaignTruth | 3879 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| casinoCrime | 146 | Ban Linda from blackjack: 18.5% · Make her head of security: 81.5% | 0.0% | 0.0% |
| catGoose | 5000 | Negotiate with Gerald: 99.7% · Send in Barb: 0.2% · Let them have the bakery: 0.0% | 0.0% | 0.0% |
| catSinkhole | 4799 | Fill Kevin with concrete: 63.0% · Make Kevin an attraction: 37.0% · Move the town to the left: 0.0% | 0.0% | 0.0% |
| chadRocket | 1849 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| clockWizard | 5000 | Evict the wizard: 0.0% · Charge him real rent: 0.0% · Make him town magician: 100.0% | 0.0% | 0.0% |
| coneRally | 3116 | Hold a bigger rally: 78.3% · Debate the cone, live: 21.7% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| curfew | 3497 | Curfew at 9 pm: 0.5% · Fund a youth centre: 99.5% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 4405 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| dogShow | 4990 | Every dog wins: 73.6% · Find the real Biscuit: 26.4% · Cancel the dog show: 0.0% | 0.0% | 0.0% |
| entitled | 2 | Free ice cream: 50.0% · Say no nicely: 50.0% | 0.0% | 0.0% |
| evBallots | 4915 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evDebate | 4542 | Debate with facts: 100.0% · Debate with insults: 0.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 4994 | Pay Chad's guy: 85.0% · Hand out candles: 9.8% · Sit in the dark: 5.2% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| flood | 4851 | Rent the pumps: 62.7% · Rename it 'Little Venice': 37.3% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 100.0% · Run tours, stiff the ghost: 0.0% · No ghosts on the payroll: 0.0% | 0.0% | 0.0% |
| goosePond | 591 | Build the pond: 100.0% · Pond in the park instead: 0.0% · Refuse: 0.0% | 0.0% | 0.0% |
| greenLights | 4824 | Fix the lights: 85.5% · Leave them green: 0.0% · Replace them with Barb: 14.5% | 0.0% | 0.0% |
| helicopter | 3547 | Buy it: 99.9% · Lease one: 0.1% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| karaoke | 5000 | Sing the hard one: 100.0% · Lip-sync it: 0.0% · No singing in City Hall: 0.0% | 0.0% | 0.0% |
| lakeMonster | 4897 | Put it on the brochure: 79.3% · Protect its privacy: 20.7% · There is no monster: 0.0% | 0.0% | 0.0% |
| lawDogs | 277 | Overrule the dog: 24.2% · Promote the dog: 75.8% · Let justice take its course: 0.0% | 0.0% | 0.0% |
| lawTuesday | 534 | Give it back: 29.4% · Rename it Funday: 70.6% · Hold firm: 0.0% | 0.0% | 0.0% |
| libraryCasino | 4228 | Build the casino: 75.4% · Refuse: 0.0% · Casino night, once a year: 24.6% | 0.0% | 0.0% |
| mallParking | 69 | Pave the park: 0.0% · Only half the park: 100.0% · Hands off the park: 0.0% | 0.0% | 0.0% |
| marathon | 2168 | Run it yourself: 0.0% · Hand out water: 100.0% · Postpone it: 0.0% | 0.0% | 0.0% |
| mascot | 588 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 0.0% |
| mimeStrike | 4507 | Notice them, with a banner: 83.7% · Negotiate in mime: 16.3% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| monsterPta | 3859 | Welcome the monster: 100.0% · Monsters can't be parents: 0.0% | 0.0% | 0.0% |
| moonClaim | 4994 | Plant the flag: 84.1% · Sell the moon to Chad: 15.9% · Give the moon back: 0.0% | 0.0% | 0.0% |
| moonRent | 4187 | Pay the moonlight bill: 77.5% · Charge him for the view: 22.5% | 0.0% | 0.0% |
| newSchool | 73 | Build a new school: 56.2% · Promise it by spring: 43.8% · Buy a second book: 0.0% | 0.0% | 0.0% |
| opera | 4991 | Attend and applaud: 25.6% · Pay for rewrites: 74.4% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkingMeters | 4093 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 1878 | Free park wifi: 99.9% · Wifi with Chad's ads: 0.1% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 242 | Pay for overtime: 40.1% · Blame the next town over: 59.9% | 0.0% | 0.0% |
| portrait | 1179 | Hang it proudly: 100.0% · Pay for a repaint: 0.0% · Burn it: 0.0% | 0.0% | 0.0% |
| raccoonBins | 4915 | Raccoon-proof bins: 78.9% · Night patrols: 21.1% · They live here too: 0.0% | 0.0% | 0.0% |
| rocketLibrary | 1849 | Rebuild the library: 82.3% · Leave the rocket in: 17.7% | 0.0% | 0.0% |
| roundabout | 519 | Rescue the drivers: 100.0% · Sell tickets to watch: 0.0% · It's working as intended: 0.0% | 0.0% | 0.0% |
| schoolLunch | 5000 | Pay for real food: 88.5% · Chad sponsors lunch: 11.5% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 4846 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| speedTrap | 345 | Approve the speed trap: 14.8% · Warning signs only: 85.2% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 1707 | Accept the statue: 21.8% · A statue of someone normal: 78.2% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 808 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 4404 | Grant the tax break: 42.5% · Trade it for a donation: 57.5% · Refuse: 0.0% | 0.0% | 0.0% |
| theWhistle | 774 | Shut down The Whistle: 0.8% · Buy The Whistle: 99.2% · A free press is good: 0.0% | 0.0% | 0.0% |
| tvStation | 482 | Build the station: 69.9% · Lend her the roof: 30.1% · Refuse: 0.0% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 100.0% · Show them the pothole: 0.0% · Lock the gates: 0.0% | 0.0% | 0.0% |
| zebra | 617 | Hire a zebra wrangler: 95.8% · Make it official: 4.2% · Barb can arrest a zebra: 0.0% | 0.0% | 0.0% |

## miser

Projects built (share of terms): casino 33.3%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 100.0% · Arcade, minus the engine: 0.0% · Firefighters only: 0.0% | 0.0% | 0.0% |
| auditor | 4724 | Open the books: 0.0% · Bribe him with cheese: 100.0% · Let Dave handle the audit: 0.0% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 0.0% · Teach them yourself: 100.0% · One song is plenty: 0.0% | 0.0% | 0.0% |
| bankError | 82 | Keep it quiet: 100.0% · Give it back: 0.0% · Split it with Chad: 0.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 0.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 100.0% | 0.0% | 0.0% |
| casinoCrime | 9 | Ban Linda from blackjack: 100.0% · Make her head of security: 0.0% | 0.0% | 0.0% |
| catGoose | 4996 | Negotiate with Gerald: 0.0% · Send in Barb: 0.0% · Let them have the bakery: 100.0% | 0.0% | 0.0% |
| catSinkhole | 1 | Fill Kevin with concrete: 0.0% · Make Kevin an attraction: 100.0% · Move the town to the left: 0.0% | 0.0% | 0.0% |
| chadRocket | 575 | Clear the launch: 100.0% · Launch from your own lawn: 0.0% · No rockets near children: 0.0% | 0.0% | 0.0% |
| clockWizard | 4997 | Evict the wizard: 0.0% · Charge him real rent: 100.0% · Make him town magician: 0.0% | 0.0% | 0.0% |
| curfew | 1577 | Curfew at 9 pm: 100.0% · Fund a youth centre: 0.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 7 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| dogShow | 1469 | Every dog wins: 0.0% · Find the real Biscuit: 100.0% · Cancel the dog show: 0.0% | 0.0% | 0.0% |
| evBallots | 24 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evNote | 4961 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 100.0% · Buy a new float: 0.0% | 0.0% | 0.0% |
| evPower | 3178 | Pay Chad's guy: 0.0% · Hand out candles: 0.0% · Sit in the dark: 100.0% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 0.0% · Ignore Steve: 100.0% | 0.0% | 0.0% |
| flood | 475 | Rent the pumps: 0.0% · Rename it 'Little Venice': 100.0% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 0.0% · Run tours, stiff the ghost: 100.0% · No ghosts on the payroll: 0.0% | 0.0% | 0.0% |
| greenLights | 3 | Fix the lights: 0.0% · Leave them green: 100.0% · Replace them with Barb: 0.0% | 0.0% | 0.0% |
| helicopter | 3287 | Buy it: 0.0% · Lease one: 1.9% · Promise it next quarter: 98.1% | 0.0% | 0.0% |
| karaoke | 4817 | Sing the hard one: 100.0% · Lip-sync it: 0.0% · No singing in City Hall: 0.0% | 0.0% | 0.0% |
| lakeMonster | 13 | Put it on the brochure: 0.0% · Protect its privacy: 100.0% · There is no monster: 0.0% | 0.0% | 0.0% |
| lawSighs | 263 | Declare a free sigh day: 0.0% · Raise the sigh tax: 100.0% · Sigh for them: 0.0% | 0.0% | 0.0% |
| libraryCasino | 1991 | Build the casino: 83.7% · Refuse: 0.0% · Casino night, once a year: 16.3% | 0.0% | 0.0% |
| mallParking | 8 | Pave the park: 100.0% · Only half the park: 0.0% · Hands off the park: 0.0% | 0.0% | 0.0% |
| marathon | 4161 | Run it yourself: 100.0% · Hand out water: 0.0% · Postpone it: 0.0% | 0.0% | 0.0% |
| mascot | 1 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 0.0% |
| moonClaim | 4256 | Plant the flag: 0.0% · Sell the moon to Chad: 100.0% · Give the moon back: 0.0% | 0.0% | 0.0% |
| newSchool | 410 | Build a new school: 0.0% · Promise it by spring: 0.0% · Buy a second book: 100.0% | 0.0% | 0.0% |
| opera | 1869 | Attend and applaud: 100.0% · Pay for rewrites: 0.0% · Ban the opera: 0.0% | 0.0% | 0.0% |
| parkWifi | 2132 | Free park wifi: 0.0% · Wifi with Chad's ads: 100.0% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 5318 | Pay for overtime: 0.0% · Blame the next town over: 100.0% | 0.0% | 0.0% |
| portrait | 475 | Hang it proudly: 100.0% · Pay for a repaint: 0.0% · Burn it: 0.0% | 0.0% | 0.0% |
| raccoonBins | 24 | Raccoon-proof bins: 0.0% · Night patrols: 100.0% · They live here too: 0.0% | 0.0% | 0.0% |
| rocketLibrary | 399 | Rebuild the library: 0.0% · Leave the rocket in: 100.0% | 0.0% | 0.0% |
| roundabout | 8 | Rescue the drivers: 0.0% · Sell tickets to watch: 100.0% · It's working as intended: 0.0% | 0.0% | 0.0% |
| schoolLunch | 4926 | Pay for real food: 0.0% · Chad sponsors lunch: 100.0% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 11 | Expose him in The Bugle: 0.0% · Take his hush money: 100.0% | 0.0% | 0.0% |
| statue | 394 | Accept the statue: 100.0% · A statue of someone normal: 0.0% · No statues: 0.0% | 0.0% | 0.0% |
| talentShow | 1972 | Judge honestly: 100.0% · Everyone wins: 0.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| tvStation | 1115 | Build the station: 0.0% · Lend her the roof: 100.0% · Refuse: 0.0% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 0.0% · Show them the pothole: 100.0% · Lock the gates: 0.0% | 0.0% | 0.0% |
| zebra | 812 | Hire a zebra wrangler: 0.0% · Make it official: 100.0% · Barb can arrest a zebra: 0.0% | 0.0% | 0.0% |

## people-pleaser

Projects built (share of terms): tv 2.7%, pond 0.2%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 100.0% · Arcade, minus the engine: 0.0% · Firefighters only: 0.0% | 0.0% | 0.0% |
| auditor | 5000 | Open the books: 98.2% · Bribe him with cheese: 0.0% · Let Dave handle the audit: 1.8% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 100.0% · Teach them yourself: 0.0% · One song is plenty: 0.0% | 0.0% | 0.0% |
| bankError | 4607 | Keep it quiet: 6.6% · Give it back: 0.0% · Split it with Chad: 93.4% | 0.0% | 0.0% |
| bearStory | 6 | Yes, I wrestled a bear: 0.0% · Tell the truth: 100.0% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 100.0% · Promise repairs soon: 0.0% · Put up a 'Good Luck' sign: 0.0% | 0.0% | 0.0% |
| campaignTruth | 765 | 'At least I'm not a goose': 0.0% · Promise a recount: 100.0% · Big rally: 0.0% · Call in every Favor: 0.0% | 0.0% | 0.0% |
| catGoose | 5000 | Negotiate with Gerald: 100.0% · Send in Barb: 0.0% · Let them have the bakery: 0.0% | 0.0% | 0.0% |
| catSinkhole | 3606 | Fill Kevin with concrete: 83.1% · Make Kevin an attraction: 16.9% · Move the town to the left: 0.0% | 0.0% | 0.0% |
| chadRocket | 748 | Clear the launch: 0.0% · Launch from your own lawn: 92.0% · No rockets near children: 8.0% | 0.0% | 0.0% |
| clockWizard | 5000 | Evict the wizard: 0.0% · Charge him real rent: 0.0% · Make him town magician: 100.0% | 0.0% | 0.0% |
| coneRally | 1801 | Hold a bigger rally: 60.5% · Debate the cone, live: 39.5% · Have the cone towed: 0.0% | 0.0% | 0.0% |
| curfew | 3500 | Curfew at 9 pm: 0.0% · Fund a youth centre: 100.0% · Let them stand: 0.0% | 0.0% | 0.0% |
| diaryLeak | 3954 | Apologise to everyone: 100.0% · Publish the whole diary: 0.0% · Blame the pigeon: 0.0% | 0.0% | 0.0% |
| dogShow | 4997 | Every dog wins: 98.2% · Find the real Biscuit: 1.8% · Cancel the dog show: 0.0% | 0.0% | 0.0% |
| entitled | 46 | Free ice cream: 100.0% · Say no nicely: 0.0% | 0.0% | 0.0% |
| evBallots | 4334 | Tell the town: 100.0% · Put the boxes back: 0.0% | 0.0% | 0.0% |
| evDebate | 2777 | Debate with facts: 0.0% · Debate with insults: 100.0% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 100.0% · Burn the note: 0.0% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 0.0% · Buy a new float: 100.0% | 0.0% | 0.0% |
| evPower | 4997 | Pay Chad's guy: 99.5% · Hand out candles: 0.2% · Sit in the dark: 0.3% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| flood | 4933 | Rent the pumps: 37.9% · Rename it 'Little Venice': 62.1% · Wait for it to dry: 0.0% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 100.0% · Run tours, stiff the ghost: 0.0% · No ghosts on the payroll: 0.0% | 0.0% | 0.0% |
| goosePond | 11 | Build the pond: 100.0% · Pond in the park instead: 0.0% · Refuse: 0.0% | 0.0% | 0.0% |
| greenLights | 3734 | Fix the lights: 0.0% · Leave them green: 100.0% · Replace them with Barb: 0.0% | 0.0% | 0.0% |
| helicopter | 4448 | Buy it: 0.0% · Lease one: 100.0% · Promise it next quarter: 0.0% | 0.0% | 0.0% |
| karaoke | 5000 | Sing the hard one: 0.0% · Lip-sync it: 100.0% · No singing in City Hall: 0.0% | 0.0% | 0.0% |
| lakeMonster | 4287 | Put it on the brochure: 0.0% · Protect its privacy: 100.0% · There is no monster: 0.0% | 0.0% | 0.0% |
| lawDogs | 1 | Overrule the dog: 0.0% · Promote the dog: 0.0% · Let justice take its course: 100.0% | 0.0% | 0.0% |
| lawTuesday | 3859 | Give it back: 0.2% · Rename it Funday: 99.8% · Hold firm: 0.0% | 0.0% | 0.0% |
| libraryCasino | 4253 | Build the casino: 0.0% · Refuse: 100.0% · Casino night, once a year: 0.0% | 0.0% | 0.0% |
| mallParking | 70 | Pave the park: 0.0% · Only half the park: 0.0% · Hands off the park: 100.0% | 0.0% | 0.0% |
| marathon | 801 | Run it yourself: 100.0% · Hand out water: 0.0% · Postpone it: 0.0% | 0.0% | 0.0% |
| mascot | 7 | Welcome, Wet Sock: 100.0% · Hire a real designer: 0.0% · No mascot: 0.0% | 0.0% | 0.0% |
| mimeStrike | 2487 | Notice them, with a banner: 86.2% · Negotiate in mime: 13.8% · Ignore the mimes: 0.0% | 0.0% | 0.0% |
| moonClaim | 4998 | Plant the flag: 99.2% · Sell the moon to Chad: 0.0% · Give the moon back: 0.8% | 0.0% | 0.0% |
| moonRent | 4955 | Pay the moonlight bill: 92.4% · Charge him for the view: 7.6% | 0.0% | 0.0% |
| opera | 4997 | Attend and applaud: 0.0% · Pay for rewrites: 98.6% · Ban the opera: 1.4% | 0.0% | 0.0% |
| parkingMeters | 1359 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 0.0% |
| parkWifi | 13 | Free park wifi: 100.0% · Wifi with Chad's ads: 0.0% · Go outside and play: 0.0% | 0.0% | 0.0% |
| pettyCrime | 2560 | Pay for overtime: 63.9% · Blame the next town over: 36.1% | 0.0% | 0.0% |
| portrait | 1162 | Hang it proudly: 100.0% · Pay for a repaint: 0.0% · Burn it: 0.0% | 0.0% | 0.0% |
| raccoonBins | 4334 | Raccoon-proof bins: 94.7% · Night patrols: 0.0% · They live here too: 5.3% | 0.0% | 0.0% |
| roundabout | 480 | Rescue the drivers: 97.3% · Sell tickets to watch: 2.7% · It's working as intended: 0.0% | 0.0% | 0.0% |
| schoolLunch | 5000 | Pay for real food: 99.9% · Chad sponsors lunch: 0.1% · Paste builds character: 0.0% | 0.0% | 0.0% |
| secretStranger | 3977 | Expose him in The Bugle: 100.0% · Take his hush money: 0.0% | 0.0% | 0.0% |
| speedTrap | 1 | Approve the speed trap: 0.0% · Warning signs only: 100.0% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 85 | Accept the statue: 0.0% · A statue of someone normal: 97.6% · No statues: 2.4% | 0.0% | 0.0% |
| talentShow | 800 | Judge honestly: 0.0% · Everyone wins: 100.0% · Send Dave: 0.0% | 0.0% | 0.0% |
| taxBreak | 2346 | Grant the tax break: 0.0% · Trade it for a donation: 0.0% · Refuse: 100.0% | 0.0% | 0.0% |
| theWhistle | 788 | Shut down The Whistle: 0.0% · Buy The Whistle: 99.7% · A free press is good: 0.3% | 0.0% | 0.0% |
| tvStation | 154 | Build the station: 88.3% · Lend her the roof: 11.7% · Refuse: 0.0% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 100.0% · Show them the pothole: 0.0% · Lock the gates: 0.0% | 0.0% | 0.0% |
| zebra | 2890 | Hire a zebra wrangler: 0.0% · Make it official: 100.0% · Barb can arrest a zebra: 0.0% | 0.0% | 0.0% |

## dave-only

Projects built (share of terms): casino 16.0%, tv 12.3%, helicopter 9.1%, pond 4.7%, school 2.4%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 33.8% · Arcade, minus the engine: 32.8% · Firefighters only: 33.4% | 0.0% | 0.0% |
| auditor | 4549 | Open the books: 35.1% · Bribe him with cheese: 30.2% · Let Dave handle the audit: 34.7% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 34.3% · Teach them yourself: 32.4% · One song is plenty: 33.3% | 0.0% | 0.0% |
| bankError | 1915 | Keep it quiet: 37.5% · Give it back: 35.8% · Split it with Chad: 26.6% | 0.0% | 0.0% |
| bearStory | 46 | Yes, I wrestled a bear: 50.0% · Tell the truth: 50.0% | 0.0% | 0.0% |
| billboard | 23 | Allow the billboard: 34.8% · A small one, round the back: 13.0% · No billboard: 52.2% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 33.7% · Promise repairs soon: 32.9% · Put up a 'Good Luck' sign: 33.4% | 0.0% | 0.0% |
| buglePress | 1 | Buy a new press: 0.0% · Use the school copier: 0.0% · Not the town's problem: 100.0% | 0.0% | 0.0% |
| campaign | 25 | Big rally: 0.0% · Call in every Favor: 0.0% · Attack ad about the cone: 0.0% · Just be yourself: 100.0% | 0.0% | 0.0% |
| campaignTruth | 5 | 'At least I'm not a goose': 0.0% · Promise a recount: 0.0% · Big rally: 60.0% · Call in every Favor: 40.0% | 0.0% | 0.0% |
| casinoCrime | 100 | Ban Linda from blackjack: 51.0% · Make her head of security: 49.0% | 0.0% | 0.0% |
| catGoose | 4994 | Negotiate with Gerald: 32.6% · Send in Barb: 34.3% · Let them have the bakery: 33.1% | 0.0% | 0.0% |
| catSinkhole | 434 | Fill Kevin with concrete: 30.9% · Make Kevin an attraction: 38.2% · Move the town to the left: 30.9% | 0.0% | 0.0% |
| chadRocket | 2188 | Clear the launch: 33.2% · Launch from your own lawn: 33.2% · No rockets near children: 33.6% | 0.0% | 0.0% |
| clockWizard | 5000 | Evict the wizard: 33.9% · Charge him real rent: 33.4% · Make him town magician: 32.7% | 0.0% | 0.0% |
| coneRally | 111 | Hold a bigger rally: 38.7% · Debate the cone, live: 26.1% · Have the cone towed: 35.1% | 0.0% | 0.0% |
| curfew | 901 | Curfew at 9 pm: 30.2% · Fund a youth centre: 36.8% · Let them stand: 33.0% | 0.0% | 0.0% |
| diaryLeak | 736 | Apologise to everyone: 32.3% · Publish the whole diary: 33.4% · Blame the pigeon: 34.2% | 0.0% | 0.0% |
| dogShow | 3238 | Every dog wins: 31.4% · Find the real Biscuit: 34.7% · Cancel the dog show: 33.8% | 0.0% | 0.0% |
| duckDuel | 9 | Back Gerald: 44.4% · Back the duck: 55.6% · Stay out of bird politics: 0.0% | 0.0% | 0.0% |
| evBallots | 898 | Tell the town: 51.8% · Put the boxes back: 48.2% | 0.0% | 0.0% |
| evBear | 15 | Apologise to the bear: 26.7% · Wrestle it for real: 73.3% | 0.0% | 0.0% |
| evDebate | 283 | Debate with facts: 45.9% · Debate with insults: 54.1% | 0.0% | 0.0% |
| evFair | 660 | Eat for the town: 50.3% · Decline politely: 49.7% | 0.0% | 0.0% |
| evNote | 4970 | Go and look: 49.9% · Burn the note: 50.1% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 48.8% · Buy a new float: 51.2% | 0.0% | 0.0% |
| evPower | 3892 | Pay Chad's guy: 33.1% · Hand out candles: 32.7% · Sit in the dark: 34.2% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 47.8% · Ignore Steve: 52.2% | 0.0% | 0.0% |
| flood | 2642 | Rent the pumps: 34.7% · Rename it 'Little Venice': 32.0% · Wait for it to dry: 33.3% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 32.8% · Run tours, stiff the ghost: 34.2% · No ghosts on the payroll: 33.1% | 0.0% | 0.0% |
| gooseOccupation | 180 | Pay them off in bread: 52.2% · Send Chief Barb: 47.8% | 0.0% | 0.0% |
| goosePond | 696 | Build the pond: 33.9% · Pond in the park instead: 34.5% · Refuse: 31.6% | 0.0% | 0.0% |
| greenLights | 533 | Fix the lights: 27.8% · Leave them green: 34.0% · Replace them with Barb: 38.3% | 0.0% | 0.0% |
| helicopter | 1373 | Buy it: 33.1% · Lease one: 34.5% · Promise it next quarter: 32.4% | 0.0% | 0.0% |
| karaoke | 4862 | Sing the hard one: 33.2% · Lip-sync it: 32.4% · No singing in City Hall: 34.3% | 0.0% | 0.0% |
| lakeMonster | 1201 | Put it on the brochure: 34.6% · Protect its privacy: 32.6% · There is no monster: 32.9% | 0.0% | 0.0% |
| lawDogs | 110 | Overrule the dog: 30.9% · Promote the dog: 38.2% · Let justice take its course: 30.9% | 0.0% | 0.0% |
| lawGeese | 36 | Give Barb a whistle too: 25.0% · Goose lanes on every road: 52.8% · Let Gerald run it: 22.2% | 0.0% | 0.0% |
| lawSighs | 62 | Declare a free sigh day: 30.6% · Raise the sigh tax: 29.0% · Sigh for them: 40.3% | 0.0% | 0.0% |
| lawTuesday | 443 | Give it back: 33.9% · Rename it Funday: 33.4% · Hold firm: 32.7% | 0.0% | 0.0% |
| libraryCasino | 2400 | Build the casino: 33.3% · Refuse: 33.3% · Casino night, once a year: 33.5% | 0.0% | 0.0% |
| mallParking | 503 | Pave the park: 37.2% · Only half the park: 27.0% · Hands off the park: 35.8% | 0.0% | 0.0% |
| marathon | 3716 | Run it yourself: 32.6% · Hand out water: 34.6% · Postpone it: 32.8% | 0.0% | 0.0% |
| mascot | 534 | Welcome, Wet Sock: 36.9% · Hire a real designer: 31.5% · No mascot: 31.6% | 0.0% | 0.0% |
| mimeStrike | 220 | Notice them, with a banner: 30.9% · Negotiate in mime: 32.7% · Ignore the mimes: 36.4% | 0.0% | 0.0% |
| monsterPta | 325 | Welcome the monster: 52.6% · Monsters can't be parents: 47.4% | 0.0% | 0.0% |
| moonClaim | 4212 | Plant the flag: 32.5% · Sell the moon to Chad: 33.9% · Give the moon back: 33.6% | 0.0% | 0.0% |
| moonRent | 1022 | Pay the moonlight bill: 49.2% · Charge him for the view: 50.8% | 0.0% | 0.0% |
| newSchool | 384 | Build a new school: 31.5% · Promise it by spring: 31.0% · Buy a second book: 37.5% | 0.0% | 0.0% |
| opera | 3688 | Attend and applaud: 32.7% · Pay for rewrites: 33.4% · Ban the opera: 34.0% | 0.0% | 0.0% |
| parkingMeters | 60 | Install meters: 31.7% · Meters for visitors only: 30.0% · Free parking forever: 38.3% | 0.0% | 0.0% |
| parkWifi | 1724 | Free park wifi: 34.9% · Wifi with Chad's ads: 33.2% · Go outside and play: 31.9% | 0.0% | 0.0% |
| pettyCrime | 2783 | Pay for overtime: 49.7% · Blame the next town over: 50.3% | 0.0% | 0.0% |
| portrait | 1174 | Hang it proudly: 31.7% · Pay for a repaint: 34.5% · Burn it: 33.8% | 0.0% | 0.0% |
| raccoonBins | 1321 | Raccoon-proof bins: 36.0% · Night patrols: 32.6% · They live here too: 31.4% | 0.0% | 0.0% |
| rocketLibrary | 701 | Rebuild the library: 50.1% · Leave the rocket in: 49.9% | 0.0% | 0.0% |
| roundabout | 58 | Rescue the drivers: 41.4% · Sell tickets to watch: 32.8% · It's working as intended: 25.9% | 0.0% | 0.0% |
| schoolLunch | 4910 | Pay for real food: 33.3% · Chad sponsors lunch: 33.8% · Paste builds character: 32.9% | 0.0% | 0.0% |
| secretStranger | 334 | Expose him in The Bugle: 48.8% · Take his hush money: 51.2% | 0.0% | 0.0% |
| speedTrap | 1 | Approve the speed trap: 0.0% · Warning signs only: 100.0% · No speed trap: 0.0% | 0.0% | 0.0% |
| statue | 1673 | Accept the statue: 30.2% · A statue of someone normal: 35.3% · No statues: 34.5% | 0.0% | 0.0% |
| talentShow | 1975 | Judge honestly: 31.5% · Everyone wins: 33.6% · Send Dave: 34.9% | 0.0% | 0.0% |
| taxBreak | 151 | Grant the tax break: 33.1% · Trade it for a donation: 25.2% · Refuse: 41.7% | 0.0% | 0.0% |
| theWhistle | 371 | Shut down The Whistle: 35.0% · Buy The Whistle: 29.1% · A free press is good: 35.8% | 0.0% | 0.0% |
| tvStation | 1978 | Build the station: 31.1% · Lend her the roof: 34.8% · Refuse: 34.1% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 33.4% · Show them the pothole: 33.8% · Lock the gates: 32.8% | 0.0% | 0.0% |
| zebra | 425 | Hire a zebra wrangler: 29.9% · Make it official: 32.5% · Barb can arrest a zebra: 37.6% | 0.0% | 0.0% |

## sensible

Projects built (share of terms): casino 33.3%, helicopter 7.8%, tv 6.8%, pond 3.6%, school 0.0%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| arcade | 5000 | Open the arcade: 58.5% · Arcade, minus the engine: 33.9% · Firefighters only: 7.5% | 0.0% | 0.0% |
| auditor | 5000 | Open the books: 39.1% · Bribe him with cheese: 20.8% · Let Dave handle the audit: 40.0% | 0.0% | 0.0% |
| bandstand | 5000 | Fund music lessons: 79.2% · Teach them yourself: 18.7% · One song is plenty: 2.1% | 0.0% | 0.0% |
| bankError | 5000 | Keep it quiet: 0.8% · Give it back: 44.3% · Split it with Chad: 55.0% | 0.0% | 0.0% |
| bearStory | 42 | Yes, I wrestled a bear: 92.9% · Tell the truth: 7.1% | 0.0% | 0.0% |
| billboard | 155 | Allow the billboard: 36.8% · A small one, round the back: 62.6% · No billboard: 0.6% | 0.0% | 0.0% |
| bridge | 5000 | Repair the bridge: 70.0% · Promise repairs soon: 23.5% · Put up a 'Good Luck' sign: 6.5% | 0.0% | 0.0% |
| campaign | 2827 | Big rally: 20.3% · Call in every Favor: 17.3% · Attack ad about the cone: 35.5% · Just be yourself: 26.9% | 0.0% | 0.0% |
| campaignTruth | 2172 | 'At least I'm not a goose': 17.5% · Promise a recount: 71.1% · Big rally: 5.6% · Call in every Favor: 5.8% | 0.0% | 0.0% |
| casinoCrime | 898 | Ban Linda from blackjack: 16.1% · Make her head of security: 83.9% | 0.0% | 0.0% |
| catGoose | 5000 | Negotiate with Gerald: 75.7% · Send in Barb: 17.2% · Let them have the bakery: 7.1% | 0.0% | 0.0% |
| catSinkhole | 5000 | Fill Kevin with concrete: 60.1% · Make Kevin an attraction: 39.7% · Move the town to the left: 0.2% | 0.0% | 0.0% |
| chadRocket | 1280 | Clear the launch: 63.4% · Launch from your own lawn: 29.2% · No rockets near children: 7.4% | 0.0% | 0.0% |
| clockWizard | 5000 | Evict the wizard: 18.6% · Charge him real rent: 6.6% · Make him town magician: 74.8% | 0.0% | 0.0% |
| coneRally | 4953 | Hold a bigger rally: 85.8% · Debate the cone, live: 13.6% · Have the cone towed: 0.5% | 0.0% | 0.0% |
| curfew | 3301 | Curfew at 9 pm: 0.8% · Fund a youth centre: 82.9% · Let them stand: 16.2% | 0.0% | 0.0% |
| diaryLeak | 5000 | Apologise to everyone: 59.1% · Publish the whole diary: 38.5% · Blame the pigeon: 2.4% | 0.0% | 0.0% |
| dogShow | 5000 | Every dog wins: 51.8% · Find the real Biscuit: 47.0% · Cancel the dog show: 1.2% | 0.0% | 0.0% |
| entitled | 21 | Free ice cream: 76.2% · Say no nicely: 23.8% | 0.0% | 0.0% |
| evBallots | 3090 | Tell the town: 70.3% · Put the boxes back: 29.7% | 0.0% | 0.0% |
| evBear | 28 | Apologise to the bear: 17.9% · Wrestle it for real: 82.1% | 0.0% | 0.0% |
| evDebate | 5000 | Debate with facts: 48.3% · Debate with insults: 51.7% | 0.0% | 0.0% |
| evFair | 1910 | Eat for the town: 91.3% · Decline politely: 8.7% | 0.0% | 0.0% |
| evNote | 5000 | Go and look: 61.8% · Burn the note: 38.2% | 0.0% | 0.0% |
| evParade | 5000 | Ride the float anyway: 46.9% · Buy a new float: 53.1% | 0.0% | 0.0% |
| evPower | 4972 | Pay Chad's guy: 90.1% · Hand out candles: 9.9% · Sit in the dark: 0.0% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 76.6% · Ignore Steve: 23.4% | 0.0% | 0.0% |
| farmersMarket | 8 | Protect the market: 12.5% · Ban the market: 75.0% · Market pays a fee: 12.5% | 0.0% | 0.0% |
| flood | 5000 | Rent the pumps: 88.7% · Rename it 'Little Venice': 10.3% · Wait for it to dry: 1.0% | 0.0% | 0.0% |
| ghostTours | 5000 | Give the ghost its cut: 74.4% · Run tours, stiff the ghost: 11.0% · No ghosts on the payroll: 14.6% | 0.0% | 0.0% |
| goosePond | 190 | Build the pond: 95.3% · Pond in the park instead: 4.7% · Refuse: 0.0% | 0.0% | 0.0% |
| greenLights | 5000 | Fix the lights: 61.9% · Leave them green: 5.1% · Replace them with Barb: 33.1% | 0.0% | 0.0% |
| helicopter | 3707 | Buy it: 10.5% · Lease one: 18.5% · Promise it next quarter: 71.0% | 0.0% | 0.0% |
| karaoke | 5000 | Sing the hard one: 61.4% · Lip-sync it: 36.7% · No singing in City Hall: 1.8% | 0.0% | 0.0% |
| lakeMonster | 5000 | Put it on the brochure: 66.5% · Protect its privacy: 21.4% · There is no monster: 12.1% | 0.0% | 0.0% |
| lawDogs | 1187 | Overrule the dog: 8.9% · Promote the dog: 80.7% · Let justice take its course: 10.4% | 0.0% | 0.0% |
| lawGeese | 221 | Give Barb a whistle too: 22.2% · Goose lanes on every road: 54.8% · Let Gerald run it: 23.1% | 0.0% | 0.0% |
| lawTuesday | 1272 | Give it back: 17.6% · Rename it Funday: 80.0% · Hold firm: 2.4% | 0.0% | 0.0% |
| libraryCasino | 3297 | Build the casino: 50.4% · Refuse: 9.6% · Casino night, once a year: 40.0% | 0.0% | 0.0% |
| mallParking | 371 | Pave the park: 39.4% · Only half the park: 55.5% · Hands off the park: 5.1% | 0.0% | 0.0% |
| marathon | 1468 | Run it yourself: 54.6% · Hand out water: 44.5% · Postpone it: 1.0% | 0.0% | 0.0% |
| mascot | 1217 | Welcome, Wet Sock: 90.5% · Hire a real designer: 8.8% · No mascot: 0.7% | 0.0% | 0.0% |
| mimeStrike | 5000 | Notice them, with a banner: 82.8% · Negotiate in mime: 14.2% · Ignore the mimes: 3.0% | 0.0% | 0.0% |
| monsterPta | 3326 | Welcome the monster: 91.9% · Monsters can't be parents: 8.1% | 0.0% | 0.0% |
| moonClaim | 5000 | Plant the flag: 27.8% · Sell the moon to Chad: 49.9% · Give the moon back: 22.3% | 0.0% | 0.0% |
| moonRent | 1390 | Pay the moonlight bill: 73.7% · Charge him for the view: 26.3% | 0.0% | 0.0% |
| newSchool | 14 | Build a new school: 7.1% · Promise it by spring: 21.4% · Buy a second book: 71.4% | 0.0% | 0.0% |
| opera | 5000 | Attend and applaud: 30.5% · Pay for rewrites: 68.9% · Ban the opera: 0.6% | 0.0% | 0.0% |
| parkingMeters | 4999 | Install meters: 5.2% · Meters for visitors only: 18.4% · Free parking forever: 76.4% | 0.0% | 0.0% |
| parkWifi | 613 | Free park wifi: 77.5% · Wifi with Chad's ads: 19.2% · Go outside and play: 3.3% | 0.0% | 0.0% |
| pettyCrime | 4756 | Pay for overtime: 76.4% · Blame the next town over: 23.6% | 0.0% | 0.0% |
| policeDog | 11 | Buy a braver dog: 0.0% · Therapy for the old dog: 100.0% · One scared dog is plenty: 0.0% | 0.0% | 0.0% |
| portrait | 1995 | Hang it proudly: 64.3% · Pay for a repaint: 34.4% · Burn it: 1.3% | 0.0% | 0.0% |
| raccoonBins | 5000 | Raccoon-proof bins: 71.7% · Night patrols: 20.8% · They live here too: 7.5% | 0.0% | 0.0% |
| rocketLibrary | 777 | Rebuild the library: 79.4% · Leave the rocket in: 20.6% | 0.0% | 0.0% |
| roundabout | 963 | Rescue the drivers: 64.3% · Sell tickets to watch: 32.1% · It's working as intended: 3.6% | 0.0% | 0.0% |
| schoolLunch | 5000 | Pay for real food: 83.6% · Chad sponsors lunch: 15.0% · Paste builds character: 1.4% | 0.0% | 0.0% |
| secretStranger | 2173 | Expose him in The Bugle: 98.3% · Take his hush money: 1.7% | 0.0% | 0.0% |
| speedTrap | 403 | Approve the speed trap: 13.9% · Warning signs only: 59.3% · No speed trap: 26.8% | 0.0% | 0.0% |
| statue | 944 | Accept the statue: 48.7% · A statue of someone normal: 48.8% · No statues: 2.4% | 0.0% | 0.0% |
| talentShow | 801 | Judge honestly: 3.9% · Everyone wins: 41.2% · Send Dave: 54.9% | 0.0% | 0.0% |
| taxBreak | 5000 | Grant the tax break: 24.5% · Trade it for a donation: 51.1% · Refuse: 24.4% | 0.0% | 0.0% |
| theWhistle | 608 | Shut down The Whistle: 1.3% · Buy The Whistle: 81.9% · A free press is good: 16.8% | 0.0% | 0.0% |
| tvStation | 874 | Build the station: 39.0% · Lend her the roof: 60.8% · Refuse: 0.2% | 0.0% | 0.0% |
| twinTown | 5000 | Throw a welcome party: 87.7% · Show them the pothole: 12.0% · Lock the gates: 0.3% | 0.0% | 0.0% |
| zebra | 1764 | Hire a zebra wrangler: 50.8% · Make it official: 36.7% · Barb can arrest a zebra: 12.5% | 0.0% | 0.0% |
