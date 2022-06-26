import fetch from "node-fetch";

//  Get short interest data
export async function getShortInterest() {
    const URL = `https://www.stockgrid.io/get_short_interest`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//  Get short interest data for a specific stock
export async function getShortInterestForstock(stock) {
    const URL = `https://www.stockgrid.io/get_dark_pool_individual_data?ticker=${stock.toUpperCase()}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}