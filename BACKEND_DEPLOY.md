# Railway Deployment Instructions

## 🚂 Deploy Backend to Railway

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select your repository**
5. **Choose the backend folder**
6. **Add Environment Variables:**
   ```
   MONGODB_URI=your_mongodb_atlas_string
   JWT_SECRET=your_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret
   PORT=4000
   FRONTEND_URL=https://your-netlify-frontend-url.netlify.app
   ADMIN_URL=https://your-netlify-admin-url.netlify.app
   ```
7. **Deploy!**

## Alternative: Render.com
1. Go to [Render.com](https://render.com)
2. New Web Service
3. Connect GitHub repo
4. Select backend folder
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Add environment variables
8. Deploy!

Your backend will be live at: `https://your-app-name.railway.app`
