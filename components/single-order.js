"use strict";
import {fetchFromApi, apiKey, baseURL} from '../utils.js';

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

        for (const val of orderIdAmountName) {
            let aProductFrStorage = await fetchFromApi(`products/${val[0]}`);
            var products = {
                id: val[0],
                name: val[2],
                api_key: apiKey,
                stock: aProductFrStorage.data.stock - val[1]
            };
            const response = await fetch(`${baseURL}/products`, {
                body: JSON.stringify(products),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });

            console.log(response.status);
            stuffIsWorkingOk = response.status;
            if (response.status != 204) { break; }
        }

        // If everything above went ok(204) update the order status to 200
        if (stuffIsWorkingOk === 204) {
            var currentOrder = {
                id: order.id,
                name: order.name,
                api_key: apiKey,
                status_id: 200
            };
            const response = await fetch(`${baseURL}/orders`, {
                body: JSON.stringify(currentOrder),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'PUT'
            });

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
            console.log(item.name);
            return [item.product_id, item.amount, item.name];
        });

        // Fetch all products.
        // __FIX__ would have been better to fetch only the specified product
        // instead of all __FIX__
        const result = await fetchFromApi("products");

        // Checks if the specified amount of products is available
        for (const idAmount of orderIdAmountName) {
            for (const x of result.data) {
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
