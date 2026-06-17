import React, {
  useState,
  useEffect
} from "react";

import axios from "axios";

import "./inventory.css";

import Sidebar
from "../../components/Sidebar/sidebar";

import Navbar
from "../../components/Navbar/navbar";

function Inventory() {

  const [inventoryData, setInventoryData] =
    useState([]);

  const [search, setSearch] =
    useState("");

  useEffect(() => {

    fetchInventory();

  }, []);

  const fetchInventory = async () => {

    try {

      const response =

        await axios.get(
          "http://localhost:5000/api/products"
        );

      setInventoryData(
        response.data.products
      );

    } catch(error){

      console.log(
        "Inventory Error:",
        error
      );
    }
  };

  const increaseStock = async (id) => {

    try {

      await axios.put(

        `http://localhost:5000/api/inventory/increase/${id}`,

        {
          quantity: 1
        }
      );

      fetchInventory();

    } catch(error){

      console.log(error);
    }
  };

  const decreaseStock = async (id) => {

    try {

      await axios.put(

        `http://localhost:5000/api/inventory/decrease/${id}`,

        {
          quantity: 1
        }
      );

      fetchInventory();

    } catch(error){

      alert(
        error.response?.data?.message ||
        "Unable to decrease stock"
      );
    }
  };

  const filteredInventory =

    inventoryData.filter((item) =>

      (item.name || "")
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

        <div className="inventory-table">

          <table className="table table-hover">

            <thead>

              <tr>

                <th>ID</th>

                <th>Product</th>

                <th>Price</th>

                <th>Stock</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {
                filteredInventory.length === 0

                ?

                <tr>

                  <td
                    colSpan="6"
                    className="text-center text-muted"
                  >

                    No Products Available

                  </td>

                </tr>

                :

                filteredInventory.map((item) => (

                  <tr key={item._id}>

                    <td>

                      {item._id}

                    </td>

                    <td>

                      {item.name}

                    </td>

                    <td>

                      ₹{item.price}

                    </td>

                    <td>

                      {item.stock}

                    </td>

                    <td>

                      {
                        item.stock === 0

                        ?

                        <span className="badge bg-danger">

                          Out Of Stock

                        </span>

                        :

                        item.stock <= 5

                        ?

                        <span className="badge bg-warning text-dark">

                          Low Stock

                        </span>

                        :

                        <span className="badge bg-success">

                          In Stock

                        </span>
                      }

                    </td>

                    <td>

                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() =>
                          increaseStock(
                            item._id
                          )
                        }
                      >

                        + Stock

                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          decreaseStock(
                            item._id
                          )
                        }
                      >

                        - Stock

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