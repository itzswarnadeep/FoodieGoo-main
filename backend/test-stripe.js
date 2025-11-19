// Test script to validate Stripe integration
import 'dotenv/config';
import Stripe from 'stripe';

console.log('🔍 Testing Stripe Integration...');

// Check environment variable
console.log('STRIPE_SECRET_KEY exists:', !!process.env.STRIPE_SECRET_KEY);
console.log('STRIPE_SECRET_KEY starts with sk_test:', process.env.STRIPE_SECRET_KEY?.startsWith('sk_test_'));

try {
    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    console.log('✅ Stripe initialized successfully');
    
    // Test creating a simple checkout session
    const testSession = await stripe.checkout.sessions.create({
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Test Product',
                },
                unit_amount: 1000, // $10.00
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
    });
    
    console.log('✅ Test checkout session created:', testSession.id);
    console.log('✅ Stripe integration is working correctly!');
    
} catch (error) {
    console.error('❌ Stripe test failed:', error.message);
    console.error('Error type:', error.type);
    console.error('Error code:', error.code);
}
