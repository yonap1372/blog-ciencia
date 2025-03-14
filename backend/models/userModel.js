const pool = require('../config/db');

const User = {
  create: async (nombre, correo, contrasena, rol) => {
    const query = `
      INSERT INTO usuarios (nombre, correo, contrasena, rol)
      VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [nombre, correo, contrasena, rol];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  findByEmail: async (correo) => {
    const query = `SELECT * FROM usuarios WHERE correo = $1`;
    const { rows } = await pool.query(query, [correo]);
    return rows[0];
  },

  findById: async (id) => {
    const query = `SELECT id, nombre, correo, rol FROM usuarios WHERE id = $1`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  update: async (id, nombre, correo) => {
    const query = `UPDATE usuarios SET nombre = $1, correo = $2 WHERE id = $3 RETURNING *`;
    const { rows } = await pool.query(query, [nombre, correo, id]);
    return rows[0];
  },

  delete: async (id) => {
    const query = `DELETE FROM usuarios WHERE id = $1 RETURNING *`;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
};

module.exports = User;
