# Deployment Guide for Luxury Digital Concierge

This guide provides step-by-step instructions for deploying your application to various hosting platforms. The application is now production-ready and can be deployed with a single command.

## Prerequisites

Before deploying, ensure you have:
1. A hosting platform account (Heroku, AWS, DigitalOcean, etc.)
2. Updated environment variables in `backend/.env`:
   ```
   # Email Configuration
   SMTP_SERVER=your.smtp.server
   SMTP_PORT=587
   EMAIL_USER=your_email@domain.com
   EMAIL_PASSWORD=your_email_password
   BUSINESS_EMAIL=your_business_email@domain.com
   
   # Application Configuration
   FLASK_ENV=production
   PORT=8000
   ```

## Deployment Options

### Option 1: Docker Deployment (Recommended)

If your hosting platform supports Docker containers:

1. **Build and run locally**:
   ```bash
   docker-compose up --build
   ```
   Your app will be available at http://localhost:8000

2. **Deploy to any Docker-supported platform**:
   Simply push your code to the platform and it will automatically build and deploy using the Dockerfile.

### Option 2: Automated Script Deployment

Run the automated deployment script:
```bash
./deploy.sh
```

This script will:
1. Build the React frontend
2. Copy the build files to the backend
3. Set up the Python environment
4. Start the application with Gunicorn

### Option 3: Manual Deployment

1. **Build the frontend**:
   ```bash
   cd frontend
   npm install
   npm run build
   cd ..
   ```

2. **Copy build files**:
   ```bash
   mkdir -p backend/build
   cp -r frontend/dist/* backend/build/
   ```

3. **Set up Python environment**:
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

4. **Start the application**:
   ```bash
   gunicorn -c gunicorn.conf.py app:app
   ```
   
   Your app will be available at http://localhost:8000

## Platform-Specific Deployment Instructions

### Netlify Deployment (Frontend Only)

Since Netlify is a static hosting platform, it can only serve your frontend React application. You'll need to deploy your Flask backend separately on a platform that supports Python applications (like Heroku, Render, or a VPS).

1. Connect your GitHub repository to Netlify
2. In the Netlify dashboard, set these build settings:
   - Base directory: `/`
   - Build command: `cd frontend && npm install && npm run build`
   - Publish directory: `frontend/dist`

Alternatively, simply push your code with the included `netlify.toml` file, and Netlify will automatically use those settings.

3. **Important**: Set this environment variable in Netlify dashboard:
   - `VITE_API_URL` - The URL of your deployed backend server (e.g., https://your-backend-app.onrender.com)
   - Without this variable, the inquiry form will not work!

4. Deploy your backend separately to a platform like Heroku, Render, or AWS.

**Note**: The frontend will make API calls to the URL specified in `VITE_API_URL`. Make sure to update this variable with your actual backend URL after deploying your backend.

For local development, the frontend will default to `http://localhost:5003` if `VITE_API_URL` is not set.

#### Backend Deployment Options

1. **Heroku**:
   - Create a new Heroku app
   - Set buildpack to Python
   - Deploy from your repository
   - Set environment variables in Heroku dashboard:
     - `SMTP_SERVER` - Your SMTP server address
     - `SMTP_PORT` - Your SMTP server port (usually 587)
     - `EMAIL_USER` - Email username for sending notifications
     - `EMAIL_PASSWORD` - Email password or app-specific password
     - `BUSINESS_EMAIL` - The email address where inquiries should be sent
     - `FLASK_ENV` - Set to "production"

2. **Render**:
   - Create a new Web Service
   - Set root directory to `backend`
   - Set build command to `pip install -r requirements.txt`
   - Set start command to `gunicorn -c gunicorn.conf.py app:app`
   - Add environment variables (same as Heroku above)

3. **Traditional Server**:
   - Clone your repository
   - Run `./startup.sh` or follow the manual deployment steps in this guide
   - Set environment variables in `backend/.env`

### Heroku Deployment

1. Create a new Heroku app:
   ```bash
   heroku create your-app-name
   ```

2. Set buildpacks:
   ```bash
   heroku buildpacks:set heroku/python
   ```

3. Deploy:
   ```bash
   git push heroku main
   ```

### AWS EC2 Deployment

1. Launch an EC2 instance with Ubuntu
2. SSH into your instance:
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. Install dependencies:
   ```bash
   sudo apt update
   sudo apt install -y python3 python3-pip nodejs npm
   ```

4. Clone your repository:
   ```bash
   git clone your-repo-url
   cd luxury-digital-concierge
   ```

5. Run deployment:
   ```bash
   ./deploy.sh
   ```

### DigitalOcean Deployment

1. Create a new Droplet with Ubuntu
2. Follow the same steps as AWS EC2 deployment

## Environment Variables

For production deployment, make sure to set these environment variables on your hosting platform:

- `SMTP_SERVER` - Your SMTP server address
- `SMTP_PORT` - Your SMTP server port (usually 587)
- `EMAIL_USER` - Email username for sending notifications
- `EMAIL_PASSWORD` - Email password or app-specific password
- `BUSINESS_EMAIL` - The email address where inquiries should be sent
- `FLASK_ENV` - Set to "production"
- `PORT` - Set to the port your hosting platform expects (usually 8000)

## Troubleshooting

### Common Issues

1. **Frontend not loading**:
   - Ensure the build files are in `backend/build/`
   - Check that the static file serving routes are working

2. **Email notifications not working**:
   - Verify SMTP credentials
   - Check that your email provider allows SMTP access
   - Ensure firewall settings allow outbound SMTP connections

3. **Application not starting**:
   - Check that all dependencies are installed
   - Verify Python and Node.js versions meet requirements
   - Ensure the PORT environment variable is set correctly

### Logs and Monitoring

To view application logs:
```bash
# For Docker deployments
docker-compose logs

# For manual deployments
# Logs will be displayed in the terminal where you ran the deploy script
```

## Scaling Considerations

For high-traffic deployments:
1. Increase the number of Gunicorn workers in `gunicorn.conf.py`
2. Consider using a reverse proxy like Nginx
3. Implement a CDN for static assets
4. Use a managed database service if you decide to add database functionality later

## Security Best Practices

1. Use HTTPS in production
2. Never commit sensitive environment variables to version control
3. Regularly update dependencies
4. Use strong, unique passwords for all services
5. Implement proper input validation (already done for inquiry submissions)
