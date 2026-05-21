import express from "express";

import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  searchProducts,
  getLowStockProducts,
  getPaginatedProducts,
} from "../controllers/productController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ADD PRODUCT
router.post(
  "/",
  protect,
  adminOnly,
  addProduct
);

// GET PRODUCTS
router.get("/", getProducts);

// SEARCH PRODUCTS
router.get(
  "/search",
  searchProducts
);

// LOW STOCK PRODUCTS
router.get(
  "/low-stock",
  getLowStockProducts
);

// PAGINATED PRODUCTS
router.get(
  "/paginated",
  getPaginatedProducts
);

// UPDATE PRODUCT
router.put(
  "/:id",
  protect,
  adminOnly,
  updateProduct
);

// DELETE PRODUCT
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

export default router;