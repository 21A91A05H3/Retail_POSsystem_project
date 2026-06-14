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

        <h2 className="orders-title">

          My Orders

        </h2>

        {
          orders.length === 0

          ?

          <h4 className="no-orders">

            No Orders Found

          </h4>

          :

          orders.map((order) => (

            <div
              className="order-card"
              key={order._id}
            >

              <h5 className="order-id">

                Order ID:
                {" "}
                {order._id}

              </h5>

              <p>

                <strong>
                  Customer:
                </strong>
                {" "}
                {order.customerName}

              </p>

              <p>

                <strong>
                  Total:
                </strong>
                {" "}
                ₹{order.totalAmount}

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

              <p className="status">

                Status:
                {" "}
                Placed ✅

              </p>

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

                        {product.productName}

                        {" | Qty: "}

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