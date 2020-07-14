import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FiShoppingCart } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import { FaRupeeSign } from "react-icons/fa";

import classes from "./Card.module.css";
import { CartContext } from "../../context/CartContext";

export default function Card({ id, thumbnail, title, price, inStock }) {
  const { cartData, dispatch } = useContext(CartContext);

  const onAddToCartClick = () => {
    console.log("Product Dispatch Called..");

    let data =
      cartData !== null ? cartData.find((item) => item.id === id) : null;

    if (data) {
      dispatch({
        type: "REMOVE_PRODUCT",
        id,
      });

      dispatch({
        type: "ADD_PRODUCT",
        product: {
          id,
          title,
          price: price > 500 ? price - 300 : price,
          quantity: data.quantity + 1,
          thumbnail,
        },
      });
    } else {
      dispatch({
        type: "ADD_PRODUCT",
        product: {
          id,
          title,
          price: price > 500 ? price - 300 : price,
          quantity: 1,
          thumbnail,
        },
      });
    }
    toast.success("Item Added To Cart!", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  return (
    <div className={classes.Card}>
      <ToastContainer />
      <Link to={`/product/${id}`}>
        {!inStock ? (
          <p className={classes.CardInfo}>SOLD</p>
        ) : price > 500 ? (
          <p className={classes.CardInfo}>SALE</p>
        ) : null}
        <div className={classes.CardImage}>
          <img src={thumbnail} alt={title} />
        </div>
        <h1 className={classes.CardTitle}>{title}</h1>
        {price > 500 ? (
          <p className={classes.CardPrice}>
            <span>
              <strike>
                <FaRupeeSign />
                {price}
              </strike>
            </span>{" "}
            <FaRupeeSign />
            {price - 300}
          </p>
        ) : (
          <p className={classes.CardPrice}>
            <FaRupeeSign />
            {price}
          </p>
        )}
      </Link>
      {inStock ? (
        <button className={classes.CardButton} onClick={onAddToCartClick}>
          Add to cart
          <FiShoppingCart className={classes.CardIcon} />
        </button>
      ) : (
        <Link
          to={`/product/${id}`}
          className={`${classes.CardButton} ${classes.ReadMoreBtn}`}
        >
          Read More
          <BsArrowRight className={classes.CardIcon} />
        </Link>
      )}
    </div>
  );
}
