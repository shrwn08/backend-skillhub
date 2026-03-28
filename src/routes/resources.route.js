import express from "express";
import {getAllResources} from "../controllers/resource.controller.js"


const router = express.Router();

router.get('/', getAllResources);

router.get('/:id', (req, res)=>console.log("get a specific resource"));

router.post('/', (req, res)=> console.log("post a resource"));

router.put('/:id', (req,res)=>console.log("update the change in resource"));

router.delete('/:id', (req,res)=>console.log("delete resource"))


export default router;