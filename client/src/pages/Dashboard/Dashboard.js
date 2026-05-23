import React from "react";
import "./Dashboard.css";

import Sidebar from "../../components/Sidebar/sidebar";

function Dashboard() {

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <h1>
          Dashboard
        </h1>

      </div>

    </div>
  );
}

export default Dashboard;