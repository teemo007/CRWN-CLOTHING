import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPE } from "./cart.type";

const addCartItem = (cartItems, productToAdd) => {
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
const removeCartItem = (cartItems, productToRemove) => {
  //find if cartItem contains productToRemove

  const existingCartItem = cartItems.find(
    (product) => product.id === productToRemove.id
  );

  if (existingCartItem.quantity === 1) {
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

const deleteCartItem = (cartItems, productToDelete) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToDelete.id);
};
const updateItemQuantity = (cartItems, id, productQuantityToUpdate) => {
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

export const setIsCartOpen = (bool) => (
  createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool)
  
);
export const setIsItemEditable = (selectedItem) => (
  createAction(CART_ACTION_TYPE.SET_IS_Item_EDITABLE, selectedItem)
);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};
export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};
export const deleteItemFromCart = (cartItems, productToDelete) => {
  const newCartItems = deleteCartItem(cartItems, productToDelete);
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};

export const updateItemQuantityFromCart = (
  cartItems,
  id,
  productQuantityToUpdate
) => {
  const newCartItems = updateItemQuantity(
    cartItems,
    id,
    productQuantityToUpdate
  );
  return createAction(CART_ACTION_TYPE.SET_CART_ITEMS, newCartItems);
};
