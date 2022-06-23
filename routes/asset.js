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

//  This route will get the top 10 articles related to the stock/company
router.get("/news/:asset", async (req, res) => {
    const result = await news(req.params.asset);
    res.send(result);
});

//   This route will get insights 
router.get("/insights/:asset", async (req, res) => {
    const result = await insights(req.params.asset);
    res.send(result);
});

//   This route will get full summary 
router.get("/summary/:asset", async (req, res) => {
    const result = await summary(req.params.asset);
    res.send(result);
});

//   This route will get specific section of the summary 
router.get("/summary/:modules/:asset", async (req, res) => {
    const result = await section(req.params.asset, req.params.modules);
    res.send(result);
});

//   This route will get options 
router.get("/options/:asset", async (req, res) => {
    const result = await options(req.params.asset);
    res.send(result);
});

//   This route will get charts data 
router.get("/chart/:asset", async (req, res) => {
    const result = await chart(req.params.asset);
    res.send(result);
});

//  This route will get darkpools data for a specific asset
router.get("/darkpools/:asset", async (req, res) => {
    const result = await darkpools(req.params.asset);
    res.send(result);
});

//  This route will display a list of all available asset modules
router.get("/modules/list", async (req, res) => {
    res.sendFile('moduleslist.html', {
        root: "./views"
    });
});

//  This route will get borrow rates and stock availability
router.get("/hardToBorrow/:asset", async (req, res) => {
    const result = await hardToBorrow(req.params.asset);
    res.send(result);
});

//  Export the router
export default router;