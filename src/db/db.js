import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
    }
    catch(error){
        console.error("MONGODB connection FAILED",error);
        process.exit(1)
        
    }
}
export default connectDB;
