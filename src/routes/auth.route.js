import express from "express";
import {body} from "express-validator";
import validate from "../middlewares/validation.middleware"



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






export default router;

