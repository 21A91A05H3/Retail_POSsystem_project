import React, {
  useEffect,
  useState
} from "react";

import "./cart.css";

import Navbar
from "../../components/Navbar/navbar";

function Cart() {

  const [cartItems, setCartItems] =
    useState([]);

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
          item.id !== id
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
        item.price * item.quantity,

      0
    );

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
              key={item.id}
            >

              <div>

                <h5>
                  {item.name}
                </h5>

                <p>
                  ₹{item.price}
                </p>

                <p>
                  Qty: {item.quantity}
                </p>

              </div>

              <button
                className="btn btn-danger"

                onClick={() =>
                  removeItem(item.id)
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

      </div>

    </div>
  );
}

export default Cart;