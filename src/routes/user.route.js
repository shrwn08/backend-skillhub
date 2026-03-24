import express from "express";
import userModel from "../models/user.model.js"


const router = express.Router();

router.get('/:id',  ()=>console.log("getting user"));


export default router;