 import express from 'express';
 import cors from 'cors';
 import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from "./config/db.js";
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';



 //app config
const app = express()
const port = process.env.PORT || 4000;


//middleware
app.use(express.json()) //request from frontend
app.use(cors({
    origin: [
        "https://kaleidoscopic-dolphin-f2171b.netlify.app",
        "https://capable-rolypoly-60bb52.netlify.app",
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials: true
})) //backend from any content

// db connection
connectDB();


//api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/images",express.static("uploads")); //to access images from uploads folder

app.get("/",(req,res)=>{
    res.json({
        success: true,
        message: "FoodieGoo API is running successfully!",
        timestamp: new Date().toISOString()
    })
})

// Health check endpoint
app.get("/health",(req,res)=>{
    res.json({
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    })
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
});
