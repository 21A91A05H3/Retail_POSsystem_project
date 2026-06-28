import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(

  {

    name: {

      type: String,

      required: true,

      trim: true,

    },

    phone: {

      type: String,

      required: true,

      unique: true,

      trim: true,

    },

    email: {

      type: String,

      default: "",

      trim: true,

    },

    address: {

      type: String,

      default: "",

      trim: true,

    },

  },

  {

    timestamps: true,

  }

);

const customerModel = mongoose.model(

  "Customer",

  customerSchema

);

export default customerModel;