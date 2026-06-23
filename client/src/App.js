import React from "react";

import { ToastContainer }
from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute
from "./components/ProtectedRoute/protectedroute";

import Login
from "./pages/Login/Login";

import Signup
from "./SignUp/signup";

import Dashboard
from "./pages/Dashboard/Dashboard";

import POS
from "./pages/POS/pos";

import Products
from "./pages/Products/products";

import Inventory
from "./pages/Inventory/inventory";

import Orders
from "./pages/Orders/orders";

import Customers
from "./pages/Customers/customers";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login Page */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/inventory"
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pos"
          element={
            <ProtectedRoute>
              <POS />
            </ProtectedRoute>
          }
        />

      </Routes>

      <ToastContainer />

    </BrowserRouter>
  );
}

export default App;