import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants.js";

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const cartItem = action.payload;
            const itemExists = state.cartItems.find(item => item.product === cartItem.product);

            if (itemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item.product === itemExists.product ?
                        cartItem : item)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, cartItem]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((item) => item.product !== action.payload)
            }
        default:
            return state;
    }
}