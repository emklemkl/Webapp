export default class Router extends HTMLElement {
    constructor() {
        super();

        this.currentRoute = "";

        this.allRoutes = {
            "": {
                view: "<products-view></products-view>",
                name: "Lagerlista",
                icon: `<i class="fa-solid fa-warehouse"></i>`
            },
            "packlist": {
                view: "<packlist-view></packlist-view>",
                icon: `<i class="fa-solid fa-list-check"></i>`
            },
            "deliveries": {
                view: "<deliveries-view></deliveries-view>",
                name: "Inleveranser",
                icon: `<i class="fa-solid fa-truck-ramp-box"></i>`
            },
            "deliveries-form": {
                view: "<new-delivery></new-delivery>",
                icon: `<i class="fa-solid fa-list-check"></i>`,
                name: "Ny inleverans",
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
        this.currentRoute = location.hash.replace("#", "");
        this.render();
    }

    render() {
        this.innerHTML = this.routes[this.currentRoute].view || "<not-found></not-found>";
    }
}
