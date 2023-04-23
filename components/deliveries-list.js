"use strict";
import deliveriesModel from "../models/deliveries.js";

// Exports. ProductList'ärver' eller förlänger funktionen av HTMLElement
export default class DeliveriesList extends HTMLElement {
    constructor() {
        super();
        this.deliveries = [];
    }

    async connectedCallback() {
        this.deliveries = await deliveriesModel.getDeliveries();
        console.log(this.deliveries);
        this.render();
    }
    render() {

        /**
         * Skapa singel-deliveries 
         */
        this.innerHTML = `<h2>Inleveranser</h2><a href='#deliveries-form' class="button">Ny leverans</a>`;
    }
}
