import express from "express";

import {
  increaseStock,
  decreaseStock,
  lowStockProducts
} from "../controllers/inventoryController.js";

const router = express.Router();

router.put("/increase/:id", increaseStock);

router.put("/decrease/:id", decreaseStock);

router.get("/low-stock", lowStockProducts);

export default router;