import React from "react";
import { useSelector } from "react-redux";

import Auth from "./components/Auth";
import Layout from "./components/Layout";

import "./App.css";

function App() {
  const cartItems = useSelector(state => state.cart.itemsList);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
  console.log({ cartItems })

  return (
    <div className="App">
      { !isLoggedIn && <Auth />}
      { isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
