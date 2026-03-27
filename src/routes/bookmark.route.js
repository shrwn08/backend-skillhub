import express from "express"
import {getBookmarks} from "../controllers/bookmark.controller.js"


const router = express.Router();

router.get("/", getBookmarks);

router.post("/", (req,res)=>console.log("add a bookmark"));

router.delete('/:ideaId', (req,res)=>console.log("remove bookmarks"));


export default router;