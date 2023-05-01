"use strict";
import authModel from "../models/auth.js";
import orders from "../models/orders.js";
import {toast} from "../utils.js";

export default class NewInvoice extends HTMLElement {
    constructor() {
        super();

        this.credentials = {};
    }

    createInvoice() {
        let today = new Date();
        let invoiceCreated = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} `
        invoiceCreated += `${today.getHours()}:${today.getMinutes()}`
        console.log(invoiceCreated);

    }

    async connectedCallback() {

        /**
         * Get all orders
         */
        let allOrders = await orders.getOrders();
        console.log(allOrders);
        /**
         * Form
         */
        let form = document.createElement("form");
        
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.createInvoice();
        });
        /**
         * Labels
         */
        let label = document.createElement("label");
        label.classList.add("input-label")
        label.textContent = "Välj order";

        /**
         * Select
         */
        let select = document.createElement("select");
        select.classList.add("input");

        /**
         * Options for select
         */
        let option = document.createElement("option");

        // option.setAttribute("value", -99);
        // option.setAttribute("disabled", "disabled");
        // option.setAttribute("selected", "true");
        option.textContent = "En order";
        select.appendChild(option);

        allOrders.forEach((order) => {
            console.log(order.name);
            let option = document.createElement("option");
            option.setAttribute("value", order.id)
            option.textContent = `${order.name} (${order.id})`;
            option.dataset.name = order.name;

            select.appendChild(option);
        });


        
        select.addEventListener("change", (event) => {
            this.delivery = {
                ...this.delivery,
                product_id: parseInt(event.target.value),
                product_name: event.target.selectedOptions[0].dataset.name,
                current_stock: parseInt(event.target.selectedOptions[0].dataset.stock)
            };
        });
        /**
         * Submit button
         */
        let submitButton = document.createElement("input");
        
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Skapa inleverans");
        submitButton.classList.add("button");

        this.innerHTML = `<h2>Ny faktura</h2>`;
        form.appendChild(label);
        form.appendChild(select);
        form.appendChild(submitButton);
        this.appendChild(form);
    }
    // required params for Adding invoice
// https://lager.emilfolino.se/v2#add_invoice
// //     order_id
// // total_price
// // api_key
// // Optional parameters:

// creation_date
// due_date
    render() {
        //
    }
}
