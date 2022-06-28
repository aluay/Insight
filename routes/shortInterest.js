import express from "express";
const router = express.Router();

import {
    getAllShortInterest,
    getHighestShortInterest,
    getShortInterestForstock,
} from "../controllers/shortinterestController.js";

import {
    search
} from "../controllers/searchController.js";

//  This route will get shortinterest data
router.get("/all", async (req, res) => {
    const result = await getAllShortInterest();
    res.send(result);
});

//  This route will get shortinterest data
router.get("/highest", async (req, res) => {
    const result = await getHighestShortInterest();
    res.send(result);
});

//  This route will get shortinterest data for a specific stock
router.get("/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    const result = await getShortInterestForstock(searchStock.symbol);
    res.send(result);
});

//  Export the router
export default router;