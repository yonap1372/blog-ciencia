const pool = require('../config/db');

exports.getUserFavorites = async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM favoritos WHERE usuario_id = $1", [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addFavorite = async (req, res) => {
  const { articulo_id } = req.body;
  try {
    await pool.query("INSERT INTO favoritos (usuario_id, articulo_id) VALUES ($1, $2)", [req.user.id, articulo_id]);
    res.json({ msg: "Artículo agregado a favoritos" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
