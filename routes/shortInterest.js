import express from "express";
const router = express.Router();

import {
    getShortInterest,
    getShortInterestForstock,
} from "../controllers/shortinterestController.js";

import {
    search
} from "../controllers/searchController.js";

//  This route will get shortinterest data
router.get("/", async (req, res) => {
    const result = await getShortInterest();
    res.send(result);
});

//  This route will get shortinterest data for a specific stock
router.get("/:stock", async (req, res) => {
    const searchStock = await search(req.params.stock);
    const result = await getShortInterestForstock(searchStock);
    res.send(result);
});

//  Export the router
export default router;