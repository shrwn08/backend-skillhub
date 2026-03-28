import express from "express";
import {getAllResources, getResource, createResource, updateResource, deleteResource} from "../controllers/resource.controller.js"


const router = express.Router();

router.get('/', getAllResources);

router.get('/:id', getResource);

router.post('/', createResource);

router.put('/:id', updateResource);

router.delete('/:id', deleteResource)


export default router;