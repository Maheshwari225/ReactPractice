
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const express = require('express');

const app = express();

app.use(cors());
app.use(express.json());

// ============================
// DATABASE CONNECTION
// ============================

const db = new sqlite3.Database('./customer.db', (err) => {

  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to SQLite database');
  }

});

// CREATE TABLE

db.run(`
  CREATE TABLE IF NOT EXISTS accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    custname TEXT NOT NULL,
    location TEXT,
    productOrdered TEXT,
    amountPaid REAL NOT NULL
  )
`);

// ============================
// CREATE CUSTOMER
// ============================

app.post('/custdetails', (req, res) => {

  const {
    custname,
    location,
    productOrdered,
    amountPaid
  } = req.body;

  if (!custname || amountPaid === undefined ||
      !Number.isFinite(Number(amountPaid)) ||
      Number(amountPaid) < 0) {

    return res.status(400).json({
      error: 'Valid customer name and amount are required'
    });

  }

  db.run(
    `INSERT INTO accounts
    (custname, location, productOrdered, amountPaid)
    VALUES (?, ?, ?, ?)`,

    [custname, location, productOrdered, Number(amountPaid)],

    function (err) {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.status(201).json({
        id: this.lastID,
        custname,
        location,
        productOrdered,
        amountPaid: Number(amountPaid)
      });

    }
  );

});

// ============================
// READ ALL CUSTOMERS
// ============================

app.get('/custdetails', (req, res) => {

  db.all(
    'SELECT * FROM accounts ORDER BY id DESC',
    [],

    (err, rows) => {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      res.json(rows);

    }
  );

});

// ============================
// UPDATE CUSTOMER
// ============================

app.put('/custdetails/:id', (req, res) => {

  const {
    custname,
    location,
    productOrdered,
    amountPaid
  } = req.body;

  if (!custname || amountPaid === undefined ||
      !Number.isFinite(Number(amountPaid)) ||
      Number(amountPaid) < 0) {

    return res.status(400).json({
      error: 'Valid customer name and amount are required'
    });

  }

  db.run(
    `UPDATE accounts
    SET custname = ?,
        location = ?,
        productOrdered = ?,
        amountPaid = ?
    WHERE id = ?`,

    [
      custname,
      location,
      productOrdered,
      Number(amountPaid),
      req.params.id
    ],

    function (err) {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: 'Customer not found'
        });
      }

      res.json({
        message: 'Customer updated successfully',
        updated: this.changes
      });

    }
  );

});

// ============================
// DELETE CUSTOMER
// ============================

app.delete('/custdetails/:id', (req, res) => {

  db.run(
    'DELETE FROM accounts WHERE id = ?',
    [req.params.id],

    function (err) {

      if (err) {
        return res.status(500).json({
          error: err.message
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: 'Customer not found'
        });
      }

      res.json({
        message: 'Customer deleted successfully',
        deleted: this.changes
      });

    }
  );

});

// ============================
// START SERVER
// ============================

app.listen(5050, () => {
  console.log('Server running on port 5050');
});
