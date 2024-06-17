import { createContext, useReducer, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  // find if cartItem contains productToAdd
  const existingCartItem = cartItems.find(
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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartopen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartTotal: 0,
  isItemEditable: {},
  setIsItemEditable: () => {},
  updateItemQuantityFromCart: () => {},
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_IS_Item_EDITABLE: "SET_IS_Item_EDITABLE",
};

const INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
  isItemEditable: {},
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    case CART_ACTION_TYPES.SET_IS_Item_EDITABLE:
      return {
        ...state,
        isItemEditable: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [isItemEditable, setIsItemEditable] = useState({});

  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);

    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems: newCartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount,
      },
    });
  };

  const addItemToCart = (productToAdd) => {
    //console.log(productToAdd)
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };
  const deleteItemFromCart = (productToDelete) => {
    const newCartItems = deleteCartItem(cartItems, productToDelete);
    updateCartItemsReducer(newCartItems);
  };
  const updateItemQuantityFromCart = (id, productQuantityToUpdate) => {
    const newCartItems = updateItemQuantity(
      cartItems,
      id,
      productQuantityToUpdate
    );
    updateCartItemsReducer(newCartItems);
  };
  const setIsCartopen = (bool) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
  };

  const value = {
    cartItems,
    isCartOpen,
    cartCount,
    setIsCartopen,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    cartTotal,
    isItemEditable,
    setIsItemEditable,
    updateItemQuantityFromCart,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
