import productModel from "../models/productModel.js";

// ==============================
// ADD PRODUCT
// ==============================
export const addProduct = async (req, res) => {

  try {

    const {
      name,
      description,
      price,
      category,
      stock,
    } = req.body;

    // uploaded image url from cloudinary
    const image = req.file ? req.file.path : "";

    // create product
    const product = await productModel.create({
      name,
      description,
      price,
      category,
      stock,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Product Added Successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// GET ALL PRODUCTS
// ==============================
export const getProducts = async (req, res) => {

  try {

    const products = await productModel.find();

    res.status(200).json({
      success: true,
      products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// GET SINGLE PRODUCT
// ==============================
export const getSingleProduct = async (req, res) => {

  try {

    const product = await productModel.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// UPDATE PRODUCT
// ==============================
export const updateProduct = async (req, res) => {

  try {

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==============================
// DELETE PRODUCT
// ==============================
export const deleteProduct = async (req, res) => {

  try {

    const product = await productModel.findByIdAndDelete(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================================
// LOW STOCK PRODUCTS
// ======================================

export const getLowStockProducts = async (req, res) => {

  try {

    const lowStockProducts = await productModel.find({
      stock: { $lte: 5, $gt: 0 }
    });

    const productsWithWarnings = lowStockProducts.map((product) => ({
      ...product._doc,
      warning: "Low Stock",
    }));

    res.status(200).json({
      success: true,
      count: productsWithWarnings.length,
      products: productsWithWarnings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ======================================
// OUT OF STOCK PRODUCTS
// ======================================

export const getOutOfStockProducts = async (req, res) => {

  try {

    const outOfStockProducts = await productModel.find({
      stock: 0
    });

    const productsWithWarnings = outOfStockProducts.map((product) => ({
      ...product._doc,
      warning: "Out Of Stock",
    }));

    res.status(200).json({
      success: true,
      count: productsWithWarnings.length,
      products: productsWithWarnings,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};