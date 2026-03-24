import express from "express";
import {body} from "express-validator";
import validate from "../middlewares/validation.middleware.js"



const router = express.Router();

const passwordRules = body('password').isLength({min : 6}).withMessage('Password must be at least 6 characters');

//public 

router.post('/register',
    body('name').notEmpty().withMessage('Name is requitred'),
    body('email').isEmail().withMessage('Valid email required'),
    passwordRules,
    validate,
    (req,res)=>console.log('auth router ')
);

router.post('/login', 
    body('email').isEmail().withMessage('Valid email required'),
    body('password').notEmpty(),
    validate,
    ()=>console.log("login route ")
);

//protected

router.get('/me',(req, res)=>console.log("protect route about the user"));

router.put('/update-profile', (req, res)=>console.log("protect route about the user profile image"));

router.put('/change-password', body('current-pasword').notEmpty(),
body('new-password').isLength({min : 6}),
validate,
(req,res)=>console.log("change password route")
);



export default router;

