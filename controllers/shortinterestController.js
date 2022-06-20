import fetch from "node-fetch";

//  Get darkpools data
export async function getShortInterest() {
    const URL = `https://www.stockgrid.io/get_short_interest?top=float`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}

//  Get darkpools data for a specific asset
export async function getDarkpoolsForAsset(asset) {
    const URL = `https://www.stockgrid.io/get_dark_pool_individual_data?ticker=${asset.toUpperCase()}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}