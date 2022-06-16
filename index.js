import express from "express";

//	Import routes
import asset from "./routes/asset.js"
import crypto from "./routes/crypto.js"
import news from "./routes/news.js";
import snapshot from "./routes/snapshot.js";

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
app.use("/asset", asset); //   Handle asset informtion retrevial
app.use("/crypto", crypto); //   Cryptocurrencies ordered in descending order by intraday marketcap
app.use("/news", news); //  U.S. news endpoint
app.use("/snapshot", snapshot); //	Market snapshot endpoint


//	Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});