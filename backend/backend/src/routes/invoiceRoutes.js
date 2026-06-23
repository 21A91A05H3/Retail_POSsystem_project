import express from "express";

import {
  createInvoice,
  getInvoices,
  getSingleInvoice,
} from "../controllers/invoiceController.js";

const router = express.Router();

// ==============================
// CREATE INVOICE
// ==============================
router.post(
  "/",
  createInvoice
);

// ==============================
// GET ALL INVOICES
// ==============================
router.get(
  "/",
  getInvoices
);

// ==============================
// GET SINGLE INVOICE
// ==============================
router.get(
  "/:id",
  getSingleInvoice
);

export default router;