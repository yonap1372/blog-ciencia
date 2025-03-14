const express = require('express');
const router = express.Router();
const favoriteController = require('../controllers/favoriteController');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, favoriteController.getFavorites);
router.post('/', authMiddleware, favoriteController.addToFavorites);
router.delete('/', authMiddleware, favoriteController.removeFromFavorites);

module.exports = router;
