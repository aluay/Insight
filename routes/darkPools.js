import express from "express";
const router = express.Router();

import {
    getDarkpools
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

//  Export the router
export default router;