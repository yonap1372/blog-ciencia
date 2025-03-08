const express = require('express');
const router = express.Router();
const { obtenerArticulos, crearArticulo } = require('../controllers/articulos');

router.get('/', obtenerArticulos);
router.post('/', crearArticulo);

module.exports = router;
