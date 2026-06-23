import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// PROTECT ROUTES
export const protect = async (req, res, next) => {

  try {

    let token = req.headers.authorization;

    if (
      token &&
      token.startsWith("Bearer")
    ) {

      token = token.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await userModel.findById(
        decoded.id
      );

      next();

    } else {

      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });

    }

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }
};

// ADMIN ONLY
export const adminOnly = async (
  req,
  res,
  next
) => {

  try {

    if (req.user.role === "admin") {

      next();

    } else {

      return res.status(403).json({
        success: false,
        message: "Admin Access Only",
      });

    }

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};
