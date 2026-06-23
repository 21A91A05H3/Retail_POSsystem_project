import express from "express";

import {
  createSale,
  getSales,
} from "../controllers/saleController.js";

const router = express.Router();


// CREATE SALE
router.post("/create", createSale);


// GET SALES
router.get("/", getSales);


export default router;