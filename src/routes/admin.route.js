import express from "express";
import {getStats, getAllUsers } from "../controllers/admin.controller.js"


const router = express.Router();


//dashboard

router.get('/stats', getStats);


//user management
router.get('/users',getAllUsers);

router.put("/users/:id/toggle-active", ()=>console.log("perticular user"));


//mentor 
router.get('/mentor/pending', ()=>console.log("get Mentor pendin"));

router.put("/mentors/:id/approve", ()=>console.log("approve mentor"));


//resource

router.get('/resource/pendiing', ()=>console.log("pending resource"));

router.put("/resource/:id/publish", ()=>console.log("Publish resources"));



export default router;