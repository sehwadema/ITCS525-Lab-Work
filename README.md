# Lab 9: Docker Integration

**Course:** ITCS525 Software and Application Development

## Overview

In Lab 9, I continued developing the full-stack calculator application from Lab 8 by adding Docker integration to the FastAPI backend.

Docker Compose is used to run the backend application together with a MySQL database.

## Technologies Used

- Python 3.12
- FastAPI
- React
- Docker and Docker Compose
- MySQL 8.4

## Project Structure

```text
fastapi-backend/
├── app/
├── Dockerfile
├── compose.yaml
├── requirements.txt
└── ...

react-frontend/
├── src/
├── public/
├── package.json
└── ...
```

## Running the Backend with Docker

1. Open a terminal in the `fastapi-backend` directory.
2. Start the containers:

   ```bash
   docker compose up --build
   ```

3. Once the services have started, the backend is accessible at:

   `http://localhost:34242`

4. Stop the containers using:

   ```bash
   docker compose down
   ```

The React frontend is not included in the Docker Compose configuration and must be started separately.

## What I Learnt

Through this lab, I practised creating a Dockerfile, configuring services with Docker Compose, and connecting a FastAPI backend to a MySQL database.
