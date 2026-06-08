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
      </Routes>

    </BrowserRouter>
  );
}

export default App;