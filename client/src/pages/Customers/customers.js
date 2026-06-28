import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import "./customers.css";

import Sidebar
from "../../components/Sidebar/sidebar";

import Navbar
from "../../components/Navbar/navbar";

function Customers() {

  const [customers, setCustomers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchCustomers();

  }, []);

  const fetchCustomers = async () => {

    try {

      // Offline Customers
      const customerResponse =
        await axios.get(
          "http://localhost:5000/api/customers"
        );

      // Online Users
      const userResponse =
        await axios.get(
          "http://localhost:5000/api/auth/users"
        );

      const offlineCustomers =
        customerResponse.data.customers.map(
          (customer) => ({
            ...customer,
            source: "Offline"
          })
        );

      const onlineCustomers =
        userResponse.data.users.map(
          (user) => ({
            ...user,
            source: "Online"
          })
        );

      // Merge both
      const mergedCustomers = [

        ...offlineCustomers,

        ...onlineCustomers

      ];

      // Remove duplicates by email or phone
      const uniqueCustomers = [];

      const seen = new Set();

      mergedCustomers.forEach((customer) => {

        const key =
          customer.email ||
          customer.phone;

        if (!seen.has(key)) {

          seen.add(key);

          uniqueCustomers.push(customer);

        }

      });

      setCustomers(uniqueCustomers);

    }

    catch (error) {

      console.log(
        "Customer Fetch Error:",
        error
      );

      setCustomers([]);

    }

  };

  const filteredCustomers =

    customers.filter((customer) =>

      (
        customer.name || ""
      )
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

        <input

          type="text"

          placeholder="Search Customer"

          className="form-control search-input"

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

        />

        <div className="customers-table">

          <table className="table table-hover">

            <thead>

              <tr>

                <th>ID</th>

                <th>Name</th>

                <th>Email</th>

                <th>Phone Number</th>

                <th>Customer Type</th>

                <th>Joined Date</th>

              </tr>

            </thead>

            <tbody>

              {

                filteredCustomers.length === 0 ?

                  <tr>

                    <td
                      colSpan="6"
                      className="text-center"
                    >

                      No Customers Found

                    </td>

                  </tr>

                  :

                  filteredCustomers.map((customer) => (

                    <tr key={customer._id}>

                      <td>

                        {customer._id.slice(-6)}

                      </td>

                      <td>

                        {customer.name}

                      </td>

                      <td>

                        {customer.email || "-"}

                      </td>

                      <td>

                        {customer.phone || "-"}

                      </td>

                      <td>

                        {

                          customer.source === "Online"

                            ?

                            <span className="badge bg-success">

                              Online

                            </span>

                            :

                            <span className="badge bg-primary">

                              Offline

                            </span>

                        }

                      </td>

                      <td>

                        {

                          new Date(
                            customer.createdAt
                          ).toLocaleDateString()

                        }

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