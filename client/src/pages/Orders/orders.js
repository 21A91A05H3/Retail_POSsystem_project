import React, { useState } from "react";
import "./orders.css";

import Sidebar from "../../components/Sidebar/sidebar";
import Navbar from "../../components/Navbar/navbar";

function Orders() {

  const [search, setSearch] =
    useState("");

  const [paymentFilter, setPaymentFilter] =
    useState("All");

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

  const filteredOrders =
    orders.filter((order) => {

      const matchesSearch =
        order.customer
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesPayment =
        paymentFilter === "All"
        ||
        order.payment === paymentFilter;

      return (
        matchesSearch &&
        matchesPayment
      );
    });

  return (

    <div className="orders-page">

      <Sidebar />

      <div className="orders-content">

        <Navbar />

        <h2 className="mb-4">
          Orders Management
        </h2>

        {/* Search and Filter */}

        <div className="orders-filters">

          <input

            type="text"

            placeholder="Search Customer"

            className="form-control search-input"

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select

            className="form-select filter-select"

            value={paymentFilter}

            onChange={(e) =>
              setPaymentFilter(
                e.target.value
              )
            }
          >

            <option value="All">
              All Payments
            </option>

            <option value="Paid">
              Paid
            </option>

            <option value="Pending">
              Pending
            </option>

          </select>

        </div>

        {/* Orders Table */}

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
                filteredOrders.map((order) => (

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