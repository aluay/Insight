import express from "express";
import fetch from "node-fetch";
const router = express.Router();

//  This endpoint grabs the top 10 articles about a company or stock symbol
router.get("/news/:asset", async (req, res) => {
    const result = await news(req.params.asset);
    res.send(result);
});

//  Get top 10 news articles about a company or stock symbol
async function news(asset) {
    const URL = `https://query2.finance.yahoo.com/v1/finance/search?q=${asset}&lang=en-US&region=US&quotesCount=6&newsCount=10&listsCount=2&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
            return data.news;
    } else {
        return null;
    }
}

//   This endpoint will get insights 
router.get("/insights/:asset", async (req, res) => {
    const result = await insights(req.params.asset);
    res.send(result);
});

//  Get insights 
async function insights(asset) {
    const URL = `https://query2.finance.yahoo.com/ws/insights/v2/finance/insights?symbol=${asset}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//   This endpoint will get full summary 
router.get("/summary/:asset", async (req, res) => {
    const result = await summary(req.params.asset);
    res.send(result);
});

//  Get full summary 
async function summary(asset) {
    const URL = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${asset}?modules=assetProfile%2CsummaryProfile%2CsummaryDetail%2CesgScores%2Cprice%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly%2CcashflowStatementHistory%2CcashflowStatementHistoryQuarterly%2CdefaultKeyStatistics%2CfinancialData%2CcalendarEvents%2CsecFilings%2CrecommendationTrend%2CupgradeDowngradeHistory%2CinstitutionOwnership%2CfundOwnership%2CmajorDirectHolders%2CmajorHoldersBreakdown%2CinsiderTransactions%2CinsiderHolders%2CnetSharePurchaseActivity%2Cearnings%2CearningsHistory%2CearningsTrend%2CindustryTrend%2CindexTrend%2CsectorTrend`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//   This endpoint will get options 
router.get("/options/:asset", async (req, res) => {
    const result = await options(req.params.asset);
    res.send(result);
});

//  Get options 
async function options(asset) {
    const URL = `https://query2.finance.yahoo.com/v7/finance/options/${asset}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//   This endpoint will get charts data 
router.get("/chart/:asset", async (req, res) => {
    const result = await chart(req.params.asset);
    res.send(result);
});

//  Get chart data 
async function chart(asset) {
    const URL = `https://query1.finance.yahoo.com/v7/finance/chart/${asset}?range=2y&interval=1d&indicators=quote&includeTimestamps=true`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//  Export the router
export default router;