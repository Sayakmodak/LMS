import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("database connected");
    } catch (error) {
        console.log("error occured", error);
    }
}

export default dbConnection;