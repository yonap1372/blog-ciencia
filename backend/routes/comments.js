const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getCommentsByArticle, addComment } = require('../controllers/commentController');

router.get('/:articulo_id', getCommentsByArticle);
router.post('/', auth, addComment);

module.exports = router;
