import express from "express";
import {body} from "express-validator"
import { submitContact, getAllContacts, updateContact } from "../controllers/contact.controller.js"

import { protect, authorise } from "../middlewares/auth.middleware.js"
const router = express.Router();


//public details  
router.post('/',
    body('name').notEmpty().withMessage("Name is Required"),
body('email').isEmail().withMessage('Vaild email required'),
body('message').isLength({min : 10}).withMessage("Message must be at least 10 Characters"),

submitContact
)


//admin only
router.get('/', protect, authorise('admin'), getAllContacts);

router.put("/:id", protect, authorise('admin'), updateContact);


export default router;