// routes/links.js
const express = require('express');
const router = express.Router();
const { createLink, listLinks, linkAnalytics } = require('../controllers/linkController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createLink);        // create link (auth required)
router.get('/', authMiddleware, listLinks);         // list user's links
router.get('/:id/analytics', authMiddleware, linkAnalytics); // analytics for a link

module.exports = router;
