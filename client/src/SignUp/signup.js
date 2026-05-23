import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";

function Signup() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({});

  const handleSignup = (e) => {

    e.preventDefault();

    let validationErrors = {};

    if(name === ""){
      validationErrors.name =
        "Full name is required";
    }

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

    if(confirmPassword === ""){
      validationErrors.confirmPassword =
        "Confirm your password";
    }
    else if(password !== confirmPassword){
      validationErrors.confirmPassword =
        "Passwords do not match";
    }

    setErrors(validationErrors);

    if(
      Object.keys(validationErrors).length === 0
    ){
      alert("Signup Successful");
    }

  };

  return (

    <div className="signup-container">

      <div className="signup-box">

        <h2 className="text-center text-primary mb-4">
          Create Account
        </h2>

        <form onSubmit={handleSignup}>

          <div className="mb-3">

            <label>Full Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"

              value={name}

              onChange={(e) =>
                setName(e.target.value)
              }
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

              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <small className="text-danger">
              {errors.email}
            </small>

          </div>

          <div className="mb-3">

            <label>Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"

              value={password}

              onChange={(e) =>
                setPassword(e.target.value)
              }
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

              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
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

            <Link to="/">
              {" "}Login
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Signup;