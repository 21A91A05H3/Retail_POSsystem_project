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

      setOrders(
        response.data.orders
      );

    } catch(error){

      console.log(
        "Order Fetch Error:",
        error
      );
    }
  };

  return (

    <div>

      <Navbar />

      <div className="orders-container container">

        <h2 className="text-center mb-4">

          My Orders

        </h2>

        {
          orders.length === 0

          ?

          <h4 className="text-center">

            No Orders Found

          </h4>

          :

          orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              <h5>

                Order ID:
                {" "}
                {order._id}

              </h5>

              <p>

                Customer:
                {" "}
                {order.customerName}

              </p>

              <p>

                Total:
                {" "}
                ₹{order.totalAmount}

              </p>

              <p>

                Status:
                {" "}
                Placed

              </p>

              <h6>

                Products:

              </h6>

              <ul>

                {
                  order.products.map(
                    (product, index) => (

                      <li
                        key={index}
                      >

                        {
                          product.productName
                        }

                        {" - "}

                        Qty:
                        {" "}

                        {
                          product.quantity
                        }

                        {" - ₹"}

                        {
                          product.price
                        }

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