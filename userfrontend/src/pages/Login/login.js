import React, {
  useState
} from "react";

import axios from "axios";

import "./login.css";

import Navbar
from "../../components/Navbar/navbar";

import {
  useNavigate,
  Link
} from "react-router-dom";

function Login() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errors, setErrors] =
    useState({});

  const handleLogin = async (e) => {

    e.preventDefault();

    let validationErrors = {};

    if(!email){

      validationErrors.email =
        "Email is required";
    }

    if(!password){

      validationErrors.password =
        "Password is required";
    }

    setErrors(validationErrors);

    if(
      Object.keys(validationErrors)
      .length > 0
    ){
      return;
    }

    try {

      const response =

        await axios.post(

          "http://localhost:5000/api/auth/login",

          {
            email,
            password
          }
        );

      if(
        response.data.success
      ){

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "loggedInUser",
          response.data.user.name
        );

        localStorage.setItem(
          "userData",
          JSON.stringify(
            response.data.user
          )
        );

        setEmail("");
        setPassword("");

        navigate("/");
      }

    } catch(error){

      setErrors({

        general:

          error.response?.data?.message ||

          "Login Failed"
      });
    }
  };

  return (

    <div>

      <Navbar />

      <div className="login-container">

        <form
          className="login-form"

          onSubmit={handleLogin}
        >

          <h2>

            Customer Login

          </h2>

          {
            errors.general && (

              <p className="error-text">

                {errors.general}

              </p>
            )
          }

          <input
            type="email"

            placeholder="Enter Email"

            className="form-control"

            value={email}

            onChange={(e) => {

              setEmail(e.target.value);

              setErrors({

                ...errors,

                email: "",
                general: ""
              });
            }}
          />

          {
            errors.email && (

              <p className="error-text">

                {errors.email}

              </p>
            )
          }

          <input
            type="password"

            placeholder="Enter Password"

            className="form-control"

            value={password}

            onChange={(e) => {

              setPassword(e.target.value);

              setErrors({

                ...errors,

                password: "",
                general: ""
              });
            }}
          />

          {
            errors.password && (

              <p className="error-text">

                {errors.password}

              </p>
            )
          }

          <button className="btn btn-primary w-100">

            Login

          </button>

          <p className="text-center">

            Don't have account?

            {" "}

            <Link to="/signup">

              Signup

            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;