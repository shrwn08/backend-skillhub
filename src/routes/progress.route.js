import express from "express";


const router = express.Router();

router.get("/all", (req, res)=>console.log("progress bar"));
router.get("/:ideaId", (req, res)=> console.log("progress bar of a specific vid"));
router.put("/:ideaId/step/:stepId", (req,res)=>console.log("step toggle"));

export default router;