import "./cart-dropdown.styles.scss";
import Button from "../button/button.component"
import CartItem from "../cart-item/CartItem";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { useNavigate } from "react-router-dom";

const Cartdropdown = () => {
  const {cartItems} = useContext(CartContext)
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout')
  }
  return (
    <div className='cart-dropdown-container'>
    <div className='cart-items' >
      {cartItems.map(item => 
        <CartItem cartItem={item} key={item.id}/>
      )}
      </div>
    <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
  </div>
  );
};

export default Cartdropdown;
