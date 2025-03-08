const express = require('express');
const router = express.Router();
const { obtenerUsuarios, crearUsuario } = require('../controllers/usuarios');

router.get('/', obtenerUsuarios);
router.post('/', crearUsuario);

module.exports = router;
