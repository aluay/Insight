import fetch from "node-fetch";

//  Get a list of the top gainers
export async function getGainers() {
    let gainers = []

    const URL =
        "https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=day_gainers&count=10&corsDomain=finance.yahoo.com";

    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        for (let i = 0; i < data.finance.result[0].quotes.length; i++) {
            gainers.push(data.finance.result[0].quotes[i])
        }
        if (gainers) {
            return gainers;
        } else {
            return null;
        }
    } else {
        return "Something went wrong.";
    }
}

//  Get a list of the top losers
export async function getLosers() {
    let losers = []
    const URL =
        "https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=day_losers&count=10&corsDomain=finance.yahoo.com";

    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        for (let i = 0; i < data.finance.result[0].quotes.length; i++) {
            losers.push(data.finance.result[0].quotes[i])
        }
        if (losers) {
            return losers;
        } else {
            return null;
        }
    } else {
        return "Something went wrong.";
    }
}

//  Get most active symbols
export async function getMostActiveSymbols() {
    let mostActive = []
    const URL =
        "https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=most_actives&count=10&corsDomain=finance.yahoo.com";

    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        for (let i = 0; i < data.finance.result[0].quotes.length; i++) {
            mostActive.push(data.finance.result[0].quotes[i])
        }
        if (mostActive) {
            return mostActive;
        } else {
            return null;
        }
    } else {
        return "Something went wrong.";
    }
}

//  Get trending symbols
export async function getTrendingSymbols() {
    let trendingSymbols = [];
    const URL =
        "https://query2.finance.yahoo.com/v1/finance/trending/US?lang=en-US&region=US&count=10&corsDomain=finance.yahoo.com";

    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        const info = await getTrendingSymbolsInfo(data);
        for (let i = 0; i < info.quoteResponse.result.length; i++) {
            trendingSymbols.push(info.quoteResponse.result[i])
        }
        if (trendingSymbols) {
            return trendingSymbols;
        } else {
            return null;
        }
    } else {
        return "Something went wrong.";
    }
}

//  Get trending symbols full data
export async function getTrendingSymbolsInfo(data) {
    const symbols = data.finance.result[0].quotes;
    let URL = "https://query1.finance.yahoo.com/v7/finance/quote?&symbols=";

    for (let i = 0; i < symbols.length; i++) {
        URL += symbols[i].symbol += ",";
    }
    const response = await fetch(URL);
    if (response) {
        const fullData = await response.json();
        if (fullData) {
            return fullData
        } else {
            return null
        }
    } else {
        return "Something went wrong.";
    }
}

//  Get market time information
export async function getMarketTime() {
    const URL =
        "https://finance.yahoo.com/_finance_doubledown/api/resource/finance.market-time";

    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        if (data) {
            return data
        } else {
            return null
        }
    } else {
        return "Something went wrong.";
    }
}

//  Get market summary
export async function getMarketSummary() {
    const symbols = [
        "^GSPC",
        "^DJI",
        "^IXIC",
        "^RUT",
        "CL=F",
        "GC=F",
        "SI=F",
        "EURUSD=X",
        "^TNX",
        "GBPUSD=X",
        "JPY=X",
        "BTC-USD",
        "^CMC200",
        "^FTSE",
        "^N225",
    ];
    //const URL = `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${symbols}&range=1d&interval=5m&indicators=close&includeTimestamps=false&includePrePost=false&corsDomain=finance.yahoo.com&.tsrc=finance`;
    let summary = [];
    for (let i = 0; i < symbols.length; i++) {
        const spark = await fetch(
            `https://query1.finance.yahoo.com/v7/finance/spark?symbols=${symbols[i]}&range=1d&interval=5m&indicators=close&includeTimestamps=false&includePrePost=false&corsDomain=finance.yahoo.com&.tsrc=finance`
        );
        const info = await fetch(
            `https://query1.finance.yahoo.com/v7/finance/quote?formatted=true&symbols=${symbols[i]}`
        );
        if (spark && info) {
            const sparkJson = await spark.json();
            const infoJson = await info.json();
            const temp = [sparkJson, infoJson];
            summary.push(temp);
        }
    }
    if (summary) {
        return summary;
    } else {
        return "Something went wrong.";
    }
}

//  Get Reverse Repo Operations for the day
export async function getReverseRepo() {
    const URL =
        "https://markets.newyorkfed.org/read?productCode=70&operationTypes=Reverse%20Repo&sort=postDt:-1,%27data.closeTm%27:-1&format=json";

    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        if (data) {
            return data.repo.operations[0]
        } else {
            return null
        }
    } else {
        return "Something went wrong.";
    }
}

//  Get most expensive stocks to borrows (excluding ADRs, debt)
export async function getHardToBorrow() {
    const URL =
        "https://iborrowdesk.com/api/most_expensive";

    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        if (data) {
            return data.results
        } else {
            return null
        }
    } else {
        return "Something went wrong.";
    }
}

//  Get top sectors performance
export async function getTopSectors() {
    const URL =
        "https://quote.cnbc.com/quote-html-webservice/restQuote/symbolType/symbol?symbols=.GSPD%7C.GSPS%7C.GSPE%7C.GSPF%7C.GSPHC%7C.GSPI%7C.GSPM%7C.SPLRCR%7C.GSPT%7C.GSPTS%7C.GSPU&requestMethod=itv&noform=1&partnerId=2&fund=1&exthrs=1&output=json&events=1";

    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        if (data) {
            return data.FormattedQuoteResult.FormattedQuote
        } else {
            return null
        }
    } else {
        return "Something went wrong.";
    }
}

//  Get IPO calendar (Historical and future IPOs)
export async function getIPOCalendar() {
    const URL =
        "https://www.tipranks.com/api/calendars/ipos/";

    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        if (data) {
            return data
        } else {
            return null
        }
    } else {
        return "Something went wrong.";
    }
}

//  Get economic calendar and market-moving events
export async function getEconomicCalendar() {
    const URL =
        "https://tr-frontend-cdn.azureedge.net/research/prod/calendars/economic/payload.json";

    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        if (data) {
            return data.EconomicCalender.data.economicCalenderData
        } else {
            return null
        }
    } else {
        return "Something went wrong.";
    }
}

//  Get daily insider transactions
export async function getDailyInsiderTransactions() {
    const URL =
        "https://www.tipranks.com/api/liveFeeds/getTopWithMetadata/?benchmark=none&experttype=7&ranking=1&notRanked=-1&period=year&top=300&country=us";

    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        if (data) {
            return data.analysts
        } else {
            return null
        }
    } else {
        return "Something went wrong.";
    }
}