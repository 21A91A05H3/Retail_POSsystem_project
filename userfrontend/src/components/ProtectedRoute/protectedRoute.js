import React from "react";

import {
  Navigate
} from "react-router-dom";

function ProtectedRoute({ children }) {

  const token =
    localStorage.getItem("token");

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  if (
    !token ||
    isLoggedIn !== "true"
  ) {

    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;