"use strict";
import invoices from "../models/invoices.js";

import orders from "../models/orders.js"
// Exports, LagerTitle 'ärver' eller förlänger funktionen av HTMLElement
export default class InvoicesTable extends HTMLElement {
    constructor() {
        super();
        this.invoices = [];
    }
    async connectedCallback() {
        this.invoices = await invoices.getInvoices();
        console.log(this.invoices);
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


        this.innerHTML +=  `<h2>Fakturor</h2>
            <a href='#new-invoice' class="button wide-button">Ny faktura</a>
            <div class="single-wrapper">
            </div>`;
    }
}

        // // Returnerar dem array med attribut som ska observeras
        // static get observedAttributes() {
        //     return ["name"];
        // }
    
        // Ändrar instansvariabel om det finns ett nytt värde
        // attributeChangedCallback(property, oldValue, newValue) {
        //     if (oldValue === newValue) {
        //         return;
        //     }
    
        //     this[property] = newValue;
        // }
    
        // async connectedCallback() {
        //     let allOrders = await orders.getOrders();
        //     console.log(allOrders);
        //     this.innerHTML =  `<h2>Fakturor</h2>
        //     <a href='#new-invoice' class="button wide-button">Ny faktura</a>
        //     <div class="single-wrapper">
        //     </div>`;
        // }