import express from "express";
import cors from "cors";
import connectDB from "./DB/database.js";


const app = express();
// app.use(cors({
//     origin : "*",
//     creadentials : true
// }));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const PORT = 8080;


connectDB();




app.listen(8080, ()=>console.log(`server is running on port ${PORT}`))