import express from "express";
import {getStats, getAllUsers,toggleUserActive, getPendingMentors, approveMentor, getPendingResources, publishResource } from "../controllers/admin.controller.js"


const router = express.Router();


//dashboard

router.get('/stats', getStats);


//user management
router.get('/users',getAllUsers);

router.put("/users/:id/toggle-active", toggleUserActive);


//mentor 
router.get('/mentor/pending', getPendingMentors);

router.put("/mentors/:id/approve", approveMentor);


//resource

router.get('/resource/pending', getPendingResources);

router.put("/resource/:id/publish",publishResource);



export default router;