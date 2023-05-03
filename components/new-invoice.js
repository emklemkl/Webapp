"use strict";
import orders from "../models/orders.js";
import invoices from "../models/invoices.js";
import {toast} from "../utils.js";

export default class NewInvoice extends HTMLElement {
    constructor() {
        super();

        this.selectedOrder = {};
    }

    async createInvoice() {
        /**
         * Get current date and timstamp dd-mm-yyyy mm:hh
         */
        let today = new Date();
        let invoiceCreated = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()} `;

        invoiceCreated += `${today.getHours()}:${today.getMinutes()}`;

        /**
         * Get invoice last pay date dd-mm-yyyy (12096e5 is a magic number for fourteen days ahead)
         */
        let forthnight =  new Date(Date.now()+ 12096e5);
        const invoiceDue =
        `${forthnight.getDate()}-${forthnight.getMonth() + 1}-${forthnight.getFullYear()} `;

        let invoiceData = {
            order_id: this.selectedOrder.order_id,
            total_price: parseInt(this.selectedOrder.total_price),
            creation_date: invoiceCreated,
            due_date: invoiceDue,
        };
        const response = await invoices.addInvoice(invoiceData);

        console.log(response);
        if (response < 300) {
            let updateOrderData = {
                name: this.selectedOrder.customer_name,
                id: this.selectedOrder.order_id,
                status_id: 600
            };

            await orders.updateOrderStatus(updateOrderData);
        }
        location.hash = "invoices";
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
            if (orderCounter === 0) {
                toast("Det finns inga ordrar.");
            }
            this.createInvoice();
        });
        /**
         * Labels
         */
        let label = document.createElement("label");

        label.classList.add("input-label");
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
        option.setAttribute("disabled", "disabled");
        option.setAttribute("selected", "true");
        option.textContent = "Alla ordrar";
        select.appendChild(option);

        var orderCounter = 0;

        allOrders.forEach((order) => {
            let totalPrice = 0;

            if (order.status_id < 600) {
                for (const prod of order.order_items) {
                    totalPrice += prod.amount * prod.price;
                }
                let option = document.createElement("option");

                option.setAttribute("value", order.id);
                option.textContent = `${order.id} ${order.name} (status: ${order.status_id})`;
                option.dataset.name = order.name;
                option.dataset.total_price = totalPrice;
                select.appendChild(option);
                orderCounter++;
            }
        });

        select.addEventListener("change", (event) => {
            console.log(event.target);
            this.selectedOrder = {
                ...this.selectedOrder,
                order_id: parseInt(event.target.value),
                customer_name: event.target.selectedOptions[0].dataset.name,
                total_price: event.target.selectedOptions[0].dataset.total_price
            };
            // console.log(this.selectedOrder);
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
