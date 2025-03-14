const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authController = {
  registerUser: async (req, res) => {
    const { nombre, correo, contrasena, rol } = req.body;
    try {
      const existingUser = await User.findByEmail(correo);
      if (existingUser) {
        return res.status(400).json({ error: "El correo ya está registrado" });
      }
  
      let assignedRole = 'usuario';
  
      if (req.user && req.user.rol === 'admin' && ['autor', 'moderador', 'admin'].includes(rol)) {
        assignedRole = rol;
      }
  
      const hashedPassword = await bcrypt.hash(contrasena, 10);
      const newUser = await User.create(nombre, correo, hashedPassword, assignedRole);
      res.status(201).json({ message: "Usuario registrado", user: newUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  ,

  loginUser: async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
      const user = await User.findByEmail(correo);
      if (!user) {
        return res.status(400).json({ error: "Correo o contraseña incorrectos" });
      }

      const isMatch = await bcrypt.compare(contrasena, user.contrasena);
      if (!isMatch) {
        return res.status(400).json({ error: "Correo o contraseña incorrectos" });
      }

      const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.json({ message: "Inicio de sesión exitoso", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProfile: async (req, res) => {
    const { nombre, correo } = req.body;
    try {
      const updatedUser = await User.update(req.user.id, nombre, correo);
      res.json({ message: "Perfil actualizado", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  changeUserRole: async (req, res) => {
    if (req.user.rol !== 'admin') {
      return res.status(403).json({ error: "Acceso denegado. Solo administradores pueden cambiar roles." });
    }
  
    const { rol } = req.body;
    if (!['usuario', 'autor', 'moderador', 'admin'].includes(rol)) {
      return res.status(400).json({ error: "Rol inválido" });
    }
  
    try {
      const updatedUser = await User.updateRole(req.params.id, rol);
      res.json({ message: "Rol actualizado", user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.delete(req.user.id);
      res.json({ message: "Cuenta eliminada", user: deletedUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;
