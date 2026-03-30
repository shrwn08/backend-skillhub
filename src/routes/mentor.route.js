import express from "express";
import {
  getAllMentors,
  getMentor,
  applyAsMentor,
  updateMentor,
  getAvailableSlots,
} from "../controllers/mentor.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getAllMentors);
router.get("/:id", getMentor);
router.get("/:id/slots", getAvailableSlots);
router.post("/apply", protect, applyAsMentor);
router.put("/:id", protect, updateMentor);

export default router;
