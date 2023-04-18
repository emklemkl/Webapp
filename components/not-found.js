"use strict";

export default class NotFound extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <h3>${Location.href} not found!</h3>`;
    }
}
