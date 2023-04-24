"use strict";
import productsModel from "../models/products.js";
import deliveriesModel from "../models/deliveries.js";

export default class NewDelivery extends HTMLElement {
    constructor() {
        super();

        this.delivery = {};
        this.products = [];
    }

    async createDelivery() {
        const responseStatus = await deliveriesModel.addDelivery(this.delivery);

        // If addDelivery is successful
        // Update product
        if (responseStatus < 300) {
            const productData = {
                id: this.delivery.product_id,
                name: this.delivery.product_name,
                stock: parseInt(this.delivery.current_stock) + parseInt(this.delivery.amount)
            };
            const response = await productsModel.updateProduct(productData);

            console.info(response.staus);
            location.hash = "deliveries";
        }
    }

    async connectedCallback() {
        this.products = await productsModel.getProducts();
        this.render();
    }

    render() {
        let form = document.createElement("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.createDelivery();
        });

        /**
         * Submit button creation part of the form
         */
        let submitButton = document.createElement("input");

        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Skapa inleverans");
        submitButton.classList.add("button");

        /**
         * Select dropdown creation part of the form
         */
        let labelSelect = document.createElement("label");

        labelSelect.setAttribute("name", "select");
        labelSelect.textContent = "Välj produkt";
        labelSelect.classList.add("input-label");

        let select = document.createElement("select");

        select.setAttribute("required", "required");
        select.classList.add("input");

        let option = document.createElement("option");

        option.setAttribute("value", -99);
        option.setAttribute("disabled", "disabled");
        option.setAttribute("selected", "true");

        option.textContent = "En produkt";
        select.appendChild(option);
        this.products.forEach((item) => {
            let option = document.createElement("option");

            option.setAttribute("value", item.id);
            option.dataset.stock = item.stock;
            option.dataset.name = item.name;
            option.textContent = item.name;
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
         * Amount of product part of the form
         */
        let labelAmount = document.createElement("label");

        labelAmount.setAttribute("name", "amount");
        labelAmount.textContent = "Antal";
        labelAmount.classList.add("input-label");

        let amountInput = document.createElement("input");

        amountInput.setAttribute("type", "number");
        amountInput.setAttribute("required", "required");
        amountInput.setAttribute("min", "1");
        amountInput.setAttribute("value", 1);
        amountInput.classList.add("input");

        amountInput.addEventListener("input", (event) => {
            this.delivery = {
                ...this.delivery,
                amount: parseInt(event.target.value)
            };
        });

        /**
         * Date part of the form
         */
        let labelDate = document.createElement("label");

        labelDate.setAttribute("name", "date");
        labelDate.textContent = "Datum";
        labelDate.classList.add("input-label");
        let date = document.createElement("input");

        date.setAttribute("type", "date");
        date.setAttribute("required", "required");
        date.classList.add("input");
        date.addEventListener("input", (event) => {
            this.delivery = {
                ...this.delivery,
                date: event.target.value
            };
        });

        /**
         * Comment part of the form
        */
        let labelComment = document.createElement("label");

        labelComment.setAttribute("name", "comment");
        labelComment.textContent = "Comment";
        labelComment.classList.add("input-label");

        let comment = document.createElement("textarea");

        comment.setAttribute("maxlength", 75);
        comment.style = "height: 5rem;";
        comment.setAttribute("required", "required");
        comment.setAttribute("placeholder", "Lägg till kommentar");
        comment.classList.add("input");

        // Listen for input in
        comment.addEventListener("input", (event) => {
            this.delivery = {
                ...this.delivery,
                comment: event.target.value
            };
        });

        /**
         * Append to the form
         */
        form.appendChild(labelSelect);
        form.appendChild(select);
        form.appendChild(labelAmount);
        form.appendChild(amountInput);
        form.appendChild(labelDate);
        form.appendChild(date);
        form.appendChild(labelComment);
        form.appendChild(comment);
        form.appendChild(submitButton);

        this.appendChild(form);
    }
}
