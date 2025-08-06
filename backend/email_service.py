"""Email service for sending inquiry notifications."""
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

class EmailService:
    def __init__(self):
        self.smtp_server = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
        self.smtp_port = int(os.getenv('SMTP_PORT', 587))
        self.email_user = os.getenv('EMAIL_USER')
        self.email_password = os.getenv('EMAIL_PASSWORD')
        self.business_email = os.getenv('BUSINESS_EMAIL')
    
    def send_inquiry_notification(self, inquiry_data):
        """Send email notification for new inquiry."""
        if not all([self.email_user, self.email_password, self.business_email]):
            print("Email configuration missing. Please check .env file.")
            return False
        
        try:
            # Create message
            msg = MIMEMultipart()
            msg['From'] = self.email_user
            msg['To'] = self.business_email
            msg['Subject'] = f"New Inquiry from {inquiry_data.get('name', 'Unknown')}"
            
            # Email body
            body = f"""
New inquiry:

Name: {inquiry_data.get('name', 'N/A')}
Email: {inquiry_data.get('email', 'N/A')}
Phone: {inquiry_data.get('phone', 'N/A')}
Company: {inquiry_data.get('company', 'N/A')}

Message:
{inquiry_data.get('message', 'N/A')}
            """
            
            msg.attach(MIMEText(body, 'plain'))
            
            # Send email
            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_user, self.email_password)
            text = msg.as_string()
            server.sendmail(self.email_user, self.business_email, text)
            server.quit()
            
            print("Email notification sent successfully")
            return True
            
        except Exception as e:
            print(f"Error sending email: {e}")
            return False
