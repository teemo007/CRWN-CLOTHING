import "./cart-icon.styles.scss";
import ShoppingIcon from "../../assets/shopping-bag.svg?react";

const CartIcon = () => {
  return (
    <div className="cart-icon-container">
      <ShoppingIcon className='shopping-icon'/>
      <span className="item-count">0</span>
    </div>
  );
};

export default CartIcon;
