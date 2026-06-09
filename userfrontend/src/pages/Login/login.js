import React, {
  useState
} from "react";

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

  const handleLogin = (e) => {

    e.preventDefault();

    let validationErrors = {};

    // Email Validation

    if(!email){

      validationErrors.email =
        "Email is required";
    }

    // Password Validation

    if(!password){

      validationErrors.password =
        "Password is required";
    }

    setErrors(validationErrors);

    // Stop Validation

    if(
      Object.keys(validationErrors)
      .length > 0
    ){
      return;
    }

    // Fetch User

    const storedUser =

      JSON.parse(
        localStorage.getItem("customer")
      );

    // User Check

    if(!storedUser){

      setErrors({

        general:
        "No account found. Please signup."
      });

      return;
    }

    // Credential Match

    if(

      storedUser.email === email &&
      storedUser.password === password

    ){

      // Login Session

      localStorage.setItem(
        "isLoggedIn",
        true
      );

      // Store Username

      localStorage.setItem(
        "loggedInUser",
        storedUser.name
      );

      // Clear Form

      setEmail("");
      setPassword("");

      navigate("/");
    }
    else{

      setErrors({

        general:
        "Invalid email or password"
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