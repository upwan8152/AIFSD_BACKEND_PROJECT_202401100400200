const express = require('express');
const crypto = require('crypto');
const router = express.Router();

// POST /api/crypto/hash — Hash a password with SHA-256
router.post('/hash', (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        error: 'Password is required. Send JSON: { "password": "your_password" }'
      });
    }

    const hash = crypto.createHash('sha256').update(password).digest('hex');

    res.json({
      success: true,
      data: {
        original: password,
        hash,
        algorithm: 'SHA-256',
        hashLength: hash.length
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET /api/crypto/token — Generate a random reset token
router.get('/token', (req, res) => {
  try {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresIn = '1 hour';

    res.json({
      success: true,
      data: {
        token,
        tokenLength: token.length,
        expiresIn,
        usage: 'Use this token for password reset links'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST /api/crypto/verify — Verify a password against a hash
router.post('/verify', (req, res) => {
  try {
    const { password, hash } = req.body;

    if (!password || !hash) {
      return res.status(400).json({
        success: false,
        error: 'Both "password" and "hash" fields are required.'
      });
    }

    const computedHash = crypto.createHash('sha256').update(password).digest('hex');
    const isMatch = computedHash === hash;

    res.json({
      success: true,
      data: {
        isMatch,
        message: isMatch ? '✅ Password matches the hash!' : '❌ Password does not match.'
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
