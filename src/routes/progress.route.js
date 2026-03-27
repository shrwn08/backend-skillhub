import express from "express";
import {getProgress, toggleStep} from "../controllers/progress.controller.js"

const router = express.Router();

router.get("/all", (req, res)=>console.log("progress bar"));
router.get("/:ideaId", getProgress);
router.put("/:ideaId/step/:stepId",toggleStep);

export default router;