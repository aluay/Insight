import express from "express";
const router = express.Router();

import {
    getShortInterest, getShortInterestForAsset,
} from "../controllers/shortinterestController.js";

import {search} from "../controllers/searchController.js";

//  This route will get shortinterest data
router.get("/", async (req, res) => {
    const result = await getShortInterest();
    res.send(result);
});

//  This route will get shortinterest data for a specific asset
router.get("/:asset", async (req, res) => {
    const searchAsset = await search(req.params.asset);
    const result = await getShortInterestForAsset(searchAsset.quotes[0].symbol);
    res.send(result);
});

//  Export the router
export default router;