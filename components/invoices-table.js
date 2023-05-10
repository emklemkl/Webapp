"use strict";
import invoices from "../models/invoices.js";

// Exports, LagerTitle 'ärver' eller förlänger funktionen av HTMLElement
export default class InvoicesTable extends HTMLElement {
    constructor() {
        super();
        this.invoices = [];
    }
    async connectedCallback() {
        this.invoices = await invoices.getInvoices();
        let table =  ``;

        table += `<table class='table'>
            <tr>        
                <th>Namn</th>
                <th>Order-id</th>
                <th>Pris</th>
                <th>Förfallodatum</th>
                <th>Faktura skapad</th>
            </tr>`;
        let counter = 0;

        for (const val of this.invoices) {
            table +=  `<tr>
                <td>${val.name}</td>`;
            table += `<td class="number-cell">${val.order_id}</td>`;
            table += `<td class="number-cell">${val.total_price}</td>`;
            table += `<td class="number-cell">${val.due_date}</td>`;
            table += `<td class="number-cell">${val.creation_date}</td>
                </tr>`;
            counter++;
        }
        table += "</table>";

        if (counter === 0) {
            table = "<p class='missing-data'>Inga fakturor skapade</p>";
        }
        table +=  `
            <a href='#new-invoice' class="button wide-button">Ny faktura</a>
            <div class="single-wrapper">
            </div>`;
        this.innerHTML = `<h2>Fakturor</h2> ${table}`;
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
