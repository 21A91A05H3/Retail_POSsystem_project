import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {

    res.status(200).json({
        success: true,
        message: "Protected Route Accessed",
        user: req.user
    });

});
export default router;