import React from "react";
import "./navbar.css";

import {
  FaBell,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";

function Navbar() {

  return (

    <div className="navbar">

      <div className="navbar-left">

        <h3>
          Welcome Back 👋
        </h3>

      </div>

      <div className="navbar-right">

        <div className="search-box">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        <FaBell className="nav-icon" />

        <FaUserCircle className="profile-icon" />

      </div>

    </div>
  );
}

export default Navbar;