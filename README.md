# Household Account Backend

A simple Express + PostgreSQL backend for tracking income and expenses.  
Provides REST API endpoints to store and fetch transactions.

---

## Features
- REST API endpoints (`/api/transactions`)
- Dockerized PostgreSQL setup
- Secure environment variables with `.env.example`

---

## Getting Started

1. Clone the repo:

   git clone https://github.com/<your-username>/household-account-backend.git

2. Navigate into the project folder

3. Install dependencies:
   
    npm install

4. Environment Setup

    This project uses environment variables for configuration. Sensitive values (like database passwords) are never committed — instead, we use a safe template file. Copy .env.example to .env and fill in your values:
    
        cp .env.example .env

    ⚠️ Do not commit .env. It is ignored by Git for security reasons. Only .env.example is tracked in version control.

## Running the Project

1. Start Dockerized PostgreSQL:
    
    docker compose -f docker/docker-compose.yaml up -d

2. Run backend server:

   npm run dev

3. Your server should now be running at: http://localhost:5000
   API available at: http://localhost:5000/api/transactions

## Database Setup

- PostgreSQL container is managed via Docker Compose.
- On first run, the transactions table is created automatically if not present.
- Persistent data stored in docker/data (ignored by Git).

## API Endpoints

- GET /api/transactions → Fetch all transactions
- POST /api/transactions → Add a new transaction

## Notes

- .env must never be committed. Only .env.example is tracked.
- Recommended to use nodemon for live development.