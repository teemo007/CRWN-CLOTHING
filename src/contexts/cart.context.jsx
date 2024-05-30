import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
  console.log(cartItems)
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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartopen: () => {},
  cartItem: [],
  addItemToCart: () => {},
  cartCount:0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartopen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0)

  useEffect(()=>{
    const newCartCount = cartItems.reduce((total, cartItem)=>
      total += cartItem.quantity
    ,0)
    setCartCount(newCartCount)
  },[cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const value = { cartItems, isCartOpen, cartCount,setIsCartopen, addItemToCart, };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
