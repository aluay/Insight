import express from "express";
const router = express.Router();

import {
    getShortInterest,
    // getDarkpoolsForAsset
} from "../controllers/shortinterestController.js";

//  This route will get darkpools data
router.get("/", async (req, res) => {
    const result = await getShortInterest();
    res.send(result);
});

//  Export the router
export default router;