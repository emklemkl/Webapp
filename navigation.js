import Router from "./router.js";

export default class Navigation extends HTMLElement {
    constructor() {
        super();

        this.router = new Router();
    }


    /**
     * @function mirroredScreen
     * @description Reverses the horizontal view
     */
    mirroredScreen() {
        const cont = document.getElementsByClassName("single-order-container");

        for (const sc of cont) {
            if (sc.style.flexDirection === "row-reverse") {
                sc.style.flexDirection = "row";
            } else {
                sc.style.flexDirection = "row-reverse";
            }
        }
    }
    connectedCallback() {
        const routes = this.router.routes;

        let navigationLinks = "";

        for (let path in routes) {
            if (!routes[path].hidden){ // Hide unwanted routes
                navigationLinks += `<a href='#${path}'>${routes[path].icon}</a>`;
            }
        }
        navigationLinks += `<div id="mirror"><i class="fa-solid fa-rotate"></i></div>`;
        this.innerHTML = `<nav class="bottom-nav">${navigationLinks}</nav>`;

        document.getElementById("mirror").addEventListener("click", this.mirroredScreen);
    }
}
