const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');
const authMiddleware = require('../middleware/auth');

router.get('/followers/:usuario_id', followController.getFollowers);
router.get('/following/:usuario_id', followController.getFollowing);
router.post('/follow', authMiddleware, followController.followUser);
router.delete('/unfollow', authMiddleware, followController.unfollowUser);

module.exports = router;
