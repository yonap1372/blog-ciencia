const pool = require('../config/db');

exports.getNotifications = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM notificaciones WHERE usuario_id = $1", [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
