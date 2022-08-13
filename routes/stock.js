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
    borrow,
    shortInterest,
    book,
    exchangeVolume,
    failsToDeliver
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
            const result = await modules(searchStock.symbol, req.params.modules);
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

//  This route will get shortinterest data for a specific stock
router.get("/shortinterest/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    const result = await shortInterest(searchStock.symbol);
    res.send(result);
});

//  This route will get bid/ask data for a specific stock
router.get("/book/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    const result = await book(searchStock.symbol);
    res.send(result);
});

//  This route will display a list of all available stock modules
router.get("/modules/list", async (req, res) => {
    res.sendFile('moduleslist.html', {
        root: "./views"
    });
});

//  This route will get exchange data for a specific stock
router.get("/exchangevolume/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock)
    const result = await exchangeVolume(searchStock.symbol)
    res.send(result);
})

//  This route will get Fails-to-Deliver (FTDs) data for a specific stock
router.get("/ftd/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock)
    const result = await failsToDeliver(searchStock.symbol)
    res.send(result);
})

//  Export the router
export default router;