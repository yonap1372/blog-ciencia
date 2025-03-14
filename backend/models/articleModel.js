const pool = require('../config/db');

const Article = {
  getAll: async () => {
    const query = `SELECT * FROM articulos ORDER BY fecha_publicacion DESC`;
    const { rows } = await pool.query(query);
    return rows;
  },

  getPopular: async () => {
    const query = `SELECT * FROM articulos ORDER BY puntuacion_promedio DESC LIMIT 5`;
    const { rows } = await pool.query(query);
    return rows;
  },

  getById: async (id) => {
    const query = `SELECT * FROM articulos WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  create: async (titulo, contenido, usuario_id, categoria_id) => {
    const query = `
      INSERT INTO articulos (titulo, contenido, usuario_id, categoria_id) 
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [titulo, contenido, usuario_id, categoria_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  update: async (id, titulo, contenido, categoria_id) => {
    const query = `
      UPDATE articulos SET titulo = $1, contenido = $2, categoria_id = $3 
      WHERE id = $4 RETURNING *`;
    const values = [titulo, contenido, categoria_id, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  delete: async (id) => {
    const query = `DELETE FROM articulos WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = Article;
