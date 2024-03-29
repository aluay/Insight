import express from "express";

//	Import routes
import stock from "./routes/stock.js"
import crypto from "./routes/crypto.js"
import news from "./routes/news.js";
import search from "./routes/search.js";
import snapshot from "./routes/snapshot.js";
import darkPools from "./routes/darkPools.js";
import shortInterest from "./routes/shortInterest.js";
//	Constants
const app = express();
const PORT = process.env.PORT || 3000;

//	Home page
app.get("/", async (req, res) => {
    res.sendFile('home.html', {
        root: "./views"
    });
});

//	Routes
app.use("/stock", stock); //   Stock route
app.use("/crypto", crypto); // Crypto route
app.use("/news", news); //  News route
app.use("/search", search); //  Search stocks
app.use("/snapshot", snapshot); //  snapshot route
app.use("/darkpools", darkPools); //    Dark pools data
app.use("/shortinterest", shortInterest); //    Short interest data

//	Server listener
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});