import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./Dashboard.css";

import Sidebar
from "../../components/Sidebar/sidebar";

import Navbar
from "../../components/Navbar/navbar";

function Dashboard() {

  const [totalRevenue, setTotalRevenue] =
    useState(0);

  const [totalOrders, setTotalOrders] =
    useState(0);

  const [totalProducts, setTotalProducts] =
    useState(0);

  const [lowStockProducts, setLowStockProducts] =
    useState(0);

  const [totalCustomers, setTotalCustomers] =
    useState(0);

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      const analytics =

        await axios.get(
          "http://localhost:5000/api/orders/analytics"
        );

      const products =

        await axios.get(
          "http://localhost:5000/api/products"
        );

      const lowStock =

        await axios.get(
          "http://localhost:5000/api/products/low-stock"
        );

      const users =

        await axios.get(
          "http://localhost:5000/api/auth/users"
        );

      setTotalRevenue(
        analytics.data.totalRevenue
      );

      setTotalOrders(
        analytics.data.totalOrders
      );

      setTotalProducts(
        products.data.products.length
      );

      setLowStockProducts(
        lowStock.data.count
      );

      setTotalCustomers(
        users.data.users.length
      );

    } catch(error){

      console.log(
        "Dashboard Error:",
        error
      );
    }
  };

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

        <div className="row g-4">

          <div className="col-md-3">

            <div className="card p-3 shadow">

              <h5>

                Total Revenue

              </h5>

              <h2>

                ₹{totalRevenue}

              </h2>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card p-3 shadow">

              <h5>

                Total Orders

              </h5>

              <h2>

                {totalOrders}

              </h2>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card p-3 shadow">

              <h5>

                Total Products

              </h5>

              <h2>

                {totalProducts}

              </h2>

            </div>

          </div>

          <div className="col-md-3">

            <div className="card p-3 shadow">

              <h5>

                Customers

              </h5>

              <h2>

                {totalCustomers}

              </h2>

            </div>

          </div>

          <div className="col-md-3 mt-4">

            <div className="card p-3 shadow">

              <h5>

                Low Stock

              </h5>

              <h2>

                {lowStockProducts}

              </h2>

            </div>

          </div>

        </div>

        <footer className="footer mt-10">

          © 2026 Retail POS System

        </footer>

      </div>

    </div>
  );
}

export default Dashboard;