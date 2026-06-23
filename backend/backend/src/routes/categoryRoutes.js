import express from "express";

import {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";

const router = express.Router();


// ADD CATEGORY
router.post("/add", addCategory);


// GET CATEGORIES
router.get("/", getCategories);


// UPDATE CATEGORY
router.put("/update/:id", updateCategory);


// DELETE CATEGORY
router.delete("/delete/:id", deleteCategory);


export default router;