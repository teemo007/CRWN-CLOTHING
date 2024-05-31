import { useContext } from "react";
import "./checkout-item.styles.scss";
import { CartContext } from "../../contexts/cart.context";
import QuantityUpdate from "../quantity-update/QuantityUpdate";

const CheckOutItem = ({ cartItem }) => {
  const { id, name, imageUrl, price, quantity } = cartItem;
  const {
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    /* isEditable,setIsEditable */ isItemEditable,
    setIsItemEditable,
  } = useContext(CartContext);
  const RemoveHandler = () => deleteItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={removeItemHandler}>
          &#10094;
        </div>
        <span
          className="value"
          onClick={() =>
            setIsItemEditable((prev) => ({
              ...prev,
              [id]: quantity,
            }))
          }
        >
          {isItemEditable[id] ? <QuantityUpdate id={id}/> : quantity}
        </span>
        <div className="arrow" onClick={addItemHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">${price}</span>
      <div className="remove-button" onClick={RemoveHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckOutItem;
