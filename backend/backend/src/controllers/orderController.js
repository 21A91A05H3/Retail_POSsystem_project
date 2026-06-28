import orderModel from "../models/orderModel.js";

// ======================================
// CREATE ORDER
// ======================================

export const createOrder = async (
  req,
  res
) => {

  try {

    console.log(
      "Order Request:",
      req.body
    );

    const {

      customerName,

      products,

      totalAmount,

      paymentMethod,

      orderType

    } = req.body;

    const order = await orderModel.create({

      customerName,

      products,

      totalAmount,

      paymentMethod,

      orderType

    });

    console.log(
      "Order Saved:",
      order
    );

    res.status(201).json({

      success: true,

      message: "Order Created Successfully",

      order,

    });

  }

  catch (error) {

    console.log(
      "Order Error:",
      error
    );

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ======================================
// GET ALL ORDERS
// ======================================

export const getOrders = async (
  req,
  res
) => {

  try {

    const orders = await orderModel
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      count: orders.length,

      orders,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ======================================
// SALES ANALYTICS
// ======================================

export const getSalesAnalytics = async (
  req,
  res
) => {

  try {

    const orders = await orderModel.find();

    const totalRevenue = orders.reduce(

      (acc, item) =>

        acc + item.totalAmount,

      0

    );

    const totalOrders = orders.length;

    res.status(200).json({

      success: true,

      totalRevenue,

      totalOrders,

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};