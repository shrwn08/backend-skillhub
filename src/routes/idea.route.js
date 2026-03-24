import express from "express";
import {authorise} from "../middlewares/auth.middleware.js"



const router = express.Router();


router.get('/', (req, res)=>console.log("idea routes"));

router.get('/recommended', (req, res)=>console.log("recommended routes"));

router.get("/:id", (req, res)=>console.log("route get id"));


router.post("/", (req,res)=>console.log('create an idea'));
router.put("/:id", (req, res)=>console.log("upadte idea"));
router.delete("/:id", (req, res)=>console.log("delete the idea"));

export default router;