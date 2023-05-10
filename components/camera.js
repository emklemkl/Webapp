"use strict";

import ordersModel from "../models/orders.js";
import { UploadClient } from "../uploadcare/index.browser.min.js";

export default class CameraComponent extends HTMLElement {
    constructor() {
        super();

        this.photoData = "";
        this.cdnUrl = "";
        this.order = "";
    }

    static get observedAttributes() {
        return ["order"];
    }

    attributeChangedCallback(property, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        this[property] = newValue;
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="camera">
        <div class="camera-child"><video id="video">Video stream not available.</video>
        <div class="photo-buttons">
            <button id="startbutton" class="button-register">Take photo</button>
            <button id="sendbutton" class="button-register">Send photo</button>
            </div>
            </div>
        </div>
        <div class="camera-child fade-in" id="canvas-div"><canvas id="canvas"></canvas></div>
        `;

        window.addEventListener("load", () => {
            this.startup();
        }, false);
    }

    async startup() {
        let streaming = false;
        const width = 320; // We will scale the photo width to this
        let height = 0; // This will be computed based on the input stream

        let video = document.getElementById("video");
        let canvas = document.getElementById("canvas");
        let startbutton = document.getElementById("startbutton");
        let sendbutton = document.getElementById("sendbutton");

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: false })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error(`An error occurred: ${err}`);
            });

        video.addEventListener(
            "canplay",
            () => {
                if (!streaming) {
                    height = video.videoHeight / (video.videoWidth / width);

                    // Firefox currently has a bug where the height can't be read from
                    // the video, so we will make assumptions if this happens.

                    if (isNaN(height)) {
                        height = width / (4 / 3);
                    }

                    video.setAttribute("width", width);
                    video.setAttribute("height", height);
                    canvas.setAttribute("width", width);
                    canvas.setAttribute("height", height);
                    streaming = true;
                }
            },
            false
        );

        startbutton.addEventListener(
            "click",
            (ev) => {
                ev.preventDefault();
                document.getElementById("canvas-div").removeAttribute("id");
                this.takepicture(canvas, video, width, height);
            },
            false
        );

        // Send and update order in lager-api
        sendbutton.addEventListener(
            "click",
            async (ev) => {
                ev.preventDefault();

                let cdnUrl = await this.sendpicture();
                const order = await ordersModel.getOrder(this.order);
                const args = {
                    "id": this.order,
                    "name": order.name,
                    "status_id": 400,
                    "image_url": cdnUrl,
                };
                let res = await ordersModel.updateOrderStatus(args);

                console.info(res);
            },
            false
        );

        this.clearphoto(canvas);
    }

    takepicture(canvas, video, width, height) {
        const context = canvas.getContext("2d");

        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);

            this.photoData = canvas.toDataURL("image/png");
        } else {
            this.clearphoto(canvas);
        }
    }

    clearphoto(canvas) {
        const context = canvas.getContext("2d");

        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        this.photoData = canvas.toDataURL("image/png");
    }

    async sendpicture() {
        const blob = await (await fetch(this.photoData)).blob();

        const client = new UploadClient({ publicKey: 'b529c2de68d308126570' });

        const fileInfo = await client.uploadFile(blob);
        const cdnUrl = fileInfo.cdnUrl;

        console.log(cdnUrl);
        return cdnUrl;
    }
}
