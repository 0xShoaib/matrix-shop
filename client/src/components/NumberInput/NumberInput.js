import React from "react";
import classes from "./NumberInput.module.css";

export default function NumberInput({ value, onNextBtnClick, onPrevBtnClick }) {
  return (
    <div className={classes.NumberInput}>
      <div className={classes.NextWarpper} onClick={onNextBtnClick}>
        <span className={classes.Next}></span>
      </div>
      <div className={classes.PrevWarpper} onClick={onPrevBtnClick}>
        <span className={classes.Prev}></span>
      </div>
      <div className={classes.Box}>
        <span>{value <= 0 ? 1 : value}</span>
      </div>
    </div>
  );
}
