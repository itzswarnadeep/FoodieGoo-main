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
        enum: ['Salad', 'Rolls', 'Deserts', 'Sandwich', 'Cake', 'Pure Veg', 'Pasta', 'Noodles']
    },
    ingredients: [{
        type: String
    }],
    nutritionalInfo: {
        calories: {
            type: Number,
            default: 0
        },
        protein: {
            type: Number,
            default: 0
        },
        carbs: {
            type: Number,
            default: 0
        },
        fat: {
            type: Number,
            default: 0
        }
    },
    preparationTime: {
        type: Number, // in minutes
        default: 30
    },
    servingSize: {
        type: String,
        default: "1 serving"
    },
    isVegetarian: {
        type: Boolean,
        default: true
    },
    isVegan: {
        type: Boolean,
        default: false
    },
    spiceLevel: {
        type: String,
        enum: ['Mild', 'Medium', 'Hot', 'Very Hot'],
        default: 'Mild'
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    numReviews: {
        type: Number,
        default: 0
    },
    availability: {
        type: Boolean,
        default: true
    },
    discountPercentage: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    tags: [{
        type: String
    }],
    allergens: [{
        type: String,
        enum: ['Nuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Shellfish', 'Fish']
    }]
}, {
    timestamps: true // This will add createdAt and updatedAt fields
});

// Create indexes for better query performance
foodSchema.index({ category: 1 });
foodSchema.index({ name: 'text', description: 'text' });
foodSchema.index({ price: 1 });
foodSchema.index({ rating: -1 });
foodSchema.index({ availability: 1 });

// Virtual field for discounted price
foodSchema.virtual('discountedPrice').get(function() {
    if (this.discountPercentage > 0) {
        return Math.round(this.price * (1 - this.discountPercentage / 100) * 100) / 100;
    }
    return this.price;
});

// Method to check if food item is in stock
foodSchema.methods.isInStock = function() {
    return this.availability;
};

// Static method to find foods by category
foodSchema.statics.findByCategory = function(category) {
    return this.find({ category: category, availability: true });
};

// Static method to find foods within price range
foodSchema.statics.findByPriceRange = function(minPrice, maxPrice) {
    return this.find({ 
        price: { $gte: minPrice, $lte: maxPrice }, 
        availability: true 
    });
};

// Static method to find popular foods (high rating)
foodSchema.statics.findPopular = function(limit = 10) {
    return this.find({ availability: true })
               .sort({ rating: -1, numReviews: -1 })
               .limit(limit);
};

// Pre-save middleware to ensure some validations
foodSchema.pre('save', function(next) {
    // Ensure price is positive
    if (this.price < 0) {
        this.price = 0;
    }
    
    // Ensure rating is within valid range
    if (this.rating < 0) this.rating = 0;
    if (this.rating > 5) this.rating = 5;
    
    // Ensure discount percentage is within valid range
    if (this.discountPercentage < 0) this.discountPercentage = 0;
    if (this.discountPercentage > 100) this.discountPercentage = 100;
    
    next();
});

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;

