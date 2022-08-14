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
    getUpcomingEarnings,
    getDailyInsiderTransactions,
    getAllTrades,
    getPoliticianTrades,
    getSenateTrades,
    getHouseTrades,
    getGovSpendingByAgency,
    getGovSpendingByFederalAccounts,
    getGovSpendingByState,
    getGovSpendingByRecipient,
    getTreasuryBalance
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

//  Get upcoming earnings
router.get("/upcomingEarnings", async (req, res) => {
    const result = await getUpcomingEarnings();
    res.send(result);
});

//  Get daily insider transactions
router.get("/dailyInsiderTransactions", async (req, res) => {
    const result = await getDailyInsiderTransactions();
    res.send(result);
});

//  Get politicians stock trades
router.get("/gov/trades/all/:pageNum?", async (req, res) => {
    let pageNum = req.params.pageNum;
    if (!pageNum) {
        pageNum = 1;
    }
    const result = await getAllTrades(pageNum);
    res.send(result);
});

//  Get 100 recent stock trades of a politician
router.get("/gov/trades/individual/:politicianID", async (req, res) => {
    const result = await getPoliticianTrades(req.params.politicianID);
    res.send(result);
});

//  Get all trades for the senate members
router.get("/gov/trades/senate", async (req, res) => {
    const result = await getSenateTrades();
    res.send(result);
});

//  Get all trades for the house of representatives members
router.get("/gov/trades/house", async (req, res) => {
    const result = await getHouseTrades();
    res.send(result);
});

//  Get US government spending by agency
router.get("/gov/spending/agency", async (req, res) => {
    const result = await getGovSpendingByAgency();
    res.send(result);
});

//  Get US government spending by federal accounts
router.get("/gov/spending/federalAccounts/:pageNum?", async (req, res) => {
    let pageNum = req.params.pageNum;
    if (!pageNum) {
        pageNum = 1;
    }
    const result = await getGovSpendingByFederalAccounts(pageNum);
    res.send(result);
});

//  Get US government spending by state
router.get("/gov/spending/state", async (req, res) => {
    const result = await getGovSpendingByState();
    res.send(result);
});

//  Get US government spending by recipient
router.get("/gov/spending/recipient/:pageNum?", async (req, res) => {
    let pageNum = req.params.pageNum;
    if (!pageNum) {
        pageNum = 1;
    }
    const result = await getGovSpendingByRecipient(pageNum);
    res.send(result);
});

//  Get latest US treasury balance
router.get("/gov/treasurybalance", async (req, res) => {
    const result = await getTreasuryBalance();
    res.send(result)
})

//  Export router
export default router;