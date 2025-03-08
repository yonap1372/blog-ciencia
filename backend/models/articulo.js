const db = require('../config/db');

const getArticulos = async () => {
  const result = await db.query('SELECT * FROM articulos');
  return result.rows;
};

const addArticulo = async (titulo, contenido, usuario_id, categoria_id) => {
  const result = await db.query(
    'INSERT INTO articulos (titulo, contenido, usuario_id, categoria_id) VALUES ($1, $2, $3, $4) RETURNING *',
    [titulo, contenido, usuario_id, categoria_id]
  );
  return result.rows[0];
};

module.exports = { getArticulos, addArticulo };
