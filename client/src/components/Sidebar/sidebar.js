import React from "react";

import "./sidebar.css";

import {

  FaTachometerAlt,
  FaCashRegister,
  FaBoxOpen,
  FaWarehouse,
  FaShoppingCart,
  FaUsers,
  FaSignOutAlt

} from "react-icons/fa";

import {

  Link,
  useLocation,
  useNavigate

} from "react-router-dom";

import { toast }
from "react-toastify";

function Sidebar() {

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const handleLogout = () => {

    localStorage.removeItem(
      "isLoggedIn"
    );

    toast.success(
      "Logout Successful"
    );

    navigate("/");
  };

  return (

    <div className="sidebar">

      <h2 className="logo">

        Retail POS

      </h2>

      <ul className="sidebar-menu">

        <Link
          to="/dashboard"

          className={
            location.pathname === "/dashboard"
            ?
            "active"
            :
            ""
          }
        >

          <li>

            <FaTachometerAlt className="icon" />

            Dashboard

          </li>

        </Link>

        <Link
          to="/pos"

          className={
            location.pathname === "/pos"
            ?
            "active"
            :
            ""
          }
        >

          <li>

            <FaCashRegister className="icon" />

            POS

          </li>

        </Link>

        <Link
          to="/products"

          className={
            location.pathname === "/products"
            ?
            "active"
            :
            ""
          }
        >

          <li>

            <FaBoxOpen className="icon" />

            Products

          </li>

        </Link>

        <Link
          to="/inventory"

          className={
            location.pathname === "/inventory"
            ?
            "active"
            :
            ""
          }
        >

          <li>

            <FaWarehouse className="icon" />

            Inventory

          </li>

        </Link>

        <Link
          to="/orders"

          className={
            location.pathname === "/orders"
            ?
            "active"
            :
            ""
          }
        >

          <li>

            <FaShoppingCart className="icon" />

            Orders

          </li>

        </Link>

        <Link
          to="/customers"

          className={
            location.pathname === "/customers"
            ?
            "active"
            :
            ""
          }
        >

          <li>

            <FaUsers className="icon" />

            Customers

          </li>

        </Link>

        <li
          className="logout"

          onClick={handleLogout}
        >

          <FaSignOutAlt className="icon" />

          Logout

        </li>

      </ul>

    </div>
  );
}

export default Sidebar;