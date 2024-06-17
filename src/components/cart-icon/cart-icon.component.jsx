import {
  CartIconContainer,
  ItemCount,
  ShoppingSvg
} from "./cart-icon.styles.jsx";
// import ShoppingIcon from "../../assets/shopping-bag.svg?react";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartopen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartopen(!isCartOpen);
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingSvg />
      <ItemCount >{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
