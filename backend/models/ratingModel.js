const pool = require('../config/db');

const Rating = {
  getByArticle: async (articulo_id) => {
    const query = `
      SELECT AVG(puntuacion) AS promedio, COUNT(*) AS total 
      FROM puntuaciones 
      WHERE articulo_id = $1`;
    const { rows } = await pool.query(query, [articulo_id]);
    return rows[0];
  },

  getByUserAndArticle: async (usuario_id, articulo_id) => {
    const query = `SELECT * FROM puntuaciones WHERE usuario_id = $1 AND articulo_id = $2`;
    const { rows } = await pool.query(query, [usuario_id, articulo_id]);
    return rows[0];
  },

  create: async (usuario_id, articulo_id, puntuacion) => {
    const query = `
      INSERT INTO puntuaciones (usuario_id, articulo_id, puntuacion, fecha) 
      VALUES ($1, $2, $3, NOW()) RETURNING *`;
    const values = [usuario_id, articulo_id, puntuacion];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  update: async (usuario_id, articulo_id, puntuacion) => {
    const query = `
      UPDATE puntuaciones 
      SET puntuacion = $1, fecha = NOW() 
      WHERE usuario_id = $2 AND articulo_id = $3 
      RETURNING *`;
    const values = [puntuacion, usuario_id, articulo_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  delete: async (usuario_id, articulo_id) => {
    const query = `DELETE FROM puntuaciones WHERE usuario_id = $1 AND articulo_id = $2 RETURNING *`;
    const { rows } = await pool.query(query, [usuario_id, articulo_id]);
    return rows[0];
  },

  updateArticleRating: async (articulo_id) => {
    const query = `
      UPDATE articulos 
      SET puntuacion_promedio = (SELECT AVG(puntuacion) FROM puntuaciones WHERE articulo_id = $1) 
      WHERE id = $1 RETURNING puntuacion_promedio`;
    const { rows } = await pool.query(query, [articulo_id]);
    return rows[0];
  }
};

module.exports = Rating;
