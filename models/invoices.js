"use strict";
import { apiKey, baseURL } from "./../utils.js";
import authModel from "../models/auth.js";


const invoices = {
    /**
     * @function updateOrderStatus
     * @param {object} orderData Takes order Id, name and new status (200 etc)
     * @returns response status
     */
    addInvoice: async function addInvoice(invoiceData) {
        const invoice = {
            ...invoiceData,
            api_key: apiKey
        };
        console.log(authModel.token);
        const response = await fetch(`${baseURL}/invoices`, {
            body: JSON.stringify(invoice),
            headers: {
                'content-type': 'application/json',
                'x-access-token': authModel.token
            },
            method: 'POST'
        });

        return response.status;
    },

    getInvoices: async function getInvoices() {

        const response = await fetch(`${baseURL}/invoices?api_key=${apiKey}`, {
            headers: {
                'content-type': 'application/json',
                'x-access-token': authModel.token
            },
            method: 'GET'
        });
        const result = await response.json();
        return result.data;
    }
};

export default invoices;
