import express from "express";

import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();


// ADD PRODUCT
router.post("/add", addProduct);


// GET PRODUCTS
router.get("/", getProducts);


// UPDATE PRODUCT
router.put("/update/:id", updateProduct);


// DELETE PRODUCT
router.delete("/delete/:id", deleteProduct);


export default router;