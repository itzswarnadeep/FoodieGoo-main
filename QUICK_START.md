# 🚀 Quick Start Guide - Stripe Payment Integration

## Current Status
✅ Backend and Frontend code is ready
✅ Stripe package installed
⚠️  Need to configure Stripe API key

## Step 1: Get Your Stripe API Key (5 minutes)

### Option A: Get Real Test Key (Recommended)
1. Go to https://dashboard.stripe.com/
2. Sign up for free (no credit card required for test mode)
3. After signing up, go to "Developers" → "API Keys"
4. Copy the **Secret key** (starts with `sk_test_`)
5. Replace in `/backend/.env`:
   ```
   STRIPE_SECRET_KEY="sk_test_your_actual_key_here"
   ```

### Option B: Use Demo Mode (For Testing)
If you want to test without Stripe right now:
- The app will work with COD (Cash on Delivery) orders
- Card payments will show an error message
- You can add Stripe later

## Step 2: Test the Application

### Start the servers:
```bash
# Terminal 1 - Backend
cd backend
npm run server

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

### Test the features:
1. **Frontend**: http://localhost:5173
2. **Add items to cart**
3. **Go to checkout**
4. **Test both payment methods:**
   - **COD**: Should work immediately
   - **Card**: Will work after adding Stripe key

## Step 3: Test Card Payments (After Stripe Setup)

Use these test card numbers:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **Expiry**: Any future date (e.g., 12/25)
- **CVC**: Any 3 digits (e.g., 123)

## Expected Flow:

### 🟢 COD Order Flow:
1. Select "Cash on Delivery"
2. Fill delivery info
3. Click "PLACE ORDER"
4. ✅ Order placed immediately
5. Redirected to "My Orders"

### 💳 Card Payment Flow:
1. Select "Credit/Debit Card"
2. Fill delivery info  
3. Click "PLACE ORDER"
4. 🔄 Redirected to Stripe checkout page
5. Enter test card details
6. ✅ Payment processed
7. Redirected back to verify page
8. ✅ Order confirmed in "My Orders"

## Troubleshooting

### ❌ "Card payments are currently unavailable"
- Check if STRIPE_SECRET_KEY is properly set in .env
- Restart the backend server after updating .env

### ❌ "Error creating payment session"
- Verify your Stripe key is valid
- Check backend console for detailed error messages

### ❌ Orders not saving
- Check MongoDB connection in .env
- Ensure user is logged in before placing order

## 🎯 What's Been Implemented:

### Backend Features:
- ✅ Stripe checkout session creation
- ✅ Order management with payment status
- ✅ Separate endpoints for COD and card payments
- ✅ Payment verification after Stripe redirect
- ✅ Error handling for missing API keys

### Frontend Features:
- ✅ Payment method selection (Card/UPI/COD)
- ✅ Stripe checkout integration
- ✅ Order verification page
- ✅ Improved error messages
- ✅ Responsive payment UI

### Security Features:
- ✅ Server-side payment processing
- ✅ JWT authentication for orders
- ✅ Secure payment redirects
- ✅ Order verification before confirmation

## Next Steps (Optional Enhancements):

1. **Webhooks**: Real-time payment notifications
2. **Refunds**: Handle order cancellations  
3. **Multiple Currencies**: Support different regions
4. **Saved Cards**: For returning customers
5. **Order Tracking**: Real-time status updates

## Need Help?

The application is fully functional now! Just add your Stripe API key and you're ready to go. 

For production deployment:
- Replace test keys with live keys
- Enable webhooks for reliable payment processing
- Add proper error monitoring
