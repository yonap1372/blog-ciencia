import React, { useState, useEffect, useContext } from 'react';
import { Container, TextField, Button, Typography, Card, CardContent, CircularProgress, MenuItem } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function CrearArticulo() {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState({ titulo: '', contenido: '', categoria_id: '' });
  const [imagen, setImagen] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/categories')
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error al cargar categorías:', error);
      });
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImagen(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('titulo', data.titulo);
    formData.append('contenido', data.contenido);
    formData.append('categoria_id', data.categoria_id);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    axios.post('http://localhost:3001/api/articles', formData, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      setLoading(false);
      setMessage("Artículo publicado correctamente.");
      setData({ titulo: '', contenido: '', categoria_id: '' });
      setImagen(null);
    })
    .catch((err) => {
      setLoading(false);
      setMessage(err.response?.data?.error || "Error al publicar el artículo.");
    });
  };

  return (
    <Container sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: 600, background: 'rgba(30,30,30,0.9)', borderRadius: 3, boxShadow: '0px 0px 20px rgba(0,229,255,0.4)' }}>
        <CardContent>
          <Typography variant="h4" sx={{ color: '#00e5ff', textAlign: 'center', mb: 3 }}>
            Publicar Artículo
          </Typography>

          {message && <Typography color="primary" sx={{ textAlign: 'center', mb: 2 }}>{message}</Typography>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Título"
              name="titulo"
              fullWidth
              required
              sx={{ mb: 2, input: { color: 'white' } }}
              value={data.titulo}
              onChange={handleChange}
            />
            <TextField
              label="Contenido"
              name="contenido"
              multiline
              rows={6}
              fullWidth
              required
              sx={{ mb: 2, input: { color: 'white' } }}
              value={data.contenido}
              onChange={handleChange}
            />
            <TextField
              select
              label="Seleccionar Categoría"
              name="categoria_id"
              fullWidth
              required
              value={data.categoria_id}
              onChange={handleChange}
              sx={{ mb: 2, color: 'white' }}
            >
              {categorias.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.nombre}
                </MenuItem>
              ))}
            </TextField>

            <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
              Subir Imagen
              <input type="file" hidden onChange={handleImageChange} />
            </Button>

            {imagen && (
              <Typography variant="body2" sx={{ color: '#00e5ff', mb: 2 }}>
                Imagen seleccionada: {imagen.name}
              </Typography>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Publicar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}
