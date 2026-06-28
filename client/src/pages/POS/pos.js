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

  const [completedOrder, setCompletedOrder] =
    useState(null);

  // Customer Popup

  const [showCustomerForm, setShowCustomerForm] =
    useState(false);

  const [customerName, setCustomerName] =
    useState("");

  const [customerPhone, setCustomerPhone] =
    useState("");

  const [customerEmail, setCustomerEmail] =
    useState("");

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

    } catch (error) {

      console.log(error);

    }

  };

  const addToCart = (product) => {

    const existingProduct =

      cart.find(

        (item) =>

          item._id === product._id

      );

    if (existingProduct) {

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

    else {

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

    if (

      customerName === "" ||

      customerPhone === ""

    ) {

      alert(

        "Enter Customer Details"

      );

      return;

    }

    try {

      // Check Existing Customer

      try {

        await axios.get(

          `http://localhost:5000/api/customers/${customerPhone}`

        );

      }

      catch {

        await axios.post(

          "http://localhost:5000/api/customers",

          {

            name: customerName,

            phone: customerPhone,

            email: customerEmail

          }

        );

      }

      const productsData =

        cart.map((item) => ({

          productName:

            item.name,

          quantity:

            item.quantity,

          price:

            item.price

        }));

      const orderData = {

  customerName,

  customerPhone,

  products: productsData,

  totalAmount,

  paymentMethod: "Cash",

  orderType: "Offline"

};

      await axios.post(

        "http://localhost:5000/api/orders",

        orderData

      );

      for (const item of cart) {

        await axios.put(

          `http://localhost:5000/api/inventory/decrease/${item._id}`,

          {

            quantity:

              item.quantity

          }

        );

      }

      setCompletedOrder({

        cart: [...cart],

        totalAmount

      });

      setCart([]);

      setCustomerName("");

      setCustomerPhone("");

      setCustomerEmail("");

      setShowCustomerForm(false);

      fetchProducts();

      alert(

        "Order Placed Successfully"

      );

    }

    catch (error) {

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

                      Stock: {product.stock}

                    </p>

                    <button
                      className="btn btn-primary"
                      disabled={product.stock === 0}
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

                    Qty: {item.quantity}

                    <button
                      className="btn btn-danger btn-sm ms-2"
                      onClick={() =>
                        removeFromCart(item._id)
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

              Total: ₹{totalAmount}

            </h4>

            <button
              className="btn btn-success w-100 mt-3"
              disabled={cart.length === 0}
              onClick={() =>
                setShowCustomerForm(true)
              }
            >

              Checkout

            </button>

          </div>

        </div>

        {

          showCustomerForm && (

            <div className="customer-popup">

              <div className="customer-box">

                <h4 className="mb-3">

                  Customer Details

                </h4>

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Customer Name"
                  value={customerName}
                  onChange={(e) =>
                    setCustomerName(
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Phone Number"
                  value={customerPhone}
                  onChange={(e) =>
                    setCustomerPhone(
                      e.target.value
                    )
                  }
                />

                <input
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email (Optional)"
                  value={customerEmail}
                  onChange={(e) =>
                    setCustomerEmail(
                      e.target.value
                    )
                  }
                />

                <div className="d-flex gap-2">

                  <button
                    className="btn btn-success w-100"
                    onClick={handleCheckout}
                  >

                    Complete Payment

                  </button>

                  <button
                    className="btn btn-secondary w-100"
                    onClick={() =>
                      setShowCustomerForm(false)
                    }
                  >

                    Cancel

                  </button>

                </div>

              </div>

            </div>

          )

        }

        {

          completedOrder && (

            <Invoice

              cart={
                completedOrder.cart
              }

              totalAmount={
                completedOrder.totalAmount
              }

            />

          )

        }

      </div>

    </div>

  );

}

export default POS;