import express from "express";

//	Import routes
import news from "./routes/news.js";
import snapshot from "./routes/snapshot.js";
import search from "./routes/search.js";
import insights from "./routes/insights.js"
import crypto from "./routes/crypto.js"

//	Constants
const app = express();
const PORT = process.env.PORT || 3000;

//	Home page
app.get("/", async (req, res) => {
    res.sendFile('home.html', {
        root: "./views"
    });
});

//	Endpoints
app.use("/news", news); //  U.S. news endpoint
app.use("/snapshot", snapshot); //	Market snapshot endpoint
app.use("/search", search); //   Return all matching companies or symbols for a keyword
app.use("/insights", insights); //   Get insights of a company or stock
app.use("/crypto", crypto); //   Cryptocurrencies ordered in descending order by intraday marketcap


//	Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});