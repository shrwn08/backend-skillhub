import express from "express";


const router = express.Router();


//dashboard

router.get('/stats', (req, res)=>console.log("get all stats"));


//user management
router.get('/users',(req, res)=>console.log("All users data"));

router.put("/users/:id/toggle-active", ()=>console.log("perticular user"));


//mentor 
router.get('/mentor/pending', ()=>console.log("get Mentor pendin"));

router.put("/mentors/:id/approve", ()=>console.log("approve mentor"));


//resource

router.get('/resource/pendiing', ()=>console.log("pending resource"));

router.put("/resource/:id/publish", ()=>console.log("Publish resources"));



export default router;