"use strict";

export default class MapView extends HTMLElement {

    constructor() {
        super();

        this.order = "";
        this.map = null;
    }

    static get observedAttributes() {
        return ["order"]
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this[property] = newValue;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `<div class='slide-in' id='slider'>
        <h1>MapView</h1><h2>${this.order}</h2><div id="map" class="map"></div>
        </div>`;
    }
}
