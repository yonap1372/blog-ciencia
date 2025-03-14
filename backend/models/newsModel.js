const pool = require('../config/db');

const News = {
  getAll: async () => {
    const query = `SELECT * FROM noticias ORDER BY fecha_publicacion DESC`;
    const { rows } = await pool.query(query);
    return rows;
  },

  getById: async (id) => {
    const query = `SELECT * FROM noticias WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  create: async (titulo, contenido, fuente) => {
    const query = `
      INSERT INTO noticias (titulo, contenido, fuente, fecha_publicacion) 
      VALUES ($1, $2, $3, NOW()) RETURNING *`;
    const values = [titulo, contenido, fuente];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  update: async (id, titulo, contenido, fuente) => {
    const query = `
      UPDATE noticias SET titulo = $1, contenido = $2, fuente = $3
      WHERE id = $4 RETURNING *`;
    const values = [titulo, contenido, fuente, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  delete: async (id) => {
    const query = `DELETE FROM noticias WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = News;
