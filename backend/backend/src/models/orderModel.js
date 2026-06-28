import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(

  {

    customerName: {

      type: String,

      required: true,

    },

    products: [

      {

        productName: String,

        quantity: Number,

        price: Number,

      },

    ],

    totalAmount: {

      type: Number,

      required: true,

    },

    paymentMethod: {

      type: String,

      default: "Cash",

    },

    orderType: {

      type: String,

      enum: ["Online", "Offline"],

      default: "Offline",

    }

  },

  {

    timestamps: true,

  }

);

export default mongoose.model(

  "Order",

  orderSchema

);