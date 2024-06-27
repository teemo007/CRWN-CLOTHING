import {
  CartIconContainer,
  ItemCount,
  ShoppingSvg
} from "./cart-icon.styles.jsx";
// import ShoppingIcon from "../../assets/shopping-bag.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";

const CartIcon = () => {
  const dispatch = useDispatch()
  const isCartOpen = useSelector(selectIsCartOpen)
  const cartCount = useSelector(selectCartCount)
  //const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingSvg />
      <ItemCount >{cartCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
