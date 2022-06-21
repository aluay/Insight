import fetch from "node-fetch";

//  Get darkpools data
export async function getDarkpools() {
    const URL = `https://www.stockgrid.io/get_dark_pool_data?top=Dark Pools Position $&minmax=desc`;
    const response = await fetch(URL);
    if (response) {
        const data = await response.json();
        return data;
    } else {
        return null;
    }
}