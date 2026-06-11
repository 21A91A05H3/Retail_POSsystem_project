import React from "react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home
from "./pages/Home/home";

import Cart
from "./pages/Cart/cart";
import Signup
from "./pages/Signup/signup";
import Login
from "./pages/Login/login";
import Orders
from "./pages/Orders/orders";
function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
  path="/signup"
  element={<Signup />}
/>
<Route
  path="/login"
  element={<Login />}
/>
<Route
  path="/orders"
  element={<Orders />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;