#!/bin/bash

# Automated deployment script for Luxury Digital Concierge
# This script builds the frontend, copies files to backend, and deploys the application

echo "🚀 Starting automated deployment process..."

# Function to check if Docker daemon is running
docker_daemon_running() {
    docker info > /dev/null 2>&1
    return $?
}

# Check if we're running on a system with Docker and if daemon is running
if command -v docker &> /dev/null && docker_daemon_running; then
    echo "🐳 Docker detected and daemon is running. Deploying with Docker..."
    
    # Build and run with docker-compose
    if command -v docker-compose &> /dev/null; then
        docker-compose up --build -d
        echo "✅ Application deployed with Docker Compose!"
        echo "🌍 Visit http://localhost:8000 to view your application"
    else
        docker build -t luxury-digital-concierge .
        docker run -d -p 8000:8000 --name luxury-digital-concierge luxury-digital-concierge
        echo "✅ Application deployed with Docker!"
        echo "🌍 Visit http://localhost:8000 to view your application"
    fi
else
    echo "🏠 Docker not available or daemon not running. Deploying with local Python environment..."
    
    # Build frontend
    echo "🔨 Building frontend..."
    cd frontend
    npm install
    npm run build
    cd ..
    
    # Copy build to backend
    echo "📋 Copying frontend build to backend..."
    mkdir -p backend/build
    cp -r frontend/dist/* backend/build/
    
    # Set up Python virtual environment
    echo "🐍 Setting up Python environment..."
    cd backend
    if [ ! -d "venv" ]; then
        python3 -m venv venv
    fi
    source venv/bin/activate
    pip install -r requirements.txt
    
    # Start application with Gunicorn
    echo "🚀 Starting application with Gunicorn on port 8000..."
    gunicorn -c gunicorn.conf.py app:app &
    
    cd ..
    echo "✅ Application deployed locally!"
    echo "🌍 Visit http://localhost:8000 to view your application"
fi
