import React, { useState, useContext, useRef,useEffect } from "react";
import { CartContext } from "../../contexts/cart.context";
import {/* QuantityButton, */QuantityUpdateContainer,QuantityInput} from"./quantity-update.styles.jsx";
import Button,{BUTTON_TYPES_CLASSES} from "../button/button.component.jsx";

const QuantityUpdate = ({ id, currentQuantity }) => {

  const {setIsItemEditable,updateItemQuantityFromCart} = useContext(CartContext)
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
       updateItemQuantityFromCart(id, parseInt(quantity, 10));
     }
     setIsItemEditable((prev) => {
      const newProducts = {...prev}
      delete newProducts[id]
      return newProducts
     });
    
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
      <Button buttonType={BUTTON_TYPES_CLASSES.update} onClick={handleQuantityUpdate}>
        Update
      </Button>
    </QuantityUpdateContainer>
  );
};

export default QuantityUpdate;
