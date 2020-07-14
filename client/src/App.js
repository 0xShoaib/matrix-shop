import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

import CartContextProvider from "./context/CartContext";
import UserContextProvider from "./context/UserContext";
import "./App.css";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className="App">
          <CartContextProvider>
            <Header />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/product/:id" component={ProductPage} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </CartContextProvider>
        </div>
      </UserContextProvider>
    </BrowserRouter>
  );
}

export default App;
