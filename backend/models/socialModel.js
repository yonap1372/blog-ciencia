const pool = require('../config/db');

const Social = {
  getByUser: async (usuario_id) => {
    const query = `SELECT * FROM redes_sociales WHERE usuario_id = $1`;
    const { rows } = await pool.query(query, [usuario_id]);
    return rows;
  },

  create: async (usuario_id, plataforma, enlace) => {
    const query = `
      INSERT INTO redes_sociales (usuario_id, plataforma, enlace) 
      VALUES ($1, $2, $3) RETURNING *`;
    const values = [usuario_id, plataforma, enlace];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  update: async (id, usuario_id, plataforma, enlace) => {
    const query = `
      UPDATE redes_sociales 
      SET plataforma = $1, enlace = $2 
      WHERE id = $3 AND usuario_id = $4 
      RETURNING *`;
    const values = [plataforma, enlace, id, usuario_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  delete: async (id, usuario_id) => {
    const query = `DELETE FROM redes_sociales WHERE id = $1 AND usuario_id = $2 RETURNING *`;
    const { rows } = await pool.query(query, [id, usuario_id]);
    return rows[0];
  }
};

module.exports = Social;
