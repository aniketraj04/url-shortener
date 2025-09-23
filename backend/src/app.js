// app.js - main express config
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

require('dotenv').config();

const authRoutes = require('./routes/auth');
const linkRoutes = require('./routes/links');
const redirectRoutes = require('./routes/redirect');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200
});
app.use(limiter);

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);

// Redirect route must be below API routes:
app.use('/', redirectRoutes);

// Basic health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

module.exports = app;
