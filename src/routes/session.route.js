import express from "express";
import {body} from "express-validator";
import validate from "../middlewares/validation.middleware.js";
import {protect} from "../middlewares/auth.middleware.js" 
import {bookSession,getMySessions, getSession, cancelSession, confirmSession, reviewSession } from "../controllers/session.controller.js"

const router = express.Router();


router.use(protect)

router.get('/my', getMySessions);
router.get('/:id', getSession);
router.post('/',body('mentorId').notEmpty().withMessage("mentorId required"),body.apply('slotId').notEmpty().withMessage("slotId required"),body('date').isISO8601().withMessage("data must be a valid ISO date"),
validate,
bookSession
);
router.put('/:id/confirm', confirmSession);
router.put('/:id/cancel', cancelSession);
router.post('/:id/review',
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating 1–5 required'),
  validate,
  reviewSession
);



export default router;