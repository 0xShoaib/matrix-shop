import React, { createContext, useReducer, useEffect } from "react";
import { CartReducer } from "../reducers/CartReducer";

export const CartContext = createContext();

const CartContextProvider = (props) => {
  const [cartData, dispatch] = useReducer(CartReducer, [], () => {
    let localData = localStorage.getItem("cartData");

    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }, [cartData]);

  return (
    <CartContext.Provider value={{ cartData, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
