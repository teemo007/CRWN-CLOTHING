import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
} from "./checkout-item.styles.jsx";

import QuantityUpdate from "../quantity-update/QuantityUpdate";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectIsItemEditable,
} from "../../store/cart/cart.selector.js";
import {
  addItemToCart,
  deleteItemFromCart,
  removeItemFromCart,
  setIsItemEditable,
} from "../../store/cart/cart.action.js";

const CheckOutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { id, name, imageUrl, price, quantity } = cartItem;
  const isItemEditable = useSelector(selectIsItemEditable);

  const RemoveHandler = () => dispatch(deleteItemFromCart(cartItems, cartItem));
  const addItemHandler = () => {
    if (quantity < 99) {
      return dispatch(addItemToCart(cartItems, cartItem));
    }
  };
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  const handleEditQuantity = () =>
    dispatch(
      setIsItemEditable({
        ...isItemEditable,
        [id]: true,
      })
    );

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>

        {isItemEditable[id] ? (
          <QuantityUpdate id={id} currentQuantity={quantity} />
        ) : (
          <Value onClick={handleEditQuantity}>{quantity}</Value>
        )}

        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>${price}</BaseSpan>
      <RemoveButton onClick={RemoveHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckOutItem;
