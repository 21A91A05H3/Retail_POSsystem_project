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

  const navigate =
    useNavigate();

  const isLoggedIn =
    localStorage.getItem(
      "isLoggedIn"
    );

  const loggedInUser =
    localStorage.getItem(
      "loggedInUser"
    );

  const handleLogout = () => {

    const confirmLogout =

      window.confirm(
        "Are you sure you want to logout?"
      );

    if(confirmLogout){

      localStorage.removeItem(
        "isLoggedIn"
      );

      localStorage.removeItem(
        "loggedInUser"
      );

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "userData"
      );

      localStorage.removeItem(
        "cart"
      );

      alert(
        "Logged Out Successfully"
      );

      navigate("/login");
    }
  };

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

        {
          isLoggedIn && (

            <li>

              <Link to="/orders">

                Orders

              </Link>

            </li>
          )
        }

        {
          isLoggedIn && (

            <li>

              <Link to="/cart">

                <FaShoppingCart />

                {" "}

                Cart

              </Link>

            </li>
          )
        }

        {
          isLoggedIn

          ?

          <>

            <li className="user-name">

              Hi,

              {" "}

              {loggedInUser}

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

          :

          <li>

            <Link to="/login">

              <FaUserCircle />

              {" "}

              Login

            </Link>

          </li>
        }

      </ul>

    </nav>
  );
}

export default Navbar;