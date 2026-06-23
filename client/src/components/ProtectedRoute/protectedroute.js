import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const isLoggedIn =
  localStorage.getItem(
    "adminLoggedIn"
  );

if (isLoggedIn !== "true") {

  return <Navigate to="/" />;
}

  return children;
}

export default ProtectedRoute;