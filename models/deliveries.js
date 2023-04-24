"use strict";

import { apiKey, baseURL } from "../utils.js";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${baseURL}/deliveries?api_key=${apiKey}`);
        const result = await response.json();

        return result.data;
    },

    /**
     * @function addDelivery
     * @param {object} newDeliveryData
     * @returns Status of request (Int)
     */
    addDelivery: async function addDelivery(newDeliveryData) {
        const newDelivery = {
            product_id: newDeliveryData.product_id,
            amount: newDeliveryData.current_stock + newDeliveryData.amount,
            delivery_date: newDeliveryData.date,
            comment:  newDeliveryData.comment,
            api_key: apiKey
        };

        const response = await fetch(`${baseURL}/deliveries`, {
            body: JSON.stringify(newDelivery),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        return response.status;
    }
};

export default deliveries;
