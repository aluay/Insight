import express from "express";
const router = express.Router();

import {
    news,
    insights,
    summary,
    section,
    options,
    chart,
    darkpools,
    hardToBorrow
} from "../controllers/assetController.js";

import {search} from "../controllers/searchController.js";

//  This route will get the top 10 articles related to the stock/company
router.get("/news/:asset", async (req, res) => {
    const searchAsset = await search(req.params.asset);
    const result = await news(searchAsset.quotes[0].symbol);
    res.send(result);
});

//   This route will get insights 
router.get("/insights/:asset", async (req, res) => {
    const searchAsset = await search(req.params.asset);
    const result = await insights(searchAsset.quotes[0].symbol);
    res.send(result);
});

//   This route will get full summary 
router.get("/summary/:asset", async (req, res) => {
    const searchAsset = await search(req.params.asset);
    const result = await summary(searchAsset.quotes[0].symbol);
    res.send(result);
});

//   This route will get specific section of the summary 
router.get("/summary/:modules/:asset", async (req, res) => {
    const searchAsset = await search(req.params.asset);
    const result = await section(searchAsset.quotes[0].symbol, req.params.modules);
    res.send(result);
});

//   This route will get options 
router.get("/options/:asset", async (req, res) => {
    const searchAsset = await search(req.params.asset);
    const result = await options(searchAsset.quotes[0].symbol);
    res.send(result);
});

//   This route will get charts data 
router.get("/chart/:asset", async (req, res) => {
    const searchAsset = await search(req.params.asset);
    const result = await chart(searchAsset.quotes[0].symbol);
    res.send(result);
});

//  This route will get darkpools data for a specific asset
router.get("/darkpools/:asset", async (req, res) => {
    const searchAsset = await search(req.params.asset);
    const result = await darkpools(searchAsset.quotes[0].symbol);
    res.send(result);
});

//  This route will get borrow rates and stock availability
router.get("/hardToBorrow/:asset", async (req, res) => {
    const searchAsset = await search(req.params.asset);
    const result = await hardToBorrow(searchAsset.quotes[0].symbol);
    res.send(result);
});

//  This route will display a list of all available asset modules
router.get("/modules/list", async (req, res) => {
    res.sendFile('moduleslist.html', {
        root: "./views"
    });
});

//  Export the router
export default router;