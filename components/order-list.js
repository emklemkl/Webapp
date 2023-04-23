"use strict";
import ordersModel from "../models/orders.js";
// Exports. ProductList'ärver' eller förlänger funktionen av HTMLElement
export default class OrderList extends HTMLElement {
    constructor() {
        super();
        this.orders = [];
    }

    async connectedCallback() {
        const result = await ordersModel.getOrders();
        let isStatus100 = function(status) {
            return status.status_id === 100;
        };

        this.orders = result.filter(isStatus100);

        this.render();
    }

    render() {
        const list = this.orders.map((order) => `
        <div class="single-wrapper"><single-order order='${JSON.stringify(order)}'>
        </single-order></div>`).join("");

        this.innerHTML = `<h2>Orderlista</h2>${list}`;
    }
}
