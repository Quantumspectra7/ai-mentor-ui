#!/bin/bash

# AI Mentor Setup Script for Mac/Linux
# This script installs dependencies and starts the development server

echo ""
echo "==============================================="
echo "    AI Mentor - Automatic Setup Script"
echo "==============================================="
echo ""

# Check if Node.js is installed
echo "Checking for Node.js..."
if ! command -v node &> /dev/null; then
    echo ""
    echo "ERROR: Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org"
    echo "Or use: brew install node (if you have Homebrew)"
    exit 1
fi

echo "✓ Node.js found:"
node --version

# Check if npm is installed
echo ""
echo "Checking for npm..."
if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed"
    exit 1
fi

echo "✓ npm found:"
npm --version

# Install dependencies
echo ""
echo "==============================================="
echo "Installing dependencies..."
echo "==============================================="
echo ""
npm install --legacy-peer-deps

if [ $? -ne 0 ]; then
    echo ""
    echo "ERROR: Failed to install dependencies"
    exit 1
fi

echo ""
echo "✓ Dependencies installed successfully!"

# Check if .env.local exists
echo ""
if [ ! -f ".env.local" ]; then
    echo "WARNING: .env.local file not found!"
    echo "Creating .env.local with Groq API configuration..."
    cat > .env.local << EOF
# Groq API Configuration
# Get your key at: https://console.groq.com/keys
GROQ_API_KEY=your_groq_api_key_here
EOF
    echo "✓ .env.local created"
else
    echo "✓ .env.local already exists"
fi

echo ""
echo "==============================================="
echo "Starting Development Server..."
echo "==============================================="
echo ""
echo "The app will be available at: http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
