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
      </Routes>

    </BrowserRouter>
  );
}

export default App;