# Environment Setup Guide

## Important: Environment Variables

This project uses environment variables to store sensitive information like API keys and database credentials. **Never commit actual secrets to git!**

### Setup Instructions

1. **Copy the example environment file:**
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Fill in your actual values in the `.env` file:**
   - `JWT_SECRET`: A secure random string for JWT token generation
   - `MONGODB_URI`: Your MongoDB connection string
   - `STRIPE_SECRET_KEY`: Your Stripe secret key from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

### Getting Your Stripe Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. For development, use the **Test** keys (they start with `sk_test_`)
3. Copy the "Secret key" and paste it in your `.env` file

### Security Notes

- The `.env` file is ignored by git (listed in `.gitignore`)
- Only the `.env.example` file (with placeholder values) is tracked in git
- **Never share your actual `.env` file or commit it to version control**

### Environment Variables Reference

```bash
# JWT Secret for authentication
JWT_SECRET="your_secure_random_string_here"

# MongoDB connection string  
MONGODB_URI="mongodb+srv://username:password@cluster0.mongodb.net/food-delivery"

# Stripe Secret Key - Get from https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_test_key_here
```

### Troubleshooting

If you encounter issues with missing environment variables:

1. Make sure you have a `.env` file in the `backend` directory
2. Check that all required variables are defined in your `.env` file
3. Restart your server after making changes to environment variables
