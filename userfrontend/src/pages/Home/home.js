import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./home.css";

import Navbar
from "../../components/Navbar/navbar";

import { toast }
from "react-toastify";

function Home() {

  const [products, setProducts] =
    useState([]);

  const [cart, setCart] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchProducts();

    const storedCart =

      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCart(storedCart);

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

   toast.success(
  `${product.name} added to cart`
);
  };

  const filteredProducts =

    products.filter((product) =>

      product.name
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
    );

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

        <button
  className="btn btn-warning"

  onClick={() => {

    document
      .querySelector(".products-section")
      ?.scrollIntoView({
        behavior: "smooth"
      });
  }}
>

  Shop Now

</button>

      </div>

      <div className="products-section container">

        <h2 className="text-center mb-4">

          Our Products

        </h2>

        <input
          type="text"

          className="form-control mb-4"

          placeholder="Search Products..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <div className="row">

          {
            filteredProducts.length === 0

            ?

            <h4 className="text-center">

              No Products Available

            </h4>

            :

            filteredProducts.map((product) => (

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

                    <p>

                      {
                        product.stock === 0

                        ?

                        <span className="out-stock-badge">

                          Out Of Stock

                        </span>

                        :

                        product.stock <= 5

                        ?

                        <span className="low-stock-badge">

                          Low Stock

                        </span>

                        :

                        <span className="in-stock-badge">

                          In Stock

                        </span>
                      }

                    </p>

                    <button
                      className={
                        product.stock === 0

                        ?

                        "btn btn-secondary w-100"

                        :

                        "btn btn-primary w-100"
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

      <footer className="footer">

        <h5>

          Retail Shop

        </h5>

        <p>

          Fresh Products Delivered To Your Doorstep

        </p>

        <p>

          support@retailshop.com

        </p>

        <p>

          © 2026 Retail Shop

        </p>

      </footer>

    </div>
  );
}

export default Home;

