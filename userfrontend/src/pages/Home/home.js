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

  useEffect(() => {

    const storedProducts =

      JSON.parse(
        localStorage.getItem("products")
      ) || [];

    setProducts(storedProducts);

  }, []);

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
            products.length === 0
            ?

           <div className="row">

  <div className="col-md-3 mb-4">

    <div className="card product-card">

      <div className="card-body text-center">

        <h5>
          Milk
        </h5>

        <p>
          ₹50
        </p>

        <button className="btn btn-primary">

          Add to Cart

        </button>

      </div>

    </div>

  </div>

  <div className="col-md-3 mb-4">

    <div className="card product-card">

      <div className="card-body text-center">

        <h5>
          Bread
        </h5>

        <p>
          ₹40
        </p>

        <button className="btn btn-primary">

          Add to Cart

        </button>

      </div>

    </div>

  </div>

  <div className="col-md-3 mb-4">

    <div className="card product-card">

      <div className="card-body text-center">

        <h5>
          Rice
        </h5>

        <p>
          ₹100
        </p>

        <button className="btn btn-primary">

          Add to Cart

        </button>

      </div>

    </div>

  </div>

</div>

            :

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

                    <button className="btn btn-primary">

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