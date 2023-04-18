"use strict";
import {apiKey, baseURL} from '../utils.js';
// Exports. ProductList'ärver' eller förlänger funktionen av HTMLElement
export default class OrderList extends HTMLElement {
    constructor() {
        super();
        this.orders = [];
    }

    async connectedCallback() {
        const response = await fetch(`${baseURL}/orders?api_key=${apiKey}`);
        const result = await response.json();

        let isStatus100 = function(status) {
            return status.status_id === 100;
        };

        this.orders = result.data.filter(isStatus100);

        this.render();
    }

    render() {
        const list = this.orders.map((order) => `
        <div class="single-wrapper"><single-order order='${JSON.stringify(order)}'>
        </single-order></div>`).join("");

        this.innerHTML = `<h2>Orderlista</h2>${list}`;
    }
}
