import express from "express"
import {bookSession} from "../controllers/session.controller.js"



const router = express.Router();

router.get("/", (req, res)=>console.log("Book mark data"));

router.post("/", bookSession);

router.delete('/:ideaId', (req,res)=>console.log("remove bookmarks"));


export default router;