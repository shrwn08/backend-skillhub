import express from "express";
import {getProgress} from "../controllers/progress.controller.js"

const router = express.Router();

router.get("/all", (req, res)=>console.log("progress bar"));
router.get("/:ideaId", getProgress);
router.put("/:ideaId/step/:stepId", (req,res)=>console.log("step toggle"));

export default router;