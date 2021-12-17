import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";


const Routes = () => {
    return (
        <Switch>
            <Route exact path="/products/:id" component={ProductDetailsPage} />
            <Route exact path="/" component={HomePage} />
        </Switch>
    )
}

export default Routes;