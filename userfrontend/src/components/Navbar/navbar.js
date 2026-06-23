import React from "react";

import "./navbar.css";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  FaShoppingCart,
  FaUserCircle,
  FaSignOutAlt
} from "react-icons/fa";

function Navbar() {

  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn");

  const loggedInUser =
    localStorage.getItem("loggedInUser");

  const cartItems =
    JSON.parse(
      localStorage.getItem("cart")
    ) || [];

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {

    if (
      window.confirm(
        "Are you sure you want to logout?"
      )
    ) {

      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInUser");
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("cart");

      navigate("/login");
    }
  };

  return (

    <nav className="custom-navbar">

      <h2
        className="logo"
        onClick={() => navigate("/home")}
        style={{ cursor: "pointer" }}
      >
        🛒 Retail Shop
      </h2>

      <ul className="nav-links">

        <li>
          <Link to="/home">Home</Link>
        </li>

        {isLoggedIn && (
          <li>
            <Link to="/orders">
              Orders
            </Link>
          </li>
        )}

        {isLoggedIn && (
          <li>
            <Link to="/cart">
              <FaShoppingCart />
              {" "}
              Cart ({cartCount})
            </Link>
          </li>
        )}

        {isLoggedIn ? (
          <>
            <li className="user-name">
              Hi, {loggedInUser} 👋
            </li>

            <li>
              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                <FaSignOutAlt />
                {" "}
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">
              <FaUserCircle />
              {" "}
              Login
            </Link>
          </li>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;