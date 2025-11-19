import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY) 


// placing user order from frontend
const placeOrder = async (req, res) => {
    const frontend_url = "https://kaleidoscopic-dolphin-f2171b.netlify.app";
    
    try {
        // Check if Stripe is configured
        if (!stripe) {
            return res.json({ 
                success: false, 
                message: "Card payments are currently unavailable. Please use Cash on Delivery or contact support." 
            });
        }

        // Validate order data
        if (!req.body.items || req.body.items.length === 0) {
            return res.json({ success: false, message: "No items in cart" });
        }

        if (!req.body.address || !req.body.userId) {
            return res.json({ success: false, message: "Missing required order information" });
        }

        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Validate and prepare line items for Stripe
        const line_items = req.body.items.map((item) => {
            // Ensure item has required fields
            if (!item.name || !item.price || !item.quantity) {
                throw new Error(`Invalid item data: missing name, price, or quantity`);
            }
            
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.round(item.price * 100) // Ensure it's an integer
                },
                quantity: item.quantity
            };
        });

        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        });

        console.log("📦 Creating Stripe session with items:", line_items.length, "items");
        console.log("💰 Total amount:", req.body.amount);

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/myorders?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/cart?success=false&orderId=${newOrder._id}`,
        });

        console.log("✅ Stripe session created successfully:", session.id);
        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error("❌ Error creating payment session:", error.message);
        console.error("Error details:", error);
        
        // If it's a Stripe error, provide more specific feedback
        if (error.type) {
            res.json({ 
                success: false, 
                message: `Payment error: ${error.message}` 
            });
        } else {
            res.json({ success: false, message: "Error placing order" });
        }
    }
}

// placing user order for COD
const placeOrderCOD = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            payment: true // Set to true for COD orders
        });
        
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        res.json({ success: true, message: "Order placed successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error placing order" });
    }
}

const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success == "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Paid" });
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// Listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { placeOrder, placeOrderCOD, verifyOrder, userOrders, listOrders, updateStatus };
