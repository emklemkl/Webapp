"use strict";
export default class PacklistView extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<header class="header">
            <lager-title title="Packlista"></lager-title>
            </header>
            <main class="main">
                <order-list></order-list>
            </main>
    `;
    }
}
