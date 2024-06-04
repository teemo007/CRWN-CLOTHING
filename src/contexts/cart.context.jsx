import { createContext, useEffect, useState } from "react";

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
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
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
  console.log(typeof(productQuantityToUpdate))
  const existingCartItem = cartItems.find(
    (product) => product.id === id
  );
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
  cartItem: [],
  addItemToCart: () => {},
  cartCount: 0,
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartTotal: 0,
  isItemEditable: {},
  setIsItemEditable: () => {},
  updateItemQuantityFromCart: ()=> {},
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartopen] = useState(false);
  const [isItemEditable, setIsItemEditable] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);

    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };
  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };
  const deleteItemFromCart = (productToDelete) => {
    setCartItems(deleteCartItem(cartItems, productToDelete));
  };
  const updateItemQuantityFromCart = (id, productQuantityToUpdate) => {
    setCartItems(updateItemQuantity(cartItems, id, productQuantityToUpdate));
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
