import express from "express";
import {authorise} from "../middlewares/auth.middleware.js"

import {getAllIdeas, getRecommended, getIdea, updateIdea, deleteIdea } from "../controllers/idea.controller.js"



const router = express.Router();


router.get('/', getAllIdeas);

router.get('/recommended', getRecommended);

router.get("/:id", getIdea);


router.post("/", createIdea);
router.put("/:id", updateIdea);
router.delete("/:id", deleteIdea);

export default router;