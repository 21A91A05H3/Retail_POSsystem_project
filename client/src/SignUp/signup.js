import React from "react";
import "./signup.css";

function Signup() {
  return (
    <div className="signup-container">

      <div className="signup-box">

        <h2 className="text-center text-primary mb-4">
          Create Account
        </h2>

        <form>

          <div className="mb-3">
            <label>Full Name</label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter full name"
            />
          </div>

          <div className="mb-3">
            <label>Email</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label>Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <div className="mb-3">
            <label>Confirm Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
            />
          </div>

          <button className="btn btn-success w-100">
            Sign Up
          </button>

        </form>

      </div>

    </div>
  );
}

export default Signup;