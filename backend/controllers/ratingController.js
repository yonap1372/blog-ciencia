const Rating = require('../models/ratingModel');

const ratingController = {
  getArticleRatings: async (req, res) => {
    try {
      const ratings = await Rating.getByArticle(req.params.articulo_id);
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  rateArticle: async (req, res) => {
    const { puntuacion } = req.body;
    const { articulo_id } = req.params;

    if (puntuacion < 1 || puntuacion > 5) {
      return res.status(400).json({ error: "La puntuación debe estar entre 1 y 5" });
    }

    try {
      const existingRating = await Rating.getByUserAndArticle(req.user.id, articulo_id);

      if (existingRating) {
        return res.status(400).json({ error: "Ya calificaste este artículo. Usa PUT para actualizar tu calificación." });
      }

      const newRating = await Rating.create(req.user.id, articulo_id, puntuacion);
      await Rating.updateArticleRating(articulo_id);
      res.status(201).json({ message: "Puntuación agregada", rating: newRating });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateRating: async (req, res) => {
    const { puntuacion } = req.body;
    const { articulo_id } = req.params;

    if (puntuacion < 1 || puntuacion > 5) {
      return res.status(400).json({ error: "La puntuación debe estar entre 1 y 5" });
    }

    try {
      const updatedRating = await Rating.update(req.user.id, articulo_id, puntuacion);
      if (!updatedRating) {
        return res.status(404).json({ error: "No encontraste ninguna calificación para actualizar." });
      }

      await Rating.updateArticleRating(articulo_id);
      res.json({ message: "Puntuación actualizada", rating: updatedRating });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteRating: async (req, res) => {
    const { articulo_id } = req.params;

    try {
      const deletedRating = await Rating.delete(req.user.id, articulo_id);
      if (!deletedRating) {
        return res.status(404).json({ error: "No encontraste ninguna calificación para eliminar." });
      }

      await Rating.updateArticleRating(articulo_id);
      res.json({ message: "Puntuación eliminada", rating: deletedRating });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = ratingController;
