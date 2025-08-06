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
from flask import Flask, request, jsonify
from flask_cors import CORS
from email_validator import validate_email, EmailNotValidError
import os
from dotenv import load_dotenv
# Database functionality commented out as requested
# from database import Database
from email_service import EmailService

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Initialize services
# db = Database()
email_service = EmailService()

# Database initialization commented out
# try:
#     db.create_database_and_table()
# except Exception as e:
#     print(f"⚠️  Database setup failed: {e}")
#     print("Please ensure MySQL is running and credentials are correct")

@app.route("/", methods=["GET"])
def health_check():
    return "Luxury Digital Concierge Backend Running", 200

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
        
        # Database functionality commented out
        # inquiry_id = db.save_inquiry(
        #     inquiry.get('name'),
        #     inquiry.get('email'),
        #     inquiry.get('phone', ''),
        #     inquiry.get('service', ''),
        #     inquiry.get('message')
        # )
        inquiry_id = 1  # Dummy value since we're not using database
        
        # if inquiry_id is None:
        #     return jsonify({
        #         "status": "error", 
        #         "message": "Failed to save inquiry to database"
        #     }), 500
        
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
