import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import "./dashboardcards.css";

import {
  FaShoppingCart,
  FaBoxOpen,
  FaWarehouse,
  FaUsers,
  FaRupeeSign
} from "react-icons/fa";

function DashboardCards() {

  const [stats, setStats] =
    useState({

      totalRevenue: 0,

      totalOrders: 0,

      totalProducts: 0,

      totalCustomers: 0,

      lowStock: 0,

      outOfStock: 0,

      avgOrderValue: 0
    });

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const fetchDashboardData = async () => {

    try {

      const ordersResponse =

        await axios.get(
          "http://localhost:5000/api/orders"
        );

      const productsResponse =

        await axios.get(
          "http://localhost:5000/api/products"
        );

      const usersResponse =

        await axios.get(
          "http://localhost:5000/api/auth/users"
        );

      const orders =
        ordersResponse.data.orders;

      const products =
        productsResponse.data.products;

      const users =
        usersResponse.data.users;

      const totalRevenue =

        orders.reduce(

          (total, order) =>

            total +
            order.totalAmount,

          0
        );

      const totalOrders =
        orders.length;

      const totalProducts =
        products.length;

      const totalCustomers =
        users.length;

      const lowStock =

        products.filter(

          (product) =>

            product.stock > 0 &&
            product.stock <= 5

        ).length;

      const outOfStock =

        products.filter(

          (product) =>

            product.stock === 0

        ).length;

      const avgOrderValue =

        totalOrders > 0

        ?

        (
          totalRevenue /
          totalOrders
        ).toFixed(2)

        :

        0;

      setStats({

        totalRevenue,

        totalOrders,

        totalProducts,

        totalCustomers,

        lowStock,

        outOfStock,

        avgOrderValue
      });

    } catch(error){

      console.log(
        "Dashboard Error:",
        error
      );
    }
  };

  const cards = [

    {
      title: "Revenue",

      value:
        `₹${stats.totalRevenue}`,

      icon: <FaRupeeSign />,

      color: "sales"
    },

    {
      title: "Orders",

      value:
        stats.totalOrders,

      icon:
        <FaShoppingCart />,

      color: "orders"
    },

    {
      title: "Products",

      value:
        stats.totalProducts,

      icon:
        <FaBoxOpen />,

      color: "products"
    },

    {
      title: "Customers",

      value:
        stats.totalCustomers,

      icon:
        <FaUsers />,

      color: "customers"
    },

    {
      title: "Low Stock",

      value:
        stats.lowStock,

      icon:
        <FaWarehouse />,

      color: "inventory"
    },

    {
      title: "Out Of Stock",

      value:
        stats.outOfStock,

      icon:
        <FaWarehouse />,

      color: "orders"
    },

    {
      title: "Avg Order",

      value:
        `₹${stats.avgOrderValue}`,

      icon:
        <FaRupeeSign />,

      color: "sales"
    }

  ];
    console.log(stats);
  return (

    <div className="cards-container">

      {
        cards.map(

          (card, index) => (

            <div

              className={
                `dashboard-card ${card.color}`
              }

              key={index}
            >

              <div className="card-icon">

                {card.icon}

              </div>

              <div>

                <h4>

                  {card.title}

                </h4>

                <h2>

                  {card.value}

                </h2>

              </div>

            </div>
          )
        )
      }

    </div>
  );
}

export default DashboardCards;