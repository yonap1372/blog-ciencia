import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Grid, Card, CardContent, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.get("http://localhost:3001/api/favorites", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(response => {
        setFavorites(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener favoritos:", error);
        setLoading(false);
      });
    }
  }, [user]);

  const handleRemoveFavorite = (articleId) => {
    axios.delete("http://localhost:3001/api/favorites", {
      headers: { Authorization: `Bearer ${user.token}` },
      data: { articulo_id: articleId }
    })
    .then(() => {
      setFavorites(favorites.filter(fav => fav.id !== articleId));
    })
    .catch(error => console.error("Error al eliminar favorito:", error));
  };

  return (
    <Container sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ color: '#00e5ff', mb: 3 }}>
        Mis Favoritos
      </Typography>

      {loading ? (
        <CircularProgress color="primary" />
      ) : favorites.length === 0 ? (
        <Typography variant="h6" sx={{ color: '#aaaaaa' }}>No tienes artículos guardados.</Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map(article => (
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
                    <Link to={`/article/${article.id}`} style={{ textDecoration: 'none', color: '#00e5ff' }}>
                      <Typography variant="button" sx={{ mt: 2, display: 'block' }}>
                        Leer más →
                      </Typography>
                    </Link>
                    <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={() => handleRemoveFavorite(article.id)}>
                      Eliminar de Favoritos
                    </Button>
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

export default Favorites;
