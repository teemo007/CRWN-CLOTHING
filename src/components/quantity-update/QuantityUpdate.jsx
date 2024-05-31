import React, { useContext,useEffect } from "react";
import { CartContext } from "../../contexts/cart.context";

const QuantityUpdate = ({ id }) => {
  const { isItemEditable, setIsItemEditable, updateItemQuantityFromCart } =
    useContext(CartContext);

    
  const handleChange = (e) => {
    setIsItemEditable((prev) => ({ ...prev, [id]: +e.target.value }));
    //console.log("isItemEditable",isItemEditable)
  };
  const handleUpdate = () => {
    updateItemQuantityFromCart(id, isItemEditable[id]);
    // setIsItemEditable((prev)=> {
    //     const { [id]: _, ...newEditableState } = prev; // Remove the item from the state
    //   return newEditableState;
    // });
  };

  const handleClose = () => {
    setIsItemEditable((prev) => {
      const newEditableState = { ...prev };
      delete newEditableState[id];
      return newEditableState;
    });
  };

  return (
    <div>
      <input type="number" onChange={handleChange} value={isItemEditable[id] || ""} />
      <button onClick={handleUpdate}>Update</button> <span onClick={handleClose}>&#10005;</span>
    </div>
  );
};

export default QuantityUpdate;
