const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getFollowers, followUser } = require('../controllers/followController');

router.get('/', auth, getFollowers);
router.post('/', auth, followUser);

module.exports = router;
