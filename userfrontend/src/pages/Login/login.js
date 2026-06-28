import React, {
  useState,
  useEffect
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

  const [login, setLogin] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [errors, setErrors] =
    useState({});

  useEffect(() => {

    const token =

      localStorage.getItem(
        "token"
      );

    if(token){

      navigate("/home");

    }

  }, [navigate]);

  const handleLogin = async (e) => {

    e.preventDefault();

    let validationErrors = {};

    if(!login){

      validationErrors.login =
        "Email or Phone Number is required";
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
            login,
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

        setLogin("");

        setPassword("");

        alert(
          "Login Successful"
        );

        navigate("/home");

      }

    } catch(error){

      console.log(
        "Login Error:",
        error
      );

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
            type="text"

            placeholder="Enter Email or Phone Number"

            className="form-control"

            value={login}

            onChange={(e) => {

              setLogin(
                e.target.value
              );

              setErrors({

                ...errors,

                login: "",

                general: ""
              });
            }}
          />

          {
            errors.login && (

              <p className="error-text">

                {errors.login}

              </p>
            )
          }

          <input
            type="password"

            placeholder="Enter Password"

            className="form-control"

            value={password}

            onChange={(e) => {

              setPassword(
                e.target.value
              );

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

          <button
            type="submit"
            className="btn btn-primary w-100"
          >

            Login

          </button>

          <p className="text-center mt-3">

            Don't have an account?

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