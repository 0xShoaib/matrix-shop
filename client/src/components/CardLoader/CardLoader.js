import React from "react";
import classes from "./CardLoader.module.css";

export default function CardLoader() {
  return (
    <div className={classes.CardLoader}>
      <div className={classes.CardLoaderImage}>
        <div className={classes.CardLoaderSkeleton}>
          <div className={classes.CardLoaderIndicator}></div>
        </div>
      </div>
      <div className={classes.CardLoaderTitle}>
        <div className={classes.CardLoaderSkeleton}>
          <div className={classes.CardLoaderIndicator}></div>
        </div>
      </div>
      <div className={classes.CardLoaderPrice}>
        <div className={classes.CardLoaderSkeleton}>
          <div className={classes.CardLoaderIndicator}></div>
        </div>
      </div>
      <div className={classes.CardLoaderButton}>
        <div className={classes.CardLoaderSkeleton}>
          <div className={classes.CardLoaderIndicator}></div>
        </div>
      </div>
    </div>
  );
}
