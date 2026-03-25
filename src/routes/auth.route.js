import express from "express";
import { body } from "express-validator";
import validate from "../middlewares/validation.middleware.js";
import {
  register,
  login,
  getme,
  updateProfile,
  changePassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

const passwordRules = body("password")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters");

//public

router.post(
  "/register",
  body("name").notEmpty().withMessage("Name is requitred"),
  body("email").isEmail().withMessage("Valid email required"),
  passwordRules,
  validate,
  register,
);

router.post(
  "/login",
  body("email").isEmail().withMessage("Valid email required"),
  body("password").notEmpty(),
  validate,
  login,
);

//protected

router.get("/me", getme);

router.put("/update-profile", updateProfile);

router.put(
  "/change-password",
  body("current-pasword").notEmpty(),
  body("new-password").isLength({ min: 6 }),
  validate,
  (req, res) => console.log("change password route"),
);

export default router;
