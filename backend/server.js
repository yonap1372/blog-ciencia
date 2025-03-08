const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/articles', require('./routes/articles'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/favorites', require('./routes/favorites'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/followers', require('./routes/followers'));
app.use('/api/ratings', require('./routes/ratings'));


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor en http://localhost:${PORT}`));
