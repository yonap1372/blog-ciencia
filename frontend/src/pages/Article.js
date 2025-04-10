import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CircularProgress, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/articles/${id}`)
      .then(response => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener artículo:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress color="primary" />
      </Container>
    );
  }

  if (!article) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h6" color="error">Artículo no encontrado</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Card sx={{ background: '#1e1e1e', boxShadow: '0px 4px 20px rgba(0, 229, 255, 0.2)', borderRadius: '15px', p: 3 }}>
        <CardContent>
          <Typography variant="h3" sx={{ color: '#00e5ff', mb: 2 }}>
            {article.titulo}
          </Typography>
          <Typography variant="subtitle1" sx={{ color: '#ff4081', mb: 1 }}>
            Autor: {article.autor || "Anónimo"}
          </Typography>
          <Typography variant="subtitle2" sx={{ color: '#aaaaaa', mb: 3 }}>
            Categoría: {article.categoria || "Sin categoría"}
          </Typography>
          <Typography variant="body1" sx={{ color: '#ffffff', textAlign: 'justify' }}>
            {article.contenido}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 3, color: '#00e5ff' }}>
            Publicado el {new Date(article.fecha_publicacion).toLocaleDateString()}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/articles" 
            sx={{ mt: 3 }}
          >
            Volver a Artículos
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
