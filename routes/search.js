import express from "express";
const router = express.Router();

import {search} from "../controllers/searchController.js";

//   this endpoint will search for all matches based on keyword
router.get("/:asset", async (req, res) => {
    const result = await search(req.params.asset);
    res.send(result);
});

//  Export the router
export default router;