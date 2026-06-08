import React, {
  useState
} from "react";

import "./signup.css";

import Navbar
from "../../components/Navbar/navbar";

import {
  useNavigate,
  Link
} from "react-router-dom";

function Signup() {

  const navigate =
    useNavigate();

  const [formData, setFormData] =
    useState({

      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });

  const [error, setError] =
    useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
      e.target.value
    });
  };

  const handleSignup = (e) => {

    e.preventDefault();

    const {
      name,
      email,
      password,
      confirmPassword
    } = formData;

    // Empty Fields Validation

    if(
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ){

      setError(
        "All fields are required"
      );

      return;
    }

    // Email Validation

    const emailPattern =

      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(
      !emailPattern.test(email)
    ){

      setError(
        "Enter valid email"
      );

      return;
    }

    // Password Length

    if(password.length < 6){

      setError(
        "Password must be at least 6 characters"
      );

      return;
    }

    // Confirm Password

    if(
      password !== confirmPassword
    ){

      setError(
        "Passwords do not match"
      );

      return;
    }

    // Existing User Check

    const existingUser =

      JSON.parse(
        localStorage.getItem("customer")
      );

    if(
      existingUser &&
      existingUser.email === email
    ){

      setError(
        "User already exists"
      );

      return;
    }

    // Save User

    localStorage.setItem(

      "customer",

      JSON.stringify({

        name,
        email,
        password
      })
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

          {
            error && (

              <p className="error-text">

                {error}

              </p>
            )
          }

          <input
            type="text"

            name="name"

            placeholder="Enter Name"

            className="form-control"

            value={formData.name}

            onChange={handleChange}
          />

          <input
            type="email"

            name="email"

            placeholder="Enter Email"

            className="form-control"

            value={formData.email}

            onChange={handleChange}
          />

          <input
            type="password"

            name="password"

            placeholder="Enter Password"

            className="form-control"

            value={formData.password}

            onChange={handleChange}
          />

          <input
            type="password"

            name="confirmPassword"

            placeholder="Confirm Password"

            className="form-control"

            value={formData.confirmPassword}

            onChange={handleChange}
          />

          <button className="btn btn-primary w-100">

            Signup

          </button>

          <p className="text-center">

            Already have account?

            <Link to="/login">

              Login

            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Signup;