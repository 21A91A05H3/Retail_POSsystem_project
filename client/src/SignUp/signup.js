import React, { useState } from "react";

import axios from "axios";

import "./signup.css";

import {
  Link,
  Navigate,
  useNavigate
} from "react-router-dom";

import { toast } from "react-toastify";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const isLoggedIn =
    localStorage.getItem("adminLoggedIn");

  if (isLoggedIn === "true") {

    return <Navigate to="/dashboard" />;

  }

  const handleSignup = async (e) => {

    e.preventDefault();

    let validationErrors = {};

    if (name === "") {

      validationErrors.name =
        "Full name is required";

    }

    if (email === "") {

      validationErrors.email =
        "Email is required";

    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      email &&
      !emailPattern.test(email)
    ) {

      validationErrors.email =
        "Enter valid email";

    }

    if (phone === "") {

      validationErrors.phone =
        "Phone number is required";

    }
    else if (
      !/^[6-9]\d{9}$/.test(phone)
    ) {

      validationErrors.phone =
        "Enter valid 10-digit phone number";

    }

    if (password === "") {

      validationErrors.password =
        "Password is required";

    }
    else if (password.length < 6) {

      validationErrors.password =
        "Password must be at least 6 characters";

    }

    if (confirmPassword === "") {

      validationErrors.confirmPassword =
        "Confirm your password";

    }
    else if (password !== confirmPassword) {

      validationErrors.confirmPassword =
        "Passwords do not match";

    }

    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).length > 0
    ) {

      return;

    }

    try {

      const response =
        await axios.post(

          "http://localhost:5000/api/auth/register",

          {

            name,

            email,

            phone,

            password,

            role: "admin"

          }

        );

      if (response.data.success) {

        toast.success(
          "Signup Successful"
        );

        setName("");

        setEmail("");

        setPhone("");

        setPassword("");

        setConfirmPassword("");

        setTimeout(() => {

          navigate("/");

        }, 1500);

      }

    }
    catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Registration Failed"

      );

    }

  };

  return (

    <div className="signup-container">

      <div className="signup-box">

        <h2 className="text-center text-primary mb-4">

          Create Admin Account

        </h2>

        <form onSubmit={handleSignup}>

          <div className="mb-3">

            <label>Full Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />

            <small className="text-danger">

              {errors.name}

            </small>

          </div>

          <div className="mb-3">

            <label>Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <small className="text-danger">

              {errors.email}

            </small>

          </div>

          <div className="mb-3">

            <label>Phone Number</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
            />

            <small className="text-danger">

              {errors.phone}

            </small>

          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <small className="text-danger">

              {errors.password}

            </small>

          </div>

          <div className="mb-3">

            <label>Confirm Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />

            <small className="text-danger">

              {errors.confirmPassword}

            </small>

          </div>

          <button className="btn btn-success w-100">

            Sign Up

          </button>

          <p className="text-center mt-3">

            Already have an account?

            <Link to="/"> Login</Link>

          </p>

        </form>

      </div>

    </div>

  );

}

export default Signup;