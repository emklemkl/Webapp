"use strict";

export default class WildCardList extends HTMLElement {
    constructor() {
        super();
        this.orders = [1, 2, 3];
    }

    async connectedCallback() {
        this.render();
    }
    render() {
        const list = this.orders.map((order) => {
            return `<a href="#map/${order}">${order}</a>`;
        }).join("");

        console.log(list);
        this.innerHTML = `<h2>Orders Wildcard</h2>${list}`;
    }
}
