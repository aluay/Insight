import fetch from "node-fetch";
import HtmlTableToJson from "html-table-to-json";

//  Get short interest data
export async function getAllShortInterest() {
    const URL = `https://www.stockgrid.io/get_short_interest`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//  Get short interest data
export async function getHighestShortInterest() {
    const URL = `https://www.highshortinterest.com`;
    let highestShortInterest = [];
    const response = await fetch(URL);
    if (response) {
        const data = await response.text();
        const jsonTable = HtmlTableToJson.parse(data)
        for (let i = 0; i < jsonTable._results[2].length; i++) {
            if (jsonTable._results[2][i].Ticker &&
                jsonTable._results[2][i].Company &&
                jsonTable._results[2][i].Exchange &&
                jsonTable._results[2][i].ShortInt &&
                jsonTable._results[2][i].Float &&
                jsonTable._results[2][i].Outstd &&
                jsonTable._results[2][i].Industry) {
                highestShortInterest.push({
                    Ticker: jsonTable._results[2][i].Ticker,
                    Company: jsonTable._results[2][i].Company,
                    Exchange: jsonTable._results[2][i].Exchange,
                    ShortInt: jsonTable._results[2][i].ShortInt,
                    Float: jsonTable._results[2][i].Float,
                    Outstd: jsonTable._results[2][i].Outstd,
                    Industry: jsonTable._results[2][i].Industry
                })
            }
        }
        return highestShortInterest;
    } else {
        return null;
    }
}