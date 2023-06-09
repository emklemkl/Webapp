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

        this.innerHTML = `<div id="mirror"><h2>Orderlista ⇄</i></h2></div>${list}`;
        document.getElementById("mirror").addEventListener("click", this.mirroredScreen);
    }
}
