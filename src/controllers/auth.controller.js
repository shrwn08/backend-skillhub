import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

//sign and return a jwt

const signToken = (id) => {
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const sendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  //remove passward from putput

  user.password = undefined;
  res.status(statusCode).json({ sucess: true, token, data: user });
};

//register controller

export const register = async (req, res) => {
  try {
    const { name, email, password, role, skills, interests } = req.body;

    const allowedRole = ["user", "mentor"].includes(role) ? role : "user";

    const existing = await userModel.findOne({ email });

    if (existing)
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });

    const user = await userModel.create({
      name,
      email,
      password,
      role: allowedRole,
      skills: skills || [],
      interests: interests || [],
    });

    sendToken(user, 201, res);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
