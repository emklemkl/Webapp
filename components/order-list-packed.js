"use strict";
import ordersModel from "../models/orders.js";
// Exports. ProductList'ärver' eller förlänger funktionen av HTMLElement
export default class OrderList extends HTMLElement {
    constructor() {
        super();
        this.orders = [];
    }

    /**
     * @function mirroredScreen
     * @description Reverses the horizontal view
     */
    mirroredScreen() {
        const cont = document.getElementsByClassName("single-order-container");

        for (const sc of cont) {
            if (sc.style.flexDirection === "row-reverse") {
                sc.style.flexDirection = "row";
            } else {
                sc.style.flexDirection = "row-reverse";
            }
        }
    }

    async connectedCallback() {
        const result = await ordersModel.getOrders();
        let isStatus200 = function(status) {
            return status.status_id >= 200;
        };

        this.orders = result.filter(isStatus200);

        this.render();
    }

    render() {

        
        const list = this.orders.map((order) => {
            return `<div class="single-wrapper"><a href="#map/${order.id}"><p class="p-order-packed">${order.name} <br> Order-id:${order.id} (${order.status})</p></a></div>`
        }).join("");
        this.innerHTML = `<h2>Packade ordrar</h2>${list}`;
    }
}
