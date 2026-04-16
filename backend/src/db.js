// db.js - create a sqlite3 database
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const dbPath = path.join(__dirname, '..', 'database.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
    initializeDatabase();
  }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

function initializeDatabase() {
  const schemaPath = path.join(__dirname, 'sql', 'schema.sql');
  const schema = fs.readFileSync(schemaPath, 'utf8');
  db.exec(schema, (err) => {
    if (err) {
      console.error('Error initializing database:', err.message);
    } else {
      console.log('Database initialized.');
    }
  });
}

module.exports = db;
