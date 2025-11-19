import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true //removes whitespaces
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0 // Ensures price cannot be negative
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    }
})

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;

// This model can be used to interact with the 'food' collection in MongoDB.
// It includes fields for name, description, price, image, and category of the food item.
// The 'required' property ensures that these fields must be provided when creating a new food item.
// The 'trim' property for the name field removes any leading or trailing whitespace.
// The 'min' property for the price field ensures that the price cannot be negative.
// The model is exported for use in other parts of the application, such as controllers or services.
// If the 'food' model already exists, it will use that; otherwise, it will create a new one.