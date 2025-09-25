⚙️ Environment Setup

This project uses environment variables for configuration.
Sensitive values (like database passwords) are never committed — instead, we use a safe template file.

1. Copy the example file

In your project root (household-account-backend), run:

cp .env.example .env

2. Fill in the real values

Open .env in your editor and update:

DB_USER=your_real_username
DB_PASSWORD=your_real_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=household_account_db
PORT=5000


⚠️ Do not commit .env. It is ignored by Git for security reasons.
Only .env.example is tracked in version control.

3. Start the backend
npm install
npm run dev


Your server should now be running at:
👉 http://localhost:5000
