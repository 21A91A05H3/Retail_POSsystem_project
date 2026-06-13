import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./cart.css";

import Navbar
from "../../components/Navbar/navbar";

function Cart() {

  const [cartItems, setCartItems] =
    useState([]);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {

    const storedCart =

      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCartItems(storedCart);

  }, []);

  const removeItem = (id) => {

    const updatedCart =

      cartItems.filter(
        (item) =>
          item._id !== id
      );

    setCartItems(updatedCart);

    localStorage.setItem(

      "cart",

      JSON.stringify(updatedCart)
    );
  };

  const totalAmount =

    cartItems.reduce(

      (total, item) =>

        total +
        item.price *
        item.quantity,

      0
    );

  const handleCheckout = async () => {

    try {

      const customerName =

        localStorage.getItem(
          "loggedInUser"
        ) || "Guest";

      const products =

        cartItems.map((item) => ({

          productName:
            item.name,

          quantity:
            item.quantity,

          price:
            item.price
        }));

      await axios.post(

        "http://localhost:5000/api/orders",

        {
          customerName,
          products,
          totalAmount
        }
      );

      localStorage.removeItem(
        "cart"
      );

      setCartItems([]);

      setShowModal(true);

    } catch(error){

      console.log(
        "Order Error:",
        error
      );

      alert(
        "Failed to Place Order"
      );
    }
  };

  return (

    <div>

      <Navbar />

      <div className="cart-container container">

        <h2 className="mb-4 text-center">

          Shopping Cart

        </h2>

        {
          cartItems.length === 0

          ?

          <h4 className="text-center">

            Cart is Empty

          </h4>

          :

          cartItems.map((item) => (

            <div
              className="cart-card"
              key={item._id}
            >

              <div>

                <h5>

                  {item.name}

                </h5>

                <p>

                  ₹{item.price}

                </p>

                <p>

                  Qty:
                  {" "}
                  {item.quantity}

                </p>

              </div>

              <button
                className="btn btn-danger"

                onClick={() =>
                  removeItem(
                    item._id
                  )
                }
              >

                Remove

              </button>

            </div>
          ))
        }

        <hr />

        <h3>

          Total:
          {" "}
          ₹{totalAmount}

        </h3>

        {
          cartItems.length > 0 && (

            <button
              className="btn btn-success mt-3"

              onClick={
                handleCheckout
              }
            >

              Checkout

            </button>
          )
        }

        {
          showModal && (

            <div className="success-modal">

              <div className="modal-content-custom">

                <h2>

                  🎉 Order Successful

                </h2>

                <p>

                  Your order has been placed successfully.

                </p>

                <button
                  className="btn btn-primary"

                  onClick={() =>
                    setShowModal(false)
                  }
                >

                  OK

                </button>

              </div>

            </div>
          )
        }

      </div>

    </div>
  );
}

export default Cart;