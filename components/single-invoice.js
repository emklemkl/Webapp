"use strict";
import invoicesModel from "../models/invoices.js";

// Exports. ProductList'ärver' eller förlänger funktionen av HTMLElement
export default class DeliveriesList extends HTMLElement {
    static get observedAttributes() {
        return ["invoices"];
    }

    get delivery() {
        return JSON.parse(this.getAttribute("invoices"));
    }

    async connectedCallback() {
        this.invoices = await invoicesModel.getInvoices();

        for (const val of this.invoices) {
            this.innerHTML += `
            <div class="single-wrapper">
            <div class="deliveries-wrapper">
            <h3>${val.name}</h3>
            <p>id: ${val.id}</p>
            <p>"creation_date": "2-5-2023 15:13": ${val.creation_date}</p>
            <p>total_price: ${val.total_price}</p>
            </div>`;
        }
        if (!this.innerHTML) {
            this.innerHTML = `<p class="missing-data">Inga fakturor registrerade</p>`;
        }
        this.innerHTML += `<div class="make-space-button-sticky"></div>`;
    }
}
{/* <div class="single-wrapper">
 */}
