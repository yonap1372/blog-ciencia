const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAllArticles, createArticle } = require('../controllers/articleController');

router.get('/', getAllArticles);
router.post('/', auth, createArticle);

module.exports = router;
