import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";

import { fetchData, sendCartData } from "./store/cart-actions";

import "./App.css";

let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  //const cartItems = useSelector((state) => state.cart.itemsList);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch]);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  console.log({ notification });

  return (
    <div className="App">
      { notification && <Notification type={notification.type} message={notification.message} /> }
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
