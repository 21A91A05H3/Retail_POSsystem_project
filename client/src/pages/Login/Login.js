import React, { useState } from "react";

import axios from "axios";

import "./Login.css";

import {
  Link,
  useNavigate,
  Navigate
} from "react-router-dom";

import { toast } from "react-toastify";

function Login() {

  const navigate = useNavigate();

  const [login, setLogin] = useState("");

  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});

  const isLoggedIn =
    localStorage.getItem("adminLoggedIn");

  if (isLoggedIn === "true") {

    return <Navigate to="/dashboard" />;

  }

  const handleLogin = async (e) => {

    e.preventDefault();

    let validationErrors = {};

    if (!login) {

      validationErrors.login =
        "Email or Phone Number is required";

    }

    if (!password) {

      validationErrors.password =
        "Password is required";

    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {

      return;

    }

    try {

      const response = await axios.post(

        "http://localhost:5000/api/auth/login",

        {

          login,

          password

        }

      );

      if (response.data.success) {

        localStorage.setItem(

          "adminLoggedIn",

          "true"

        );

        localStorage.setItem(

          "adminToken",

          response.data.token

        );

        localStorage.setItem(

          "adminData",

          JSON.stringify(response.data.user)

        );

        toast.success(

          "Login Successful"

        );

        navigate("/dashboard");

      }

    }

    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Login Failed"

      );

    }

  };

  return (

    <div className="login-container">

      <div className="login-box">

        <h2 className="text-center text-primary mb-4">

          Retail POS Admin Login

        </h2>

        <form onSubmit={handleLogin}>

          <div className="mb-3">

            <label>

              Email or Phone Number

            </label>

            <input

              type="text"

              className="form-control"

              placeholder="Enter Email or Phone Number"

              value={login}

              onChange={(e) => {

                setLogin(e.target.value);

                setErrors({

                  ...errors,

                  login: ""

                });

              }}

            />

            <small className="text-danger">

              {errors.login}

            </small>

          </div>

          <div className="mb-3">

            <label>

              Password

            </label>

            <input

              type="password"

              className="form-control"

              placeholder="Enter Password"

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

            {" "}Sign Up

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Login;