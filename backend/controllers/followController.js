const pool = require('../config/db');

exports.getFollowers = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM seguidores WHERE seguido_id = $1", [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.followUser = async (req, res) => {
  const { seguido_id } = req.body;
  try {
    await pool.query("INSERT INTO seguidores (seguidor_id, seguido_id) VALUES ($1, $2)", [req.user.id, seguido_id]);
    res.json({ msg: "Ahora sigues a este usuario" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
