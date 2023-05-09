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
import OrderListPacked from "./components/order-list-packed.js";
import SingleProduct from "./components/single-product.js";
import NotFound from "./components/not-found.js";
import SingleOrder from "./components/single-order.js";
import DeliveriesList from "./components/deliveries-list.js";
import NewDelivery from "./components/new-delivery.js";
import SingleDelivery from "./components/single-delivery.js";
import LoginForm from "./components/login-form.js";
import InvoicesTable from "./components/invoices-table.js";
import NewInvoice from "./components/new-invoice.js";
import WildCardList from "./components/wildcard-list.js";

// Views import
//
import ProductsView from "./views/products.js";
import PackListView from "./views/packlist.js";
import DeliveriesView from "./views/deliveries.js";
import DeliveriesFormView from "./views/deliveries-form.js";
import LoginView from "./views/login.js";
import InvoicesView from "./views/invoices.js";
import InvoiceFormView from "./views/invoice-form.js";
import MapView from "./views/map.js";
import OrdersView from "./views/orders.js";


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
customElements.define("deliveries-list", DeliveriesList);
customElements.define("new-delivery", NewDelivery);
customElements.define("single-delivery", SingleDelivery);
customElements.define("login-form", LoginForm);
customElements.define("invoices-table", InvoicesTable);
customElements.define("new-invoice", NewInvoice);
customElements.define("wildcard-list", WildCardList);
customElements.define("order-list-packed", OrderListPacked);

// Views
//
customElements.define("products-view", ProductsView);
customElements.define("packlist-view", PackListView);
customElements.define("deliveries-view", DeliveriesView);
customElements.define("deliveries-form-view", DeliveriesFormView);
customElements.define("login-view", LoginView);
customElements.define("invoices-view", InvoicesView);
customElements.define("invoices-form-view", InvoiceFormView);
customElements.define("orders-view", OrdersView);
customElements.define("map-view", MapView);
