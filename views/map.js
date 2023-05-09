"use strict";
/* global L */

import "../leaflet/leaflet.min.js";
import orders from "../models/orders.js"
import getCoordinates from "../models/nominatim.js";

export default class MapView extends HTMLElement {

    constructor() {
        super();

        this.order = "";
        this.map = null;
        this.address = "";
    }

    static get observedAttributes() {
        return ["order"]
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this[property] = newValue;
    }

    async connectedCallback() {
        let order = await orders.getOrder(parseInt(this.order));
        this.address = `${order.address}, ${order.city}`;
        this.innerHTML = `<div class='slide-in' id='slider'>
        <h1>MapVieww</h1><h2>${this.address}</h2><div id="map" class="map"></div>
        </div>`;

        const coords = await getCoordinates(this.address);
        console.log("🚀 ~ file: map.js:36 ~ MapView ~ connectedCallback ~ coords:", coords)
        console.log("🚀 ~ file: map.js:36 ~ MapView ~ connectedCallback ~ address:", this.address)
        this.renderMap(coords);
    }

    renderMap(coords) {
        this.map = L.map('map').setView([coords[0].lat, coords[0].lon], 14);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

    this.renderLocation();
    this.renderMarkers([coords[0].lat, coords[0].lon]);
    }

    async renderMarkers(coords) {
        let coordinates = coords;

        L.marker(coordinates).addTo(this.map);

        const results = await getCoordinates(this.address);

        L.marker([
            parseFloat(results[0].lat),
            parseFloat(results[0].lon)
        ]).addTo(this.map);
    }

    renderLocation() {
        let locationMarker = L.icon({
            iconUrl:      "leaflet/location.png",
            iconSize:     [24, 24],
            iconAnchor:   [12, 12],
            popupAnchor:  [0, 0]
        });

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                L.marker(
                    [position.coords.latitude,
                    position.coords.longitude],
                    {icon: locationMarker}
                ).addTo(this.map);
            });
        }
    }
}
