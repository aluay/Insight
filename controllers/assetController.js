import fetch from "node-fetch";

//  Get the top 10 articles related to the stock/company
export async function news(asset) {
    const URL = `https://query2.finance.yahoo.com/v1/finance/search?q=${asset}&lang=en-US&region=US&quotesCount=6&newsCount=10&listsCount=2&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data.news;
    } else {
        return null;
    }
}

//  Get insights 
export async function insights(asset) {
    const URL = `https://query2.finance.yahoo.com/ws/insights/v2/finance/insights?symbol=${asset}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data.finance.result;
    } else {
        return null;
    }
}

//  Get full summary 
export async function summary(asset) {
    const URL = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${asset}?modules=assetProfile%2CsummaryProfile%2CsummaryDetail%2CesgScores%2Cprice%2CincomeStatementHistory%2CincomeStatementHistoryQuarterly%2CbalanceSheetHistory%2CbalanceSheetHistoryQuarterly%2CcashflowStatementHistory%2CcashflowStatementHistoryQuarterly%2CdefaultKeyStatistics%2CfinancialData%2CcalendarEvents%2CsecFilings%2CrecommendationTrend%2CupgradeDowngradeHistory%2CinstitutionOwnership%2CfundOwnership%2CmajorDirectHolders%2CmajorHoldersBreakdown%2CinsiderTransactions%2CinsiderHolders%2CnetSharePurchaseActivity%2Cearnings%2CearningsHistory%2CearningsTrend%2CindustryTrend%2CindexTrend%2CsectorTrend`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data.quoteSummary.result[0];
    } else {
        return null;
    }
}

//   This route will get specific section of the summary 
export async function section(asset, modules) {
    const URL = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${asset}?modules=${modules}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data.quoteSummary.result[0];
    } else {
        return null;
    }
}

//  Get options 
export async function options(asset) {
    const URL = `https://query2.finance.yahoo.com/v7/finance/options/${asset}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data.optionChain.result[0];
    } else {
        return null;
    }
}

//  Get chart data 
export async function chart(asset) {
    const URL = `https://query1.finance.yahoo.com/v7/finance/chart/${asset}?range=2y&interval=1d&indicators=quote&includeTimestamps=true`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data.chart.result[0];
    } else {
        return null;
    }
}

//  Get darkpools data for a specific asset
export async function darkpools(asset) {
    const URL = `https://www.stockgrid.io/get_dark_pool_individual_data?ticker=${asset.toUpperCase()}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}