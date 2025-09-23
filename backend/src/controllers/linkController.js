// linkController.js
const pool = require('../db');
const { encodeBase62 } = require('../utils/base62');
const geoip = require('geoip-lite');
const UAParser = require('ua-parser-js');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

function isValidHttpUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

// Create a short link
async function createLink(req, res) {
  try {
    const { originalUrl, customAlias, expiresAt } = req.body;
    const ownerId = req.user ? req.user.id : null;

    if (!originalUrl || !isValidHttpUrl(originalUrl)) return res.status(400).json({ error: 'Valid originalUrl required (include http/https)' });

    if (customAlias) {
      // check uniqueness
      const [rows] = await pool.query('SELECT id FROM links WHERE custom_alias = ?', [customAlias]);
      if (rows.length) return res.status(400).json({ error: 'customAlias already exists' });
    }

    // insert row with null short_code first, get insertId
    const [insertResult] = await pool.query(
      'INSERT INTO links (owner_id, original_url, custom_alias, expires_at) VALUES (?, ?, ?, ?)',
      [ownerId, originalUrl, customAlias || null, expiresAt || null]
    );
    const insertId = insertResult.insertId;

    let shortCode;
    if (customAlias) {
      shortCode = customAlias;
      // update short_code to same as customAlias
      await pool.query('UPDATE links SET short_code = ? WHERE id = ?', [shortCode, insertId]);
    } else {
      shortCode = encodeBase62(insertId);
      await pool.query('UPDATE links SET short_code = ? WHERE id = ?', [shortCode, insertId]);
    }

    const shortUrl = `${BASE_URL}/${shortCode}`;
    res.json({ message: 'Link created', link: { id: insertId, shortCode, shortUrl, originalUrl } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Get user's links
async function listLinks(req, res) {
  try {
    const userId = req.user.id;
    const [rows] = await pool.query('SELECT id, original_url AS originalUrl, short_code AS shortCode, custom_alias AS customAlias, created_at AS createdAt, click_count AS clickCount FROM links WHERE owner_id = ? ORDER BY created_at DESC', [userId]);
    res.json({ links: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Analytics for a link (owner only)
async function linkAnalytics(req, res) {
  try {
    const userId = req.user.id;
    const linkId = req.params.id;
    const rangeDays = parseInt(req.query.range) || 30;

    // verify ownership
    const [links] = await pool.query('SELECT id FROM links WHERE id = ? AND owner_id = ?', [linkId, userId]);
    if (!links.length) return res.status(403).json({ error: 'Not authorized or link not found' });

    // clicks by day
    const [byDay] = await pool.query(
      `SELECT DATE(timestamp) AS date, COUNT(*) AS clicks
       FROM clicks
       WHERE link_id = ? AND timestamp >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
       GROUP BY DATE(timestamp)
       ORDER BY date`, [linkId, rangeDays]
    );

    // top countries
    const [byCountry] = await pool.query(`SELECT IFNULL(country,'Unknown') AS country, COUNT(*) AS clicks FROM clicks WHERE link_id = ? GROUP BY country ORDER BY clicks DESC LIMIT 20`, [linkId]);

    // browsers
    const [byBrowser] = await pool.query(`SELECT IFNULL(browser,'Unknown') AS browser, COUNT(*) AS clicks FROM clicks WHERE link_id = ? GROUP BY browser ORDER BY clicks DESC`, [linkId]);

    // devices
    const [byDevice] = await pool.query(`SELECT IFNULL(device_type,'Unknown') AS device, COUNT(*) AS clicks FROM clicks WHERE link_id = ? GROUP BY device_type ORDER BY clicks DESC`, [linkId]);

    res.json({
      clicksByDay: byDay,
      countryCounts: byCountry,
      browsers: byBrowser,
      devices: byDevice
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = { createLink, listLinks, linkAnalytics };
