const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authMiddleware = require('../middleware/auth');
const roleAuth = require('../middleware/roleAuth');

router.get('/', articleController.getAllArticles);
router.get('/populares', articleController.getPopularArticles);
router.get('/:id', articleController.getArticleById);
router.post('/', authMiddleware, articleController.createArticle);
router.put('/:id', authMiddleware, roleAuth(['admin', 'moderador', 'autor', 'usuario']), articleController.updateArticle);
router.delete('/:id', authMiddleware, roleAuth(['admin', 'moderador', 'autor', 'usuario']), articleController.deleteArticle);

module.exports = router;
