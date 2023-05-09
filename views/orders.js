"use strict";
export default class OrdersView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header class="header">
            <lager-title title="Packad order"></lager-title>
            </header><div class='slide-in' id='slider'>
            <main class="main">
                <order-list-packed></order-list-packed>
            </main>
            </div>
    `;
    }
}
