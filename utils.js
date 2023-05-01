"use strict";
const apiKey = "47b860ec87d2d1b8dbc6a137bb81f0c0";
const baseURL = "https://lager.emilfolino.se/v2";

function toast(message) {
    const toast = document.getElementsByClassName("toast")[0];
    toast.querySelector(".toast-body").innerHTML = message;

    toast.classList.add("visible");
    setTimeout(function() {
        toast.className = toast.className.replace("visible", "");
    },
        4000
    );
}

export {apiKey, baseURL, toast};
