const Comment = require('../models/commentModel');

const commentController = {
  getCommentsByArticle: async (req, res) => {
    try {
      const comments = await Comment.getByArticle(req.params.articleId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addComment: async (req, res) => {
    const { contenido } = req.body;
    try {
      const newComment = await Comment.create(contenido, req.user.id, req.params.articleId);
      res.status(201).json({ message: "Comentario agregado", comment: newComment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const comment = await Comment.getById(req.params.id);
      if (!comment) {
        return res.status(404).json({ error: "Comentario no encontrado" });
      }

      if (req.user.id !== comment.usuario_id && req.user.rol !== 'admin' && req.user.rol !== 'moderador') {
        return res.status(403).json({ error: "No tienes permiso para eliminar este comentario" });
      }

      const deletedComment = await Comment.delete(req.params.id);
      res.json({ message: "Comentario eliminado", comment: deletedComment });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = commentController;
