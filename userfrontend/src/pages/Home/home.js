import React, {
  useEffect,
  useState
} from "react";

import "./home.css";

import Navbar
from "../../components/Navbar/navbar";

function Home() {

  const [products, setProducts] =
    useState([]);

  const [cart, setCart] =
    useState([]);

  useEffect(() => {

    const storedProducts = [

      {
        id: 1,
        name: "Tea",
        price: 20
      },

      {
        id: 2,
        name: "Coffee",
        price: 50
      },

      {
        id: 3,
        name: "Milk",
        price: 40
      },

      {
        id: 4,
        name: "Rice",
        price: 100
      }
    ];

    setProducts(storedProducts);

  }, []);

  const addToCart = (product) => {

    const existingProduct =

      cart.find(
        (item) =>
          item.id === product.id
      );

    let updatedCart;

    if(existingProduct){

      updatedCart =

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

    alert(`${product.name} added to cart`);
  };

  return (

    <div>

      <Navbar />

      {/* Hero Section */}

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

      {/* Products Section */}

      <div className="products-section container">

        <h2 className="text-center mb-4">

          Our Products

        </h2>

        <div className="row">

          {
            products.map((product) => (

              <div
                className="col-md-3 mb-4"
                key={product.id}
              >

                <div className="card product-card">

                  <div className="card-body text-center">

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

                      Add to Cart

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