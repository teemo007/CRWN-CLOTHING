import {
  createAction,
  withMatcher,
  ActionWithPayload,
} from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPE, CartItem, SelectedItemEditableState } from "./cart.type";
import { CategoryItem } from "../categories/category.types";

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
): CartItem[] => {
  // find if cartItem contains productToAdd
  const existingCartItem = cartItems?.find(
    (product) => product.id === productToAdd.id
  );
  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }
  // return new array with modified cartItem / new cart item

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  //find if cartItem contains productToRemove

  const existingCartItem = cartItems.find(
    (product) => product.id === productToRemove.id
  );

  if (existingCartItem && existingCartItem.quantity === 1) {
    if (confirm("Are you sure want to remove item ?") == true) {
      return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
    } else {
      return cartItems;
    }
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCartItem = (
  cartItems: CartItem[],
  productToDelete: CartItem
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};
const updateItemQuantity = (
  cartItems: CartItem[],
  id: number,
  productQuantityToUpdate: number
): CartItem[] => {
  const existingCartItem = cartItems.find((product) => product.id === id);
  if (existingCartItem && productQuantityToUpdate === 0) {
    return cartItems.filter((cartItem) => cartItem.id !== id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === id
      ? { ...cartItem, quantity: productQuantityToUpdate }
      : cartItem
  );
};

export type setIsCartOpen = ActionWithPayload<
  CART_ACTION_TYPE.SET_IS_CART_OPEN,
  boolean
>;

export type setCartItems = ActionWithPayload<
  CART_ACTION_TYPE.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (bool: boolean): setIsCartOpen =>
    createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool)
);

export const setIsItemEditable = withMatcher((selectedItem: SelectedItemEditableState) =>
  createAction(CART_ACTION_TYPE.SET_IS_Item_EDITABLE, selectedItem)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): setCartItems =>
    createAction(CART_ACTION_TYPE.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};
export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: CartItem
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};
export const deleteItemFromCart = (
  cartItems: CartItem[],
  productToDelete: CartItem
) => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return setCartItems(newCartItems);
};

export const updateItemQuantityFromCart = (
  cartItems: CartItem[],
  id: number,
  productQuantityToUpdate: number
) => {
  const newCartItems = updateItemQuantity(
    cartItems,
    id,
    productQuantityToUpdate
  );
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};
