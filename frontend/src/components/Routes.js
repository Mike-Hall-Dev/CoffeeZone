import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage.js";
import LoginPage from "../pages/LoginPage.js";
import RegisterPage from "../pages/RegisterPage.js";
import ProfilePage from "../pages/ProfilePage.js";
import ShippingPage from "../pages/ShippingPage.js";
import PaymentPage from "../pages/PaymentPage.js";
import PlaceOrderPage from "../pages/PlaceOrderPage.js";



const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/shipping" component={ShippingPage} />
            <Route exact path="/placeorder" component={PlaceOrderPage} />
            <Route exact path="/payment" component={PaymentPage} />
            <Route exact path="/products/:id" component={ProductDetailsPage} />
            <Route exact path="/cart/:id?" component={CartPage} />
            <Route exact path="/" component={HomePage} />
        </Switch>
    )
}

export default Routes;