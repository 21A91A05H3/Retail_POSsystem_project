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

function Sidebar() {

  return (

    <div className="sidebar">

      <h2 className="logo">
        Retail POS
      </h2>

      <ul className="sidebar-menu">

        <li>
          <FaTachometerAlt className="icon" />
          Dashboard
        </li>

        <li>
          <FaCashRegister className="icon" />
          POS
        </li>

        <li>
          <FaBoxOpen className="icon" />
          Products
        </li>

        <li>
          <FaWarehouse className="icon" />
          Inventory
        </li>

        <li>
          <FaShoppingCart className="icon" />
          Orders
        </li>

        <li>
          <FaUsers className="icon" />
          Customers
        </li>

        <li className="logout">
          <FaSignOutAlt className="icon" />
          Logout
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;