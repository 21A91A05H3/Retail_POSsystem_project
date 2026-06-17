import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./home.css";

import Navbar
from "../../components/Navbar/navbar";

function Home() {

  const [products, setProducts] =
    useState([]);

  const [cart, setCart] =
    useState([]);

  useEffect(() => {

  fetchProducts();

  const interval = setInterval(() => {

    fetchProducts();

  }, 3000);

  return () => clearInterval(interval);

}, []);
   useEffect(() => {

  fetchProducts();

  const interval = setInterval(() => {

    fetchProducts();

  }, 3000);

  return () => clearInterval(interval);

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

      console.log(
        "Product Fetch Error:",
        error
      );
    }
  };

  const addToCart = (product) => {

    const existingProduct =

      cart.find(
        (item) =>
          item._id === product._id
      );

    let updatedCart;

    if(existingProduct){

      updatedCart =

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
    }
    else{

      updatedCart = [

        ...cart,

        {
          ...product,
          quantity: 1
        }
      ];
    }

    setCart(updatedCart);

    localStorage.setItem(

      "cart",

      JSON.stringify(updatedCart)
    );

    alert(
      `${product.name} added to cart`
    );
  };

  return (

    <div>

      <Navbar />

      <div className="hero-section">

        <h1>

          Welcome to Retail Shop

        </h1>

        <p>

          Buy Fresh Products Online

        </p>

        <button className="btn btn-warning">

          Shop Now

        </button>

      </div>

      <div className="products-section container">

        <h2 className="text-center mb-4">

          Our Products

        </h2>

        <div className="row">

          {
            products.length === 0

            ?

            <h4 className="text-center">

              No Products Available

            </h4>

            :

            products.map((product) => (

              <div
                className="col-md-3 mb-4"
                key={product._id}
              >

                <div className="card product-card">

                  <div className="card-body text-center">

                    {
                      product.image && (

                        <img
                          src={product.image}
                          alt={product.name}
                          className="img-fluid mb-2"
                          style={{
                            height: "150px",
                            width: "100%",
                            objectFit: "cover"
                          }}
                        />
                      )
                    }

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

                    {
                      product.stock === 0 ? (

                        <p className="out-stock">

                          Out Of Stock ❌

                        </p>

                      ) : product.stock <= 5 ? (

                        <p className="low-stock">

                          Low Stock ⚠️

                        </p>

                      ) : null
                    }

                    <button
                      className={
                        product.stock === 0

                        ?

                        "btn btn-secondary"

                        :

                        "btn btn-primary"
                      }

                      disabled={
                        product.stock === 0
                      }

                      onClick={() =>
                        addToCart(product)
                      }
                    >

                      {
                        product.stock === 0

                        ?

                        "Out Of Stock"

                        :

                        "Add To Cart"
                      }

                    </button>

                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Home;