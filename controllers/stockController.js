import fetch from "node-fetch";
import HtmlTableToJson from "html-table-to-json";

//  Get the top 10 articles related to the stock/company
export async function getNews(stock) {
    let news = [];
    const URL = `https://www.barrons.com/market-data/api/millstone?ticker=${stock}&PAGE={%22renderTab%22:%22%22,%22assetType%22:%22stock%22,%22analyticsValue%22:%22stockoverview%22}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        if (data) {
            for (let i = 0; i < data.props.newsCard.tabs[1].blocks[0].blocks.length; i++) {
                news.push({
                    title: data.props.newsCard.tabs[1].blocks[0].blocks[i].headline,
                    summary: data.props.newsCard.tabs[1].blocks[0].blocks[i].summary,
                    url: data.props.newsCard.tabs[1].blocks[0].blocks[i].url,
                    pubTime: data.props.newsCard.tabs[1].blocks[0].blocks[i].timestampUtc.formatted,
                    media: data.props.newsCard.tabs[1].blocks[0].blocks[i].images[0],
                    source: data.props.newsCard.tabs[1].blocks[0].blocks[i].provider
                })
            }
        }
        return news;
    } else {
        return null;
    }
}

//  Get insights 
export async function getInsights(stock) {
    const URL = `https://query2.finance.yahoo.com/ws/insights/v2/finance/insights?symbol=${stock}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data.finance.result;
    } else {
        return null;
    }
}

//  Get full summary 
export async function getSummary(stock) {
    const URL = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${stock}?modules=assetProfile%2CsummaryProfile%2CsummaryDetail%2CesgScores%2Cprice%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly%2CcashflowStatementHistory%2CcashflowStatementHistoryQuarterly%2CdefaultKeyStatistics%2CfinancialData%2CcalendarEvents%2CsecFilings%2CrecommendationTrend%2CupgradeDowngradeHistory%2CinstitutionOwnership%2CfundOwnership%2CmajorDirectHolders%2CmajorHoldersBreakdown%2CinsiderTransactions%2CinsiderHolders%2CnetSharePurchaseActivity%2Cearnings%2CearningsHistory%2CearningsTrend%2CindustryTrend%2CindexTrend%2CsectorTrend`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data.quoteSummary.result[0];
    } else {
        return null;
    }
}

//   This route will get specific section of the summary 
export async function getModules(stock, modules) {
    const URL = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${stock}?modules=${modules}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//  Get options 
export async function getOptions(stock) {
    const URL = `https://query2.finance.yahoo.com/v7/finance/options/${stock}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//  Get chart data 
export async function getChart(stock) {
    const URL = `https://query1.finance.yahoo.com/v7/finance/chart/${stock}?range=2y&interval=1d&indicators=quote&includeTimestamps=true`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//  Get darkpools data for a specific stock
export async function getDarkpools(stock) {
    const URL = `https://www.stockgrid.io/get_dark_pool_individual_data?ticker=${stock.toUpperCase()}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//  Get borrow rates and availability data for a specific stock
export async function getBorrow(stock) {
    const URL = `https://iborrowdesk.com/api/ticker/${stock.toUpperCase()}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//  Get short interest data for a specific stock
export async function getShortInterest(stock) {
    const URL = `https://www.stockgrid.io/get_dark_pool_individual_data?ticker=${stock.toUpperCase()}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//  This route will get bid/ask data for a specific stock
export async function getBook(stock) {
    const URL = `https://www.cboe.com/json/bzx/book/${stock.toUpperCase()}`;
    const response = await fetch(URL, {
        "referrer": "https://www.cboe.com",
    });
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//  This route will get exchange data for a specific stock
export async function getExchangeVolume(stock) {
    const URL = `https://chartexchange.com/symbol/${stock}/exchange-volume/`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.text();
        const jsonTable = HtmlTableToJson.parse(data);
        for (let i = 0; i < jsonTable._results[1].length; i++) {
            //  There is a superscript "1" at the end of the "Off exchange" table element
            //  so this removes the "1" for a cleaner look
            if (jsonTable._results[1][i].Exchange === "Off Exchange1") {
                jsonTable._results[1][i].Exchange = "Off Exchange";
            }
        }
        return jsonTable._results[1];
    } else {
        return null;
    }
}

//  This route will get Fails-to-Deliver (FTDs) data for a specific stock
export async function getFailsToDeliver(stock) {
    const URL = `https://fintel.io/sftd/us/${stock}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.text();
        const jsonTable = HtmlTableToJson.parse(data);
        return jsonTable._results[1];
    } else {
        return null;
    }
}

//  This router will get sentiment analysis score about a specific stock
export async function getSentimentAnalysis(stock) {
    const response = await fetch(`https://socialsentiment.io/stocks/symbol/${stock}/sentiment/?period=day&start=-14&end=`, {
        "headers": {
            "X-Requested-With": "XMLHttpRequest",
        },
    });
    if (response) {
        const data = await response.json();
        return data.data;
    } else {
        return null;
    }
}