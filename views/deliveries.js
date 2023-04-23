"use strict";
export default class DeliveriesView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header class="header">
            <lager-title title="Inleveranser"></lager-title>
            </header>
            <main class="main">
                <deliveries-list></deliveries-list>
            </main>
    `;
    }
}
