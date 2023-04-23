"use strict";
import productsModel from "../models/products.js";

export default class NewDelivery extends HTMLElement {



    /**
     *  slutade här: https://youtu.be/x50ST50a9Z4?list=PLKtP9l5q3ce_CbhJOudHjxkjYofM98kvh&t=3687
     */
    constructor() {
        super();

        this.delivery = {};
        this.products = [];
    }

    async connectedCallback() {
        this.products = await productsModel.getProducts();
        this.render();
    }

    render() {
        let form = document.createElement("form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            console.log("Prevented submit");
        })

        let submitButton = document.createElement("input");
        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Skapa inleverans");
        submitButton.classList.add("button");

        let select = document.createElement("select");
        select.setAttribute("required", "required");
        select.classList.add("input");

        let option = document.createElement("option");
        option.setAttribute("value", -99);
        option.textContent = "Välj produkt"
        select.appendChild(option);
        this.products.forEach((item) => {
            let option = document.createElement("option");
            option.setAttribute("value", item.id)
            option.dataset.stock = item.stock;;
            option.textContent = item.name;

            select.appendChild(option);
        })

        form.appendChild(select);
        form.appendChild(submitButton);
        this.appendChild(form);
    }
}
