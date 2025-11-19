#!/bin/bash

# 🚀 FoodieGoo Deployment Script
# This script helps prepare your project for deployment

echo "🍕 Preparing FoodieGoo for Deployment..."

# Create .env templates if they don't exist
create_env_template() {
    local folder=$1
    local template_content=$2
    
    if [ ! -f "$folder/.env.example" ]; then
        echo "📝 Creating .env.example in $folder"
        echo "$template_content" > "$folder/.env.example"
    fi
}

# Backend .env template
backend_env="# Backend Environment Variables
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
PORT=4000
FRONTEND_URL=https://your-frontend-domain.vercel.app
ADMIN_URL=https://your-admin-domain.vercel.app"

# Frontend .env template
frontend_env="# Frontend Environment Variables
VITE_BACKEND_URL=https://your-backend-domain.railway.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key"

# Admin .env template
admin_env="# Admin Environment Variables
VITE_BACKEND_URL=https://your-backend-domain.railway.app"

# Create environment templates
create_env_template "backend" "$backend_env"
create_env_template "frontend" "$frontend_env"
create_env_template "admin" "$admin_env"

echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Push your code to GitHub"
echo "2. Deploy backend to Railway/Render"
echo "3. Deploy frontend to Vercel"
echo "4. Deploy admin to Vercel"
echo "5. Update environment variables in deployment platforms"
echo "6. Update README.md with your actual live URLs"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo "🚀 Happy Deploying!"
