import { CART_ACTION_TYPE } from "./cart.type";

const CART_INITIAL_STATE = {
    cartItems: [],
    isCartOpen: false,
    isItemEditable: {},
  };

export const cartReducer = (state=CART_INITIAL_STATE, {type,payload}) => {
    switch (type) {
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload,
            }
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
                return {
                  ...state,
                  isCartOpen: payload,
                };
        case CART_ACTION_TYPE.SET_IS_Item_EDITABLE:
                return {
                  ...state,
                  isItemEditable: payload,
                };
        default:
            return state
    }
}