import fetch from "node-fetch";

//   Search for all matches based on keyword
export async function search(asset) {
    const URL = `https://query2.finance.yahoo.com/v1/finance/search?q=${asset}&lang=en-US&region=US&quotesCount=6&newsCount=0&listsCount=0&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        if (data) {
            return data.quotes[0];
        } else {
            return null;
        }
    } else {
        return null;
    }
}