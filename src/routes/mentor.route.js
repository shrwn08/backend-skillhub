import express from "express";
import {getAllMentors, getMentor,applyAsMentor, updateMentor, getAvailableSlots} from "../controllers/mentor.controller"




const router = express.Router();

router.get("/", getAllMentors);
router.get("/:id", getMentor);
router.get("/:id/slots", getAvailableSlots);
router.post("/apply", applyAsMentor);
router.put(":/id", updateMentor);


export default router;