import express from "express";

import {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct);

router.get("/", getProducts);

router.put("/update/:id", updateProduct);

router.delete("/delete/:id", deleteProduct);

export default router;