# 🚀 Deployment Guide

This guide will help you deploy your Food Delivery App to live servers.

## 📋 Prerequisites

1. **GitHub Account** - To store your code
2. **Netlify Account** - For frontend and admin panel deployment
3. **Render Account** - For backend deployment
4. **MongoDB Atlas** - For database hosting
5. **Stripe Account** - For payment processing

## 🎯 Deployment Architecture

This project uses the following deployment setup:
- **Frontend**: Deployed on Netlify
- **Admin Panel**: Deployed on Netlify
- **Backend**: Deployed on Render

## 🔧 Environment Variables Setup

### Backend (.env)
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=4000
FRONTEND_URL=https://your-frontend-domain.netlify.app
ADMIN_URL=https://your-admin-domain.netlify.app
```

### Frontend (.env)
```env
VITE_BACKEND_URL=https://your-backend-domain.onrender.com
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Admin (.env)
```env
VITE_BACKEND_URL=https://your-backend-domain.onrender.com
```

## 🚀 Step-by-Step Deployment

### 1. Deploy Backend (Render)

1. Go to [Render](https://render.com/)
2. Create new Web Service
3. Connect your GitHub repository
4. Select the `backend` folder
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Add environment variables in Render dashboard
8. Deploy!

### 2. Deploy Frontend (Netlify)

1. Go to [Netlify](https://netlify.com/)
2. Connect your GitHub repository
3. Select the `frontend` folder
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Add environment variables in Netlify dashboard
7. Deploy!

### 3. Deploy Admin Panel (Netlify)

1. Create another Netlify site
2. Connect the same GitHub repository
3. Select the `admin` folder
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Add environment variables in Netlify dashboard
7. Deploy!

## 📱 Live URLs

After deployment, you'll get these URLs:
- **Frontend**: `https://your-app-name.netlify.app`
- **Admin Panel**: `https://your-admin-name.netlify.app`
- **Backend API**: `https://your-backend-name.onrender.com`

## 🔐 Security Checklist

- [ ] All environment variables are set correctly
- [ ] CORS is configured for your domains
- [ ] JWT secret is secure and unique
- [ ] MongoDB database is properly secured
- [ ] Stripe webhooks are configured (if using)

## 🎯 Testing Deployment

1. Test API endpoints: `https://your-backend-url/api/food`
2. Test frontend functionality
3. Test admin panel operations
4. Test payment flow (use Stripe test cards)

## 📞 Support

If you encounter any issues during deployment, check:
1. Build logs in deployment platform
2. Environment variables are correctly set
3. API endpoints are accessible
4. Database connection is working

---

Happy Deploying! 🚀
