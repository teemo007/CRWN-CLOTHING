import { useContext } from "react";
import {CheckoutItemContainer,ImageContainer,BaseSpan,Quantity,Arrow,Value,RemoveButton} from"./checkout-item.styles.jsx";
import { CartContext } from "../../contexts/cart.context";
import QuantityUpdate from "../quantity-update/QuantityUpdate";

const CheckOutItem = ({ cartItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  const {
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    isItemEditable,
    setIsItemEditable,
  } = useContext(CartContext);
  const RemoveHandler = () => deleteItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  const handleEditQuantity = () => {
    setIsItemEditable((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemHandler}>
          &#10094;
        </Arrow>

        {isItemEditable[id] ? (
          <QuantityUpdate id={id} currentQuantity={quantity} />
        ) : (
          <Value onClick={handleEditQuantity}>
            {quantity}
          </Value>
        )}

        <Arrow onClick={addItemHandler}>
          &#10095;
        </Arrow>
      </Quantity>
      <BaseSpan>${price}</BaseSpan>
      <RemoveButton onClick={RemoveHandler}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckOutItem;
