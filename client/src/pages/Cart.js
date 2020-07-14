import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import ListItem from "../components/ListItem/ListItem";
import StripeButton from "../components/StripeButton";

export default function Cart() {
  const { user } = useContext(UserContext);
  const { cartData, dispatch } = useContext(CartContext);

  const onDeleteIconClickHandler = (id) => {
    dispatch({
      type: "REMOVE_PRODUCT",
      id,
    });
    toast.error("Item Deleted From Cart!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const createListItem = () => {
    let Item = cartData.map((item) => {
      return (
        <ListItem
          key={item.id}
          id={item.id}
          thumbnail={item.thumbnail}
          title={item.title}
          price={item.price}
          quantity={item.quantity}
          onDeleteIconClickHandler={onDeleteIconClickHandler}
        />
      );
    });
    return Item;
  };

  const calculateTotalAmount = () => {
    let totalAmount = 0;
    cartData.forEach((item) => {
      totalAmount = totalAmount + item.quantity * item.price;
    });
    return totalAmount;
  };

  return (
    <div className="CartWrapper">
      <ToastContainer />
      {cartData.length ? (
        <>
          <div className="ListItemsWraper">
            <h3 className="ListWarrperTitile">
              Total Items: {cartData.length}
            </h3>
            {createListItem()}
          </div>
          <div className="CheckOutCard">
            <h2>Cart Total</h2>
            <p>
              Total Amount: &nbsp;
              <FaRupeeSign />
              <span>{calculateTotalAmount()}</span>
            </p>
            {user ? (
              <StripeButton
                price={calculateTotalAmount()}
                title="Proceed to Buy"
              />
            ) : (
              <Link to="/login">Login</Link>
            )}

            <div className="Note">
              <p>Please use the below card data for payment.</p>
              <p>
                Card No: <b>4242 4242 4242 4242</b>
              </p>
              <p>
                Expiry: <b>12/21</b>
              </p>
              <p>
                CVV: <b>123</b>
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="EmptyCartWrapper">
          <h1>Your cart is currently empty.</h1>
          <Link to="/">Return to shop</Link>
        </div>
      )}
    </div>
  );
}
