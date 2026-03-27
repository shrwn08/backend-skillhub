import express from "express"
import {getBookmarks, addBookmark, removeBookmark} from "../controllers/bookmark.controller.js"


const router = express.Router();

router.get("/", getBookmarks);

router.post("/", addBookmark);

router.delete('/:ideaId', removeBookmark);


export default router;