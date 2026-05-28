import productModel from "../models/productModel.js";
import orderModel from "../models/orderModel.js";

// DASHBOARD STATS
export const getDashboardStats = async (
  req,
  res
) => {

  try {

    // total products
    const totalProducts =
      await productModel.countDocuments();

    // total orders
    const totalOrders =
      await orderModel.countDocuments();

    // fetch orders
    const orders =
      await orderModel.find();

    // total revenue
    const totalRevenue = orders.reduce(
      (acc, item) =>
        acc + item.totalAmount,
      0
    );

    // low stock
    const lowStockProducts =
      await productModel.find({
        stock: { $lt: 10 },
      });

    // monthly revenue
    const monthlyRevenue = {};

    orders.forEach((order) => {

      const month =
        new Date(
          order.createdAt
        ).toLocaleString(
          "default",
          { month: "long" }
        );

      if (!monthlyRevenue[month]) {
        monthlyRevenue[month] = 0;
      }

      monthlyRevenue[month] +=
        order.totalAmount;

    });

    // top selling products
    const productSales = {};

    orders.forEach((order) => {

      order.products.forEach(
        (item) => {

          if (
            !productSales[
              item.productName
            ]
          ) {
            productSales[
              item.productName
            ] = 0;
          }

          productSales[
            item.productName
          ] += item.quantity;

        }
      );

    });

    res.status(200).json({
      success: true,
      totalProducts,
      totalOrders,
      totalRevenue,
      lowStockCount:
        lowStockProducts.length,
      lowStockProducts,
      monthlyRevenue,
      topSellingProducts:
        productSales,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};