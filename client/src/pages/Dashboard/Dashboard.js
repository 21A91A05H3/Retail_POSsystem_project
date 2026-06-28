import React,{
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
  FaShoppingCart,
  FaBoxOpen,
  FaUsers,
  FaWarehouse
} from "react-icons/fa";

function Dashboard(){

  const [totalRevenue,setTotalRevenue]=
    useState(0);

  const [totalOrders,setTotalOrders]=
    useState(0);

  const [totalProducts,setTotalProducts]=
    useState(0);

  const [lowStockProducts,setLowStockProducts]=
    useState(0);

  const [outOfStockProducts,setOutOfStockProducts]=
    useState(0);

  const [totalCustomers,setTotalCustomers]=
    useState(0);

  const [recentOrders,setRecentOrders]=
    useState([]);

  const [lowStockList,setLowStockList]=
    useState([]);

  useEffect(()=>{

    fetchDashboardData();

  },[]);

  const fetchDashboardData=async()=>{

    try{

      const analytics=
        await axios.get(
          "http://localhost:5000/api/orders/analytics"
        );

      const products=
        await axios.get(
          "http://localhost:5000/api/products"
        );

      const lowStock=
        await axios.get(
          "http://localhost:5000/api/products/low-stock"
        );

      const users=
        await axios.get(
          "http://localhost:5000/api/auth/users"
        );

      const orders=
        await axios.get(
          "http://localhost:5000/api/orders"
        );

      setTotalRevenue(
        Math.round(
          analytics.data.totalRevenue
        )
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

      const outStock=

        products.data.products.filter(

          (item)=>

            item.stock===0

        ).length;

      setOutOfStockProducts(
        outStock
      );

      setRecentOrders(

        orders.data.orders.slice(0,5)

      );

      setLowStockList(

        products.data.products.filter(

          (item)=>

            item.stock<=5

        )

      );

    }

    catch(error){

      console.log(error);

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

      value:lowStockProducts

    }

  ];

  if(outOfStockProducts>0){

    pieData.push({

      name:"Out Of Stock",

      value:outOfStockProducts

    });

  }

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

            Dashboard

          </h1>

          <p>

            Retail POS & Inventory Management System

          </p>

        </div>

        <div className="row g-4">

          <div className="col-lg col-md-6">

            <div className="card stat-card revenue-card p-3 shadow">

              <h6>Total Revenue</h6>

              <h2>

                ₹{totalRevenue.toLocaleString()}

              </h2>

            </div>

          </div>

          <div className="col-lg col-md-6">

            <div className="card stat-card orders-card p-3 shadow">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6>Total Orders</h6>

                  <h2>{totalOrders}</h2>

                </div>

                <FaShoppingCart size={34}/>

              </div>

            </div>

          </div>

          <div className="col-lg col-md-6">

            <div className="card stat-card products-card p-3 shadow">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6>Total Products</h6>

                  <h2>{totalProducts}</h2>

                </div>

                <FaBoxOpen size={34}/>

              </div>

            </div>

          </div>

          <div className="col-lg col-md-6">

            <div className="card stat-card customers-card p-3 shadow">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6>Customers</h6>

                  <h2>{totalCustomers}</h2>

                </div>

                <FaUsers size={34}/>

              </div>

            </div>

          </div>

          <div className="col-lg col-md-6">

            <div className="card stat-card stock-card p-3 shadow">

              <div className="d-flex justify-content-between align-items-center">

                <div>

                  <h6>Low Stock</h6>

                  <h2>{lowStockProducts}</h2>

                </div>

                <FaWarehouse size={34}/>

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

                  <XAxis dataKey="name"/>

                  <YAxis/>

                  <Tooltip/>

                  <Bar

                    dataKey="value"

                    radius={[8,8,0,0]}

                  >

                    <Cell fill="#2563eb"/>

                    <Cell fill="#16a34a"/>

                    <Cell fill="#9333ea"/>

                    <Cell fill="#f59e0b"/>

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

                  <Legend/>

                  <Tooltip/>

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        <div className="row mt-5">

          <div className="col-lg-7">

            <div className="card shadow p-4">

              <h4 className="mb-4">

                🧾 Recent Orders

              </h4>

              <table className="table table-hover">

                <thead>

                  <tr>

                    <th>Customer</th>

                    <th>Total</th>

                    <th>Status</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    recentOrders.map((order)=>(

                      <tr

                        key={order._id}

                      >

                        <td>

                          {order.customerName}

                        </td>

                        <td>

                          ₹{Math.round(order.totalAmount)}

                        </td>

                        <td>

                          <span className="badge bg-success">

                            Completed

                          </span>

                        </td>

                      </tr>

                    ))

                  }

                </tbody>

              </table>

            </div>

          </div>

          <div className="col-lg-5">

            <div className="card shadow p-4">

              <h4 className="mb-4">

                ⚠ Low Stock Products

              </h4>

              <table className="table">

                <thead>

                  <tr>

                    <th>Product</th>

                    <th>Stock</th>

                  </tr>

                </thead>

                <tbody>

                  {

                    lowStockList.map((item)=>(

                      <tr

                        key={item._id}

                      >

                        <td>

                          {item.name}

                        </td>

                        <td>

                          <span className="badge bg-warning text-dark">

                            {item.stock}

                          </span>

                        </td>

                      </tr>

                    ))

                  }

                </tbody>

              </table>

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