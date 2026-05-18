import express from "express";

import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getLowStockProducts,
} from "../controllers/productController.js";

const router = express.Router();

// LOW STOCK PRODUCTS
router.get("/low-stock", getLowStockProducts);

// ADD PRODUCT
router.post("/", addProduct);

// GET ALL PRODUCTS
router.get("/", getProducts);

// UPDATE PRODUCT
router.put("/:id", updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

export default router;