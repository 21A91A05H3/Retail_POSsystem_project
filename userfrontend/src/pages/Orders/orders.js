import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import Navbar
from "../../components/Navbar/navbar";

import "./orders.css";

function Orders() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    try {

      const response =

        await axios.get(
          "http://localhost:5000/api/orders"
        );

      const loggedInUser =

        localStorage.getItem(
          "loggedInUser"
        );

      const filteredOrders =

        response.data.orders.filter(

          (order) =>

            order.customerName ===
            loggedInUser
        );

      setOrders(filteredOrders);

    } catch(error){

      console.log(
        "Order Fetch Error:",
        error
      );
    }
  };

  const totalSpent =

    orders.reduce(

      (total, order) =>

        total + order.totalAmount,

      0
    );

  return (

    <div>

      <Navbar />

      <div className="orders-container container">

        <h2 className="orders-title">

          My Orders

        </h2>

        {
          orders.length > 0 && (

            <div className="order-stats">

              <div className="stat-card">

                <h3>
                  {orders.length}
                </h3>

                <p>
                  Total Orders
                </p>

              </div>

              <div className="stat-card">

                <h3>
                  ₹{totalSpent}
                </h3>

                <p>
                  Total Spent
                </p>

              </div>

            </div>
          )
        }

        {
          orders.length === 0

          ?

          <div className="empty-orders">

            <h1>
              📦
            </h1>

            <h4>

              No Orders Yet

            </h4>

            <p>

              Start shopping to see your orders here.

            </p>

          </div>

          :

          orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              <div className="order-header">

                <h5 className="order-id">

                  Order #
                  {order._id.slice(-6)}

                </h5>

                <span className="status-badge">

                  Delivered ✅

                </span>

              </div>

              <p>

                <strong>
                  Customer:
                </strong>
                {" "}
                {order.customerName}

              </p>

              <p>

                <strong>
                  Date:
                </strong>
                {" "}
                {
                  new Date(
                    order.createdAt
                  ).toLocaleDateString()
                }

              </p>

              <p>

                <strong>
                  Time:
                </strong>
                {" "}
                {
                  new Date(
                    order.createdAt
                  ).toLocaleTimeString()
                }

              </p>

              <p>

                <strong>
                  Items:
                </strong>
                {" "}
                {order.products.length}

              </p>

              <h4 className="order-total">

                ₹{order.totalAmount}

              </h4>

              <h6>

                Products Ordered

              </h6>

              <ul className="products-list">

                {
                  order.products.map(
                    (product, index) => (

                      <li
                        key={index}
                      >

                        <strong>
                          {product.productName}
                        </strong>

                        {" × "}

                        {product.quantity}

                        {" | ₹"}

                        {product.price}

                      </li>
                    )
                  )
                }

              </ul>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default Orders;