"use strict";
import authModel from "../models/auth.js";
export default class InvoicesView extends HTMLElement {
    connectedCallback() {
        // If token doesnt exist, redirect to "login"
        if (!authModel.token) {
            location.hash = "login";
        }
        this.innerHTML = `<header class="header">
            <lager-title title="Login"></lager-title>
            </header>
            <main class="main">
                <new-invoice></new-invoice>
            </main>
    `;
    }
}
