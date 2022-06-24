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

//  Get short interest data for a specific asset
export async function getShortInterestForAsset(asset) {
    const URL = `https://www.stockgrid.io/get_dark_pool_individual_data?ticker=${asset.toUpperCase()}`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}