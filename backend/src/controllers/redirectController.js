// redirectController.js
const db = require('../db');
const geoip = require('geoip-lite');
const UAParser = require('ua-parser-js');

function getIpFromReq(req) {
  return (req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || '').split(',')[0].trim();
}

async function handleRedirect(req, res) {
  try {
    const code = req.params.code;
    if (!code) return res.status(400).send('Invalid code');

    // find link by short_code or custom_alias
    db.get('SELECT id, original_url AS originalUrl, expires_at FROM links WHERE short_code = ? OR custom_alias = ?', [code, code], (err, row) => {
      if (err) return res.status(500).send('Server error');
      if (!row) return res.status(404).send('Link not found');

      const link = row;
      // if expired
      if (link.expires_at && new Date(link.expires_at) < new Date()) {
        return res.status(410).send('Link expired');
      }

      // log click synchronously (for MVP)
      const ip = getIpFromReq(req);
      const uaString = req.get('User-Agent') || '';
      const parser = new UAParser(uaString);
      const ua = parser.getResult();

      const geo = geoip.lookup(ip) || {};

      db.run(
        `INSERT INTO clicks (link_id, ip, country, region, city, referrer, user_agent, device_type, browser, os)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          link.id,
          ip || null,
          geo.country || null,
          geo.region || null,
          geo.city || null,
          req.get('Referrer') || req.get('Referer') || null,
          uaString,
          ua.device.type || 'desktop',
          ua.browser.name || null,
          ua.os.name || null
        ], (err) => {
          if (err) console.error('Error logging click:', err);

          // increment count
          db.run('UPDATE links SET click_count = click_count + 1 WHERE id = ?', [link.id], (err) => {
            if (err) console.error('Error updating count:', err);

            // redirect
            return res.redirect(302, link.originalUrl);
          });
        }
      );
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server error');
  }
}

module.exports = { handleRedirect };
