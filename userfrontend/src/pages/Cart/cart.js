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
const navigate =
  useNavigate();
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

  const increaseQty = (id) => {

    const updatedCart =

      cartItems.map((item) =>

        item._id === id

        ?

        {
          ...item,
          quantity:
            item.quantity + 1
        }

        :

        item
      );

    setCartItems(updatedCart);

    localStorage.setItem(

      "cart",

      JSON.stringify(updatedCart)
    );
  };

  const decreaseQty = (id) => {

    const updatedCart =

      cartItems.map((item) =>

        item._id === id

        ?

        {
          ...item,

          quantity:

            item.quantity > 1

            ?

            item.quantity - 1

            :

            1
        }

        :

        item
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

  const gst =

    totalAmount * 0.18;

  const finalAmount =

    totalAmount + gst;

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
          totalAmount:
            finalAmount
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

          <div className="text-center">

            <h1>

              🛒

            </h1>

            <h4>

              Your Cart Is Empty

            </h4>

            <p>

              Start Shopping Now

            </p>

          </div>

          :

          <>
            {
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

                    <div className="qty-controls">

                      <button
                        className="btn btn-secondary btn-sm"

                        onClick={() =>
                          decreaseQty(
                            item._id
                          )
                        }
                      >

                        -

                      </button>

                      <span>

                        {item.quantity}

                      </span>

                      <button
                        className="btn btn-secondary btn-sm"

                        onClick={() =>
                          increaseQty(
                            item._id
                          )
                        }
                      >

                        +

                      </button>

                    </div>

                  </div>

                  <div>

                    <h5>

                      ₹
                      {
                        item.price *
                        item.quantity
                      }

                    </h5>

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

                </div>
              ))
            }

            <hr />

            <div className="cart-summary">

              <h4>

                Cart Summary

              </h4>

              <p>

                Subtotal:
                ₹{totalAmount.toFixed(2)}

              </p>

              <p>

                GST (18%):
                ₹{gst.toFixed(2)}

              </p>

              <h3>

                Total:
                ₹{finalAmount.toFixed(2)}

              </h3>

              <button
                className="btn btn-success w-100 mt-3"

                onClick={
                  handleCheckout
                }
              >

                Checkout

              </button>

            </div>

          </>
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

  onClick={() => {

    setShowModal(false);

    navigate("/orders");
  }}
>
  View Orders
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