import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, TextField, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/articles')
      .then(response => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = articles;
    if (category.trim() !== '') {
      filtered = articles.filter(a => a.categoria?.toLowerCase().includes(category.toLowerCase()));
    }
    setFilteredArticles(filtered);
  }, [articles, category]);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container sx={{ textAlign: 'center', mt: 5 }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h1" sx={{ color: '#00e5ff', mb: 2 }}>
          Blog Ciencia
        </Typography>
        <Typography variant="h5" sx={{ color: '#ffffff', mb: 4 }}>
          Explora los últimos avances científicos en un entorno futurista.
        </Typography>
      </motion.div>

      <TextField
        label="Buscar por categoría"
        variant="outlined"
        fullWidth
        sx={{ mt: 5, mb: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      {filteredArticles.length === 0 ? (
        <Typography variant="h6" sx={{ color: '#ff4081', mt: 3 }}>
          No hay artículos disponibles
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {filteredArticles.map(a => (
            <Grid item xs={12} sm={6} md={4} key={a.id}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{
                  background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                  boxShadow: '0px 4px 20px rgba(0, 229, 255, 0.2)',
                  borderRadius: '15px',
                  overflow: 'hidden'
                }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ color: '#ffffff' }}>
                      {a.titulo}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#aaaaaa', mt: 1 }}>
                      {a.resumen || "Sin descripción"}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#aaaaaa', mt: 1 }}>
                      Categoría: {a.categoria || "Sin categoría"}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#00e5ff' }}>
                      Publicado el {new Date(a.fecha_publicacion).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#ff4081', mt: 1 }}>
                      Autor: {a.autor || "Anónimo"}
                    </Typography>
                    <Link to={`/article/${a.id}`} style={{ textDecoration: 'none', color: '#00e5ff' }}>
                      <Typography variant="button" sx={{ mt: 2, display: 'block' }}>
                        Leer más →
                      </Typography>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
