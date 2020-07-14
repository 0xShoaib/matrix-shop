import React from "react";
import classes from "./Banner.module.css";

import BannerImage from "../../assets/banner.jpg";

export default function Banner() {
  return (
    <section className={classes.Banner}>
      <img src={BannerImage} alt="Banner Inage" />
    </section>
  );
}
