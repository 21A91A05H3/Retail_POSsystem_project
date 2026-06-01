import React from "react";

import "./Dashboard.css";

import Sidebar
from "../../components/Sidebar/sidebar";

import Navbar
from "../../components/Navbar/navbar";

import DashboardCards
from "../../components/DashboardCards/dashboardcards";

import SalesChart
from "../../components/SalesChart/saleschart";

function Dashboard() {

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="dashboard-header">

          <h1>
            Dashboard
          </h1>

          <p>
            Welcome to Retail POS &
            Inventory Management System
          </p>

        </div>

        <DashboardCards />

        <SalesChart />

        <footer className="footer">

          © 2026 Retail POS System

        </footer>

      </div>

    </div>
  );
}

export default Dashboard;