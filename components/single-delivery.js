"use strict";
import deliveriesModel from "../models/deliveries.js";

// Exports. ProductList'ärver' eller förlänger funktionen av HTMLElement
export default class DeliveriesList extends HTMLElement {
    static get observedAttributes() {
        return ["delivery"];
    }

    get delivery() {
        return JSON.parse(this.getAttribute("delivery"));
    }

    async connectedCallback() {
        this.deliveries = await deliveriesModel.getDeliveries();

        for (const val of this.deliveries.toReversed()) {
            this.innerHTML += `
            <div class="single-wrapper">
            <div class="deliveries-wrapper">
            <h3>${val.product_name}</h3>
            <p>Leverans-id: ${val.id}</p>
            <p>Antal: ${val.amount}</p>
            <p>Datum: ${val.delivery_date}</p>
            <p>Kommentar: ${val.comment}</p>
            </div>`;
        }
        if (!this.innerHTML) {
            this.innerHTML = `<p class="missing-data">Inga inleveranser registrerade</p>`;
        }
        this.innerHTML += `<div class="make-space-button-sticky"></div>`;
    }
}
{/* <div class="single-wrapper">
 */}
