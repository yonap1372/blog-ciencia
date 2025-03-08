const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/authConfig');

exports.register = async (req, res) => {
  const { nombre, correo, contrasena } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(contrasena, salt);

  try {
    const result = await pool.query(
      "INSERT INTO usuarios (nombre, correo, contrasena) VALUES ($1, $2, $3) RETURNING *",
      [nombre, correo, hashedPassword]
    );
    res.json({ msg: "Usuario registrado", user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE correo = $1", [correo]);
    if (result.rows.length === 0) return res.status(400).json({ msg: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(contrasena, result.rows[0].contrasena);
    if (!validPassword) return res.status(400).json({ msg: "Contraseña incorrecta" });

    const token = jwt.sign({ id: result.rows[0].id }, secret, { expiresIn: "1h" });
    res.json({ token, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
