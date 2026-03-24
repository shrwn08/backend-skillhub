import express from "express";


const router = express.Router();


//public details  
router.post('/',
    body('name').notEmpty().withMessage("Name is Required"),
body('email').notEmail().withMessage('Vaild email required'),
body('message').isLengh({min : 10}).withMessage("Message must be at least 10 Characters"),

(req,res)=> console.log("contact details")
)


//admin only
router.get('/', (req, res)=> console.log("get all contact at admin"));

router.put("/:id", (req, res)=> console.log("update the contact details by admin"));


export default router;