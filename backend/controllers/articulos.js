const Articulo = require('../models/articulo');

const obtenerArticulos = async (req, res) => {
  try {
    const articulos = await Articulo.getArticulos();
    res.json(articulos);
  } catch (err) {
    res.status(500).send('Error al obtener artículos');
  }
};

const crearArticulo = async (req, res) => {
  const { titulo, contenido, usuario_id, categoria_id } = req.body;
  try {
    const articulo = await Articulo.addArticulo(titulo, contenido, usuario_id, categoria_id);
    res.status(201).json(articulo);
  } catch (err) {
    res.status(500).send('Error al crear artículo');
  }
};

module.exports = { obtenerArticulos, crearArticulo };
