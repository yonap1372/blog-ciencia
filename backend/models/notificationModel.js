const pool = require('../config/db');

const Notification = {
  getByUser: async (usuario_id) => {
    const query = `SELECT * FROM notificaciones WHERE usuario_id = $1 ORDER BY fecha DESC`;
    const { rows } = await pool.query(query, [usuario_id]);
    return rows;
  },

  markAsRead: async (id, usuario_id) => {
    const query = `UPDATE notificaciones SET leido = TRUE WHERE id = $1 AND usuario_id = $2 RETURNING *`;
    const { rows } = await pool.query(query, [id, usuario_id]);
    return rows[0];
  },

  create: async (usuario_id, mensaje) => {
    const query = `INSERT INTO notificaciones (usuario_id, mensaje, fecha) VALUES ($1, $2, NOW()) RETURNING *`;
    const { rows } = await pool.query(query, [usuario_id, mensaje]);
    return rows[0];
  }
};

module.exports = Notification;
