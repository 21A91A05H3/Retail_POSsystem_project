import React from "react";

import "./dashboardcards.css";

import {

  FaShoppingCart,
  FaBoxOpen,
  FaWarehouse,
  FaUsers

} from "react-icons/fa";

function DashboardCards() {

  const products =

    JSON.parse(
      localStorage.getItem("products")
    ) || [];

  const inventory =

    JSON.parse(
      localStorage.getItem("inventory")
    ) || [];

  const orders = [

    {
      id: 101
    },

    {
      id: 102
    },

    {
      id: 103
    },

    {
      id: 104
    }

  ];

  const customers = [

    {
      id: 1
    },

    {
      id: 2
    },

    {
      id: 3
    },

    {
      id: 4
    }

  ];

  const cards = [

    {
      title: "Products",

      value: products.length,

      icon: <FaBoxOpen />,

      color: "products"
    },

    {
      title: "Inventory",

      value: inventory.length,

      icon: <FaWarehouse />,

      color: "sales"
    },

    {
      title: "Orders",

      value: orders.length,

      icon: <FaShoppingCart />,

      color: "orders"
    },

    {
      title: "Customers",

      value: customers.length,

      icon: <FaUsers />,

      color: "customers"
    }

  ];

  return (

    <div className="cards-container">

      {
        cards.map((card, index) => (

          <div
            className={`dashboard-card ${card.color}`}

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
        ))
      }

    </div>
  );
}

export default DashboardCards;