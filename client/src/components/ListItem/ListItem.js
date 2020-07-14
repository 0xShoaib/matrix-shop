import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRupeeSign } from "react-icons/fa";

import classes from "./ListItem.module.css";

export default function ListItem({
  id,
  thumbnail,
  title,
  price,
  quantity,
  onDeleteIconClickHandler,
}) {
  return (
    <div className={classes.ListItem}>
      <div className={classes.ListProductInfoWrapper}>
        <div className={classes.ThumbnailWrapper}>
          <img src={thumbnail} alt={title} />
        </div>
        <div className={classes.InfoWrapper}>
          <h1 className={classes.ListTitle}>{title}</h1>
          <p className={classes.ListPrice}>
            <FaRupeeSign />
            {price}
          </p>
          <p className={classes.ListQuantity}>x{quantity}</p>
        </div>
      </div>
      <div className={classes.ListTotalWarpper}>
        <p className={classes.ListTotalPrice}>
          Sub Total: &nbsp;
          <FaRupeeSign />
          <b>{price * quantity}</b>
        </p>
        <AiOutlineDelete
          className={classes.DeleteIcon}
          onClick={() => {
            onDeleteIconClickHandler(id);
          }}
        />
      </div>
    </div>
  );
}
