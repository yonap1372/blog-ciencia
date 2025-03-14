const express = require('express');
const router = express.Router();
const socialController = require('../controllers/socialController');
const authMiddleware = require('../middleware/auth');

router.get('/:usuario_id', socialController.getUserSocials);
router.post('/', authMiddleware, socialController.addSocial);
router.put('/:id', authMiddleware, socialController.updateSocial);
router.delete('/:id', authMiddleware, socialController.deleteSocial);

module.exports = router;
