import express from "express";
const router = express.Router();

import {
    getGainers,
    getLosers,
    getMostActiveSymbols,
    getTrendingSymbols,
    getMarketTime,
    getMarketSummary
} from "../controllers/snapshotController.js"

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

//  Export router
export default router;