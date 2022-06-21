import express from "express";
const router = express.Router();

import {
    getShortInterest,
} from "../controllers/shortinterestController.js";

//  This route will get shortinterest data
router.get("/", async (req, res) => {
    const result = await getShortInterest();
    res.send(result);
});

//  Export the router
export default router;