import express from "express";
import {getProgress, toggleStep, getAllProgress} from "../controllers/progress.controller.js"
import { protect } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.use(protect);

router.get("/all", getAllProgress);
router.get("/:ideaId", getProgress);
router.put("/:ideaId/step/:stepId",toggleStep);

export default router;