import express from "express";
const router = express.Router();

import {
    getAllShortInterest,
    getHighestShortInterest,
} from "../controllers/shortinterestController.js";

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

//  Export the router
export default router;