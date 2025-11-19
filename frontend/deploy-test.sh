#!/bin/bash

echo "🔧 FoodieGoo Deployment Troubleshooter"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Please run this script from the frontend directory"
    exit 1
fi

echo "✅ Testing local build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "📁 Build files created in dist/"
    ls -la dist/
    
    echo ""
    echo "🚀 Deployment Options:"
    echo "1. Vercel (Recommended)"
    echo "2. Netlify (Alternative)"
    echo "3. Firebase Hosting"
    echo ""
    
    echo "📋 For Vercel deployment:"
    echo "1. Delete existing deployment on Vercel"
    echo "2. Import fresh from GitHub"
    echo "3. Set Root Directory to: frontend"
    echo "4. Framework: Vite (auto-detected)"
    echo "5. Build Command: npm run build"
    echo "6. Output Directory: dist"
    echo ""
    
    echo "🌐 Alternative: Deploy to Netlify"
    echo "Go to netlify.com and drag-drop the 'dist' folder"
    echo ""
    
else
    echo "❌ Build failed. Check the errors above."
fi
