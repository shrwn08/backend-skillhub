import express from "express";
import {body} from "express-validator";
import validate from "../middlewares/validation.middleware.js";

const router = express.Router();


router.get('/my', (req,res)=>console.log("get my sessions"));
router.get('/:id', (req, res)=>console.log("get a specific session"));
router.post('/',body('mentorId').notEmpty().withMessage("mentorId required"),body.apply('slotId').notEmpty().withMessage("slotId required"),body('date').isISO8601().withMessage("data must be a valid ISO date"),

(req, res)=>console.log("all bookking slot book session"));

export default router;