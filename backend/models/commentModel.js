const pool = require('../config/db');

const Comment = {
  getByArticle: async (articleId) => {
    const query = `SELECT * FROM comentarios WHERE articulo_id = $1 ORDER BY fecha_comentario DESC`;
    const { rows } = await pool.query(query, [articleId]);
    return rows;
  },

  create: async (contenido, usuario_id, articulo_id) => {
    const query = `
      INSERT INTO comentarios (contenido, usuario_id, articulo_id, fecha_comentario) 
      VALUES ($1, $2, $3, NOW()) RETURNING *`;
    const values = [contenido, usuario_id, articulo_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  delete: async (id) => {
    const query = `DELETE FROM comentarios WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  getById: async (id) => {
    const query = `SELECT * FROM comentarios WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = Comment;
