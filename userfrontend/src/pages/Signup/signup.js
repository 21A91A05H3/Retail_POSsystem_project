import React, { useState } from "react";

import axios from "axios";

import "./signup.css";

import Navbar from "../../components/Navbar/navbar";

import {
  useNavigate,
  Link
} from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    phone: "",

    password: "",

    confirmPassword: ""

  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

    setErrors({

      ...errors,

      [e.target.name]: "",

      general: ""

    });

  };

  const handleSignup = async (e) => {

    e.preventDefault();

    let validationErrors = {};

    const {

      name,

      email,

      phone,

      password,

      confirmPassword

    } = formData;

    if (!name) {

      validationErrors.name =

        "Name is required";

    }

    if (!email) {

      validationErrors.email =

        "Email is required";

    }

    else {

      const emailPattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {

        validationErrors.email =

          "Enter valid email";

      }

    }

    if (!phone) {

      validationErrors.phone =

        "Phone number is required";

    }

    else if (!/^[6-9]\d{9}$/.test(phone)) {

      validationErrors.phone =

        "Enter valid 10-digit phone number";

    }

    if (!password) {

      validationErrors.password =

        "Password is required";

    }

    else if (password.length < 6) {

      validationErrors.password =

        "Minimum 6 characters required";

    }

    if (!confirmPassword) {

      validationErrors.confirmPassword =

        "Confirm your password";

    }

    else if (password !== confirmPassword) {

      validationErrors.confirmPassword =

        "Passwords do not match";

    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {

      return;

    }

    try {

      const response = await axios.post(

        "http://localhost:5000/api/auth/register",

        {

          name,

          email,

          phone,

          password

        }

      );

      if (response.data.success) {

        alert("Registration Successful");

        setFormData({

          name: "",

          email: "",

          phone: "",

          password: "",

          confirmPassword: ""

        });

        navigate("/login");

      }

    }

    catch (error) {

      console.log("Signup Error:", error);

      console.log("Response:", error.response?.data);

      setErrors({

        general:

          error.response?.data?.message ||

          error.message ||

          "Registration Failed"

      });

    }

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

            errors.general &&

            <p className="error-text">

              {errors.general}

            </p>

          }

          <input

            type="text"

            name="name"

            placeholder="Enter Name"

            className="form-control"

            value={formData.name}

            onChange={handleChange}

          />

          {

            errors.name &&

            <p className="error-text">

              {errors.name}

            </p>

          }

          <input

            type="email"

            name="email"

            placeholder="Enter Email"

            className="form-control"

            value={formData.email}

            onChange={handleChange}

          />

          {

            errors.email &&

            <p className="error-text">

              {errors.email}

            </p>

          }

          <input

            type="text"

            name="phone"

            placeholder="Enter Phone Number"

            className="form-control"

            value={formData.phone}

            onChange={handleChange}

          />

          {

            errors.phone &&

            <p className="error-text">

              {errors.phone}

            </p>

          }

          <input

            type="password"

            name="password"

            placeholder="Enter Password"

            className="form-control"

            value={formData.password}

            onChange={handleChange}

          />

          {

            errors.password &&

            <p className="error-text">

              {errors.password}

            </p>

          }

          <input

            type="password"

            name="confirmPassword"

            placeholder="Confirm Password"

            className="form-control"

            value={formData.confirmPassword}

            onChange={handleChange}

          />

          {

            errors.confirmPassword &&

            <p className="error-text">

              {errors.confirmPassword}

            </p>

          }

          <button className="btn btn-primary w-100">

            Signup

          </button>

          <p className="text-center">

            Already have account?{" "}

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