#!/bin/bash

# Food Delivery App Startup Script
echo "🍕 Starting Food Delivery Application..."

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the root directory containing 'backend' and 'frontend' folders"
    exit 1
fi

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    else
        return 0
    fi
}

# Check required ports
echo "🔍 Checking ports..."
check_port 4000 || echo "   Backend port 4000 is busy"
check_port 5173 || echo "   Frontend port 5173 is busy"

# Start backend
echo "🚀 Starting backend server..."
cd backend
if [ ! -f ".env" ]; then
    echo "❌ Error: .env file not found in backend directory"
    echo "   Please create .env file with required variables"
    exit 1
fi

# Install backend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Start backend in background
npm run server &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend..."
cd ../frontend

# Install frontend dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Start frontend
echo "✅ Starting frontend development server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "🎉 Application started successfully!"
echo ""
echo "📍 URLs:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:4000"
echo ""
echo "🔧 To stop the application:"
echo "   Press Ctrl+C or run: kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "📚 Setup instructions: See STRIPE_SETUP.md"
echo ""

# Wait for user to stop
wait
