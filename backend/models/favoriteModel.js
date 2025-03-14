const pool = require('../config/db');

const Favorite = {
  add: async (usuario_id, articulo_id) => {
    const query = `
      INSERT INTO favoritos (usuario_id, articulo_id, fecha_guardado) 
      VALUES ($1, $2, NOW()) RETURNING *`;
    const values = [usuario_id, articulo_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  remove: async (usuario_id, articulo_id) => {
    const query = `DELETE FROM favoritos WHERE usuario_id = $1 AND articulo_id = $2 RETURNING *`;
    const { rows } = await pool.query(query, [usuario_id, articulo_id]);
    return rows[0];
  },

  getByUser: async (usuario_id) => {
    const query = `
      SELECT a.id, a.titulo, a.contenido, a.fecha_publicacion 
      FROM favoritos f
      JOIN articulos a ON f.articulo_id = a.id
      WHERE f.usuario_id = $1
      ORDER BY f.fecha_guardado DESC`;
    const { rows } = await pool.query(query, [usuario_id]);
    return rows;
  }
};

module.exports = Favorite;
