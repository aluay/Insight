import express from "express";
const router = express.Router();

import {
    getNews,
    getInsights,
    getSummary,
    getModules,
    getOptions,
    getChart,
    getDarkpools,
    getBorrow,
    getShortInterest,
    getBook,
    getExchangeVolume,
    getFailsToDeliver,
    getSentimentAnalysis
} from "../controllers/stockController.js";

import {
    search
} from "../controllers/searchController.js";

//  This route will get the top 10 articles related to the stock/company
router.get("/news/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await getNews(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Stock not found"
        })
    }
});

//   This route will get insights 
router.get("/insights/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await getInsights(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Stock not found"
        })
    }
});

//   This route will get full summary 
router.get("/summary/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await getSummary(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Stock not found"
        })
    }
});

//   This route will get specific modules from the summary 
router.get("/summary/:modules/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await getModules(searchStock.symbol, req.params.modules);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Stock not found"
        })
    }
});

//   This route will get options 
router.get("/options/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await getOptions(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Stock not found"
        })
    }
});

//   This route will get charts data 
router.get("/chart/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await getChart(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Stock not found"
        })
    }
});

//  This route will get darkpools data for a specific stock
router.get("/darkpools/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await getDarkpools(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Stock not found"
        })
    }
});

//  This route will get borrow rates and stock availability
router.get("/borrow/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    if (searchStock) {
        if (searchStock.quoteType.toLowerCase() === "equity") {
            const result = await getBorrow(searchStock.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Stock not found"
            })
        }
    } else {
        res.send({
            Error: "Stock not found"
        })
    }
});

//  This route will get shortinterest data for a specific stock
router.get("/shortinterest/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    const result = await getShortInterest(searchStock.symbol);
    res.send(result);
});

//  This route will get bid/ask data for a specific stock
router.get("/book/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    const result = await getBook(searchStock.symbol);
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
    const result = await getExchangeVolume(searchStock.symbol)
    res.send(result);
})

//  This route will get Fails-to-Deliver (FTDs) data for a specific stock
router.get("/ftd/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock)
    const result = await getFailsToDeliver(searchStock.symbol)
    res.send(result);
})

//  This router will get sentiment analysis score about a specific stock
router.get("/sentimentanalysis/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock)
    const result = await getSentimentAnalysis(searchStock.symbol)
    res.send(result);
})

//  Export the router
export default router;