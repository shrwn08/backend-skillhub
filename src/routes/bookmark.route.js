import express from "express"
import {getBookmarks, addBookmark} from "../controllers/bookmark.controller.js"


const router = express.Router();

router.get("/", getBookmarks);

router.post("/", addBookmark);

router.delete('/:ideaId', (req,res)=>console.log("remove bookmarks"));


export default router;