// authController.js
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

async function signup(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) return res.status(500).json({ error: 'Server error' });
      if (row) return res.status(400).json({ error: 'Email already registered' });

      const hash = await bcrypt.hash(password, SALT_ROUNDS);
      db.run('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name || null, email, hash], function(err) {
        if (err) return res.status(500).json({ error: 'Server error' });
        const userId = this.lastID;
        const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ message: 'Signup successful', token });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    db.get('SELECT id, password_hash FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) return res.status(500).json({ error: 'Server error' });
      if (!row) return res.status(400).json({ error: 'Invalid credentials' });

      const ok = await bcrypt.compare(password, row.password_hash);
      if (!ok) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: row.id, email }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ message: 'Login successful', token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { signup, login };
