import express from "express";
import fetch from "node-fetch";
const router = express.Router();

//   this endpoint will search for all matches based on keyword
router.get("/:keyword", async (req, res) => {
    const result = await search(req.params.keyword);
    res.send(result);
});

//   Search for all matches based on keyword
async function search(keyword) {
    const URL = `https://query2.finance.yahoo.com/v1/finance/search?q=${keyword}&lang=en-US&region=US&quotesCount=6&newsCount=2&listsCount=2&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        if (data.quotes) {
            return data.quotes;
        } else {
            return null;
        }
    } else {
        return null;
    }
}

//  Export the router
export default router;