"use strict";
import authModel from "../models/auth.js";
import {toast} from "../utils.js";

export default class LoginForm extends HTMLElement {
    constructor() {
        super();

        this.credentials = {};
    }

    async login() {
        const result = await authModel.login(
            this.credentials.username,
            this.credentials.password,
        );


        if (result === "ok") {
            location.hash = "invoices";
            console.log("Login Gick bra");
        } else {
            toast(result);
        }
    }

    async register() {
        const result = await authModel.register(
            this.credentials.username,
            this.credentials.password,
        );


        if (result === "ok") {
            console.log("Register Gick bra");
            this.login();
        } else {
            console.log("login gick inte");
        }
    }

    connectedCallback() {
        let form = document.createElement("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            this.login();
        });

        let usernameLabel = document.createElement("label");

        usernameLabel.classList.add("input-label");
        usernameLabel.textContent = "Användarnamn";

        let username = document.createElement("input");

        username.setAttribute("type", "email");
        username.setAttribute("required", "required");
        username.classList.add("input");

        username.addEventListener("input", (event) => {
            this.credentials = {
                ...this.credentials,
                username: event.target.value,
            };
            console.log(this.credentials);
        });

        let passwordLabel = document.createElement("label");

        passwordLabel.classList.add("input-label");
        passwordLabel.textContent = "Lösenord";

        let password = document.createElement("input");

        password.setAttribute("type", "password");
        password.setAttribute("required", "required");
        password.classList.add("input");

        password.addEventListener("input", (event) => {
            this.credentials = {
                ...this.credentials,
                password: event.target.value
            };
            console.log(this.credentials);
        });

        let submitButton = document.createElement("input");

        submitButton.setAttribute("type", "submit");
        submitButton.setAttribute("value", "Logga in");
        submitButton.classList.add("button");

        let registerButton = document.createElement("input");

        registerButton.setAttribute("type", "submit");
        registerButton.setAttribute("value", "Registrera");
        registerButton.classList.add("button", "button-register");

        registerButton.addEventListener("click", (event) => {
            event.preventDefault();

            this.register();
        });

        form.appendChild(usernameLabel);
        form.appendChild(username);
        form.appendChild(passwordLabel);
        form.appendChild(password);
        form.appendChild(submitButton);
        form.appendChild(registerButton);
        this.appendChild(form);
    }
}
