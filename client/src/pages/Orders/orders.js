import React from "react";
import "./orders.css";

import Sidebar from "../../components/Sidebar/sidebar";
import Navbar from "../../components/Navbar/navbar";

function Orders() {

  const orders = [

    {
      id: 101,
      customer: "Rahul",
      amount: 1200,
      payment: "Paid",
      status: "Delivered"
    },

    {
      id: 102,
      customer: "Priya",
      amount: 800,
      payment: "Pending",
      status: "Processing"
    },

    {
      id: 103,
      customer: "Arjun",
      amount: 1500,
      payment: "Paid",
      status: "Delivered"
    },

    {
      id: 104,
      customer: "Sneha",
      amount: 650,
      payment: "Pending",
      status: "Pending"
    }

  ];

  return (

    <div className="orders-page">

      <Sidebar />

      <div className="orders-content">

        <Navbar />

        <h2 className="mb-4">
          Orders Management
        </h2>

        <div className="orders-table">

          <table className="table table-hover">

            <thead>

              <tr>

                <th>Order ID</th>

                <th>Customer</th>

                <th>Amount</th>

                <th>Payment</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {
                orders.map((order) => (

                  <tr key={order.id}>

                    <td>
                      #{order.id}
                    </td>

                    <td>
                      {order.customer}
                    </td>

                    <td>
                      ₹{order.amount}
                    </td>

                    <td>

                      <span
                        className={
                          order.payment === "Paid"
                          ?
                          "badge bg-success"
                          :
                          "badge bg-warning text-dark"
                        }
                      >

                        {order.payment}

                      </span>

                    </td>

                    <td>

                      <span
                        className={
                          order.status === "Delivered"
                          ?
                          "badge bg-primary"
                          :
                          order.status === "Processing"
                          ?
                          "badge bg-info text-dark"
                          :
                          "badge bg-secondary"
                        }
                      >

                        {order.status}

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
  );
}

export default Orders;