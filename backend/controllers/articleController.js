const Article = require('../models/articleModel');

const articleController = {
  getAllArticles: async (req, res) => {
    try {
      const articles = await Article.getAll();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPopularArticles: async (req, res) => {
    try {
      const articles = await Article.getPopular();
      res.json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getArticleById: async (req, res) => {
    try {
      const article = await Article.getById(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "Artículo no encontrado" });
      }
      res.json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createArticle: async (req, res) => {
    const { titulo, contenido, categoria_id } = req.body;
    try {
      const newArticle = await Article.create(titulo, contenido, req.user.id, categoria_id);
      res.status(201).json({ message: "Artículo creado", article: newArticle });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateArticle: async (req, res) => {
    const { titulo, contenido, categoria_id } = req.body;
    try {
      const article = await Article.getById(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "Artículo no encontrado" });
      }

      if (req.user.rol !== 'admin' && req.user.rol !== 'moderador' && article.usuario_id !== req.user.id) {
        return res.status(403).json({ error: "No tienes permiso para modificar este artículo" });
      }

      const updatedArticle = await Article.update(req.params.id, titulo, contenido, categoria_id);
      res.json({ message: "Artículo actualizado", article: updatedArticle });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteArticle: async (req, res) => {
    try {
      const article = await Article.getById(req.params.id);
      if (!article) {
        return res.status(404).json({ error: "Artículo no encontrado" });
      }

      if (req.user.rol !== 'admin' && req.user.rol !== 'moderador' && article.usuario_id !== req.user.id) {
        return res.status(403).json({ error: "No tienes permiso para eliminar este artículo" });
      }

      const deletedArticle = await Article.delete(req.params.id);
      res.json({ message: "Artículo eliminado", article: deletedArticle });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = articleController;
