"use strict";
import { apiKey, baseURL } from "./../utils.js";

const products = {
    getProducts: async function getProducts() {
        const response = await fetch(`${baseURL}/products?api_key=${apiKey}`);
        const result = await response.json();
        // console.log(result.data);

        return result.data;
    },

    getOneProduct: async function getOneProduct(productId) {
        const response = await fetch(`${baseURL}/products/${productId}?api_key=${apiKey}`);
        const result = await response.json();

        return result.data;
    },

    updateProduct: async function updateProduct(productObject) {
        const updatedProduct = {
            ...productObject,
            api_key: apiKey
        };

        const response = await fetch(`${baseURL}/products`, {
            body: JSON.stringify(updatedProduct),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });

        return response;
    }
};

export default products;
