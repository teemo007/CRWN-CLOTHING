import { UnknownAction } from "redux";
import { CartItem } from "./cart.type";
import { setCartItems, setIsCartOpen, setIsItemEditable } from "./cart.action";

export type CartState = {
  readonly cartItems: CartItem[];
  readonly isCartOpen: boolean;
  readonly isItemEditable: { [id: string]: boolean };
};

const CART_INITIAL_STATE: CartState = {
  cartItems: [],
  isCartOpen: false,
  isItemEditable: {},
};

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action : UnknownAction
): CartState => {
  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload, 
    };
  }
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }
  if (setIsItemEditable.match(action)) {
    return {
      ...state,
      isItemEditable: action.payload,
    };
  }
  return state;
};
