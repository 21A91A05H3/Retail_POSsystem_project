import React from "react";
import "./inventory.css";

import Sidebar from "../../components/Sidebar/sidebar";
import Navbar from "../../components/Navbar/navbar";

function Inventory() {

  const inventoryData = [

    {
      id: 1,
      product: "Milk",
      stock: 45,
      status: "In Stock"
    },

    {
      id: 2,
      product: "Bread",
      stock: 8,
      status: "Low Stock"
    },

    {
      id: 3,
      product: "Rice",
      stock: 60,
      status: "In Stock"
    },

    {
      id: 4,
      product: "Eggs",
      stock: 5,
      status: "Low Stock"
    }

  ];

  return (

    <div className="inventory-page">

      <Sidebar />

      <div className="inventory-content">

        <Navbar />

        <h2 className="mb-4">
          Inventory Management
        </h2>

        <div className="inventory-table">

          <table className="table table-hover">

            <thead>

              <tr>

                <th>ID</th>

                <th>Product</th>

                <th>Stock</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {
                inventoryData.map((item) => (

                  <tr key={item.id}>

                    <td>
                      {item.id}
                    </td>

                    <td>
                      {item.product}
                    </td>

                    <td>
                      {item.stock}
                    </td>

                    <td>

                      <span
                        className={
                          item.status === "Low Stock"
                          ?
                          "badge bg-danger"
                          :
                          "badge bg-success"
                        }
                      >

                        {item.status}

                      </span>

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