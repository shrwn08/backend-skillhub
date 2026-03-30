import express from "express"
import {getBookmarks, addBookmark, removeBookmark} from "../controllers/bookmark.controller.js"

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getBookmarks);

router.post("/", addBookmark);

router.delete('/:ideaId', removeBookmark);


export default router;