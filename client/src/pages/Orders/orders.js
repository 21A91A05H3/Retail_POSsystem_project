import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import "./orders.css";

import Sidebar
from "../../components/Sidebar/sidebar";

import Navbar
from "../../components/Navbar/navbar";

function Orders() {

  const [orders, setOrders] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const response = await axios.get(

        "http://localhost:5000/api/orders"

      );
      response.data.orders.forEach(order => {
  console.log(order.customerName, order.orderType);
});

      const sortedOrders =

        response.data.orders.sort(

          (a, b) =>

            new Date(b.createdAt) -

            new Date(a.createdAt)

        );

      setOrders(sortedOrders);

    }

    catch (error) {

      console.log(

        "Order Fetch Error:",

        error

      );

    }

  };

  const filteredOrders =

    orders.filter((order) =>

      (order.customerName || "")

        .toLowerCase()

        .includes(

          search.toLowerCase()

        )

    );

  return (

    <div className="orders-page">

      <Sidebar />

      <div className="orders-content">

        <Navbar />

        <h2 className="mb-4">

          Orders Management

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

        <div className="orders-table">

          <table className="table table-hover">

            <thead>

              <tr>

                <th>Order ID</th>

                <th>Customer</th>

                <th>Amount</th>

                <th>Date</th>

                <th>Time</th>

                <th>Order Type</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {

                filteredOrders.length === 0

                ?

                <tr>

                  <td

                    colSpan="7"

                    className="text-center text-muted"

                  >

                    No Orders Available

                  </td>

                </tr>

                :

                filteredOrders.map((order) => {

                  const orderType =

                    order.customerName === "Walk-in Customer"

                      ? "Offline"

                      : (

                          order.orderType === "Offline"

                            ? "Offline"

                            : "Online"

                        );

                  return (

                    <tr key={order._id}>

                      <td>

                        {order._id.slice(-8)}

                      </td>

                      <td>

                        {order.customerName}

                      </td>

                      <td>

                        ₹{Math.round(order.totalAmount)}

                      </td>

                      <td>

                        {

                          new Date(

                            order.createdAt

                          ).toLocaleDateString()

                        }

                      </td>

                      <td>

                        {

                          new Date(

                            order.createdAt

                          ).toLocaleTimeString()

                        }

                      </td>

                      <td>

                        {

                          orderType === "Online"

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

                        <span className="badge bg-success">

                          Placed

                        </span>

                      </td>

                    </tr>

                  );

                })

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default Orders;