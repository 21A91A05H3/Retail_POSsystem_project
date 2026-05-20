import productModel from "../models/productModel.js";

import {
  addProductService,
  getProductsService,
  updateProductService,
  deleteProductService,
  searchProductsService,
  getPaginatedProductsService,
} from "../services/productService.js";

// ADD PRODUCT
export const addProduct = async (
  req,
  res
) => {

  try {

    const product =
      await addProductService(req.body);

    res.status(201).json({
      success: true,
      message:
        "Product Added Successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET PRODUCTS
export const getProducts = async (
  req,
  res
) => {

  try {

    const products =
      await getProductsService();

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
export const updateProduct = async (
  req,
  res
) => {

  try {

    const product =
      await updateProductService(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Product Updated Successfully",
      product,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (
  req,
  res
) => {

  try {

    await deleteProductService(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Product Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SEARCH PRODUCTS
export const searchProducts = async (
  req,
  res
) => {

  try {

    const {
      keyword,
      category,
      minPrice,
      maxPrice,
    } = req.query;

    const products =
      await searchProductsService(
        keyword,
        category,
        minPrice,
        maxPrice
      );

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// LOW STOCK PRODUCTS
export const getLowStockProducts =
  async (req, res) => {

    try {

      const lowStockProducts =
        await productModel.find({
          stock: { $lt: 5 },
        });

      res.status(200).json({
        success: true,
        count:
          lowStockProducts.length,
        products:
          lowStockProducts,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// PAGINATED PRODUCTS
export const getPaginatedProducts =
  async (req, res) => {

    try {

      const page =
        Number(req.query.page) || 1;

      const limit =
        Number(req.query.limit) || 5;

      const {
        products,
        totalProducts,
      } =
        await getPaginatedProductsService(
          page,
          limit
        );

      res.status(200).json({
        success: true,
        currentPage: page,
        totalPages: Math.ceil(
          totalProducts / limit
        ),
        totalProducts,
        products,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

// low stock feature completed