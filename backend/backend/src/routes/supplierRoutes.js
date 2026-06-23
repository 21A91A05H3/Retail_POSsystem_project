import express from "express";

import {
  createSupplier,
  getAllSuppliers,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController.js";

const router = express.Router();

router.post("/", createSupplier);

router.get("/", getAllSuppliers);

router.get("/:id", getSingleSupplier);

router.put("/:id", updateSupplier);

router.delete("/:id", deleteSupplier);

export default router;