const pool = require('../config/db');

exports.getCommentsByArticle = async (req, res) => {
  const { articulo_id } = req.params;
  try {
    const { rows } = await pool.query("SELECT * FROM comentarios WHERE articulo_id = $1", [articulo_id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addComment = async (req, res) => {
  const { contenido, articulo_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO comentarios (contenido, usuario_id, articulo_id) VALUES ($1, $2, $3) RETURNING *",
      [contenido, req.user.id, articulo_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
