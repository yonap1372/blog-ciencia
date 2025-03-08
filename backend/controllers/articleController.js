const pool = require('../config/db');

exports.getAllArticles = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM articulos");
  res.json(rows);
};

exports.createArticle = async (req, res) => {
  const { titulo, contenido, categoria_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO articulos (titulo, contenido, usuario_id, categoria_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [titulo, contenido, req.user.id, categoria_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
