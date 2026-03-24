import express from "express";
import cors from "cors";
import connectDB from "./DB/database.js";
import authRoutes from "./routes/auth.route.js"
import ideaRoutes from "./routes/idea.route.js"


const app = express();
// app.use(cors({
//     origin : "*",
//     creadentials : true
// }));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

const PORT = 8080;




connectDB();


//Health Check
app.get('/api/health', (req,res)=>res.json({status : "ok"}));


//Mount routes
app.use('/api/auth', authRoutes);
app.use("/api/ideas", ideaRoutes)



//404 handler
app.use((req,res)=>{
    res.status(404).json({success : false, message : "Route not found"});
})



app.listen(8080, ()=>console.log(`server is running on port ${PORT}`))