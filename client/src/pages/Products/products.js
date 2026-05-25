import React, { useState } from "react";
import "./products.css";

import Sidebar from "../../components/Sidebar/sidebar";
import Navbar from "../../components/Navbar/navbar";


function Products() {

  const [productName, setProductName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [products, setProducts] =
    useState([]);

  const [search, setSearch] =
  useState("");

  const addProduct = (e) => {

    e.preventDefault();

    if(
      productName === "" ||
      price === ""
    ){
      return;
    }

    const newProduct = {

      id: Date.now(),

      name: productName,

      price: price
    };

    setProducts([
      ...products,
      newProduct
    ]);

    setProductName("");
    setPrice("");
  };

  const deleteProduct = (id) => {

    const updatedProducts =
      products.filter(
        (product) =>
          product.id !== id
      );

    setProducts(updatedProducts);
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

    <div className="products-page">

      <Sidebar />

      <div className="products-content">

        <Navbar />

        <h2 className="mb-4">
          Product Management
        </h2>

        {/* Product Form */}

        <form
          className="product-form"

          onSubmit={addProduct}
        >

          <input
            type="text"

            placeholder="Product Name"

            className="form-control"

            value={productName}

            onChange={(e) =>
              setProductName(e.target.value)
            }
          />

          <input
            type="number"

            placeholder="Price"

            className="form-control"

            value={price}

            onChange={(e) =>
              setPrice(e.target.value)
            }
          />

          <button className="btn btn-primary">

            Add Product

          </button>

        </form>

        {/* Product Table */}
          <input

  type="text"

  placeholder="Search Product"

  className="form-control search-input"

  value={search}

  onChange={(e) =>
    setSearch(e.target.value)
  }
/>
        <div className="table-container">

          <table className="table table-hover">

            <thead>

              <tr>

                <th>ID</th>

                <th>Name</th>

                <th>Price</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {
              filteredProducts.map((product) => (

                  <tr key={product.id}>

                    <td>
                      {product.id}
                    </td>

                    <td>
                      {product.name}
                    </td>

                    <td>
                      ₹{product.price}
                    </td>

                    <td>

                      <button
                        className="btn btn-danger btn-sm"

                        onClick={() =>
                          deleteProduct(product.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Products;