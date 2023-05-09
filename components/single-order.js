"use strict";
import productsModel from "../models/products.js";
import ordersModel from "../models/orders.js";


export default class SingleOrder extends HTMLElement {
    static get observedAttributes() {
        return ["order"];
    }

    // En getter-funktion binder ett objekt till ett attribut i ett objekt eller klass i JavaScript.
    // När vi efterfrågar attributet anrops funktionen som sedan returnerar ett värde.
    //  Detta är anledningen till att vi kan skriva this.order.name istället för this.order()
    // och sedan hämta ut tex name-attributet från det objektet som returneras.
    get order() {
        return JSON.parse(this.getAttribute("order"));
    }
    /**
     * @method packOrder
     * @param {Array} orderIdAmountName
     * @description Updates the stock value of a selected product and updates
     * the status of a order to packed(if the stock adjustment is successful)
     */
    async packOrder(orderIdAmountName, order) {
        let stuffIsWorkingOk = 0;
        // console.log(orderIdAmountName);

        for (const val of orderIdAmountName) {
            let aProductFrStorage = await productsModel.getOneProduct(`${val[0]}`);
            var products = {
                id: val[0],
                name: val[2],
                stock: aProductFrStorage.stock - val[1]
            };
            const response = await productsModel.updateProduct(products);

            // console.log(response.status);
            stuffIsWorkingOk = response.status;
            if (response.status > 299) { break; }
        }

        // If everything above went ok(204) update the order status to 200
        if (stuffIsWorkingOk <= 204) {
            var currentOrder = {
                id: order.id,
                name: order.name,
                status_id: 200
            };
            const response = await ordersModel.updateOrderStatus(currentOrder);

            console.log("Response status:", response.status);
            this.remove();
        }
    }

    async connectedCallback() {
        let isStockedEnough = false;
        let container = document.createElement("div");

        container.classList.add("single-order-container");

        //
        //
        const orderIdAmountName = this.order.order_items.map((item) => {
            return [item.product_id, item.amount, item.name];
        });

        // Fetch all products.
        const result = await productsModel.getProducts();

        // Checks if the specified amount of products is available
        for (const idAmount of orderIdAmountName) {
            for (const x of result) {
                if (x.id === idAmount[0]) {
                    isStockedEnough = x.stock >= idAmount[1];
                    idAmount.push(x.stock >= idAmount[1]);
                    break;
                }
            }
        }
        for (const trueFalse of orderIdAmountName) {
            isStockedEnough = true;
            if (!trueFalse[3]) {
                isStockedEnough = false;
                break;
            }
        }
        //
        //

        const orderItems = this.order.order_items.map((item) => {
            return `
                <h3>${item.name}</h3>
                <h3>Id: ${item.product_id}</h3>

                <ul>
                    <li>Antal: ${item.amount}</li>
                    <li>Hyllplats: ${item.location}</li>
                </ul>`;
        }).join("");

        this.innerHTML = `<h4> ${this.order.name}</h4>`;
        container.innerHTML = `<div class="left">${orderItems}</div>`;
        this.appendChild(container);

        let packOrderButton = document.createElement("button");

        switch (isStockedEnough) {
            case true:
                packOrderButton.textContent = "Packa";
                packOrderButton.classList.add("button");
                break;
            default:
                packOrderButton.classList.add("hide-button");
                break;
        }



        packOrderButton.addEventListener("click", () => {
            this.packOrder(orderIdAmountName, this.order);
        });
        this.appendChild(packOrderButton);
        container.appendChild(packOrderButton);
    }
}
