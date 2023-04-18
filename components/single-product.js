"use strict";

export default class SingleProduct extends HTMLElement {
    static get observedAttributes() {
        return ["product"];
    }

    // En getter-funktion binder ett objekt till ett attribut i ett objekt eller klass i JavaScript.
    // När vi efterfrågar attributet anrops funktionen som sedan returnerar ett värde.
    //  Detta är anledningen till att vi kan skriva this.product.name istället för this.product()
    // och sedan hämta ut tex name-attributet från det objektet som returneras.
    get product() {
        return JSON.parse(this.getAttribute("product"));
    }

    connectedCallback() {
        this.innerHTML = `
            <h3>${this.product.name}</h3>
            <div>
            <p>Id: ${this.product.id}</p>
            <p>Stock: ${this.product.stock}</p>
            <p>Location: ${this.product.location}</p>
            </div>`;
    }
}
