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

      const response =

        await axios.get(
          "http://localhost:5000/api/auth/users"
        );

      setCustomers(
        response.data.users
      );

    } catch(error){

      console.log(
        "Customer Fetch Error:",
        error
      );
    }
  };

  const filteredCustomers =

    customers.filter((customer) =>

      (customer.name || "")
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

                <th>Role</th>

                <th>Joined Date</th>

              </tr>

            </thead>

            <tbody>

              {
                filteredCustomers.length === 0

                ?

                <tr>

                  <td
                    colSpan="5"
                    className="text-center"
                  >

                    No Customers Found

                  </td>

                </tr>

                :

                filteredCustomers.map((customer) => (

                  <tr key={customer._id}>

                    <td>

                      {
                        customer._id.slice(-6)
                      }

                    </td>

                    <td>

                      {customer.name}

                    </td>

                    <td>

                      {customer.email}

                    </td>

                    <td>

                      <span className="badge bg-primary">

                        {customer.role}

                      </span>

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