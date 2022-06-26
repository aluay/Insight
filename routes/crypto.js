import express from "express";
const router = express.Router();

import {
    crypto
} from "../controllers/cryptoController.js";

import {
    summary
} from "../controllers/stockController.js";
import {
    search
} from "../controllers/searchController.js";

//  Get top 200 cryptos
router.get("/", async (req, res) => {
    const result = await crypto();
    res.send(result);
})

//   This endpoint will get top 200 cryptos
router.get("/:crypto", async (req, res) => {
    const searchCrypto = await search(req.params.crypto);
    if (searchCrypto) {
        if (searchCrypto.quoteType.toLowerCase() === "cryptocurrency") {
            const result = await summary(searchCrypto.symbol);
            res.send(result);
        } else {
            res.send({
                Error: "Cryptocurrency not found"
            })
        }
    } else {
        res.send({
            Error: "Cryptocurrency not found"
        })
    }
});

//  Export the router
export default router;