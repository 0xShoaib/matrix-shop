import React from "react";
import classes from "./ProductLoader.module.css";

export default function ProductLoader() {
  return (
    <div className={classes.ProductLoader}>
      <div className={classes.ProductLoaderImage}>
        <div className={classes.ProductLoaderSkeleton}>
          <div className={classes.ProductLoaderIndicator}></div>
        </div>
      </div>
      <div className={classes.ProductLoaderInfo}>
        <div className={classes.ProductLoaderTitle}>
          <div className={classes.ProductLoaderSkeleton}>
            <div className={classes.ProductLoaderIndicator}></div>
          </div>
        </div>
        <div className={classes.ProductLoaderPrice}>
          <div className={classes.ProductLoaderSkeleton}>
            <div className={classes.ProductLoaderIndicator}></div>
          </div>
        </div>
        <div className={classes.FirstPara}>
          <div className={classes.ProductLoaderSkeleton}>
            <div className={classes.ProductLoaderIndicator}></div>
          </div>
        </div>
        <div className={classes.SecondPara}>
          <div className={classes.ProductLoaderSkeleton}>
            <div className={classes.ProductLoaderIndicator}></div>
          </div>
        </div>
        <div className={classes.ThirdPara}>
          <div className={classes.ProductLoaderSkeleton}>
            <div className={classes.ProductLoaderIndicator}></div>
          </div>
        </div>
        <div className={classes.FourthPara}>
          <div className={classes.ProductLoaderSkeleton}>
            <div className={classes.ProductLoaderIndicator}></div>
          </div>
        </div>
        <div className={classes.FifthPara}>
          <div className={classes.ProductLoaderSkeleton}>
            <div className={classes.ProductLoaderIndicator}></div>
          </div>
        </div>
        <div className={classes.ProductLoaderButton}>
          <div className={classes.ProductLoaderSkeleton}>
            <div className={classes.ProductLoaderIndicator}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
