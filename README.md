# Insight

Financial API that provides the most up to date information about markets, stocks, dark pools, short interest, market overview, news, and more!

## Features include

- General news
- Business news
- Health news
- Top articles about a stock
- Current markets
- Market gainers
- Market losers
- Market most active
- Market trending stocks
- Market time information
- Market overview and summary
- Stock/Company information
- Stock/Company insights
- Dark pools
- Short interest
- US Government Finance
  ... and much more

## Usage

All methods are GET

### News

| Path           | Description          |
| -------------- | -------------------- |
| /news          | Get US general news  |
| /news/business | Get US business news |
| /news/health   | Get US health news   |

### Snapshot

| Path                                                 | Description                                                                                                                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| /snapshot/gainers                                    | Get market gainers                                                                                                                                                        |
| /snapshot/losers                                     | Get market losers                                                                                                                                                         |
| /snapshot/mostActive                                 | Get market most active symbols                                                                                                                                            |
| /snapshot/trendingSymbols                            | Get market trending symbols                                                                                                                                               |
| /snapshot/marketTime                                 | Get market time - close, open, time until close, time until open, etc                                                                                                     |
| /snapshot/marketSummary                              | Get market overview and summary                                                                                                                                           |
| /snapshot/reverseRepo                                | Get Fed reverse repurchase agreement, also known as reverse repo operations. Only available when markets are open.                                                        |
| /snapshot/hardToBorrow                               | Get list of the most expensive stocks to borrows (excluding ADRs, debt)                                                                                                   |
| /snapshot/sectors                                    | Get list of top sectors and their performance                                                                                                                             |
| /snapshot/ipoCalendar                                | Get IPO calendar (Historical and future IPOs)                                                                                                                             |
| /snapshot/economicCalendar                           | Get economic calendar and market-moving events                                                                                                                            |
| /snapshot/upcomingEarnings                           | Get upcoming earnings                                                                                                                                                     |
| /snapshot/dailyInsiderTransactions                   | Get daily insider transactions                                                                                                                                            |
| /snapshot/gov/trades/all/[Page number]               | Get politicians stock trades. If no page number is passed, the API will return the first page only. The list is large, so the max per page is 100 items.                  |
| /snapshot/gov/trades/individual/[politicianID]       | Get 100 recent stock trades for a particular politician (politicianID can be retrieved from the all trades path)                                                          |
| /snapshot/gov/trades/senate                          | Get all trades for the senate members                                                                                                                                     |
| /snapshot/gov/trades/house                           | Get all trades for the house of representatives members                                                                                                                   |
| /snapshot/gov/spending/agency                        | Get US government spending by agency                                                                                                                                      |
| /snapshot/gov/spending/federalaccounts/[Page number] | Get US government spending by federal accounts. If no page number is passed, the API will return the first page only. The list is large, so the max per page is 50 items. |
| /snapshot/gov/spending/state                         | Get US government spending by state                                                                                                                                       |
| /snapshot/gov/spending/recipient/[Page number]       | Get US government spending by recipient. If no page number is passed, the API will return the first page only. The list is large, so the max per page is 50 items.        |
| /snapshot/gov/treasurybalance                        | Get latest US treasury balance                                                                                                                                            |

### stock

| Path                              | Description                                                                                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| /stock/news/[symbol]              | Get top 10 news articles                                                                                                                       |
| /stock/insights/[symbol]          | Get insights data                                                                                                                              |
| /stock/summary/[symbol]           | Get full summary                                                                                                                               |
| /stock/summary/[modules]/[symbol] | Get specific modules from the summary. Modules are separated by a comma (example: assetProfile, recommendationTrend, cashflowStatementHistory) |
| /stock/modules/list               | Get a list of all available stock modules                                                                                                      |
| /stock/options/[symbol]           | Get options data                                                                                                                               |
| /stock/chart/[symbol]             | Get charts data                                                                                                                                |
| /stock/darkpools/[symbols]        | Get darkpools data                                                                                                                             |
| /stock/borrow/[symbols]           | Get borrow rates and availability data                                                                                                         |
| /stock/shortinterest/[symbol]     | Get short interest data                                                                                                                        |
| /stock/book/[symbol]              | Get bid/ask data                                                                                                                               |
| /stock/exchangevolume/[symbol]    | Get exchange data                                                                                                                              |
| /stock/ftd/[symbol]               | Get Fails-to-Deliver (FTDs) data                                                                                                               |
| /stock/sentimentanalysis/[symbol] | Get sentiment analysis score data                                                                                                              |

### Dark Pools

| Path            | Description                       |
| --------------- | --------------------------------- |
| /darkpools/list | Get list of all known dark pools  |
| /darkpools/data | Get all available dark pools data |

## Short Interest

| Path                   | Description                           |
| ---------------------- | ------------------------------------- |
| /shortinterest/all     | Get all available short interest data |
| /shortinterest/highest | Get high short interest stocks        |

### Crypto

Under construction...
