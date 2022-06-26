import fetch from "node-fetch";

//  Get top 200 cryptos
export async function crypto() {
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