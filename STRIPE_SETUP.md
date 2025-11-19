# Stripe Payment Integration Setup

## Overview
Your food delivery application now has integrated Stripe payment processing along with Cash on Delivery (COD) option.

## What's Been Implemented

### Backend Changes:
1. **Order Controller** - Added Stripe integration with separate endpoints for card payments and COD
2. **Environment Variables** - Added STRIPE_SECRET_KEY configuration
3. **Routes** - Added new route for COD orders (`/place-cod`)

### Frontend Changes:
1. **Place Order Component** - Updated to handle Stripe checkout sessions
2. **Payment Methods** - Simplified UI with Card, UPI, and COD options
3. **Stripe Integration** - Redirects to Stripe's secure hosted checkout page

## Setup Instructions

### 1. Get Stripe API Keys
- Go to [https://dashboard.stripe.com/](https://dashboard.stripe.com/)
- Create an account or log in
- Go to Developers > API Keys
- Copy your "Secret key" (starts with `sk_test_`)

### 2. Update Environment Variables
Edit `/backend/.env` and replace the placeholder:
```
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key_here
```

### 3. Install Dependencies
Frontend dependencies are already installed:
- `@stripe/stripe-js` for Stripe integration

Backend dependencies are already in package.json:
- `stripe` for server-side processing

### 4. Test the Implementation

#### Testing Card Payments:
1. Start your backend server: `npm run server` (in backend directory)
2. Start your frontend: `npm run dev` (in frontend directory)
3. Add items to cart and proceed to checkout
4. Select "Credit/Debit Card" payment method
5. Fill in delivery information
6. Click "PLACE ORDER"
7. You'll be redirected to Stripe's checkout page
8. Use test card numbers:
   - **Success**: 4242 4242 4242 4242
   - **Decline**: 4000 0000 0000 0002
   - Use any future expiry date and any 3-digit CVC

#### Testing COD:
1. Select "Cash on Delivery" payment method
2. Fill in delivery information
3. Click "PLACE ORDER"
4. Order will be placed immediately without payment processing

## Payment Flow

### Card Payment Flow:
1. User selects items and goes to checkout
2. Chooses "Credit/Debit Card" payment method
3. Clicks "PLACE ORDER"
4. Frontend calls `/api/order/place` endpoint
5. Backend creates order in database
6. Backend creates Stripe checkout session
7. User is redirected to Stripe's secure payment page
8. After payment, user is redirected back to verify page
9. Verify page calls `/api/order/verify` to confirm payment
10. Order status is updated and user sees confirmation

### COD Flow:
1. User selects items and goes to checkout
2. Chooses "Cash on Delivery" payment method
3. Clicks "PLACE ORDER"
4. Frontend calls `/api/order/place-cod` endpoint
5. Backend creates order with payment status set to true
6. User sees immediate confirmation

## API Endpoints

- `POST /api/order/place` - Create order and Stripe session (for card payments)
- `POST /api/order/place-cod` - Create order directly (for COD)
- `POST /api/order/verify` - Verify payment status after Stripe redirect

## Security Features

1. **Server-side processing** - All Stripe operations happen on the backend
2. **Secure redirects** - Payment processing on Stripe's secure servers
3. **Order verification** - Payment status verified before order confirmation
4. **User authentication** - All order endpoints require valid JWT token

## Testing in Production

When ready for production:
1. Replace test API keys with live keys from Stripe dashboard
2. Update webhook endpoints if needed
3. Test with real payment methods
4. Ensure HTTPS is enabled for security

## Troubleshooting

### Common Issues:
1. **"Stripe is not defined"** - Check if environment variable is set correctly
2. **Payment fails** - Verify test card numbers and expiry dates
3. **Redirect issues** - Check frontend_url in orderController.js matches your frontend URL
4. **Order not found** - Ensure order is created before Stripe session

### Debug Steps:
1. Check browser console for frontend errors
2. Check backend logs for Stripe API errors
3. Verify environment variables are loaded
4. Test with Stripe's test mode first

## Next Steps

Consider adding:
1. **Webhooks** - For real-time payment status updates
2. **Refunds** - Handle order cancellations
3. **Multiple currencies** - Support different regions
4. **Saved cards** - For returning customers
5. **UPI integration** - For Indian market
6. **Order tracking** - Real-time order status updates
