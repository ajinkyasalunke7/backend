import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js"


const connectionDB = async () => {
    try {
    
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URL}`)
        console.log(`\n MongoDB Connected !!`);
       // console.log(`\n DB Host : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB Connection FAILED", error, error);
        process.exit(1);
    }
}

export default connectionDB;