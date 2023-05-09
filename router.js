import orders from "./models/orders.js"

export default class Router extends HTMLElement {
    constructor() {
        super();

        this.currentRoute = "";
        this.wildcard = "";

        this.allRoutes = {
            "": {
                view: "<products-view></products-view>",
                name: "Lagerlista",
                icon: `Lager`
                // icon: `<i class="fa-solid fa-warehouse"></i>`
            },
            "packlist": {
                view: "<packlist-view></packlist-view>",
                icon: `Packa`
                // icon: `<img
                // src='/public/image/venus.svg'
                // class='aclass'
                // alt='triangle with all three sides equal'
                // height='30'
                // width='30' />`
                // icon: "<embed type='image/svg+xml' src='public/image/venus.svg'>"

            },
            "deliveries": {
                view: "<deliveries-view></deliveries-view>",
                name: "Inleveranser",
                icon: "InLev"
                // icon: `<img
                // src='/public/image/truck-ramp-box.svg'
                // class='aclass'
                // alt='triangle with all three sides equal'
                // height='30'
                // width='30' />`
            },
            "deliveries-form": {
                view: "<deliveries-form-view></deliveries-form-view>",
                icon: `x`,
                name: "Ny inleverans",
                hidden: true
            },
            "invoice-form": {
                view: "<invoice-form-view></invoice-form-view>",
                icon: `x`,
                name: "Ny faktura",
                hidden: true
            },
            "login": {
                view: "<login-view></login-view>",
                name: "Logga in",
                // icon: `<i class="fa-solid fa-right-to-bracket"></i>`,
                hidden: true
            },
            "new-invoice": {
                view: "<invoices-form-view></invoices-form-view>",
                name: "Ny faktura",
                icon: `Ny faktura`,
                hidden: true
                // icon: `<i class="fa-solid fa-file-invoice-dollar"></i>`
            },
            "invoices": {
                view: "<invoices-view></invoices-view>",
                name: "Faktura",
                icon: `Faktura`
                // icon: `<i class="fa-solid fa-file-invoice-dollar"></i>`
            },
            "orders": {
                view: "<orders-view class='slide-in'></orders-view>",
                name: "Skicka",
                icon: "Skicka"
            },
            "map": {
                view: "<map-view class='slide-in' order=$wildcard></map-view>",
                name: "Karta",
                icon: "Karta",
                hidden: true
            }
        };
    }


    get routes() {
        return this.allRoutes;
    }

    // connect component
    connectedCallback() {
        window.addEventListener("hashchange", () => {
            this.resolveRoute();
        });
        this.resolveRoute();
    }

    resolveRoute() {
        let cleanHash = location.hash.replace("#", "");

        this.wildcard = "";

        if (cleanHash.indexOf("/") > -1) {
            let splittedHash = cleanHash.split("/")
            cleanHash = splittedHash[0];
            this.wildcard = splittedHash[1];
        }

        this.currentRoute = cleanHash;

        this.render();
    }

    render() {
        let html = "<not-found></not-found>";

        if (this.routes[this.currentRoute]) {
            html = this.routes[this.currentRoute].view

            if (this.wildcard) {
                html = html.replace("$wildcard", this.wildcard)
            }
        }

        this.innerHTML = html;
    }
}
