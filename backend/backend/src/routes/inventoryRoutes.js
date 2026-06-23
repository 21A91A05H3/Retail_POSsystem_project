import express from "express";

import {
  increaseStock,
  decreaseStock,
} from "../controllers/inventoryController.js";

const router = express.Router();


// INCREASE STOCK
router.put("/increase/:id", increaseStock);


// DECREASE STOCK
router.put("/decrease/:id", decreaseStock);


export default router;