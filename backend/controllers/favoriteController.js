const Favorite = require('../models/favoriteModel');

const favoriteController = {
  addToFavorites: async (req, res) => {
    try {
      const { articulo_id } = req.body;

      const favorite = await Favorite.add(req.user.id, articulo_id);
      res.status(201).json({ message: "Artículo agregado a favoritos", favorite });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeFromFavorites: async (req, res) => {
    try {
      const { articulo_id } = req.body;

      const favorite = await Favorite.remove(req.user.id, articulo_id);
      if (!favorite) {
        return res.status(404).json({ error: "El artículo no está en favoritos" });
      }

      res.json({ message: "Artículo eliminado de favoritos" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getFavorites: async (req, res) => {
    try {
      const favorites = await Favorite.getByUser(req.user.id);
      res.json(favorites);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = favoriteController;
