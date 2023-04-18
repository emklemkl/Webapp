"use strict";
// Router import
//
import Router from "./router.js";
import Navigation from "./navigation.js";

// Components import
//
import LagerTitle from "./components/lager-title.js";
import ProductList from "./components/product-list.js";
import OrderList from "./components/order-list.js";
import SingleProduct from "./components/single-product.js";
import NotFound from "./components/not-found.js";
import SingleOrder from "./components/single-order.js";

// Views import
//
import ProductsView from "./views/products.js";
import PackListView from "./views/packlist.js";

// Router
//
customElements.define("router-outlet", Router);
customElements.define("navigation-outlet", Navigation);

// Components
//
customElements.define("not-found", NotFound);
customElements.define("lager-title", LagerTitle);
customElements.define("product-list", ProductList);
customElements.define("single-product", SingleProduct);
customElements.define("order-list", OrderList);
customElements.define("single-order", SingleOrder);

// Views
//
customElements.define("products-view", ProductsView);
customElements.define("packlist-view", PackListView);
