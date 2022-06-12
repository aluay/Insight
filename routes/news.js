import express from "express";
import moment from "moment";
import fetch from "node-fetch";
import {
    parseString
} from "xml2js";

//  Router constant
const router = express.Router();

//  This endpoint loads up the general news (homepage)
router.get("/", async (req, res) => {
    //  RSS feed URLS to get news from
    const URLS = {
        "NBC News": "https://feeds.nbcnews.com/nbcnews/public/news",
        "Politico": "https://www.politico.com/rss/politicopicks.xml",
        "The New Yorker": "https://www.newyorker.com/feed/news",
        "The New York Times": "https://rss.nytimes.com/services/xml/rss/nyt/Politics.xml",
        "HuffPost": "http://www.huffingtonpost.com/feeds/verticals/politics/index.xml",
    };
    //  Constant to get raw news from RSS sources
    const rawNews = await getRawNews(URLS);
    //  Constant to get filtered news after constructing the object
    const filteredNews = await getFilteredNews(rawNews);

    //  Shuffle array elements so articles will not be in boring order
    for (let i = filteredNews.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = filteredNews[i];
        filteredNews[i] = filteredNews[j];
        filteredNews[j] = temp;
    }

    //  Serve filtered news
    res.send(filteredNews);
});


//  This endpoint loads up the business news
router.get("/business", async (req, res) => {
    //  RSS feed URLS to get news from
    const URLS = {
        "NBC News": "https://feeds.nbcnews.com/nbcnews/public/business",
        "The New York Times": "https://rss.nytimes.com/services/xml/rss/nyt/Business.xml",
        "HuffPost": "http://www.huffingtonpost.com/feeds/verticals/business/index.xml",
        "Fortune": "https://fortune.com/feed/fortune-feeds/?id=3230629",
        "Yahoo Finance": "https://finance.yahoo.com/news/rssindex",
        "The Wall Street Journal": "https://feeds.a.dj.com/rss/WSJcomUSBusiness.xml",
    };
    //  Constant to get raw news from RSS sources
    const rawNews = await getRawNews(URLS);
    //  Constant to get filtered news after constructing the object
    const filteredNews = await getFilteredNews(rawNews);

    //  Shuffle array elements so articles will not be in boring order
    for (let i = filteredNews.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = filteredNews[i];
        filteredNews[i] = filteredNews[j];
        filteredNews[j] = temp;
    }

    //  Serve filtered news
    res.send(filteredNews);
});


//  This endpoint loads up the health news
router.get("/health", async (req, res) => {
    //  RSS feed URLS to get news from
    const URLS = {
        "NBC News": "https://feeds.nbcnews.com/nbcnews/public/health",
        "The New York Times": "https://rss.nytimes.com/services/xml/rss/nyt/Health.xml",
        "Yahoo": "https://news.yahoo.com/rss/health",
    };
    //  Constant to get raw news from RSS sources
    const rawNews = await getRawNews(URLS);
    //  Constant to get filtered news after constructing the object
    const filteredNews = await getFilteredNews(rawNews);

    //  Shuffle array elements so articles will not be in boring order
    for (let i = filteredNews.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = filteredNews[i];
        filteredNews[i] = filteredNews[j];
        filteredNews[j] = temp;
    }

    //  Serve filtered news
    res.send(filteredNews);
});

//  Get news from RSS
async function getRawNews(URLS) {
    //  New empty array
    const rawNews = [];
    //  Loop through each RSS feed URL and grab the xml from it
    for (const url in URLS) {
        const response = await fetch(URLS[url]);
        //  Convert the response to text
        const body = await response.text();

        //  Parse RSS text and convert to JSON object
        parseString(body, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                //  Push the JSON object to the rawNews
                rawNews[url] = result.rss.channel[0].item;
            }
        });
    }
    //  Return rawNews - JSON object
    return rawNews;
}

async function getFilteredNews(rawNews) {
    //  New empty array
    let filteredNews = [];

    /* 
        Loop through each JSON object and extract info from it
        This for loop will look for certain object keys and will
        extract info based on the keys it finds since each news
        source uses different terminology for media content
        The loop for look look for the media and parse the info
        from the object based on the media content object key
        This for loop will also handle time/date formats if the
        source is using a different time/date format than usual


        *****This loop can definitely be cleaned up*****
    */
    for (let i in rawNews) {
        //  5 is the number of articles to extract from each source
        for (let j = 0; j < 10; j++) {
            //  If the media object key is called "media:thumbnail"
            if (rawNews[i][j].hasOwnProperty("media:thumbnail")) {
                for (const item in rawNews[i][j]["media:thumbnail"]) {
                    if (rawNews[i][j]["media:thumbnail"][item]["$"]) {
                        let pubDate = "";
                        //  Handle time/date formats
                        if (rawNews[i][j]["pubDate"] == null) {
                            pubDate = new Date();
                            var dd = String(pubDate.getDate()).padStart(2, '0');
                            var mm = String(pubDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = pubDate.getFullYear();

                            pubDate = mm + '/' + dd + '/' + yyyy;
                        } else {
                            pubDate = new Date(rawNews[i][j]["pubDate"]);
                        }
                        //  Construct the filtered news object
                        filteredNews.push({
                            title: rawNews[i][j]["title"],
                            link: rawNews[i][j]["link"],
                            pubDate: moment.utc(pubDate.toLocaleString()).fromNow(),
                            source: i,
                            description: rawNews[i][j]["description"],
                            media: rawNews[i][j]["media:thumbnail"][item]["$"].url
                        });
                    }
                }
            }
            //  If the media object key is called "enclosure"
            else if (rawNews[i][j].hasOwnProperty("enclosure")) {
                for (const item in rawNews[i][j]["enclosure"]) {
                    if (rawNews[i][j]["enclosure"][item]["$"]) {
                        let pubDate = "";
                        //  Handle time/date formats
                        if (rawNews[i][j]["pubDate"] == null) {
                            pubDate = new Date();
                            var dd = String(pubDate.getDate()).padStart(2, '0');
                            var mm = String(pubDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = pubDate.getFullYear();

                            pubDate = mm + '/' + dd + '/' + yyyy;
                        } else {
                            pubDate = new Date(rawNews[i][j]["pubDate"]);
                        }
                        //  Construct the filtered news object
                        filteredNews.push({
                            title: rawNews[i][j]["title"],
                            link: rawNews[i][j]["link"],
                            pubDate: moment.utc(pubDate.toLocaleString()).fromNow(),
                            source: i,
                            description: rawNews[i][j]["description"],
                            media: rawNews[i][j]["enclosure"][item]["$"].url
                        });
                    }
                }
            }
            //  If the media object key is called "media:group"
            else if (rawNews[i][j].hasOwnProperty("media:group")) {
                for (const item in rawNews[i][j]["media:group"]) {
                    if (rawNews[i][j]["media:group"][item]["media:content"][2]["$"]) {
                        let pubDate = "";
                        //  Handle time/date formats
                        if (rawNews[i][j]["pubDate"] == null) {
                            pubDate = new Date();
                            var dd = String(pubDate.getDate()).padStart(2, '0');
                            var mm = String(pubDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = pubDate.getFullYear();

                            pubDate = mm + '/' + dd + '/' + yyyy;
                        } else {
                            pubDate = new Date(rawNews[i][j]["pubDate"]);
                        }
                        //  Construct the filtered news object
                        filteredNews.push({
                            title: rawNews[i][j]["title"],
                            link: rawNews[i][j]["link"],
                            pubDate: moment.utc(pubDate.toLocaleString()).fromNow(),
                            source: i,
                            description: rawNews[i][j]["description"],
                            media: rawNews[i][j]["media:group"][item]["media:content"][2]["$"].url
                        });
                    }
                }
            }
            //  If the media object key is called "media:content"
            else if (rawNews[i][j].hasOwnProperty("media:content")) {
                for (const item in rawNews[i][j]["media:content"]) {
                    if (rawNews[i][j]["media:content"][item]["$"]) {
                        let pubDate = "";
                        //  Handle time/date formats
                        if (rawNews[i][j]["pubDate"] == null) {
                            pubDate = new Date();
                            var dd = String(pubDate.getDate()).padStart(2, '0');
                            var mm = String(pubDate.getMonth() + 1).padStart(2, '0'); //January is 0!
                            var yyyy = pubDate.getFullYear();

                            pubDate = mm + '/' + dd + '/' + yyyy;
                        } else {
                            pubDate = new Date(rawNews[i][j]["pubDate"]);
                        }
                        //  Construct the filtered news object
                        filteredNews.push({
                            title: rawNews[i][j]["title"],
                            link: rawNews[i][j]["link"],
                            pubDate: moment.utc(pubDate.toLocaleString()).fromNow(),
                            source: i,
                            description: rawNews[i][j]["description"],
                            media: rawNews[i][j]["media:content"][item]["$"].url
                        });
                    }
                }
            }
        }
    }
    //  Return filtered news object
    return filteredNews;
}

//  Export router
export default router;