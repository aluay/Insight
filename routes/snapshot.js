import express from "express";
const router = express.Router();

import {
    getGainers,
    getLosers,
    getMostActiveSymbols,
    getTrendingSymbols,
    getMarketTime,
    getMarketSummary,
    getReverseRepo,
    getHardToBorrow,
    getTopSectors,
    getIPOCalendar,
    getEconomicCalendar,
    getDailyInsiderTransactions
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
    const result = await getGainers();
    res.send(result);
});

//  Get market losers
router.get("/losers", async (req, res) => {
    const result = await getLosers();
    res.send(result);
});

//  Get most active symbols
router.get("/mostActive", async (req, res) => {
    const result = await getMostActiveSymbols();
    res.send(result);
});

//  Get trending symbols
router.get("/trendingSymbols", async (req, res) => {
    const result = await getTrendingSymbols();
    res.send(result);
});

//  Get current market time information
router.get("/marketTime", async (req, res) => {
    const result = await getMarketTime();
    res.send(result);
});

//  Get market summary
router.get("/marketSummary", async (req, res) => {
    const result = await getMarketSummary();
    res.send(result);
});

//  Get Reverse Repo Operations for the day
router.get("/reverseRepo", async (req, res) => {
    const result = await getReverseRepo();
    res.send(result);
});

//  Get most expensive stocks to borrow (excluding ADRs, debt)
router.get("/hardToBorrow", async (req, res) => {
    const result = await getHardToBorrow();
    res.send(result);
});

//  Get top sectors performance
router.get("/sectors", async (req, res) => {
    const result = await getTopSectors();
    res.send(result);
});

//  Get IPO calendar (Historical and future IPOs)
router.get("/ipoCalendar", async (req, res) => {
    const result = await getIPOCalendar();
    res.send(result);
});

//  Get economic calendar and market-moving events
router.get("/economicCalendar", async (req, res) => {
    const result = await getEconomicCalendar();
    res.send(result);
});

//  Get daily insider transactions
router.get("/dailyInsiderTransactions", async (req, res) => {
    const result = await getDailyInsiderTransactions();
    res.send(result);
});

//  Export router
export default router;