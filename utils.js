"use strict";
const apiKey = "47b860ec87d2d1b8dbc6a137bb81f0c0";
const baseURL = "https://lager.emilfolino.se/v2";

async function fetchFromApi(pathname) {
    const response = await fetch(`${baseURL}/${pathname}?api_key=${apiKey}`);
    const result = await response.json();

    return result;
}
export {apiKey, baseURL, fetchFromApi};
