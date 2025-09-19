// server.js
const pool = require('./db');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const transactionRoutes = require('./routes/transactions');

const app = express();
const PORT = 5001;

console.log("🚀 Server started, setting up routes...");

// Middleware
app.use(cors());           // allow requests from your React frontend
app.use(express.json());   // parse JSON bodies

// Routes
app.use('/api/transactions', transactionRoutes);
console.log("📦 Routes loaded for /api/transactions");

app.get('/', (req, res) => {
  res.send('Hello from backend 👋');
});

(async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS transactions (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
      category TEXT NOT NULL,
      amount NUMERIC(12,2) NOT NULL CHECK (amount >= 0),
      description TEXT NOT NULL DEFAULT '',
      date DATE NOT NULL,
      timestamp TIMESTAMPTZ NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_transactions_timestamp ON transactions (timestamp DESC);
  `);
  console.log('✅ DB ready: transactions table ensured');
})().catch(err => {
  console.error('DB init error:', err);
  process.exit(1);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
