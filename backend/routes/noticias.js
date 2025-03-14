const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM noticias ORDER BY fecha_publicacion DESC LIMIT 5');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
