const News = require('../models/newsModel');

const newsController = {
  getAllNews: async (req, res) => {
    try {
      const news = await News.getAll();
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNewsById: async (req, res) => {
    try {
      const newsItem = await News.getById(req.params.id);
      if (!newsItem) {
        return res.status(404).json({ error: "Noticia no encontrada" });
      }
      res.json(newsItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createNews: async (req, res) => {
    const { titulo, contenido, fuente } = req.body;
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: "Acceso denegado. Solo administradores pueden publicar noticias." });
      }

      const newNews = await News.create(titulo, contenido, fuente);
      res.status(201).json({ message: "Noticia publicada", news: newNews });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateNews: async (req, res) => {
    const { titulo, contenido, fuente } = req.body;
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: "Acceso denegado. Solo administradores pueden editar noticias." });
      }

      const updatedNews = await News.update(req.params.id, titulo, contenido, fuente);
      res.json({ message: "Noticia actualizada", news: updatedNews });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteNews: async (req, res) => {
    try {
      if (req.user.rol !== 'admin') {
        return res.status(403).json({ error: "Acceso denegado. Solo administradores pueden eliminar noticias." });
      }

      const deletedNews = await News.delete(req.params.id);
      res.json({ message: "Noticia eliminada", news: deletedNews });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = newsController;
