import express from "express";
const router = express.Router();

import {
    news,
    insights,
    summary,
    modules,
    options,
    chart,
    darkpools,
    borrow
} from "../controllers/stockController.js";

import {
    search
} from "../controllers/searchController.js";

//  This route will get the top 10 articles related to the stock/company
router.get("/news/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await news(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Symbol not found"
        })
    }
});

//   This route will get insights 
router.get("/insights/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await insights(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Symbol not found"
        })
    }
});

//   This route will get full summary 
router.get("/summary/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await summary(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Symbol not found"
        })
    }
});

//   This route will get specific modules from the summary 
router.get("/summary/:modules/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await modules(searchStock.symbol,req.params.modules);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Symbol not found"
        })
    }
});

//   This route will get options 
router.get("/options/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await options(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Symbol not found"
        })
    }
});

//   This route will get charts data 
router.get("/chart/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await chart(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Symbol not found"
        })
    }
});

//  This route will get darkpools data for a specific stock
router.get("/darkpools/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await darkpools(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Symbol not found"
        })
    }
});

//  This route will get borrow rates and stock availability
router.get("/borrow/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await borrow(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Symbol not found"
        })
    }
});

//  This route will display a list of all available stock modules
router.get("/modules/list", async (req, res) => {
    res.sendFile('moduleslist.html', {
        root: "./views"
    });
});

//  Export the router
export default router;