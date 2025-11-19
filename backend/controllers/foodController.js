import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item

const addFood = async (req, res) => {
     let image_filemame = `${req.file.filename}`;

     const food = new foodModel({
         name: req.body.name,
         description: req.body.description,
         price: req.body.price,
         image: image_filemame,
         category: req.body.category
     })

     try {
            await food.save();
            res.json({
                success: true,
                message: "Food item added successfully",
            })
     }
        catch (error) {
            console.error("Error adding food item:", error);
            res.status(500).json({
                success: false,
                message: "Failed to add food item",
                error: error.message    
            });
            }
}

//all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({
            success: true,
            data: foods
        });
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.json({
            success: false,
            message: "Failed to fetch food items",
            error: error.message
        });
    }
} 

//removing food item

const removeFood = async (req, res) => {
    try{
        const food = await foodModel.findById(req.body.id);
        fs.unlinkSync(`uploads/${food.image}`,()=>{}) //delete image from uploads folder
        
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({
            success: true,
            message: "Food item removed successfully"
        })
    }
    catch (error) {
        console.log(error);
        res.json({sucess:false,message:"Error"})
    }
}



export { addFood , listFood , removeFood };
