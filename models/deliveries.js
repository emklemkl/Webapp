"use strict";
import { apiKey, baseURL } from "../utils.js";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${baseURL}/deliveries?api_key=${apiKey}`);
        const result = await response.json();
        // console.log(result.data);

        return result.data;
    },

    // getOneProduct: async function getOneProduct(productId) {
    //     const response = await fetch(`${baseURL}/deliveries/${productId}?api_key=${apiKey}`);
    //     const result = await response.json();

    //     return result.data;  
    // },

    // updateProduct: async function updateProduct(productObject) {
    //     const updatedProduct = {
    //         ...productObject,
    //         api_key: apiKey
    //     };

    //     const response = await fetch(`${baseURL}/deliveries`, {
    //         body: JSON.stringify(updatedProduct),
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         method: 'PUT'
    //     });

    //     return response;
    // }
};

export default deliveries;
