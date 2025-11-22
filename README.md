#  Food Delivery App - MERN Stack

A full-stack food delivery application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring Stripe payment integration, real-time order management, and a comprehensive admin panel.


##  Live Demo

| Component | Live URL | Description |
|-----------|----------|-------------|
|  **Customer App** | [https://kaleidoscopic-dolphin-f2171b.netlify.app](https://kaleidoscopic-dolphin-f2171b.netlify.app) | Main food ordering application |
|  **Admin Panel** | [https://capable-rolypoly-60bb52.netlify.app](https://capable-rolypoly-60bb52.netlify.app) | Restaurant management dashboard |
|  **Backend API** | [https://foodiegoo.onrender.com](https://foodiegoo.onrender.com) | RESTful API server |

> ** All services deployed successfully!** - Frontend, Admin, and Backend are all live.

### Quick Test
- **Customer App**: Browse menu, add items to cart, and place orders
- **Admin Panel**: Manage orders, add food items, and track deliveries
- **Test Payments**: Use Stripe test cards (4242 4242 4242 4242)

## Features

###  Frontend (Customer App)
- **Modern UI/UX** - Clean, responsive design with modern styling
- **User Authentication** - Secure login/register system with JWT tokens
- **Food Menu** - Browse categorized food items with detailed descriptions
- **Smart Cart** - Add/remove items with quantity management
- **Multiple Payment Methods**:
  -  Credit/Debit Card (Stripe integration)
  -  UPI Payment (Coming soon)
  -  Cash on Delivery (COD)
- **Order History** - View past orders and their status

###  Admin Panel
- **Order Management** - View, update, and track all orders
- **Real-time Updates** - Auto-refresh every 10 seconds
- **Food Management** - Add, edit, and delete food items
- **Status Updates** - Change order status (Processing → Out for Delivery → Delivered)
- **Order Analytics** - Total orders count and payment status
- **Notification System** - Alert sounds and visual indicators for new orders

###  Backend API

##  Architecture

### Components
- Customer App: React-based storefront where users browse, add to cart, and checkout.
- Admin Panel: React-based dashboard for managing food items and orders (polls backend for updates).
- Backend API: Node + Express server that handles authentication (JWT), business logic, file uploads, and Stripe integration.
- Database: MongoDB (via Mongoose) storing users, food items, carts, and orders.
- Payments: Stripe handles card payments and returns verification to the backend.

### Data flow (concise)
1. User browses items on the Customer App and adds items to the cart.
2. At checkout the Customer App calls the Backend API to create an order and a Stripe PaymentIntent.
3. Stripe responds with a client token; the frontend completes payment using Stripe.js.
4. Backend verifies the payment webhook/confirmation and writes the finalized order to MongoDB.
5. Admin Panel polls the Backend (every ~10s) to fetch new/updated orders and update statuses.

### Infrastructure & deployment notes
- Frontend & Admin: deployed on static hosts (Netlify/Vercel/Netlify as used in this repo live demo).
- Backend: deployed on Node-capable hosts (Render/Heroku/Render as used for the live API).
- Database: MongoDB Atlas (recommended) or local MongoDB for development.
- File uploads: stored in `backend/uploads/` or a cloud storage provider for production.
- Observability: simple polling is used for admin updates; consider WebSockets or Server-Sent Events for real-time updates in the future.

### System Architecture WorkFlow

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                            │
│                     (Client-Side Applications)                       │
├──────────────────────────────┬──────────────────────────────────────┤
│                              │                                       │
│  ┌────────────────────────┐  │  ┌─────────────────────────────┐   │
│  │   Customer Frontend    │  │  │      Admin Panel            │   │
│  │   (React + Vite)       │  │  │      (React + Vite)         │   │
│  ├────────────────────────┤  │  ├─────────────────────────────┤   │
│  │ • Browse Menu          │  │  │ • Order Management          │   │
│  │ • Shopping Cart        │  │  │ • Food CRUD Operations      │   │
│  │ • User Authentication  │  │  │ • Real-time Notifications   │   │
│  │ • Order Placement      │  │  │ • Status Updates            │   │
│  │ • Payment Processing   │  │  │ • Analytics Dashboard       │   │
│  │ • Order Tracking       │  │  │ • Auto-refresh (10s)        │   │
│  └────────────────────────┘  │  └─────────────────────────────┘   │
│   Deployed on Netlify        │   Deployed on Netlify               │
│   Port 5173 (local)           │   Port 5174 (local)                 │
└──────────────────────────────┴──────────────────────────────────────┘
                                 │
                    HTTP/HTTPS Requests (REST API)
                                 │
┌─────────────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                               │
│                    (Business Logic Server)                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │             Node.js + Express.js API Server                  │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │                                                               │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │   │
│  │  │ Auth Module  │  │   Payment    │  │    File      │      │   │
│  │  │              │  │   Module     │  │   Upload     │      │   │
│  │  ├──────────────┤  ├──────────────┤  ├──────────────┤      │   │
│  │  │ • JWT tokens │  │ • Stripe API │  │ • Multer     │      │   │
│  │  │ • bcrypt     │  │ • Session    │  │ • Image      │      │   │
│  │  │   hashing    │  │   creation   │  │   validation │      │   │
│  │  │ • Token      │  │ • Payment    │  │ • Static     │      │   │
│  │  │   validation │  │   verify     │  │   serving    │      │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘      │   │
│  │                                                               │   │
│  │  API Endpoint Groups:                                        │   │
│  │  • /api/user/*   - Authentication & user management          │   │
│  │  • /api/food/*   - Food items CRUD operations                │   │
│  │  • /api/order/*  - Order placement & tracking                │   │
│  │  • /api/cart/*   - Shopping cart management                  │   │
│  │                                                               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│   Deployed on Render (Free Tier)                                    │
│   Port 4000 (local) | HTTPS in production                           │
└─────────────────────────────────────────────────────────────────────┘
                                 │
                       Mongoose ODM Layer
                                 │
┌─────────────────────────────────────────────────────────────────────┐
│                         DATA LAYER                                   │
│                    (Persistence Storage)                             │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │              MongoDB Database (NoSQL)                        │   │
│  ├─────────────────────────────────────────────────────────────┤   │
│  │                                                               │   │
│  │  ┌───────────┐      ┌───────────┐      ┌────────────┐      │   │
│  │  │   Users   │      │   Foods   │      │   Orders   │      │   │
│  │  │ Collection│      │ Collection│      │ Collection │      │   │
│  │  ├───────────┤      ├───────────┤      ├────────────┤      │   │
│  │  │ • name    │      │ • name    │      │ • userId   │      │   │
│  │  │ • email   │      │ • desc    │      │ • items[]  │      │   │
│  │  │ • password│      │ • price   │      │ • amount   │      │   │
│  │  │ • cartData│      │ • image   │      │ • address  │      │   │
│  │  │           │      │ • category│      │ • status   │      │   │
│  │  │           │      │           │      │ • payment  │      │   │
│  │  └───────────┘      └───────────┘      └────────────┘      │   │
│  │                                                               │   │
│  └─────────────────────────────────────────────────────────────┘   │
│   Hosted on MongoDB Atlas (Cloud)                                   │
│   Automated backups | Replica sets for high availability            │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                                 │
├─────────────────────────────────────────────────────────────────────┤
│  Stripe Payment Gateway - PCI-compliant payment processing          │
│  • Checkout session creation                                         │
│  • Secure payment tokenization                                       │
│  Webhook notifications for payment confirmation                    │
└─────────────────────────────────────────────────────────────────────┘
```

![System Architecture Flow](System_Architecture/system_Flow.png)

![System Architecture - Food Ordering App Flow](System_Architecture/Food%20Ordering%20App_Flow.png)


#### Detailed Architecture Layers Breakdown

**PRESENTATION LAYER (Client-Side)**
- **Customer Frontend (React + Vite)**
  - Port: 5173 (local), deployed on Netlify
  - Features: Menu browsing, shopping cart, user authentication, order placement, payment processing, order tracking
  - Technology: React.js with Vite bundler, responsive CSS3, Axios for API calls

- **Admin Panel (React + Vite)**
  - Port: 5174 (local), deployed on Netlify
  - Features: Order management, food CRUD operations, real-time notifications, status updates, analytics dashboard, auto-refresh every 10 seconds
  - Technology: React.js with Vite, React Router for navigation, polling mechanism for live updates

**APPLICATION LAYER (Backend Business Logic)**
- **Node.js + Express.js API Server**
  - Port: 4000 (local), deployed on Render with HTTPS in production
  
  - **Auth Module**
    - JWT token generation and validation
    - bcrypt password hashing for security
    - User session management
    
  - **Payment Module**
    - Stripe API integration
    - PaymentIntent creation and verification
    - Payment webhook handling
    - Failed payment management
    
  - **File Upload Module**
    - Multer middleware for multipart form data
    - Image validation and processing
    - Static file serving
    - Food item image management
  
  - **API Endpoint Groups**
    - `/api/user/*` - User registration, login, profile management
    - `/api/food/*` - Food items list, add, edit, delete operations
    - `/api/order/*` - Order creation, payment verification, status updates, order history
    - `/api/cart/*` - Add to cart, remove items, get cart contents

**DATA LAYER (Persistence & Storage)**
- **MongoDB Database (NoSQL)**
  - Hosted on MongoDB Atlas (Cloud)
  - Connection via Mongoose ODM
  - Automated daily backups and replication sets for high availability
  
  - **Users Collection**
    - User ID, name, email
    - Encrypted password (bcrypt hash)
    - Shopping cart data (items and quantities)
    - Delivery addresses
  
  - **Foods Collection**
    - Food item ID, name, description
    - Price and category
    - Image URL/path
    - Availability status
  
  - **Orders Collection**
    - Order ID and user ID reference
    - Items array with quantities and prices
    - Total order amount
    - Delivery address details
    - Order status (Food Processing → Out for Delivery → Delivered)
    - Payment confirmation and transaction details

**EXTERNAL SERVICES**
- **Stripe Payment Gateway**
  - PCI-DSS Level 1 compliant
  - Checkout session creation
  - Secure payment tokenization (no direct card storage)
  - Webhook notifications for asynchronous payment confirmation
  - Support for multiple payment methods (cards, test mode)

#### Data Flow & Communication

1. **User Request Flow**: Client → HTTP/HTTPS → API Server → Mongoose → MongoDB
2. **API Response Flow**: MongoDB → Mongoose → API Server → HTTP/HTTPS Response → Client
3. **Payment Flow**: Client → Stripe Session Creation → Payment Gateway → Webhook Confirmation → Order Finalization
4. **Admin Polling**: Admin Panel → API `/api/order/list` (every 10s) → Fresh order data
5. **File Upload**: Admin uploads image → Multer processes → Stored in `/backend/uploads/` or cloud storage → Image URL saved in MongoDB

##  Screenshots

<div align="center">
  <img src="frontend/src/assets/logo.png" alt="FoodieGoo Logo" width="120" style="margin-bottom: 20px; opacity: 0.8;"/>
  <h3> Application Showcase</h3>
</div>

This project includes comprehensive screenshots showcasing all three main components:

---

###  Frontend (Customer App)

####  Home Page & Menu
<table align="center">
<tr>
<td align="center" width="50%">
<img src="ScreenShots/frontend/home.png" alt="Home Page" width="100%"/>
<br/><em>Modern homepage with hero section and categories</em>
</td>
<td align="center" width="50%">
<img src="ScreenShots/frontend/menu.png" alt="Menu Page" width="100%"/>
<br/><em>Comprehensive food menu with filtering</em>
</td>
</tr>
</table>

####  Authentication System
<table align="center">
<tr>
<td align="center" width="50%">
<img src="ScreenShots/frontend/login.png" alt="Login Page" width="100%"/>
<br/><em>Secure login form with validation</em>
</td>
<td align="center" width="50%">
<img src="ScreenShots/frontend/signup.png" alt="Signup Page" width="100%"/>
<br/><em>User registration with form validation</em>
</td>
</tr>
</table>

####  Shopping & Order Flow
<table align="center">
<tr>
<td align="center" width="33%">
<img src="ScreenShots/frontend/dishes.png" alt="Food Items" width="100%"/>
<br/><em>Food items with add to cart</em>
</td>
<td align="center" width="33%">
<img src="ScreenShots/frontend/cart_page.png" alt="Cart Page" width="100%"/>
<br/><em>Shopping cart management</em>
</td>
<td align="center" width="33%">
<img src="ScreenShots/frontend/placeorder_page.png" alt="Place Order" width="100%"/>
<br/><em>Checkout and payment selection</em>
</td>
</tr>
</table>

#### 📦 Order Tracking & Site Footer
<table align="center">
<tr>
<td align="center" width="50%">
<img src="ScreenShots/frontend/orders_page.png" alt="Orders Page" width="100%"/>
<br/><em>Real-time order status tracking</em>
</td>
<td align="center" width="50%">
<img src="ScreenShots/frontend/footer.png" alt="Footer" width="100%"/>
<br/><em>Site footer with social links</em>
</td>
</tr>
</table>

---

###  Admin Panel

####  Dashboard & Order Management
<table align="center">
<tr>
<td align="center" width="50%">
<img src="ScreenShots/admin/admin_mainpage.png" alt="Admin Dashboard" width="100%"/>
<br/><em>Admin dashboard with navigation</em>
</td>
<td align="center" width="50%">
<img src="ScreenShots/admin/admin_orderlist.png" alt="Order Management" width="100%"/>
<br/><em>Real-time order management system</em>
</td>
</tr>
</table>

####  Food Item Management
<div align="center">
<img src="ScreenShots/admin/admin_itemlist.png" alt="Food Items Management" width="80%"/>
<br/><em>Add, edit, and manage food items with image uploads</em>
</div>

---

###  Backend & Database

####  MongoDB Database Collections
<table align="center">
<tr>
<td align="center" width="50%">
<img src="ScreenShots/backend/mongodb_users_database.png" alt="Users Database" width="100%"/>
<br/><em>User collection with authentication data</em>
</td>
<td align="center" width="50%">
<img src="ScreenShots/backend/mongodb_orders_Database.png" alt="Orders Database" width="100%"/>
<br/><em>Orders collection with payment status</em>
</td>
</tr>
</table>

####  API Testing & Payment Integration
<table align="center">
<tr>
<td align="center" width="50%">
<img src="ScreenShots/backend/postman_client_backend.png" alt="API Testing" width="100%"/>
<br/><em>RESTful API endpoints via Postman</em>
</td>
<td align="center" width="50%">
<img src="ScreenShots/backend/stripe_backend.png" alt="Stripe Integration" width="100%"/>
<br/><em>Secure payment processing with Stripe</em>
</td>
</tr>
</table>

---

<div align="center">
  <img src="frontend/src/assets/logo.png" alt="FoodieGoo" width="80" style="opacity: 0.5; margin: 20px 0;"/>
  <br/>
  <em> FoodieGoo - Complete Food Delivery Solution </em>
</div>

##  Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS3** - Styling
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Stripe** - Payment processing
- **Multer** - File uploads
- **bcrypt** - Password hashing
- **CORS** - Cross-origin requests

##  Project Structure

```
FoodieGoo/
├──  frontend/          # React customer app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── context/      # React context
│   │   └── assets/       # Images and static files
│   └── package.json
├──  admin/            # React admin panel
│   ├── src/
│   │   ├── components/   # Admin components
│   │   ├── pages/        # Admin pages
│   │   └── assets/       # Admin assets
│   └── package.json
├──  backend/          # Node.js API server
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── middleware/      # Custom middleware
│   ├── config/          # Database config
│   ├── uploads/         # Uploaded images
│   └── package.json
├──  README.md         # Project documentation
├──  start.sh          # Quick start script
├──  QUICK_START.md    # Quick setup guide
└──  STRIPE_SETUP.md   # Stripe integration guide
```

##  Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Stripe account (for payments)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/food-delivery-app.git
cd food-delivery-app
```

### 2. Environment Setup
Create `.env` file in the `backend` directory:
```env
# JWT Secret for authentication
JWT_SECRET="your_jwt_secret_key"

# MongoDB connection string
MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/food-delivery"

# Stripe Secret Key (get from https://dashboard.stripe.com/apikeys)
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
```

### 3. Install Dependencies & Start
```bash
# Make start script executable
chmod +x start.sh

# Run the complete application
./start.sh
```

**Or start manually:**

```bash
# Backend
cd backend
npm install
npm run server

# Frontend (new terminal)
cd frontend
npm install
npm run dev

# Admin Panel (new terminal)
cd admin
npm install
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Admin Panel**: http://localhost:5174
- **Backend API**: http://localhost:4000

##  Payment Integration

### Stripe Setup
1. Create account at [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys from "Developers" → "API Keys"
3. Add the secret key to your `.env` file
4. Use test cards for development:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **Expiry**: Any future date
   - **CVC**: Any 3 digits

### Payment Flow
1. **Card Payment**: Redirects to Stripe's secure checkout
2. **COD**: Processes order immediately
3. **Verification**: Confirms payment and updates order status

##  API Endpoints (POSTMAN)

### Authentication
```
POST /api/user/register    # User registration
POST /api/user/login       # User login
```

### Food Items
```
GET  /api/food/list        # Get all food items
POST /api/food/add         # Add new food item (admin)
POST /api/food/remove      # Remove food item (admin)
```

### Orders
```
POST /api/order/place      # Place order with Stripe
POST /api/order/place-cod  # Place COD order
POST /api/order/verify     # Verify payment
POST /api/order/userorders # Get user orders
GET  /api/order/list       # Get all orders (admin)
POST /api/order/status     # Update order status (admin)
```

### Cart
```
POST /api/cart/add         # Add to cart
POST /api/cart/remove      # Remove from cart
POST /api/cart/get         # Get cart items
```

##  Real-time Features

### Admin Panel Auto-refresh
- Orders refresh every 10 seconds automatically
- Visual and audio notifications for new orders
- Manual refresh button available
- Order count tracking

### Order Status Flow
1. **Food Processing** (default)
2. **Out for Delivery**
3. **Delivered**

##  UI Features

### Customer App
- Responsive design for all devices
- Interactive cart with quantity controls
- Payment method selection
- Order summary before checkout
- Order history with status tracking

### Admin Panel
- Real-time order notifications
- Sortable order list (newest first)
- Order details with customer information
- Payment status indicators
- Quick status updates

##  Testing

### Test User Accounts
Create test accounts through the registration process or use:
- Email: `test@example.com`
- Password: `password123`

### Test Orders
1. Add items to cart
2. Fill delivery information
3. Select payment method
4. Place order
5. Check admin panel for order appearance

### Test Payments
Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Failure: `4000 0000 0000 0002`

##  Configuration

### Database Models

#### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  cartData: Object
}
```

#### Food Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String,
  category: String
}
```

#### Order Model
```javascript
{
  userId: String,
  items: Array,
  amount: Number,
  address: Object,
  status: String,
  date: Date,
  payment: Boolean
}
```

##  Impact & metrics

- Performance observations (development/light testing): REST endpoints (list, get, place order) complete quickly on a local developer machine — typically within a few hundred milliseconds for simple queries. Actual production latency depends on network, hosting, and database selection.
- Scale assumptions: the current architecture is suitable for small-to-medium workloads (single Node process, single MongoDB instance or small Atlas cluster). To handle sustained high traffic (thousands of orders/day) i'll plan for horizontal scaling of the backend, replication/sharding for MongoDB, and a CDN/cache for static assets.
- Test results and guidance: this repository does not include formal load tests or automated performance benchmarks. For quick smoke checks you can run simple curl requests against the API (example below). For realistic load testing, use k6, Artillery, or ApacheBench and collect metrics for latency, error rate, and throughput.

Recommended metrics to track in production:
- API latency (p50/p95/p99)
- Error rate (4xx/5xx)
- Request throughput (requests/sec)
- DB connection/queue metrics and long-running queries
- Payment success / failure rates 

##  What’s next (limitations & planned improvements)

- Real-time updates: Admin currently uses polling. Replace with WebSockets / Socket.IO or Server-Sent Events for instant order notifications and lower latency.
- Background processing: Move heavy tasks (receipt emails, image processing, analytics) to a worker queue (Bull / RabbitMQ) to keep the API responsive.
- File storage: Move uploads from `backend/uploads/` to cloud object storage (S3 / DigitalOcean Spaces) for reliability and scalability.
- Observability & CI: Add metrics (Prometheus/Grafana), structured logging, and a CI pipeline that runs linting and tests on push.
- Automated tests: Add unit and integration tests for critical endpoints and payment flows. Add a small load-test suite (k6/Artillery) to validate scale assumptions.
- Security hardening: Rate limiting, stricter input validation, improved secret management (avoid committing keys), and automated dependency scans.
