import express from "express";
import { submitContact, getAllContacts } from "../controllers/contact.controller.js"


const router = express.Router();


//public details  
router.post('/',
    body('name').notEmpty().withMessage("Name is Required"),
body('email').notEmail().withMessage('Vaild email required'),
body('message').isLengh({min : 10}).withMessage("Message must be at least 10 Characters"),

submitContact
)


//admin only
router.get('/', getAllContacts);

router.put("/:id", (req, res)=> console.log("update the contact details by admin"));


export default router;