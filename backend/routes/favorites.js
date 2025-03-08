const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getUserFavorites, addFavorite } = require('../controllers/favoritesController');

router.get('/', auth, getUserFavorites);
router.post('/', auth, addFavorite);

module.exports = router;
