import React, { useContext } from "react";
import StripeCheckout from "react-stripe-checkout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartContext } from "../../context/CartContext";

export default function StripeButton({ price, title }) {
  const { dispatch } = useContext(CartContext);

  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51H15twLh4F9Qi8NKGqLabswdbAwZWu9gEWWbuHLyRHkyEQVupbEwepvHXN1Nf04Mc0QJseVaEJj3Py1eKGacFT2o00GwqBsvgM";

  const onToken = (token) => {
    console.log(token);

    fetch("/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: priceForStripe,
        token,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error) {
          toast.erroe("Payment Error. Try Again", {
            position: "bottom-right",
            autoClose: 2000,
          });
        } else {
          toast.success("Payment Successfull!", {
            position: "bottom-right",
            autoClose: 2000,
          });

          localStorage.setItem("cartData", []);
          dispatch({ type: "CLEAR" });
        }
      });
  };

  return (
    <>
      <StripeCheckout
        name="Matrix Shop"
        billingAddress
        shippingAddress
        image=""
        description={`Your total is Rs.${price}`}
        amount={priceForStripe}
        panelLabel="Pay Now"
        token={onToken}
        stripeKey={publishableKey}
      >
        <button className="BuyNowBtn">{title}</button>
      </StripeCheckout>
      <ToastContainer />
    </>
  );
}
