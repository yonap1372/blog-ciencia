const pool = require('../config/db');

exports.rateArticle = async (req, res) => {
  const { articulo_id, puntuacion } = req.body;
  try {
    await pool.query("INSERT INTO puntuaciones (usuario_id, articulo_id, puntuacion) VALUES ($1, $2, $3)", [req.user.id, articulo_id, puntuacion]);
    res.json({ msg: "Puntuación agregada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
