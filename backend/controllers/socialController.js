const Social = require('../models/socialModel');

const socialController = {
  getUserSocials: async (req, res) => {
    try {
      const socials = await Social.getByUser(req.params.usuario_id);
      res.json(socials);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addSocial: async (req, res) => {
    const { plataforma, enlace } = req.body;

    try {
      const newSocial = await Social.create(req.user.id, plataforma, enlace);
      res.status(201).json({ message: "Red social agregada", social: newSocial });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateSocial: async (req, res) => {
    const { plataforma, enlace } = req.body;
    try {
      const updatedSocial = await Social.update(req.params.id, req.user.id, plataforma, enlace);
      if (!updatedSocial) {
        return res.status(404).json({ error: "Red social no encontrada o sin permisos para editar" });
      }
      res.json({ message: "Red social actualizada", social: updatedSocial });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteSocial: async (req, res) => {
    try {
      const deletedSocial = await Social.delete(req.params.id, req.user.id);
      if (!deletedSocial) {
        return res.status(404).json({ error: "Red social no encontrada o sin permisos para eliminar" });
      }
      res.json({ message: "Red social eliminada" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = socialController;
