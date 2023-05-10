"use strict";
export default class DeliveriesView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header class="header">
            <lager-title title="Inleveranser"></lager-title>
            <h2>Ny inleverans</h2>
            </header> <div class='fade-in' id='slider'>
            <main class="main">
                <new-delivery></new-delivery>
            </main> </div>
    `;
    }
}
