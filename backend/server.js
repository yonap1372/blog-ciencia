const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const usuarioRoutes = require('./routes/usuarios');
const articuloRoutes = require('./routes/articulos');

app.use(cors());
app.use(express.json()); // Para parsear JSON en las solicitudes
app.use('/api/usuarios', usuarioRoutes); // Rutas de usuarios
app.use('/api/articulos', articuloRoutes); // Rutas de artículos

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

