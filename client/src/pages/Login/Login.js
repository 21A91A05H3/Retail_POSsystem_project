import "./Login.css";
import React from "react";
function Login() {
  return (
    <div className="login-container">

      <div className="login-box">

        <h2 className="text-center text-primary mb-4">
          Retail POS Login
        </h2>

        <form>

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

          <button className="btn btn-primary w-100">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;