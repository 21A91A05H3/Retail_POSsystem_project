import React from "react";

import "./home.css";

import Navbar
from "../../components/Navbar/navbar";

function Home() {

  return (

    <div>

      <Navbar />

      <div className="hero-section">

        <h1>

          Welcome to Retail Shop

        </h1>

        <p>

          Buy Fresh Products Online

        </p>

        <button className="btn btn-warning">

          Shop Now

        </button>

      </div>

    </div>
  );
}

export default Home;