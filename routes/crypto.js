import express from "express";
import fetch from "node-fetch";
const router = express.Router();

//   This endpoint will get top 200 cryptos
router.get("/", async (req, res) => {
    const result = await crypto();
    res.send(result);
});

// router.get("/:count", async(req, res)=>{
//     // res.send(req.params.count)
//     const result = await crypto(req.params.count);
//     res.send(result);
// })

//  Get top 50 cryptos
async function crypto() {
    const URL = `https://query1.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=true&lang=en-US&region=US&scrIds=all_cryptocurrencies_us&start=0&count=200&corsDomain=finance.yahoo.com`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        if (data.finance.result[0].quotes) {
            return data.finance.result[0].quotes
        } else {
            return null;
        }
    } else {
        return null;
    }
}

//  Export the router
export default router;