import React, { useState } from "react";

import "./Login.css";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { toast }
from "react-toastify";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errors, setErrors] =
    useState({});

  const handleLogin = (e) => {

    e.preventDefault();

    let validationErrors = {};

    if(email === ""){

      validationErrors.email =
        "Email is required";
    }

    if(password === ""){

      validationErrors.password =
        "Password is required";
    }
    else if(password.length < 6){

      validationErrors.password =
        "Password must be at least 6 characters";
    }

    setErrors(validationErrors);

    if(
      Object.keys(validationErrors).length === 0
    ){

      const storedUser = JSON.parse(

        localStorage.getItem("user")
      );

      if(

        storedUser &&
        storedUser.email === email &&
        storedUser.password === password
      ){

        localStorage.setItem(

          "isLoggedIn",
          true
        );

        toast.success(
          "Login Successful"
        );

        navigate("/dashboard");
      }
      else{

        toast.error(
          "Invalid Email or Password"
        );
      }
    }
  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2 className="text-center text-primary mb-4">

          Retail POS Login

        </h2>

        <form onSubmit={handleLogin}>

          <div className="mb-3">

            <label>
              Email
            </label>

            <input
              type="email"

              className="form-control"

              placeholder="Enter email"

              value={email}

              onChange={(e) => {

                setEmail(e.target.value);

                setErrors({

                  ...errors,

                  email: ""
                });
              }}
            />

            <small className="text-danger">

              {errors.email}

            </small>

          </div>

          <div className="mb-3">

            <label>
              Password
            </label>

            <input
              type="password"

              className="form-control"

              placeholder="Enter password"

              value={password}

              onChange={(e) => {

                setPassword(e.target.value);

                setErrors({

                  ...errors,

                  password: ""
                });
              }}
            />

            <small className="text-danger">

              {errors.password}

            </small>

          </div>

          <button className="btn btn-primary w-100">

            Login

          </button>

        </form>

        <p className="text-center mt-3">

          Don't have an account?

          <Link to="/signup">
            {" "}
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;