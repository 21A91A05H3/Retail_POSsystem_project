import express from "express";

import {
  registerUser,
  loginUser,
  getUsers,
} from "../controllers/authController.js";

const router = express.Router();

// REGISTER
router.post(
  "/register",
  registerUser
);

// LOGIN
router.post(
  "/login",
  loginUser
);

// GET ALL USERS
router.get(
  "/users",
  getUsers
);

export default router;