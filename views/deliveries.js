"use strict";
export default class DeliveriesView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header class="header">
            <lager-title title="Inleveranser"></lager-title>
            </header><div class='fade-in' id='slider'>
            <main class="main">
                <deliveries-list></deliveries-list>
            </main></div>
    `;
    }
}
