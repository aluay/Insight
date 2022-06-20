import express from "express";
const router = express.Router();

import {
    getGeneralNews,
    getBusinessNews,
    getHealthNews
} from "../controllers/newsController.js";

//  This route loads up the general news (homepage)
router.get("/", async (req, res) => {
    const news = await getGeneralNews();
    res.send(news);
});

//  This route loads up the business news
router.get("/business", async (req, res) => {
    const news = await getBusinessNews();
    res.send(news);
});

//  This route loads up the health news
router.get("/health", async (req, res) => {
    const news = await getHealthNews();
    res.send(news);
});

//  Export router
export default router;