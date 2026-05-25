import React, { useState } from "react";
import "./customers.css";

import Sidebar from "../../components/Sidebar/sidebar";
import Navbar from "../../components/Navbar/navbar";

function Customers() {

  const [search, setSearch] =
    useState("");

  const customers = [

    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9876543210",
      orders: 12
    },

    {
      id: 2,
      name: "Priya Reddy",
      email: "priya@gmail.com",
      phone: "9876543211",
      orders: 8
    },

    {
      id: 3,
      name: "Arjun Kumar",
      email: "arjun@gmail.com",
      phone: "9876543212",
      orders: 15
    },

    {
      id: 4,
      name: "Sneha Patel",
      email: "sneha@gmail.com",
      phone: "9876543213",
      orders: 5
    }

  ];

  const filteredCustomers =
    customers.filter((customer) =>

      customer.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (

    <div className="customers-page">

      <Sidebar />

      <div className="customers-content">

        <Navbar />

        <h2 className="mb-4">
          Customers Management
        </h2>

        {/* Search Input */}

        <input

          type="text"

          placeholder="Search Customer"

          className="form-control search-input"

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* Customers Table */}

        <div className="customers-table">

          <table className="table table-hover">

            <thead>

              <tr>

                <th>ID</th>

                <th>Name</th>

                <th>Email</th>

                <th>Phone</th>

                <th>Total Orders</th>

              </tr>

            </thead>

            <tbody>

              {
                filteredCustomers.map((customer) => (

                  <tr key={customer.id}>

                    <td>
                      {customer.id}
                    </td>

                    <td>
                      {customer.name}
                    </td>

                    <td>
                      {customer.email}
                    </td>

                    <td>
                      {customer.phone}
                    </td>

                    <td>

                      <span className="badge bg-primary">

                        {customer.orders}

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

export default Customers;