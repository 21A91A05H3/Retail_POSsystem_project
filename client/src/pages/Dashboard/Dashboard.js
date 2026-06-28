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

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  LabelList
} from "recharts";

import {
  FaRupeeSign,
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
  FaWarehouse
} from "react-icons/fa";

function Dashboard() {

  const [totalRevenue, setTotalRevenue] =
    useState(0);

  const [totalOrders, setTotalOrders] =
    useState(0);

  const [totalProducts, setTotalProducts] =
    useState(0);

  const [lowStockProducts, setLowStockProducts] =
    useState(0);

  const [outOfStockProducts, setOutOfStockProducts] =
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

      const outStock =

        products.data.products.filter(

          (product)=>

            product.stock===0

        ).length;

      setOutOfStockProducts(
        outStock
      );

    }

    catch(error){

      console.log(
        "Dashboard Error:",
        error
      );
    }

  };

  const barData=[

    {

      name:"Orders",

      value:totalOrders

    },

    {

      name:"Products",

      value:totalProducts

    },

    {

      name:"Customers",

      value:totalCustomers

    },

    {

      name:"Low Stock",

      value:lowStockProducts

    }

  ];

  const pieData=[

    {

      name:"In Stock",

      value:

        totalProducts-

        lowStockProducts-

        outOfStockProducts

    },

    {

      name:"Low Stock",

      value:

        lowStockProducts

    },

    {

      name:"Out Of Stock",

      value:

        outOfStockProducts

    }

  ];

  const COLORS=[

    "#22c55e",

    "#f59e0b",

    "#ef4444"

  ];

  return (

    <div className="dashboard">

      <Sidebar />

      <div className="dashboard-content">

        <Navbar />

        <div className="dashboard-header">

          <h1>

            📊 Dashboard Analytics

          </h1>

          <p>

            Welcome to Retail POS & Inventory Management System

          </p>

        </div>

        <div className="row g-4 justify-content-between">

          <div className="col-lg-2 col-md-4 col-sm-6">

            <div className="card stat-card revenue-card p-3 shadow">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6>

                    Revenue

                  </h6>

                  <h2>

                    ₹{Math.round(totalRevenue)}

                  </h2>

                </div>

                <FaRupeeSign size={35} />

              </div>

            </div>

          </div>

          <div className="col-lg-2 col-md-4 col-sm-6">

            <div className="card stat-card orders-card p-3 shadow">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6>

                    Orders

                  </h6>

                  <h2>

                    {totalOrders}

                  </h2>

                </div>

                <FaShoppingCart size={35} />

              </div>

            </div>

          </div>

          <div className="col-lg-2 col-md-4 col-sm-6">

            <div className="card stat-card products-card p-3 shadow">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6>

                    Products

                  </h6>

                  <h2>

                    {totalProducts}

                  </h2>

                </div>

                <FaBoxOpen size={35} />

              </div>

            </div>

          </div>

          <div className="col-lg-2 col-md-4 col-sm-6">

            <div className="card stat-card customers-card p-3 shadow">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6>

                    Customers

                  </h6>

                  <h2>

                    {totalCustomers}

                  </h2>

                </div>

                <FaUsers size={35} />

              </div>

            </div>

          </div>

          <div className="col-lg-2 col-md-4 col-sm-6">

            <div className="card stat-card stock-card p-3 shadow">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6>

                    Low Stock

                  </h6>

                  <h2>

                    {lowStockProducts}

                  </h2>

                </div>

                <FaWarehouse size={35} />

              </div>

            </div>

          </div>

        </div>

        <div className="row mt-5">

          <div className="col-lg-7">

            <div className="card p-4 shadow">

              <h4 className="mb-4">

                📊 Business Overview

              </h4>

              <ResponsiveContainer

                width="100%"

                height={320}

              >

                <BarChart

                  data={barData}

                >

                  <CartesianGrid

                    strokeDasharray="3 3"

                  />

                  <XAxis

                    dataKey="name"

                  />

                  <YAxis />

                  <Tooltip />

                  <Bar

                    dataKey="value"

                    fill="#2563eb"

                    radius={[8,8,0,0]}

                  >

                    <LabelList

                      dataKey="value"

                      position="top"

                    />

                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="col-lg-5">

            <div className="card p-4 shadow">

              <h4 className="mb-4">

                🥧 Inventory Status

              </h4>

              <ResponsiveContainer

                width="100%"

                height={320}

              >

                <PieChart>

                  <Pie

                    data={pieData}

                    dataKey="value"

                    outerRadius={100}

                    label

                  >

                    {

                      pieData.map(

                        (entry,index)=>(

                          <Cell

                            key={index}

                            fill={COLORS[index]}

                          />

                        )

                      )

                    }

                  </Pie>

                  <Legend />

                  <Tooltip />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        <footer className="footer mt-5">

          © 2026 Retail POS System

        </footer>

      </div>

    </div>

  );

}

export default Dashboard;