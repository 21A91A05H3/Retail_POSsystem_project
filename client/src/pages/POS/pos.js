import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import "./pos.css";

import Sidebar
from "../../components/Sidebar/sidebar";

import Navbar
from "../../components/Navbar/navbar";

import Invoice
from "../../components/Invoice/invoice";

function POS() {

  const [products, setProducts] =
    useState([]);

  const [cart, setCart] =
    useState([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response =

        await axios.get(
          "http://localhost:5000/api/products"
        );

      setProducts(
        response.data.products
      );

    } catch(error){

      console.log(error);
    }
  };

  const addToCart = (product) => {

    const existingProduct =

      cart.find(
        (item) =>
          item._id === product._id
      );

    if(existingProduct){

      const updatedCart =

        cart.map((item) =>

          item._id === product._id

          ?

          {
            ...item,
            quantity:
              item.quantity + 1
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
          item._id !== id
      );

    setCart(updatedCart);
  };

  const totalAmount =

    cart.reduce(

      (total, item) =>

        total +
        item.price *
        item.quantity,

      0
    );

  const handleCheckout = async () => {

    try {

      const productsData =

        cart.map((item) => ({

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
          customerName:
            "Walk-in Customer",

          products:
            productsData,

          totalAmount
        }
      );

      for(const item of cart){

        await axios.put(

          `http://localhost:5000/api/inventory/decrease/${item._id}`,

          {
            quantity:
              item.quantity
          }
        );
      }

      alert(
        "Order Placed Successfully"
      );

      setCart([]);

      fetchProducts();

    } catch(error){

      console.log(error);

      alert(
        "Failed To Place Order"
      );
    }
  };

  return (

    <div className="pos-page">

      <Sidebar />

      <div className="pos-content">

        <Navbar />

        <h2 className="mb-4">

          POS Billing System

        </h2>

        <div className="pos-container">

          <div className="products-section">

            <h4>

              Products

            </h4>

            <div className="products-grid">

              {
                products.length === 0

                ?

                <p>

                  No Products Available

                </p>

                :

                products.map((product) => (

                  <div
                    className="product-card"
                    key={product._id}
                  >

                    <h5>

                      {product.name}

                    </h5>

                    <p>

                      ₹{product.price}

                    </p>

                    <p>

                      Stock:
                      {" "}
                      {product.stock}

                    </p>

                    <button
                      className="btn btn-primary"

                      disabled={
                        product.stock === 0
                      }

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
                  key={item._id}
                >

                  <div>

                    <h6>

                      {item.name}

                    </h6>

                    <p>

                      ₹{item.price}

                    </p>

                  </div>

                  <div>

                    Qty:
                    {" "}
                    {item.quantity}

                    <button
                      className="btn btn-danger btn-sm ms-2"

                      onClick={() =>
                        removeFromCart(
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

            <h4>

              Total:
              {" "}
              ₹{totalAmount}

            </h4>

            <button
              className="btn btn-success w-100 mt-3"

              disabled={
                cart.length === 0
              }

              onClick={
                handleCheckout
              }
            >

              Checkout

            </button>

          </div>

        </div>

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