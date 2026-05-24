import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Signup from "./SignUp/signup";
import POS from "./pages/POS/pos";
import Products from "./pages/Products/products";
import Inventory from "./pages/Inventory/inventory";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

      <Route
  path="/pos"
  element={<POS />}
/>
         <Route
  path="/products"
  element={<Products />}
         
/>
<Route
  path="/inventory"
  element={<Inventory />}
/>
      </Routes>

    </BrowserRouter>
  );
}

export default App;