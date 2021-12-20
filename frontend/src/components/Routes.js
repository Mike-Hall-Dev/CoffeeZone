import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CartPage from "../pages/CartPage.js";



const Routes = () => {
    return (
        <Switch>
            <Route exact path="/products/:id" component={ProductDetailsPage} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/cart/:id?" component={CartPage} />
        </Switch>
    )
}

export default Routes;