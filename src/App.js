import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notification from "./components/Notification";

import { uiActions } from "./store/ui-slice";

import "./App.css";

let isFirstRender = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  //const cartItems = useSelector((state) => state.cart.itemsList);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {
      // send state as Sending request
      dispatch(uiActions.showNotification({
        open: true,
        type: 'warning',
        message: 'Sending Request',
      }));

      const res = await fetch(
        "https://redux-shopping-app-dce42-default-rtdb.firebaseio.com/cartItems.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      // Send state as Request is successful
      dispatch(uiActions.showNotification({
        open: true,
        type: 'success',
        message: 'Send Request To Database Successfully',
      }));

    };
    sendRequest().catch(err => {
      console.log({ err });

      // Send state as Error
      dispatch(uiActions.showNotification({
        open: true,
        type: 'error',
        message: 'Sending Request Failed',
      }));
    });
  }, [cart]);

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
