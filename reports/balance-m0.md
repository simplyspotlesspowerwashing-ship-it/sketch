# Balance report: pack `placeholder`

5000 terms per policy. Tuning: {"people":0.5,"press":0.2,"business":0.1,"law":0.1,"objective":2,"brokenPromise":-4,"min":5,"max":95}.

| Policy | Win rate | Target | Mean vote | Vote p10 / p50 / p90 | Recalled | Bankrupt | Term ended early | Ending money $k p10 / p50 / p90 |
|---|---|---|---|---|---|---|---|---|
| random | 30.4% | **off target** (0-15%) | 40.3 | 19 / 39 / 63 | 35.7% | 1.3% | 0.1% | -6 / 53 / 187 |
| greedy-approval | 78.7% |  | 62.4 | 29 / 68 / 77 | 40.8% | 40.8% | 0.0% | -44 / -35 / 8 |
| miser | 0.0% |  | 15.8 | 7 / 18 / 23 | 100.0% | 0.0% | 29.9% | 20 / 81 / 117 |
| people-pleaser | 55.7% |  | 49.0 | 43 / 50 / 55 | 26.8% | 23.1% | 0.0% | -47 / -40 / -23 |
| dave-only | 0.0% | **off target** (5-10%) | 21.0 | 11 / 20 / 33 | 72.0% | 0.0% | 0.0% | 38 / 92 / 314 |
| sensible | 100.0% | **off target** (55-65%) | 85.8 | 80 / 86 / 91 | 0.0% | 0.0% | 0.0% | 27 / 44 / 85 |
| | | recalls on target (under 25%) | | | | | | |

## Non-dilemmas and other flags (sensible bot)

- `bearStory`: "Yes, I wrestled a bear" chosen 86% of the time (over 85%)
- `curfew`: "Curfew at 9 pm" chosen 3% of the time (under 5%)
- `entitled`: "Free ice cream" chosen 97% of the time (over 85%)
- `entitled`: "Say no nicely" chosen 3% of the time (under 5%)
- `evStorm`: "Buy sandbags" chosen 92% of the time (over 85%)
- `festival`: "No Frog Day" chosen 2% of the time (under 5%)
- `giantSpoon`: "Build the spoon" chosen 96% of the time (over 85%)
- `giantSpoon`: "A normal-sized spoon" chosen 3% of the time (under 5%)
- `giantSpoon`: "No spoon" chosen 1% of the time (under 5%)
- `helicopter`: "Lease one" chosen 2% of the time (under 5%)
- `helicopter`: "Promise it next quarter" chosen 85% of the time (over 85%)
- `newSchool`: "Build a new school" chosen 1% of the time (under 5%)
- `newSchool`: "Buy a second book" chosen 94% of the time (over 85%)
- `parkingMeters`: "Install meters" chosen 0% of the time (under 5%)
- `parkingMeters`: "Meters for visitors only" chosen 2% of the time (under 5%)
- `parkingMeters`: "Free parking forever" chosen 98% of the time (over 85%)
- `pettyCrime`: "Pay for overtime" chosen 93% of the time (over 85%)
- `tvStation`: "Build the station" chosen 97% of the time (over 85%)
- `tvStation`: "Refuse" chosen 3% of the time (under 5%)
- project `pond` is built in 100.0% of sensible terms (possible dominant project)

## Unreachable desk cards (never drawn by any policy)

None.

## random

Projects built (share of terms): tv 54.4%, casino 46.7%, pond 45.1%, school 42.7%, helicopter 41.1%, spoon 36.9%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| bearStory | 14999 | Yes, I wrestled a bear: 50.2% · Tell the truth: 49.8% | 37.4% | 13.7% |
| buyout | 5 | Sell him Main Street: 100.0% · Refuse: 0.0% | 80.0% | 0.0% |
| campaign | 4996 | Big rally: 28.3% · Call in every Favor: 15.0% · Attack ad about geese: 27.9% · Just be yourself: 28.9% | 0.0% | 0.0% |
| curfew | 14999 | Curfew at 9 pm: 32.2% · Fund a youth centre: 33.8% · Let them stand: 34.0% | 32.1% | 12.6% |
| entitled | 2492 | Free ice cream: 48.3% · Say no nicely: 51.7% | 31.1% | 15.0% |
| evBear | 2145 | Apologise to the bear: 48.4% · Wrestle it for real: 51.6% | 19.4% | 0.0% |
| evStorm | 5000 | Buy sandbags: 49.6% · Ignore Steve: 50.4% | 19.2% | 0.0% |
| festival | 12952 | Fund Frog Day: 33.4% · Promise Frog Day soon: 33.7% · No Frog Day: 32.9% | 30.0% | 10.2% |
| giantSpoon | 12448 | Build the spoon: 29.9% · A normal-sized spoon: 35.1% · No spoon: 34.9% | 36.8% | 13.6% |
| gooseOccupation | 3530 | Pay them off in bread: 51.1% · Send Chief Barb: 48.9% | 35.2% | 16.3% |
| goosePond | 14999 | Build the pond: 28.5% · Pond in the park instead: 33.0% · Refuse: 38.5% | 33.8% | 13.4% |
| helicopter | 13439 | Buy it: 28.5% · Lease one: 35.9% · Promise it next quarter: 35.6% | 33.8% | 12.7% |
| libraryCasino | 14999 | Build the casino: 29.5% · Refuse: 37.7% · Casino night, once a year: 32.8% | 33.6% | 13.7% |
| newSchool | 14999 | Build a new school: 28.0% · Promise it by spring: 36.4% · Buy a second book: 35.6% | 35.7% | 13.4% |
| overreach | 67 | Rein her in: 48.0% · Let it ride: 52.0% | 49.3% | 13.4% |
| parkingMeters | 14999 | Install meters: 35.3% · Meters for visitors only: 29.3% · Free parking forever: 35.4% | 33.9% | 13.5% |
| pettyCrime | 5037 | Pay for overtime: 49.4% · Blame the next town over: 50.6% | 39.1% | 13.7% |
| scandal | 41 | Own it: 50.0% · Bury the story: 50.0% | 34.1% | 17.1% |
| snowplow | 14999 | Plow the school road: 33.8% · Plow Chad Street: 33.2% · Rent a second plow: 33.1% | 34.6% | 12.6% |
| taxBreak | 9985 | Grant the tax break: 36.2% · Trade it for a donation: 28.4% · Refuse: 35.5% | 35.8% | 13.9% |
| tvStation | 14999 | Build the station: 42.1% · Refuse: 57.9% | 40.8% | 16.2% |

## greedy-approval

Projects built (share of terms): pond 100.0%, helicopter 100.0%, school 97.6%, casino 16.4%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| bearStory | 15000 | Yes, I wrestled a bear: 100.0% · Tell the truth: 0.0% | 0.0% | 0.0% |
| campaign | 4998 | Big rally: 0.2% · Call in every Favor: 99.4% · Attack ad about geese: 0.3% · Just be yourself: 0.0% | 0.0% | 0.0% |
| curfew | 15000 | Curfew at 9 pm: 52.9% · Fund a youth centre: 47.1% · Let them stand: 0.0% | 0.0% | 0.0% |
| entitled | 30998 | Free ice cream: 67.3% · Say no nicely: 32.7% | 0.0% | 23.5% |
| evBear | 5000 | Apologise to the bear: 48.1% · Wrestle it for real: 51.9% | 0.0% | 0.0% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| festival | 7066 | Fund Frog Day: 97.4% · Promise Frog Day soon: 2.6% · No Frog Day: 0.0% | 0.0% | 0.0% |
| giantSpoon | 4578 | Build the spoon: - · A normal-sized spoon: - · No spoon: - | 0.0% | 100.0% |
| goosePond | 15000 | Build the pond: 79.0% · Pond in the park instead: 21.0% · Refuse: 0.0% | 0.0% | 57.8% |
| helicopter | 5617 | Buy it: 100.0% · Lease one: 0.0% · Promise it next quarter: 0.0% | 0.0% | 10.9% |
| libraryCasino | 15000 | Build the casino: 8.2% · Refuse: 0.0% · Casino night, once a year: 91.8% | 0.0% | 33.3% |
| newSchool | 15000 | Build a new school: 32.5% · Promise it by spring: 67.5% · Buy a second book: 0.0% | 0.0% | 0.0% |
| overreach | 12 | Rein her in: 100.0% · Let it ride: 0.0% | 0.0% | 33.3% |
| parkingMeters | 15000 | Install meters: - · Meters for visitors only: - · Free parking forever: - | 0.0% | 100.0% |
| pettyCrime | 1303 | Pay for overtime: 99.8% · Blame the next town over: 0.2% | 0.0% | 55.9% |
| scandal | 4523 | Own it: 100.0% · Bury the story: 0.0% | 0.0% | 68.6% |
| snowplow | 15000 | Plow the school road: 62.1% · Plow Chad Street: 0.0% · Rent a second plow: 37.9% | 0.0% | 0.1% |
| taxBreak | 5903 | Grant the tax break: 99.2% · Trade it for a donation: 0.8% · Refuse: 0.0% | 0.0% | 0.0% |
| tvStation | 15000 | Build the station: - · Refuse: - | 0.0% | 100.0% |

## miser

Projects built (share of terms): casino 100.0%, spoon 99.8%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| bearStory | 14709 | Yes, I wrestled a bear: - · Tell the truth: - | 0.0% | 100.0% |
| campaign | 3504 | Big rally: 0.0% · Call in every Favor: 25.1% · Attack ad about geese: 0.0% · Just be yourself: 74.9% | 0.0% | 0.0% |
| curfew | 14984 | Curfew at 9 pm: - · Fund a youth centre: - · Let them stand: - | 0.0% | 100.0% |
| evStorm | 5000 | Buy sandbags: - · Ignore Steve: - | 100.0% | 0.0% |
| festival | 13217 | Fund Frog Day: - · Promise Frog Day soon: - · No Frog Day: - | 100.0% | 0.0% |
| giantSpoon | 12905 | Build the spoon: 100.0% · A normal-sized spoon: 0.0% · No spoon: 0.0% | 61.3% | 0.0% |
| gooseOccupation | 1656 | Pay them off in bread: - · Send Chief Barb: - | 100.0% | 0.0% |
| goosePond | 15000 | Build the pond: - · Pond in the park instead: - · Refuse: - | 11.2% | 88.8% |
| helicopter | 14063 | Buy it: - · Lease one: - · Promise it next quarter: - | 100.0% | 0.0% |
| libraryCasino | 15000 | Build the casino: 37.5% · Refuse: 0.0% · Casino night, once a year: 62.5% | 0.0% | 11.2% |
| newSchool | 14234 | Build a new school: - · Promise it by spring: - · Buy a second book: - | 0.0% | 100.0% |
| parkingMeters | 15000 | Install meters: 100.0% · Meters for visitors only: 0.0% · Free parking forever: 0.0% | 0.0% | 0.0% |
| pettyCrime | 6468 | Pay for overtime: - · Blame the next town over: - | 100.0% | 0.0% |
| snowplow | 14163 | Plow the school road: - · Plow Chad Street: - · Rent a second plow: - | 100.0% | 0.0% |
| taxBreak | 10482 | Grant the tax break: 0.0% · Trade it for a donation: 100.0% · Refuse: 0.0% | 49.6% | 0.0% |
| tvStation | 14655 | Build the station: - · Refuse: - | 100.0% | 0.0% |

## people-pleaser

Projects built (share of terms): pond 100.0%, school 100.0%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| bearStory | 15000 | Yes, I wrestled a bear: 0.0% · Tell the truth: 100.0% | 0.0% | 0.0% |
| campaign | 5000 | Big rally: 23.9% · Call in every Favor: 38.3% · Attack ad about geese: 37.3% · Just be yourself: 0.5% | 0.0% | 0.0% |
| curfew | 15000 | Curfew at 9 pm: 0.0% · Fund a youth centre: 79.3% · Let them stand: 20.7% | 0.0% | 10.6% |
| entitled | 42933 | Free ice cream: 96.0% · Say no nicely: 4.0% | 0.0% | 13.4% |
| evStorm | 5000 | Buy sandbags: 100.0% · Ignore Steve: 0.0% | 0.0% | 0.0% |
| festival | 5284 | Fund Frog Day: 100.0% · Promise Frog Day soon: 0.0% · No Frog Day: 0.0% | 0.0% | 0.0% |
| giantSpoon | 777 | Build the spoon: - · A normal-sized spoon: - · No spoon: - | 0.0% | 100.0% |
| goosePond | 15000 | Build the pond: 39.9% · Pond in the park instead: 60.1% · Refuse: 0.0% | 0.0% | 16.4% |
| helicopter | 5222 | Buy it: - · Lease one: - · Promise it next quarter: - | 0.0% | 100.0% |
| libraryCasino | 15000 | Build the casino: 0.0% · Refuse: 100.0% · Casino night, once a year: 0.0% | 0.0% | 44.0% |
| newSchool | 15000 | Build a new school: 33.3% · Promise it by spring: 66.7% · Buy a second book: 0.0% | 0.0% | 0.0% |
| parkingMeters | 15000 | Install meters: 0.0% · Meters for visitors only: 0.0% · Free parking forever: 100.0% | 0.0% | 34.3% |
| pettyCrime | 297 | Pay for overtime: 76.4% · Blame the next town over: 23.6% | 0.0% | 40.1% |
| snowplow | 15000 | Plow the school road: 100.0% · Plow Chad Street: 0.0% · Rent a second plow: 0.0% | 0.0% | 79.1% |
| taxBreak | 5487 | Grant the tax break: - · Trade it for a donation: - · Refuse: - | 0.0% | 100.0% |
| tvStation | 15000 | Build the station: - · Refuse: - | 0.0% | 100.0% |

## dave-only

Projects built (share of terms): none

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| bearStory | 15000 | Yes, I wrestled a bear: - · Tell the truth: - | 0.0% | 100.0% |
| campaign | 5000 | Big rally: 0.0% · Call in every Favor: 0.0% · Attack ad about geese: 0.0% · Just be yourself: 100.0% | 0.0% | 0.0% |
| curfew | 15000 | Curfew at 9 pm: - · Fund a youth centre: - · Let them stand: - | 0.0% | 100.0% |
| evStorm | 5000 | Buy sandbags: - · Ignore Steve: - | 100.0% | 0.0% |
| festival | 12435 | Fund Frog Day: - · Promise Frog Day soon: - · No Frog Day: - | 100.0% | 0.0% |
| giantSpoon | 12327 | Build the spoon: - · A normal-sized spoon: - · No spoon: - | 100.0% | 0.0% |
| gooseOccupation | 5000 | Pay them off in bread: - · Send Chief Barb: - | 100.0% | 0.0% |
| goosePond | 15000 | Build the pond: - · Pond in the park instead: - · Refuse: - | 100.0% | 0.0% |
| helicopter | 14091 | Buy it: - · Lease one: - · Promise it next quarter: - | 100.0% | 0.0% |
| libraryCasino | 15000 | Build the casino: - · Refuse: - · Casino night, once a year: - | 0.0% | 100.0% |
| newSchool | 15000 | Build a new school: - · Promise it by spring: - · Buy a second book: - | 0.0% | 100.0% |
| parkingMeters | 15000 | Install meters: - · Meters for visitors only: - · Free parking forever: - | 100.0% | 0.0% |
| pettyCrime | 8478 | Pay for overtime: - · Blame the next town over: - | 100.0% | 0.0% |
| snowplow | 15000 | Plow the school road: - · Plow Chad Street: - · Rent a second plow: - | 100.0% | 0.0% |
| taxBreak | 7669 | Grant the tax break: - · Trade it for a donation: - · Refuse: - | 100.0% | 0.0% |
| tvStation | 15000 | Build the station: - · Refuse: - | 100.0% | 0.0% |

## sensible

Projects built (share of terms): pond 100.0%, tv 79.7%, spoon 12.9%, casino 9.7%, school 0.9%, helicopter 0.2%

| Card | Shown | Options chosen (share of times handled) | Ignored | Dave |
|---|---|---|---|---|
| bearStory | 15000 | Yes, I wrestled a bear: 86.1% · Tell the truth: 13.9% | 0.0% | 22.7% |
| campaign | 5000 | Big rally: 32.3% · Call in every Favor: 46.9% · Attack ad about geese: 12.9% · Just be yourself: 7.9% | 0.0% | 0.0% |
| curfew | 15000 | Curfew at 9 pm: 2.7% · Fund a youth centre: 69.1% · Let them stand: 28.1% | 0.0% | 31.0% |
| entitled | 39278 | Free ice cream: 97.0% · Say no nicely: 3.0% | 0.0% | 0.7% |
| evBear | 4617 | Apologise to the bear: 16.0% · Wrestle it for real: 84.0% | 2.1% | 0.0% |
| evStorm | 5000 | Buy sandbags: 91.6% · Ignore Steve: 8.4% | 21.7% | 0.0% |
| festival | 5071 | Fund Frog Day: 67.8% · Promise Frog Day soon: 30.6% · No Frog Day: 1.6% | 0.0% | 8.0% |
| giantSpoon | 1187 | Build the spoon: 96.1% · A normal-sized spoon: 2.8% · No spoon: 1.0% | 0.0% | 43.5% |
| goosePond | 15000 | Build the pond: 44.4% · Pond in the park instead: 34.5% · Refuse: 21.0% | 0.0% | 25.0% |
| helicopter | 5422 | Buy it: 12.9% · Lease one: 1.6% · Promise it next quarter: 85.5% | 1.7% | 97.1% |
| libraryCasino | 15000 | Build the casino: 5.3% · Refuse: 41.8% · Casino night, once a year: 52.9% | 0.0% | 38.8% |
| newSchool | 15000 | Build a new school: 0.7% · Promise it by spring: 5.7% · Buy a second book: 93.6% | 0.0% | 54.9% |
| parkingMeters | 15000 | Install meters: 0.1% · Meters for visitors only: 2.1% · Free parking forever: 97.7% | 18.9% | 50.7% |
| pettyCrime | 2914 | Pay for overtime: 92.9% · Blame the next town over: 7.1% | 0.0% | 0.0% |
| scandal | 861 | Own it: 67.3% · Bury the story: 32.7% | 0.0% | 49.9% |
| snowplow | 15000 | Plow the school road: 14.9% · Plow Chad Street: 6.0% · Rent a second plow: 79.2% | 0.0% | 29.8% |
| taxBreak | 5267 | Grant the tax break: 21.2% · Trade it for a donation: 39.1% · Refuse: 39.7% | 0.0% | 52.1% |
| tvStation | 15000 | Build the station: 97.3% · Refuse: 2.7% | 1.5% | 71.2% |
