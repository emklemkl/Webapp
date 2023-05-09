"use strict";
export default class OrdersView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header class="header">
            <lager-title title="Packad order"></lager-title>
            </header>
            <main class="main">
                <order-list-packed></order-list-packed>
            </main>
    `;
    }
}
