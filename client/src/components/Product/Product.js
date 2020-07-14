import React, { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FiShoppingCart } from "react-icons/fi";
import { FaRupeeSign } from "react-icons/fa";

import classes from "./Product.module.css";
import NumberInput from "../NumberInput";
import { CartContext } from "../../context/CartContext";

export default function Product({
  id,
  title,
  thumbnail,
  price,
  description,
  inStock,
}) {
  const { cartData, dispatch } = useContext(CartContext);

  const [productQuantity, setProductQuantity] = useState(1);

  const onNextBtnClick = () => {
    setProductQuantity((prevState, nextState) => {
      return prevState + 1;
    });
  };

  const onPrevBtnClick = () => {
    setProductQuantity((prevState, nextState) => {
      return prevState - 1;
    });
  };

  const onAddToCartClick = () => {
    console.log("Product Dispatch Called..");

    let data = cartData.find((item) => item.id === id);
    console.log(data);

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
          quantity: data.quantity + productQuantity,
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
          quantity: productQuantity,
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
    <div className={classes.ProductWrapper}>
      <div className={classes.ProductThumbnail}>
        <img src={thumbnail} alt={title} />
      </div>

      <div className={classes.ProductInfo}>
        <div className={classes.ProductHeader}>
          <h1 className={classes.ProductTitle}>{title}</h1>

          {!inStock ? (
            <p className={classes.ProductOutOfStock}>Out Of Stock</p>
          ) : price > 500 ? (
            <p className={classes.ProductSale}>SALE</p>
          ) : null}
        </div>

        {price > 500 ? (
          <p className={classes.ProductPrice}>
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
          <p className={classes.ProductPrice}>
            <FaRupeeSign />
            {price}
          </p>
        )}

        <p className={classes.ProductDescription}>{description}</p>

        {inStock ? (
          <>
            <NumberInput
              value={productQuantity}
              onNextBtnClick={onNextBtnClick}
              onPrevBtnClick={onPrevBtnClick}
            />
            <button className={classes.CardButton} onClick={onAddToCartClick}>
              Add to cart
              <FiShoppingCart className={classes.CardIcon} />
            </button>
          </>
        ) : null}
      </div>
      <ToastContainer />
    </div>
  );
}
