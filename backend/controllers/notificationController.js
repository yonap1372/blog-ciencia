const Notification = require('../models/notificationModel');

const notificationController = {
  getNotifications: async (req, res) => {
    try {
      const notifications = await Notification.getByUser(req.user.id);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  markAsRead: async (req, res) => {
    try {
      const notification = await Notification.markAsRead(req.params.id, req.user.id);
      if (!notification) {
        return res.status(404).json({ error: "Notificación no encontrada" });
      }
      res.json({ message: "Notificación marcada como leída", notification });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  sendNotification: async (req, res) => {
    if (req.user.rol !== 'admin' && req.user.rol !== 'moderador') {
      return res.status(403).json({ error: "No tienes permisos para enviar notificaciones" });
    }

    const { usuario_id, mensaje } = req.body;
    try {
      const notification = await Notification.create(usuario_id, mensaje);
      res.status(201).json({ message: "Notificación enviada", notification });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = notificationController;
