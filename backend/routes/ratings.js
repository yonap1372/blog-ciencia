const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const authMiddleware = require('../middleware/auth');

router.get('/:articulo_id', ratingController.getArticleRatings);
router.post('/:articulo_id', authMiddleware, ratingController.rateArticle);
router.put('/:articulo_id', authMiddleware, ratingController.updateRating);
router.delete('/:articulo_id', authMiddleware, ratingController.deleteRating);

module.exports = router;
