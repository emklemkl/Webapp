"use strict";
import { apiKey, baseURL } from "./../utils.js";

const auth = {
    token: "",

    login: async function login(username, password) {
        const user = {
            email: username,
            password: password,
            api_key: apiKey
        };
        const response = await fetch(`${baseURL}/auth/login`, {
            body: JSON.stringify(user),
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
        });
        const result = await response.json();
        // console.log(result.data);

        if ("errors" in result) {
            return result.errors.detail;
        }
        auth.token = result.data.token;
        console.log(auth.token);
        return "ok";
    },

    register: async function register(username, password) {
        const user = {
            email: username,
            password: password,
            api_key: apiKey
        };
        const response = await fetch(`${baseURL}/auth/register`, {
            body: JSON.stringify(user),
            headers: {
                "content-type": "application/json"
            },
            method: "POST",
        });
        const result = await response.json();

        if (result.data.message === "User successfully registered.") {
            return "ok";
        }
        return "not ok";
    },
};

export default auth;
