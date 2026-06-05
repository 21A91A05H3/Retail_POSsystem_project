import React from "react";

import "./navbar.css";

import {
  Link
} from "react-router-dom";

import {
  FaShoppingCart,
  FaUserCircle
} from "react-icons/fa";

function Navbar() {

  return (

    <nav className="custom-navbar">

      <h2 className="logo">

        Retail Shop

      </h2>

      <ul className="nav-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/cart">

            <FaShoppingCart />

            Cart

          </Link>
        </li>

        <li>
          <Link to="/login">

            <FaUserCircle />

            Login

          </Link>
        </li>

      </ul>

    </nav>
  );
}

export default Navbar;