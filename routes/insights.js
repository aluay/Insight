import express from "express";
import fetch from "node-fetch";
const router = express.Router();

//   This endpoint will get insights of a company or stock
router.get("/:keyword", async (req, res) => {
    const result = await search(req.params.keyword);
    res.send(result);
});

//  Get insights of a company or stock
async function search(keyword) {
    const URL = `https://query2.finance.yahoo.com/ws/insights/v2/finance/insights?symbol=${keyword}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        if (data) {
            return data;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

//  Export the router
export default router;