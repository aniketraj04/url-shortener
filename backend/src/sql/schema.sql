-- create database (run in MySQL)
CREATE DATABASE IF NOT EXISTS url_shortener;
USE url_shortener;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS links (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  owner_id BIGINT NULL,
  original_url TEXT NOT NULL,
  short_code VARCHAR(64) UNIQUE,
  custom_alias VARCHAR(128) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NULL,
  click_count BIGINT DEFAULT 0,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS clicks (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  link_id BIGINT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  ip VARCHAR(45),
  country VARCHAR(64),
  region VARCHAR(128),
  city VARCHAR(128),
  referrer VARCHAR(512),
  user_agent TEXT,
  device_type VARCHAR(32),
  browser VARCHAR(64),
  os VARCHAR(64),
  FOREIGN KEY (link_id) REFERENCES links(id) ON DELETE CASCADE,
  INDEX (link_id),
  INDEX (timestamp),
  INDEX (country)
);

CREATE TABLE IF NOT EXISTS daily_link_aggregates (
  link_id BIGINT,
  date DATE,
  clicks INT DEFAULT 0,
  PRIMARY KEY (link_id, date)
);
