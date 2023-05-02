"use strict";
import { apiKey, baseURL } from "./../utils.js";

const auth = {
    // token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNDdiODYwZWM4N2QyZDFiOGRiYzZhMTM3YmI4MWYwYzAiLCJlbWFpbCI6InRAdC5zZSIsImlhdCI6MTY4Mjk0MDEwMywiZXhwIjoxNjgzMDI2NTAzfQ.rzbv7ilrA0MmssF0gP82j6iz0aEIKnHuf_pFvBkvToo",
    token: "",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiNDdiODYwZWM4N2QyZDFiOGRiYzZhMTM3YmI4MWYwYzAiLCJlbWFpbCI6InRAdC5zZSIsImlhdCI6MTY4Mjk2MzQyNCwiZXhwIjoxNjgzMDQ5ODI0fQ.4kqNd2MnwZHvqOo4EiT2MoxerxV93AjNZW4skauaCpE",

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
        return "ok"
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
            return "ok"
        } 
        return "not ok"
    },
};

export default auth;
