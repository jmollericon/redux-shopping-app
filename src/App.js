import React from "react";
import { useSelector } from "react-redux";

import Auth from "./components/Auth";
import Layout from "./components/Layout";

import "./App.css";

function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn)

  return (
    <div className="App">
      { !isLoggedIn && <Auth />}
      { isLoggedIn && <Layout /> }
    </div>
  );
}

export default App;
