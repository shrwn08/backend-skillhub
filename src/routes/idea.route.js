import express from "express";
import {authorise} from "../middlewares/auth.middleware.js"

import {getAllIdeas, getRecommended, getIdea } from "../controllers/idea.controller.js"



const router = express.Router();


router.get('/', getAllIdeas);

router.get('/recommended', getRecommended);

router.get("/:id", getIdea);


router.post("/", (req,res)=>console.log('create an idea'));
router.put("/:id", (req, res)=>console.log("upadte idea"));
router.delete("/:id", (req, res)=>console.log("delete the idea"));

export default router;