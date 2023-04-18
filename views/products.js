"use strict";
export default class ProductsView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header class="header">
            <lager-title title="Produkt lista"></lager-title>
            </header>
            <main class="main">
                <product-list></product-list>
            </main>
    `;
    }
}
