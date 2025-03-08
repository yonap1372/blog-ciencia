const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { rateArticle } = require('../controllers/ratingController');

router.post('/', auth, rateArticle);

module.exports = router;
