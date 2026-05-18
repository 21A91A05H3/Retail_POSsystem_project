import Product from "../models/productModel.js";
import Sale from "../models/saleModel.js";
import Category from "../models/categoryModel.js";
import Supplier from "../models/supplierModel.js";

export const getDashboardData = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalSales = await Sale.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalSuppliers = await Supplier.countDocuments();

    const salesData = await Sale.find();

    const totalRevenue = salesData.reduce(
      (acc, item) => acc + item.totalAmount,
      0
    );

    res.status(200).json({
      success: true,
      dashboard: {
        totalProducts,
        totalSales,
        totalCategories,
        totalSuppliers,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};