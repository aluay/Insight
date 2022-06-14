import express from "express";
import moment from "moment";
import fetch from "node-fetch";

const router = express.Router();

//  Get market snapshot
router.get("/", async (req, res) => {
    const gainers = await getGainers();
    const losers = await getLosers();
    const mostActive = await getMostActiveSymbols();
    const trendingSymbols = await getTrendingSymbols();
    const marketTime = await getMarketTime();
    const marketSummary = await getMarketSummary();

    res.send({
        "Gainers": gainers,
        "Losers": losers,
        "MostActive": mostActive,
        "TrendingSymbols": trendingSymbols,
        "MarketTime": marketTime,
        "MarketSummary": marketSummary
    });
});

//  Get market gainers
router.get("/gainers", async (req, res) => {
    const gainers = await getGainers();
    res.send(gainers);
});

//  Get market losers
router.get("/losers", async (req, res) => {
    const losers = await getLosers();
    res.send(losers);
});

//  Get most active symbols
router.get("/mostActive", async (req, res) => {
    const mostActive = await getMostActiveSymbols();
    res.send(mostActive);
});

//  Get trending symbols
router.get("/trendingSymbols", async (req, res) => {
    const trendingSymbols = await getTrendingSymbols();
    res.send(trendingSymbols);
});

//  Get current market time information
router.get("/marketTime", async (req, res) => {
    const marketTime = await getMarketTime();
    res.send(marketTime);
});

//  Get market summary
router.get("/marketSummary", async (req, res) => {
    const marketSummary = await getMarketSummary();
    res.send(marketSummary);
});

//  Get a list of the top gainers
async function getGainers() {
    let gainers = []

    const URL =
        "https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=day_gainers&count=5&corsDomain=finance.yahoo.com";

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
async function getLosers() {
    let losers = []
    const URL =
        "https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=day_losers&count=5&corsDomain=finance.yahoo.com";

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
async function getMostActiveSymbols() {
    let mostActive = []
    const URL =
        "https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=most_actives&count=5&corsDomain=finance.yahoo.com";

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
async function getTrendingSymbols() {
    let trendingSymbols = [];
    const URL =
        "https://query2.finance.yahoo.com/v1/finance/trending/US?lang=en-US&region=US&count=5&corsDomain=finance.yahoo.com";

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
async function getTrendingSymbolsInfo(data) {
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
async function getMarketTime() {
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
async function getMarketSummary() {
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

//  Export router
export default router;