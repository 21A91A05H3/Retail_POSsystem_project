import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ==============================
// REGISTER USER
// ==============================
export const registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      phone,
      password,
      role
    } = req.body;

    // Check Existing User
    const existingUser =
      await userModel.findOne({
         $or:[

        {email},

        {phone}

    ]
      });

    if (existingUser) {

      return res.status(400).json({

        success: false,

        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // Create User
    const user =
      await userModel.create({

        name,

        email,

        phone,

        password: hashedPassword,

        role: role || "cashier",
      });

    res.status(201).json({

      success: true,

      message:
        "User Registered Successfully",

      user,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,
    });

  }

};

// ==============================
// LOGIN USER
// ==============================
export const loginUser = async (req, res) => {

  try {

    const {
      login,
      password
    } = req.body;

    // Check User
    const user =
      await userModel.findOne({
        $or:[

{

email:login

},

{

phone:login

}

]
      });

    if (!user) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid Email or Password",
      });
    }

    // Compare Password
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid Email or Password",
      });
    }

    // Generate Token
    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({

      success: true,

      message:
        "Login Successful",

      token,

      user,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,
    });

  }

};

// ==============================
// GET ALL USERS
// ==============================
export const getUsers = async (req, res) => {

  try {

    const users =
      await userModel
        .find()
        .select("-password");

    res.status(200).json({

      success: true,

      count: users.length,

      users,
    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,
    });

  }

};