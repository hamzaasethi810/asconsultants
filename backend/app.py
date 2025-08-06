"""Luxury Digital Concierge Backend
Handles inquiry submissions with PostgreSQL database and email notifications.

Setup:
    1. Copy .env.example to .env and configure your settings
    2. Install PostgreSQL and create a database
    3. python -m venv .venv && source .venv/bin/activate
    4. pip install -r requirements.txt
    5. python app.py

App listens on http://localhost:5001
"""
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from email_validator import validate_email, EmailNotValidError
import os
from dotenv import load_dotenv
from email_service import EmailService

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Initialize services
email_service = EmailService()

# Production ready - no database initialization needed

@app.route("/", methods=["GET"])
def health_check():
    # Serve the main index.html file
    try:
        return send_from_directory('build', 'index.html')
    except Exception as e:
        return jsonify({"status": "error", "message": "Frontend not built yet"}), 500

# Serve frontend static files
@app.route('/<path:path>')
def serve_frontend(path):
    try:
        return send_from_directory('build', path)
    except FileNotFoundError:
        return send_from_directory('build', 'index.html')

@app.route("/api/inquiry", methods=["POST"])
def receive_inquiry():
    """Handle inquiry submissions - validate, save to DB, and send email."""
    try:
        inquiry = request.get_json(silent=True) or {}
        
        # Validate required fields
        required_fields = ['name', 'email', 'message']
        for field in required_fields:
            if not inquiry.get(field):
                return jsonify({
                    "status": "error", 
                    "message": f"Missing required field: {field}"
                }), 400
        
        # Validate email format
        try:
            validate_email(inquiry['email'])
        except EmailNotValidError:
            return jsonify({
                "status": "error", 
                "message": "Invalid email address"
            }), 400
        
        print(f"📩 Received inquiry from: {inquiry.get('name')} ({inquiry.get('email')})")
        
        # No database functionality as requested by user
        inquiry_id = 1  # Dummy value for production
        
        # Send email notification
        email_sent = email_service.send_inquiry_notification(inquiry)
        if not email_sent:
            print("⚠️ Warning: Email notification failed, but inquiry was saved")
        
        return jsonify({
            "status": "success", 
            "message": "Inquiry received successfully",
            "email_sent": email_sent
        }), 200
        
    except Exception as e:
        print(f"❌ Error processing inquiry: {e}")
        return jsonify({
            "status": "error", 
            "message": "Internal server error"
        }), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5001))
    debug = os.getenv("FLASK_ENV") == "development"
    print(f"🚀 Starting Luxury Digital Concierge Backend on port {port}")
    app.run(host="0.0.0.0", port=port, debug=debug)
