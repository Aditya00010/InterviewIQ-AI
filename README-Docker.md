# InterviewIQ-AI Docker Deployment Guide

This document explains how to build, run, inspect, and debug the containerized version of the **InterviewIQ-AI** application.

---

## Architecture Overview

The containerized stack uses a production-ready microservices architecture:
1. **Frontend (React + Vite)**: 
   - Built to static assets using `node:20-slim`.
   - Served by `nginx:alpine` on port `80`.
   - Compresses text assets via `Gzip` for fast delivery.
   - Reverse-proxies all requests starting with `/api` to the backend container.
2. **Backend (Node.js + Express)**:
   - Run inside `node:20-slim`.
   - Includes minimal native Debian dependencies for running headless Chromium (`Puppeteer`).
   - Runs securely as a non-root (`node`) user.
   - Exposed only internally to the Docker virtual network (no host ports mapped).
3. **Database**:
   - Uses your existing external MongoDB Atlas cluster via environment variables.

---

## Prerequisites

- Install [Docker Desktop](https://www.docker.com/products/docker-desktop) (for Windows/macOS) or Docker Engine & Docker Compose (for Linux).
- Prepare your API keys (MongoDB Atlas connection string, Google Gemini API Key).

---

## Environment Configuration

Configure your environment keys in the `.env.docker` file in the project root:
- `MONGO_URI`: Your MongoDB Atlas URI. 
  - *Note: If you wish to connect to a local MongoDB running on the host machine (not in Docker), use `mongodb://host.docker.internal:27017/interviewiq`*.
- `GOOGLE_GENAI_API_KEY`: Your Gemini API credential.
- `JWT_SECRET`: The security signing key.
- `FRONTEND_URL`: Set to `http://localhost` (or your domain/public IP in production).

---

## Docker Compose Commands

### 1. Build and Start the Application
To build the images and launch the containers in the foreground (showing logs):
```bash
docker compose up --build
```

To run in the background (detached mode):
```bash
docker compose up --build -d
```

### 2. Stop the Application
To stop the running services:
```bash
docker compose down
```

To stop services and remove volumes (clean reset):
```bash
docker compose down -v
```

### 3. Rebuild Containers
If you make changes to the application code, rebuild and restart with:
```bash
docker compose up --build -d
```

### 4. Check Logs
To view combined logs for all services:
```bash
docker compose logs -f
```

To view logs for a specific service:
```bash
docker compose logs -f backend
docker compose logs -f frontend
```

### 5. Check Container Status and Ports
To view the status of containers and see which ports are mapped:
```bash
docker compose ps
```

### 6. Execute Shell Commands inside Containers (Debugging)
To open a shell inside the backend container to debug file systems, environment, or process issues:
```bash
docker compose exec backend sh
```

To open a shell inside the frontend container:
```bash
docker compose exec frontend sh
```

---

## Production Deployment (AWS EC2 / VPS)

For production environments, use the `docker-compose.prod.yml` configuration. This includes production-ready logging limits to prevent disk full errors, and uses `restart: always` for maximum resilience:

### Run in Production
```bash
docker compose -f docker-compose.prod.yml --env-file .env.docker up -d --build
```

### Stop Production Stack
```bash
docker compose -f docker-compose.prod.yml down
```

### View Status in Production
```bash
docker compose -f docker-compose.prod.yml ps
```
