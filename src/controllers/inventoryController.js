import Product from "../models/productModel.js";

// INCREASE STOCK
export const increaseStock = async (req, res) => {

  try {

    const { quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    product.stock += quantity;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Stock Increased Successfully",
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// DECREASE STOCK
export const decreaseStock = async (req, res) => {

  try {

    const { quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: "Insufficient stock"
      });
    }

    product.stock -= quantity;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Stock Decreased Successfully",
      product
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};


// LOW STOCK PRODUCTS
export const lowStockProducts = async (req, res) => {

  try {

    const products = await Product.find({
      stock: { $lt: 10 }
    });

    res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};