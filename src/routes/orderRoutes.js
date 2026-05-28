import express from "express";

import {
  createOrder,
  getOrders,
  getSalesAnalytics,
} from "../controllers/orderController.js";

const router = express.Router();

// CREATE ORDER
router.post(
  "/",
  createOrder
);

// GET ALL ORDERS
router.get(
  "/",
  getOrders
);

// SALES ANALYTICS
router.get(
  "/analytics",
  getSalesAnalytics
);

export default router;