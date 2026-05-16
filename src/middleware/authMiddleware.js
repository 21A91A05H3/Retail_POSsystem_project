import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {

  try {

    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No Token Provided",
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user
    const user = await userModel.findById(decoded.id).select("-password");

    req.user = user;

    next();

  } catch (error) {

    res.status(401).json({
      success: false,
      message: "Invalid Token",
    });

  }
};

export default authMiddleware;