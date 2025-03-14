const pool = require('../config/db');

const Follow = {
  follow: async (seguidor_id, seguido_id) => {
    const query = `
      INSERT INTO seguidores (seguidor_id, seguido_id, fecha_seguimiento) 
      VALUES ($1, $2, NOW()) RETURNING *`;
    const values = [seguidor_id, seguido_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  unfollow: async (seguidor_id, seguido_id) => {
    const query = `DELETE FROM seguidores WHERE seguidor_id = $1 AND seguido_id = $2 RETURNING *`;
    const { rows } = await pool.query(query, [seguidor_id, seguido_id]);
    return rows[0];
  },

  getFollowers: async (usuario_id) => {
    const query = `
      SELECT u.id, u.nombre, u.correo 
      FROM seguidores s
      JOIN usuarios u ON s.seguidor_id = u.id
      WHERE s.seguido_id = $1`;
    const { rows } = await pool.query(query, [usuario_id]);
    return rows;
  },

  getFollowing: async (usuario_id) => {
    const query = `
      SELECT u.id, u.nombre, u.correo 
      FROM seguidores s
      JOIN usuarios u ON s.seguido_id = u.id
      WHERE s.seguidor_id = $1`;
    const { rows } = await pool.query(query, [usuario_id]);
    return rows;
  }
};

module.exports = Follow;
