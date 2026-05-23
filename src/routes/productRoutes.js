import express from "express";

import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ==============================
// ADD PRODUCT WITH IMAGE
// ==============================
router.post(
  "/",
  upload.single("image"),
  addProduct
);

// ==============================
// GET ALL PRODUCTS
// ==============================
router.get(
  "/",
  getProducts
);

// ==============================
// GET SINGLE PRODUCT
// ==============================
router.get(
  "/:id",
  getSingleProduct
);

// ==============================
// UPDATE PRODUCT
// ==============================
router.put(
  "/:id",
  updateProduct
);

// ==============================
// DELETE PRODUCT
// ==============================
router.delete(
  "/:id",
  deleteProduct
);

export default router;