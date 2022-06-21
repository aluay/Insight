# Insight

Financial API that provides the most up to date information about markets, stocks, dark pools, short interest, market overview, news, and more!

## Features

- General news
- Business news
- Health news
- Top articles about a stock/company
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

## Usage

All methods are GET

### News

| Path   | Description               |
| ------ | ------------------------- |
| /news  | US general news           |
| /news/ | business US business news |
| /news/ | health US health news     |

### Snapshot

| Path       | Description                                                                              |
| ---------- | ---------------------------------------------------------------------------------------- |
| /snapshot/ | gainers Market gainers symbols                                                           |
| /snapshot/ | losers Market losers symbols                                                             |
| /snapshot/ | mostActive Market Most active symbols                                                    |
| /snapshot/ | trendingSymbols Market trending symbols                                                  |
| /snapshot/ | marketTime Market time information - close, open, time until close, time until open, etc |
| /snapshot/ | marketSummary Market overview and summary                                                |

### Asset

| Path                       | Description                                         |
| -------------------------- | --------------------------------------------------- |
| /asset/news/[symbol]       | Get top 10 articles about a stock/company           |
| /asset/insights/[symbol]   | Get insights data about a stock/company             |
| /asset/summary/[symbol]    | Get full summary about a stock/company [LARGE SIZE] |
| /asset/options/[symbol]    | Get options data of a stock/company                 |
| /asset/chart/[symbol]      | Get chart data of a stock/company                   |
| /asset/darkpools/[symbols] | Get darkpools data of a stock/company               |

### Dark Pools

| Path            | Description                                |
| --------------- | ------------------------------------------ |
| /darkpools/     | list List of all known dark pools          |
| /darkpools/data | All available dark pools data [LARGE SIZE] |

## Short Interest

| Path           | Description                                    |
| -------------- | ---------------------------------------------- |
| /shortinterest | All available short interest data [LARGE SIZE] |

### Crypto

Under construction...
