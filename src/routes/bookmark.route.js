import express from "express"



const router = express.Router();

router.get("/", (req, res)=>console.log("Book mark data"));

router.post("/", (req,res)=>console.log("add a bookmark"));

router.delete('/:ideaId', (req,res)=>console.log("remove bookmarks"));


export default router;