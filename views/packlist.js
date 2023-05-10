"use strict";
export default class PacklistView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header class="header">
            <lager-title title="Packlista"></lager-title>
            </header><div class='fade-in' id='slider'>
            <main class="main">
                <order-list></order-list>
            </main></div>
    `;
    }
}
