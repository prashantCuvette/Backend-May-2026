import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connection Successful");
    } catch (error) {
        console.log("MongoDB Connection Failed");
        process.exit(1);
    }
};