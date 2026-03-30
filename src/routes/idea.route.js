import express from "express";
import { protect, authorise } from "../middlewares/auth.middleware.js";

import {
  getAllIdeas,
  getRecommended,
  getIdea,
  createIdea,
  updateIdea,
  deleteIdea,
} from "../controllers/idea.controller.js";

const router = express.Router();

router.get("/", getAllIdeas);

router.get("/recommended", protect, getRecommended);

router.get("/:id", getIdea);

router.post("/", protect, authorise("admin"), createIdea);
router.put("/:id", protect, authorise("admin"), updateIdea);
router.delete("/:id", protect, authorise("admin"), deleteIdea);

export default router;
