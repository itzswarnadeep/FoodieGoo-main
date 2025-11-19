#!/bin/bash

# Script to fix GitHub push protection issue by removing secrets from git history

echo "=== FoodieGoo Project - Secret Removal Script ==="
echo "This script will remove the Stripe secret key from git history"
echo ""

# Navigate to project directory
cd "/home/sarvesh/mern project/FoodieGoo/FoodieGoo"

echo "1. Current directory: $(pwd)"
echo ""

echo "2. Checking git status..."
git status
echo ""

echo "3. Removing .env from git tracking (if still tracked)..."
git rm --cached backend/.env 2>/dev/null || echo "File already removed from tracking"
echo ""

echo "4. Adding .gitignore and .env.example..."
git add .gitignore backend/.env.example
echo ""

echo "5. Committing changes..."
git commit -m "Remove .env from tracking and add .gitignore

- Add .gitignore to prevent environment files from being tracked  
- Add .env.example with placeholder values for reference
- Remove actual .env file from git tracking to protect secrets"
echo ""

echo "6. Removing .env from git history using BFG Repo-Cleaner alternative..."
echo "Using git filter-branch to remove sensitive file from history..."
git filter-branch --force --index-filter 'git rm --cached --ignore-unmatch backend/.env' --prune-empty --tag-name-filter cat -- --all
echo ""

echo "7. Force pushing to origin (this will overwrite remote history)..."
echo "WARNING: This will rewrite git history. Make sure no one else is working on this repo."
read -p "Continue with force push? (y/N): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push --force-with-lease origin master
    echo ""
    echo "✅ Push completed! The secret should now be removed from git history."
else
    echo "❌ Force push cancelled. You'll need to manually run: git push --force-with-lease origin master"
fi

echo ""
echo "=== Next Steps ==="
echo "1. Make sure your .env file still exists locally with your actual secrets"
echo "2. The .env.example file shows what environment variables are needed"
echo "3. Anyone cloning this repo should copy .env.example to .env and fill in their own values"
echo ""
echo "✅ Script completed!"
