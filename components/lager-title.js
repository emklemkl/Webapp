"use strict";
// Exports, LagerTitle 'ärver' eller förlänger funktionen av HTMLElement
export default class LagerTitle extends HTMLElement {
    constructor() {
        super();

        this.name = "Emil";
    }
    // Returnerar dem array med attribut som ska observeras
    static get observedAttributes() {
        return ["name"];
    }

    // Ändrar instansvariabel om det finns ett nytt värde
    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }

        this[property] = newValue;
    }

    connectedCallback() {
        this.innerHTML = `<h1 class="top-h1">${this.name}'s lagerapp</h1>`;
    }
}
