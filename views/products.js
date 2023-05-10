"use strict";
export default class ProductsView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header class="header">
            <lager-title title="Produktlista"></lager-title>
            </header><div class='fade-in' id='slider'>
            <main class="main">
                <product-list></product-list>
            </main></div>
    `;
    }
}
