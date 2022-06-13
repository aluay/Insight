import express from "express";

//	Import routes
import news from "./routes/news.js";
import snapshot from "./routes/snapshot.js";
import search from "./routes/search.js";
import insights from "./routes/insights.js"

//	Constants
const app = express();
const PORT = process.env.PORT || 5000;

//	Home page
app.get("/", async (req, res) => {
    res.send({
        "/news": "General U.S. news",
        "/news/business": "Business U.S. news",
        "/news/health": "Health U.S. news",
        "/news/[keyword]": "Top 10 news articles about a company or stock",
        "/snapshot": "Market snapshot",
        "/snapshot/gainers": "Top 5 daily market gainers",
        "/snapshot/losers": "Top 5 daily market losers",
        "/snapshot/mostActive": "Top 5 most active symbols",
        "/snapshot/trendingSymbols": "Top 5 most trending symbols",
        "/snapshot/marketTime": "Market time status information",
        "/snapshot/marketSummary": "Market summary with indicators",
        "/insights/[symbol]": "Get insights of a company or a stock"
    });
});

//	Endpoints
app.use("/news", news); //  U.S. news endpoint
app.use("/snapshot", snapshot); //	Market snapshot endpoint
app.use("/search", search); //   Return all matching companies or symbols for a keyword
app.use("/insights", insights); //   Get insights of a company or stock


//	Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});