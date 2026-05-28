import React, {
  useState,
  useEffect
} from "react";

import "./inventory.css";

import Sidebar
from "../../components/Sidebar/sidebar";

import Navbar
from "../../components/Navbar/navbar";

function Inventory() {

  const [product, setProduct] =
    useState("");

  const [stock, setStock] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [inventoryData, setInventoryData] =
    useState(

      JSON.parse(
        localStorage.getItem("inventory")
      ) || []
    );

  const [editId, setEditId] =
    useState(null);

  const [editProduct, setEditProduct] =
    useState("");

  const [editStock, setEditStock] =
    useState("");

  useEffect(() => {

    localStorage.setItem(

      "inventory",

      JSON.stringify(inventoryData)
    );

  }, [inventoryData]);

  const addInventory = (e) => {

    e.preventDefault();

    if(
      product === "" ||
      stock === ""
    ){
      return;
    }

    const newItem = {

      id: Date.now(),

      product,

      stock
    };

    setInventoryData([

      ...inventoryData,

      newItem
    ]);

    setProduct("");

    setStock("");
  };

  const deleteItem = (id) => {

    const updatedInventory =

      inventoryData.filter(

        (item) =>
          item.id !== id
      );

    setInventoryData(updatedInventory);
  };

  const startEdit = (item) => {

    setEditId(item.id);

    setEditProduct(item.product);

    setEditStock(item.stock);
  };

  const saveEdit = () => {

    const updatedInventory =

      inventoryData.map((item) =>

        item.id === editId
        ?
        {
          ...item,

          product: editProduct,

          stock: editStock
        }
        :
        item
      );

    setInventoryData(updatedInventory);

    setEditId(null);

    setEditProduct("");

    setEditStock("");
  };

  const filteredInventory =

    inventoryData.filter((item) =>

      item.product
      .toLowerCase()
      .includes(

        search.toLowerCase()
      )
    );

  return (

    <div className="inventory-page">

      <Sidebar />

      <div className="inventory-content">

        <Navbar />

        <h2 className="mb-4">

          Inventory Management

        </h2>

        {/* Add Inventory */}

        <form
          className="product-form"

          onSubmit={addInventory}
        >

          <input
            type="text"

            placeholder="Product Name"

            className="form-control"

            value={product}

            onChange={(e) =>
              setProduct(
                e.target.value
              )
            }
          />

          <input
            type="number"

            placeholder="Stock Quantity"

            className="form-control"

            value={stock}

            onChange={(e) =>
              setStock(
                e.target.value
              )
            }
          />

          <button className="btn btn-primary">

            Add Item

          </button>

        </form>

        {/* Search */}

        <input
          type="text"

          placeholder="Search Inventory"

          className="form-control search-input"

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        {/* Inventory Table */}

        <div className="inventory-table">

          <table className="table table-hover">

            <thead>

              <tr>

                <th>ID</th>

                <th>Product</th>

                <th>Stock</th>

                <th>Status</th>

                <th>Action</th>

              </tr>

            </thead>

            <tbody>

              {
                filteredInventory.map((item) => (

                  <tr key={item.id}>

                    <td>
                      {item.id}
                    </td>

                    <td>

                      {
                        editId === item.id
                        ?
                        <input
                          type="text"

                          className="form-control"

                          value={editProduct}

                          onChange={(e) =>
                            setEditProduct(
                              e.target.value
                            )
                          }
                        />
                        :
                        item.product
                      }

                    </td>

                    <td>

                      {
                        editId === item.id
                        ?
                        <input
                          type="number"

                          className="form-control"

                          value={editStock}

                          onChange={(e) =>
                            setEditStock(
                              e.target.value
                            )
                          }
                        />
                        :
                        item.stock
                      }

                    </td>

                    <td>

                      <span
                        className={
                          item.stock <= 10
                          ?
                          "badge bg-danger"
                          :
                          "badge bg-success"
                        }
                      >

                        {
                          item.stock <= 10
                          ?
                          "Low Stock"
                          :
                          "In Stock"
                        }

                      </span>

                    </td>

                    <td>

                      {
                        editId === item.id
                        ?
                        <button
                          className="btn btn-success btn-sm me-2"

                          onClick={saveEdit}
                        >

                          Save

                        </button>
                        :
                        <button
                          className="btn btn-warning btn-sm me-2"

                          onClick={() =>
                            startEdit(item)
                          }
                        >

                          Edit

                        </button>
                      }

                      <button
                        className="btn btn-danger btn-sm"

                        onClick={() =>
                          deleteItem(item.id)
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

export default Inventory;