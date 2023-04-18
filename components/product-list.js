"use strict";
import {apiKey, baseURL} from '../utils.js';
// import productsModel from "../models/products.js"
// Exports. ProductList'ärver' eller förlänger funktionen av HTMLElement
export default class ProductList extends HTMLElement {
    constructor() {
        super();
        this.products = [];
    }

    async connectedCallback() {
        // this.products = productsModel.getProducts();

        const response = await fetch(`${baseURL}/products?api_key=${apiKey}`);
        const result = await response.json();
    
        this.products = result.data;
        this.render();
    }
    render() {
        // Map = För varje element i listan/arrayen gör/anropa en funktion på elementet
        const list = this.products.map((product) => {
            return `<div class="single-wrapper">
            <single-product product='${JSON.stringify(product)}'></single-product></div>`;
        }).join("");

        this.innerHTML = `<h2>Produktlista</h2>${list}`;
    }
}
