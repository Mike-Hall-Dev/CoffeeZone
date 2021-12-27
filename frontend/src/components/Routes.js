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
import OrderPage from "../pages/OrderPage.js";
import UserListPage from "../pages/UserListPage.js";
import UserEditPage from "../pages/UserEditPage.js";
import ProductListPage from "../pages/ProductListPage.js";
import ProductEditPage from "../pages/ProductEditPage.js";
import OrderListPage from "../pages/OrderListPage.js";



const Routes = () => {
    return (
        <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/shipping" component={ShippingPage} />
            <Route exact path="/placeorder" component={PlaceOrderPage} />
            <Route exact path="/order/:id" component={OrderPage} />
            <Route exact path="/admin/orderlist" component={OrderListPage} />
            <Route exact path="/payment" component={PaymentPage} />
            <Route exact path="/products/:id" component={ProductDetailsPage} />
            <Route exact path="/cart/:id?" component={CartPage} />
            <Route exact path="/admin/userlist" component={UserListPage} />
            <Route exact path="/admin/productlist" component={ProductListPage} />
            <Route exact path="/admin/user/:id/edit" component={UserEditPage} />
            <Route exact path="/admin/product/:id/edit" component={ProductEditPage} />
            <Route exact path="/" component={HomePage} />
        </Switch>
    )
}

export default Routes;