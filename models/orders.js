"use strict";
import { apiKey, baseURL } from "./../utils.js";


const orders = {
    getOrders: async function getProducts() {
        const response = await fetch(`${baseURL}/orders?api_key=${apiKey}`);
        const result = await response.json();
        // console.log(result.data);

        return result.data;
    },

    /**
     * @function updateOrderStatus
     * @param {object} orderData Takes order Id, name and new status (200 etc)
     * @returns response status
     */
    updateOrderStatus: async function updateOrderStatus(orderData) {
        const order = {
            ...orderData,
            api_key: apiKey
        };
        const response = await fetch(`${baseURL}/orders`, {
            body: JSON.stringify(order),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });

        return response.status;
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

export default orders;
