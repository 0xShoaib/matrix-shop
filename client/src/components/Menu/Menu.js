import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

import classes from "./Menu.module.css";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";

export default function Menu() {
  const { cartData } = useContext(CartContext);
  const { user, dispatch } = useContext(UserContext);

  const history = useHistory();

  const onLogoutClickHandler = () => {
    localStorage.setItem("user", null);
    localStorage.setItem("token", "");
    dispatch({ type: "CLEAR" });
    history.push("/");
  };

  return (
    <div className={classes.MenuWrapper}>
      <Link to="/" className={classes.Link}>
        Home
      </Link>
      {user ? (
        <p className={classes.Link} onClick={onLogoutClickHandler}>
          Logout
        </p>
      ) : (
        <Link to="/login" className={classes.Link}>
          Login
        </Link>
      )}
      <Link to="/cart">
        <div className={classes.Cart}>
          <FiShoppingCart className={classes.CartIcon} />
          <p className={classes.CartCount}>
            {cartData !== null ? cartData.length : 0}
          </p>
        </div>
      </Link>
    </div>
  );
}
