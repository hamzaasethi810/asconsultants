# Multi-stage build for Luxury Digital Concierge
FROM node:16 AS frontend-build
WORKDIR /app
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

FROM python:3.9-slim
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy backend files
COPY backend/ ./backend/

# Copy frontend build to backend build directory
COPY --from=frontend-build /app/frontend/dist/ ./backend/build/

# Install Python dependencies
RUN cd backend && pip install -r requirements.txt

# Expose port
EXPOSE 8000

# Run the application
CMD ["./backend/venv/bin/gunicorn", "-c", "./backend/gunicorn.conf.py", "backend.app:app"]
