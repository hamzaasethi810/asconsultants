#!/bin/bash

# Startup script for Luxury Digital Concierge application
# This script builds the frontend, copies files to backend, and starts the Flask backend

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

# Check if virtual environment exists, if not create it
if [ ! -d "backend/venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv backend/venv
    source backend/venv/bin/activate
    pip install -r backend/requirements.txt
else
    echo "Virtual environment already exists."
    source backend/venv/bin/activate
fi

# Start the Flask application with Gunicorn for production
echo "🚀 Starting Flask backend with Gunicorn on port 8000..."
gunicorn -c backend/gunicorn.conf.py backend.app:app
