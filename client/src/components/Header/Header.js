import React from "react";
import classes from "./Header.module.css";
import Logo from "../Logo";
import Menu from "../Menu";

export default function Header() {
  return (
    <header className={classes.Header}>
      <Logo />
      <Menu />
    </header>
  );
}
