import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, TextField, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/api/articles")
      .then(response => {
        setArticles(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error al obtener artículos:", error));
  }, []);

  return (
    <Container sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ color: '#00e5ff', mb: 3 }}>
        Artículos Recientes
      </Typography>

      <TextField
        label="Buscar artículo"
        variant="outlined"
        fullWidth
        sx={{ mb: 3, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <Grid container spacing={3}>
          {articles.filter(a => a.titulo.toLowerCase().includes(search.toLowerCase())).map(article => (
            <Grid item xs={12} sm={6} md={4} key={article.id}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{
                  background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
                  boxShadow: '0px 4px 20px rgba(0, 229, 255, 0.2)',
                  borderRadius: '15px',
                  overflow: 'hidden'
                }}>
                  <CardContent>
                    <Typography variant="h5" sx={{ color: '#ffffff' }}>
                      {article.titulo}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#aaaaaa', mt: 1 }}>
                      {article.resumen || "Sin descripción"}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'block', mt: 2, color: '#00e5ff' }}>
                      Publicado el {new Date(article.fecha_publicacion).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#ff4081', mt: 1 }}>
                      Autor: {article.autor}
                    </Typography>
                    <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: '#00e5ff' }}>
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
};

export default ArticlesList;
