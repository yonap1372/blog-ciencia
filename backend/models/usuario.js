const db = require('../config/db');

const getUsuarios = async () => {
  const result = await db.query('SELECT * FROM usuarios');
  return result.rows;
};

const addUsuario = async (nombre, correo, contrasena) => {
  const result = await db.query(
    'INSERT INTO usuarios (nombre, correo, contrasena) VALUES ($1, $2, $3) RETURNING *',
    [nombre, correo, contrasena]
  );
  return result.rows[0];
};

module.exports = { getUsuarios, addUsuario };
