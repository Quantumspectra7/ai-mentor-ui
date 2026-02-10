@echo off
REM AI Mentor Setup Script for Windows
REM This script installs dependencies and starts the development server

echo.
echo ===============================================
echo    AI Mentor - Automatic Setup Script
echo ===============================================
echo.

REM Check if Node.js is installed
echo Checking for Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo.
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org
    echo Then run this script again.
    pause
    exit /b 1
)

echo ✓ Node.js found: 
node --version

REM Check if npm is installed
echo.
echo Checking for npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm is not installed
    pause
    exit /b 1
)

echo ✓ npm found:
npm --version

REM Install dependencies
echo.
echo ===============================================
echo Installing dependencies...
echo ===============================================
echo.
npm install --legacy-peer-deps
if errorlevel 1 (
    echo.
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo ✓ Dependencies installed successfully!

REM Check if .env.local exists
echo.
if not exist ".env.local" (
    echo WARNING: .env.local file not found!
    echo Creating .env.local with Groq API configuration...
    (
        echo # Groq API Configuration
        echo # Get your key at: https://console.groq.com/keys
        echo GROQ_API_KEY=your_groq_api_key_here
    ) > .env.local
    echo ✓ .env.local created
) else (
    echo ✓ .env.local already exists
)

echo.
echo ===============================================
echo Starting Development Server...
echo ===============================================
echo.
echo The app will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.
pause

npm run dev
