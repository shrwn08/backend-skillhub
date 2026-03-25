import express from "express";
import {getAllMentors, getMentor} from "../controllers/mentor.controller"




const router = express.Router();

router.get("/", getAllMentors);
router.get("/:id", getMentor);
router.get("/:id/slots", (req,res)=>console.log("check the slots"));
router.post("/apply", (req,res)=>console.log("apply for slot"));
router.put(":/id", (req, res)=>console.log("update mentor's data"));


export default router;