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

  const [error, setError] =
    useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    // Empty Validation

    if(!email || !password){

      setError(
        "All fields are required"
      );

      return;
    }

    // Fetch User

    const storedUser =

      JSON.parse(
        localStorage.getItem("customer")
      );

    // User Check

    if(!storedUser){

      setError(
        "No account found. Please signup."
      );

      return;
    }

    // Credential Match

    if(

      storedUser.email === email &&
      storedUser.password === password

    ){

      localStorage.setItem(
        "isLoggedIn",
        true
      );

      alert("Login Successful");

      navigate("/");
    }
    else{

      setError(
        "Invalid email or password"
      );
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
            error && (

              <p className="error-text">

                {error}

              </p>
            )
          }

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

            Login

          </button>

          <p className="text-center">

            Don't have account?

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