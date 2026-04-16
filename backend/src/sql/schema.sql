-- create database (SQLite)
-- Run this in SQLite

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  owner_id INTEGER NULL,
  original_url TEXT NOT NULL,
  short_code TEXT UNIQUE,
  custom_alias TEXT UNIQUE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NULL,
  click_count INTEGER DEFAULT 0,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS clicks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  link_id INTEGER NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  referrer TEXT,
  user_agent TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  FOREIGN KEY (link_id) REFERENCES links(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_clicks_link_id ON clicks(link_id);
CREATE INDEX IF NOT EXISTS idx_clicks_timestamp ON clicks(timestamp);
CREATE INDEX IF NOT EXISTS idx_clicks_country ON clicks(country);

CREATE TABLE IF NOT EXISTS daily_link_aggregates (
  link_id INTEGER,
  date DATE,
  clicks INTEGER DEFAULT 0,
  PRIMARY KEY (link_id, date)
);
