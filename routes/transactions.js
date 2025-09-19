// routes/transactions.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM transactions ORDER BY timestamp DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new transaction
router.post('/', async (req, res) => {
  try {
    const { type, category, amount, description, date, timestamp } = req.body;
    const result = await pool.query(
      `INSERT INTO transactions (type, category, amount, description, date, timestamp)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [type, category, amount, description, date, timestamp]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/transactions/:id  (update one)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, category, amount, description, date, timestamp } = req.body;

    const result = await pool.query(
      `UPDATE transactions
       SET type=$1, category=$2, amount=$3, description=$4, date=$5, timestamp=$6
       WHERE id=$7
       RETURNING *`,
      [type, category, amount, description, date, timestamp, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a transaction by ID
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      'DELETE FROM transactions WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
