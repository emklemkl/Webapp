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
            </header><div class='fade-in' id='slider'>
            <main class="main">
                <invoices-table></invoices-table>
            </main></div>
    `;
    }
}
