import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://sarveshtakbhate:Sarvesh2005@cluster0.1vrdxlo.mongodb.net/FOOD-DEL');
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}