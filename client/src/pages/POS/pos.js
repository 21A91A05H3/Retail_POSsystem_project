import React, { useState } from "react";
import "./pos.css";

import Sidebar from "../../components/Sidebar/sidebar";
import Navbar from "../../components/Navbar/navbar";
import Invoice from "../../components/Invoice/invoice";

function POS() {

  const products = [

    {
      id: 1,
      name: "Milk",
      price: 50
    },

    {
      id: 2,
      name: "Bread",
      price: 40
    },

    {
      id: 3,
      name: "Rice",
      price: 100
    },

    {
      id: 4,
      name: "Eggs",
      price: 80
    }

  ];

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {

    const existingProduct =
      cart.find(
        (item) =>
          item.id === product.id
      );

    if(existingProduct){

      const updatedCart =
        cart.map((item) =>

          item.id === product.id
          ?
          {
            ...item,
            quantity: item.quantity + 1
          }
          :
          item
        );

      setCart(updatedCart);

    }
    else{

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ]);
    }
  };

  const removeFromCart = (id) => {

    const updatedCart =
      cart.filter(
        (item) =>
          item.id !== id
      );

    setCart(updatedCart);
  };

  const totalAmount =
    cart.reduce(

      (total, item) =>

        total +
        item.price * item.quantity,

      0
    );

  return (

    <div className="pos-page">

      <Sidebar />

      <div className="pos-content">

        <Navbar />

        <h2 className="mb-4">
          POS Billing System
        </h2>

        <div className="pos-container">

          {/* Products Section */}

          <div className="products-section">

            <h4>
              Products
            </h4>

            <div className="products-grid">

              {
                products.map((product) => (

                  <div
                    className="product-card"
                    key={product.id}
                  >

                    <h5>
                      {product.name}
                    </h5>

                    <p>
                      ₹{product.price}
                    </p>

                    <button
                      className="btn btn-primary"

                      onClick={() =>
                        addToCart(product)
                      }
                    >
                      Add
                    </button>

                  </div>
                ))
              }

            </div>

          </div>

          {/* Cart Section */}

          <div className="cart-section">

            <h4>
              Cart
            </h4>

            {
              cart.length === 0
              ?
              <p>
                No items added
              </p>
              :
              cart.map((item) => (

                <div
                  className="cart-item"
                  key={item.id}
                >

                  <div>

                    <h6>
                      {item.name}
                    </h6>

                    <p>
                      ₹{item.price}
                    </p>

                  </div>

                  <div className="cart-actions">

                    <span>
                      Qty:
                      {" "}
                      {item.quantity}
                    </span>

                    <button
                      className="btn btn-danger btn-sm"

                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>

                </div>
              ))
            }

            <hr />

            <h4>
              Total:
              {" "}
              ₹{totalAmount}
            </h4>

            <button className="btn btn-success w-100 mt-3">

              Checkout

            </button>

          </div>

        </div>

        {/* Invoice Section */}

        {
          cart.length > 0 && (

            <Invoice
              cart={cart}
              totalAmount={totalAmount}
            />

          )
        }

      </div>

    </div>
  );
}

export default POS;