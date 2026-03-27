import express from "express";
import {body} from "express-validator";
import validate from "../middlewares/validation.middleware.js";

const router = express.Router();
import {bookSession,getMySessions } from "../controllers/session.controller.js"


router.get('/my', getMySessions);
router.get('/:id', (req, res)=>console.log("get a specific session"));
router.post('/',body('mentorId').notEmpty().withMessage("mentorId required"),body.apply('slotId').notEmpty().withMessage("slotId required"),body('date').isISO8601().withMessage("data must be a valid ISO date"),
validate,
bookSession
);

export default router;