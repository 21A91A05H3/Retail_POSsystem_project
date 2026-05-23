import React from "react";
import "./dashboardcards.css";

import {
  FaDollarSign,
  FaShoppingCart,
  FaBoxOpen,
  FaUsers
} from "react-icons/fa";

function DashboardCards() {

  const cards = [

    {
      title: "Total Sales",
      value: "₹25,000",
      icon: <FaDollarSign />,
      color: "sales"
    },

    {
      title: "Orders",
      value: "120",
      icon: <FaShoppingCart />,
      color: "orders"
    },

    {
      title: "Products",
      value: "450",
      icon: <FaBoxOpen />,
      color: "products"
    },

    {
      title: "Customers",
      value: "85",
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