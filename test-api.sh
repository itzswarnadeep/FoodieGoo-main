#!/bin/bash

echo "🧪 Testing FoodieGoo API Endpoints"
echo "================================="

# Test basic health
echo "1. Testing Health Endpoint:"
curl -s "https://foodiegoo.onrender.com/health" | head -c 200
echo -e "\n"

# Test food list
echo "2. Testing Food List Endpoint:"
curl -s "https://foodiegoo.onrender.com/api/food/list" | head -c 200
echo -e "\n"

# Test root endpoint
echo "3. Testing Root Endpoint:"
curl -s "https://foodiegoo.onrender.com/" | head -c 200
echo -e "\n"

echo "✅ API Test Complete!"
echo "If you see empty data, you need to add food items via admin panel."
