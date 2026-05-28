import React, {
  useState,
  useEffect
} from "react";

import "./products.css";

import Sidebar
from "../../components/Sidebar/sidebar";

import Navbar
from "../../components/Navbar/navbar";

function Products() {

  const [productName, setProductName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [products, setProducts] =
    useState(

      JSON.parse(
        localStorage.getItem("products")
      ) || []
    );

  const [search, setSearch] =
    useState("");

  const [editId, setEditId] =
    useState(null);

  const [editName, setEditName] =
    useState("");

  const [editPrice, setEditPrice] =
    useState("");

  useEffect(() => {

    localStorage.setItem(

      "products",

      JSON.stringify(products)
    );

  }, [products]);

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

    /* Auto Add To Inventory */

    const existingInventory =

      JSON.parse(
        localStorage.getItem("inventory")
      ) || [];

    const newInventoryItem = {

      id: newProduct.id,

      product: productName,

      stock: 0
    };

    localStorage.setItem(

      "inventory",

      JSON.stringify([

        ...existingInventory,

        newInventoryItem
      ])
    );

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

    /* Delete From Inventory Also */

    const inventory =

      JSON.parse(
        localStorage.getItem("inventory")
      ) || [];

    const updatedInventory =

      inventory.filter(

        (item) =>
          item.id !== id
      );

    localStorage.setItem(

      "inventory",

      JSON.stringify(updatedInventory)
    );
  };

  const editProduct = (product) => {

    setEditId(product.id);

    setEditName(product.name);

    setEditPrice(product.price);
  };

  const updateProduct = () => {

    const updatedProducts =

      products.map((product) =>

        product.id === editId
        ?
        {
          ...product,

          name: editName,

          price: editPrice
        }
        :
        product
      );

    setProducts(updatedProducts);

    /* Update Inventory Product Name */

    const inventory =

      JSON.parse(
        localStorage.getItem("inventory")
      ) || [];

    const updatedInventory =

      inventory.map((item) =>

        item.id === editId
        ?
        {
          ...item,

          product: editName
        }
        :
        item
      );

    localStorage.setItem(

      "inventory",

      JSON.stringify(updatedInventory)
    );

    setEditId(null);

    setEditName("");

    setEditPrice("");
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
              setProductName(
                e.target.value
              )
            }
          />

          <input
            type="number"

            placeholder="Price"

            className="form-control"

            value={price}

            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
          />

          <button className="btn btn-primary">

            Add Product

          </button>

        </form>

        {/* Search */}

        <input
          type="text"

          placeholder="Search Product"

          className="form-control search-input"

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        {/* Product Table */}

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

                      {
                        editId === product.id
                        ?
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
                        editId === product.id
                        ?
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
                        editId === product.id
                        ?
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