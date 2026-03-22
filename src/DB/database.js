import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
    console.log(process.env.MONGOURI)   //getting result
  try {
    const conn = await mongoose.connect(`${process.env.MONGOURI}`);

    
    console.log(conn.connection.host !==  "localhost"?`MongoDB Connected: ${conn.connection.host}`: "MongoDB connected sucessfully" );
  } catch (err) {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
