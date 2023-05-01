"use strict";
import orders from "../models/orders.js"
// Exports, LagerTitle 'ärver' eller förlänger funktionen av HTMLElement
export default class InvoicesTable extends HTMLElement {
    constructor() {
        super();
        this.invoices = [];
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

    async connectedCallback() {
        let allOrders = await orders.getOrders();
        console.log(allOrders);
        this.innerHTML =  `<h2>Fakturor</h2>
        <a href='#new-invoice' class="button wide-button">Ny faktura</a>
        <div class="single-wrapper">
        </div>`;
    }
}
