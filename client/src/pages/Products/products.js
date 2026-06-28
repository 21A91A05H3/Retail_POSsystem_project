import React, { useState, useEffect } from "react";
import axios from "axios";
import "./products.css";

import Sidebar from "../../components/Sidebar/sidebar";
import Navbar from "../../components/Navbar/navbar";

function Products() {

  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(response.data.products);

    } catch (error) {

      console.log(error);

    }

  };

  const addProduct = async (e) => {

    e.preventDefault();

    if (productName === "" || price === "") {

      return;

    }

    try {

      await axios.post(
        "http://localhost:5000/api/products",
        {
          name: productName,
          price: Number(price)
        }
      );

      fetchProducts();

      setProductName("");
      setPrice("");

    } catch (error) {

      console.log(error);

    }

  };

  const deleteProduct = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );

      fetchProducts();

    } catch (error) {

      console.log(error);

    }

  };

  const editProduct = (product) => {

    setEditId(product._id);

    setEditName(product.name);

    setEditPrice(product.price);

  };

  const updateProduct = async () => {

    try {

      await axios.put(

        `http://localhost:5000/api/products/${editId}`,

        {
          name: editName,
          price: Number(editPrice)
        }

      );

      fetchProducts();

      setEditId(null);

      setEditName("");

      setEditPrice("");

    } catch (error) {

      console.log(error);

    }

  };

  const filteredProducts = products.filter((product) =>

    product.name
      .toLowerCase()
      .includes(search.toLowerCase())

  );

  return (

    <div className="products-page">

      <Sidebar />

      <div className="products-content">

        <Navbar />

        <h2 className="mb-4">

          Product Management

        </h2>

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

          <button
            className="btn btn-primary"
          >

            Add Product

          </button>

        </form>

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

                filteredProducts.length === 0 ?

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center"
                    >

                      No Products Available

                    </td>

                  </tr>

                  :

                  filteredProducts.map((product) => (

                    <tr key={product._id}>

                      <td>

                        {product._id}

                      </td>

                      <td>

                        {

                          editId === product._id ?

                            <input
                              type="text"
                              className="form-control"
                              value={editName}
                              onChange={(e) =>
                                setEditName(
                                  e.target.value
                                )
                              }
                            />

                            :

                            product.name

                        }

                      </td>

                      <td>

                        {

                          editId === product._id ?

                            <input
                              type="number"
                              className="form-control"
                              value={editPrice}
                              onChange={(e) =>
                                setEditPrice(
                                  e.target.value
                                )
                              }
                            />

                            :

                            `₹${product.price}`

                        }

                      </td>

                      <td>

                        {

                          editId === product._id ?

                            <button
                              className="btn btn-success btn-sm me-2"
                              onClick={updateProduct}
                            >

                              Save

                            </button>

                            :

                            <button
                              className="btn btn-warning btn-sm me-2"
                              onClick={() =>
                                editProduct(product)
                              }
                            >

                              Edit

                            </button>

                        }

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            deleteProduct(product._id)
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