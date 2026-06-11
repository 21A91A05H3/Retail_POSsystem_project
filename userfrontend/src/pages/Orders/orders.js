import React, {
  useEffect,
  useState
} from "react";

import Navbar
from "../../components/Navbar/navbar";

import "./orders.css";

function Orders() {

  const [orders, setOrders] =
    useState([]);

  useEffect(() => {

    const storedOrders =

      JSON.parse(
        localStorage.getItem("orders")
      ) || [];

    setOrders(storedOrders);

  }, []);

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
              key={order.id}
            >

              <h5>

                Order ID:
                {" "}
                #{order.id}

              </h5>

              <p>

                Total:
                {" "}
                ₹{order.total}

              </p>

              <p>

                Status:
                {" "}
                Placed

              </p>

            </div>
          ))
        }

      </div>

    </div>
  );
}

export default Orders;