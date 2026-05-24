import React from "react";
import "./Dashboard.css";

import Sidebar from "../../components/Sidebar/sidebar";
import Navbar from "../../components/Navbar/navbar";
import DashboardCards from "../../components/DashboardCards/dashboardcards";
import SalesChart from "../../components/SalesChart/saleschart";

function Dashboard() {

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <h1>
          Dashboard
        </h1>

        <DashboardCards />

        <SalesChart />

      </div>

    </div>
  );
}

export default Dashboard;