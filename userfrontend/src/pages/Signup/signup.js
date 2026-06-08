import React, {
  useState
} from "react";

import "./signup.css";

import Navbar
from "../../components/Navbar/navbar";

import {
  useNavigate
} from "react-router-dom";

function Signup() {

  const navigate =
    useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = (e) => {

    e.preventDefault();

    const userData = {

      name,
      email,
      password
    };

    localStorage.setItem(
      "customer",
      JSON.stringify(userData)
    );

    alert("Signup Successful");

    navigate("/login");
  };

  return (

    <div>

      <Navbar />

      <div className="signup-container">

        <form
          className="signup-form"

          onSubmit={handleSignup}
        >

          <h2>

            Customer Signup

          </h2>

          <input
            type="text"

            placeholder="Enter Name"

            className="form-control"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            type="email"

            placeholder="Enter Email"

            className="form-control"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"

            placeholder="Enter Password"

            className="form-control"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button className="btn btn-primary w-100">

            Signup

          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;