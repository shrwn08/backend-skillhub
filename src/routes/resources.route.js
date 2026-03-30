import express from "express";
import {getAllResources, getResource, createResource, updateResource, deleteResource} from "../controllers/resource.controller.js"

import {protect, authorise} from "../middlewares/auth.middleware.js"


const router = express.Router();

router.get('/', getAllResources);

router.get('/:id', getResource);

router.post('/', protect, authorise("admin","mentor"),createResource);

router.put('/:id', protect, authorise("admin"), updateResource);

router.delete('/:id',  protect, authorise("admin"), deleteResource)


export default router;