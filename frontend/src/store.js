import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productReviewReducer, productTopRatedReducer } from "./reducers/productReducers.js";
import { cartReducer } from "./reducers/cartReducer.js";
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer } from "./reducers/userReducers.js";
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer, orderListReducer, orderDeliverReducer } from "./reducers/orderReducers.js";

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productReview: productReviewReducer,
    productTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer
});

const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(
    localStorage.getItem("cartItems")) : [];

const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(
    localStorage.getItem("userInfo")) : null;

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress") ? JSON.parse(
    localStorage.getItem("shippingAddress")) : {};

const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage, shippingAddress: shippingAddressFromLocalStorage },
    userLogin: { userInfo: userInfoFromLocalStorage }
};
const middleWare = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;