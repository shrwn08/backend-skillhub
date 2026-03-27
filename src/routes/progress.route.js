import express from "express";
import {getProgress, toggleStep, getAllProgress} from "../controllers/progress.controller.js"

const router = express.Router();

router.get("/all", getAllProgress);
router.get("/:ideaId", getProgress);
router.put("/:ideaId/step/:stepId",toggleStep);

export default router;