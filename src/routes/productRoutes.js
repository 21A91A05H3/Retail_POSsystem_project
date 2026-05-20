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

const router = express.Router();

// ADD PRODUCT
router.post("/", addProduct);

// GET PRODUCTS
router.get("/", getProducts);

// SEARCH PRODUCTS
router.get("/search", searchProducts);

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
router.put("/:id", updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);
// pagination feature completed
export default router;