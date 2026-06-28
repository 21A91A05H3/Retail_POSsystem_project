import express from "express";

import {
  addCustomer,
  getCustomers,
  getCustomerByPhone,
  updateCustomer,
  deleteCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.post("/", addCustomer);

router.get("/", getCustomers);

router.get("/:phone", getCustomerByPhone);

router.put("/:id", updateCustomer);

router.delete("/:id", deleteCustomer);

export default router;