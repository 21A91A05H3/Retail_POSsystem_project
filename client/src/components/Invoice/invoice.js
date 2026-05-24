import React from "react";
import "./invoice.css";

function Invoice({ cart, totalAmount }) {

  const gst = totalAmount * 0.18;

  const finalTotal =
    totalAmount + gst;

  return (

    <div className="invoice-container">

      <div className="invoice-header">

        <h2>
          Retail POS Store
        </h2>

        <p>
          Visakhapatnam,
          Andhra Pradesh
        </p>

        <p>
          Phone:
          9876543210
        </p>

      </div>

      <hr />

      <div className="invoice-info">

        <h3>
          Retail POS Invoice
        </h3>

        <p>
          Invoice No:
          {" "}
          INV1024
        </p>

        <p>
          Date:
          {" "}
          {new Date().toLocaleString()}
        </p>

      </div>

      <table className="table mt-4">

        <thead>

          <tr>

            <th>Product</th>

            <th>Qty</th>

            <th>Price</th>

            <th>Total</th>

          </tr>

        </thead>

        <tbody>

          {
            cart.map((item) => (

              <tr key={item.id}>

                <td>
                  {item.name}
                </td>

                <td>
                  {item.quantity}
                </td>

                <td>
                  ₹{item.price}
                </td>

                <td>
                  ₹{
                    item.price *
                    item.quantity
                  }
                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

      <div className="invoice-total">

        <p>

          Subtotal:
          {" "}
          ₹{totalAmount}

        </p>

        <p>

          GST (18%):
          {" "}
          ₹{gst.toFixed(2)}

        </p>

        <h4>

          Grand Total:
          {" "}
          ₹{
            finalTotal.toFixed(2)
          }

        </h4>

      </div>

      <p className="thank-you">

        Thank you for shopping with us 🙏

      </p>

      <button
        className="btn btn-primary w-100 mt-3"

        onClick={() =>
          window.print()
        }
      >

        Print Invoice

      </button>

    </div>
  );
}

export default Invoice;