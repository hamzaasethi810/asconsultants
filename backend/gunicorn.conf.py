# Gunicorn configuration for production deployment
bind = "0.0.0.0:8000"
workers = 4
worker_class = "sync"
timeout = 30
keepalive = 2
max_requests = 1000
max_requests_jitter = 100
preload_app = True
