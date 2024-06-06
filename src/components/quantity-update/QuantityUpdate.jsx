import React, { useState, useContext, useRef,useEffect } from "react";
import { CartContext } from "../../contexts/cart.context";
import "./quantity-update.styles.scss";

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


  return (
    <div className="quantity-update-container">
      <input
        type="text"
        onChange={handleChange}
        value={quantity}
        pattern="\d*"
        maxLength="2"
        className="quantity-input"
        ref={inputRef}
      />
      <button onClick={handleQuantityUpdate} className="update-button">
        Update
      </button>
    </div>
  );
};

export default QuantityUpdate;
