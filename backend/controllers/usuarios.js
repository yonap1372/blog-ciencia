const Usuario = require('../models/usuario');

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.getUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).send('Error al obtener usuarios');
  }
};

const crearUsuario = async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  try {
    const usuario = await Usuario.addUsuario(nombre, correo, contrasena);
    res.status(201).json(usuario);
  } catch (err) {
    res.status(500).send('Error al crear usuario');
  }
};

module.exports = { obtenerUsuarios, crearUsuario };
