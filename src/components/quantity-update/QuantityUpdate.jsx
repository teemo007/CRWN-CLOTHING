import React, { useState, useRef, useEffect } from "react";
import {
  /* QuantityButton, */ QuantityUpdateContainer,
  QuantityInput,
} from "./quantity-update.styles.jsx";
import Button, { BUTTON_TYPES_CLASSES } from "../button/button.component.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsItemEditable,
  updateItemQuantityFromCart,
} from "../../store/cart/cart.action.js";
import {
  selectCartItems,
  selectIsItemEditable,
} from "../../store/cart/cart.selector.js";

const QuantityUpdate = ({ id, currentQuantity }) => {
  const dispatch = useDispatch();

  const ItemEditable = useSelector(selectIsItemEditable);

  const cartItems = useSelector(selectCartItems);

  const [quantity, setQuantity] = useState(currentQuantity);

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;
    if (!isNaN(value) && value >= 0) {
      setQuantity(value);
    }
  };

  const handleQuantityUpdate = () => {
    // Similar validation logic as handleBlur

    if (!isNaN(quantity) && quantity >= 0) {
      dispatch(
        updateItemQuantityFromCart(cartItems, id, parseInt(quantity, 10))
      );
    }
    const newEditableItems = { ...ItemEditable };
    delete newEditableItems[id];

    dispatch(setIsItemEditable(newEditableItems));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleQuantityUpdate();
    }
  };

  return (
    <QuantityUpdateContainer>
      <QuantityInput
        type="text"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={quantity}
        pattern="\d*"
        maxLength="2"
        ref={inputRef}
      />
      <Button
        buttonType={BUTTON_TYPES_CLASSES.update}
        onClick={handleQuantityUpdate}
      >
        Update
      </Button>
    </QuantityUpdateContainer>
  );
};

export default QuantityUpdate;
