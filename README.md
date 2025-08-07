# Website for AS Consultants LLC

https://unique-khapse-664ecf.netlify.app/inquiry **frontend display. Backend is not connected.

A full-stack web application with a React frontend and Flask backend, designed for hosting on a production server.

## Project Structure

```
luxury-digital-concierge/
├── backend/                 # Flask backend
│   ├── app.py              # Main Flask application
│   ├── email_service.py    # Email notification service
│   ├── requirements.txt    # Python dependencies
│   ├── gunicorn.conf.py    # Gunicorn production configuration
│   ├── build/              # Frontend build output (served by Flask)
│   └── ...
├── frontend/               # React/Vite frontend
│   ├── src/                # Source code
│   ├── package.json        # Node.js dependencies
│   └── ...
└── startup.sh              # Production startup script
```

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm 8+

## Local Development Setup

1. **Frontend Development**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

2. **Backend Development**:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   python app.py
   ```

## Production Deployment

### Build Process

1. **Build the frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Copy build to backend**:
   ```bash
   cp -r dist/* ../backend/build/
   ```

### Running in Production

The application can be started in production using the provided startup script:

```bash
./startup.sh
```

This will:
- Create a Python virtual environment if it doesn't exist
- Install all required Python dependencies
- Start the Flask backend using Gunicorn on port 8000

### Environment Variables

For production, configure your environment variables in `backend/.env`:

```bash
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

### Hosting Options

#### Option 1: Traditional Server/VPS
1. Clone the repository to your server
2. Ensure Python and Node.js are installed
3. Run the build process (as described above)
4. Execute `./startup.sh` to start the application
5. The application will be available on port 8000

#### Option 2: Heroku Deployment
1. Create a new Heroku app
2. Set up the buildpacks:
   - heroku/python
3. Add the following build script to your package.json in the backend directory:
   ```json
   "scripts": {
     "postbuild": "cd ../frontend && npm install && npm run build && cp -r dist/* ../backend/build/"
   }
   ```
4. Deploy using Git:
   ```bash
   git push heroku main
   ```

#### Option 3: Docker Deployment
Create a Dockerfile in the root directory:

```dockerfile
# Multi-stage build
FROM node:16 AS frontend-build
WORKDIR /app
COPY frontend/ ./frontend/
RUN cd frontend && npm install && npm run build

FROM python:3.9
WORKDIR /app
COPY backend/ ./backend/
COPY --from=frontend-build /app/frontend/dist/ ./backend/build/
RUN cd backend && python -m venv venv && . venv/bin/activate && pip install -r requirements.txt

EXPOSE 8000
CMD ["./backend/venv/bin/gunicorn", "-c", "./backend/gunicorn.conf.py", "backend.app:app"]
```

## API Endpoints

- `GET /` - Serve the main React application
- `POST /api/inquiry` - Receive inquiry submissions from the contact form

## Security Considerations

1. Never commit sensitive environment variables to version control
2. Use strong, unique passwords for email accounts
3. Consider using environment variable management services in production
4. Regularly update dependencies to patch security vulnerabilities

## Troubleshooting

If you encounter issues:
1. Check that all dependencies are properly installed
2. Verify environment variables are correctly configured
3. Ensure the frontend build output is in the backend/build directory
4. Check Gunicorn logs for error messages
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c6d7b3f9-c2ef-4e20-b96b-eb94300e8d52) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
