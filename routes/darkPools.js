import express from "express";
const router = express.Router();

import {
    getDarkpools,
    getDarkpoolsForAsset
} from "../controllers/darkpoolsController.js";

//  This route will get list of darkpools
router.get("/list", async (req, res) => {
    res.sendFile('darkpoolslist.html', {
        root: "./views"
    });
});

//  This route will get darkpools data
router.get("/data", async (req, res) => {
    const result = await getDarkpools();
    res.send(result);
});

//  This route will get darkpools data for a specific asset
router.get("/:asset", async (req, res) => {
    const result = await getDarkpoolsForAsset(req.params.asset);
    res.send(result);
});

//  Export the router
export default router;