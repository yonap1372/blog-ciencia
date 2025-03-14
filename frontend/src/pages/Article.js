import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CircularProgress, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Article = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/articles/${id}`)
      .then(response => {
        setArticle(response.data);
        setLoading(false);
      })
      .catch(error => console.error("Error al obtener artículo:", error));
  }, [id]);

  return (
    <Container sx={{ mt: 5 }}>
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <Card sx={{ background: '#1e1e1e', boxShadow: '0px 4px 20px rgba(0, 229, 255, 0.2)', borderRadius: '15px', p: 3 }}>
          <CardContent>
            <Typography variant="h3" sx={{ color: '#00e5ff', mb: 2 }}>
              {article.titulo}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: '#ff4081', mb: 2 }}>
              Autor: {article.autor}
            </Typography>
            <Typography variant="body1" sx={{ color: '#ffffff', textAlign: 'justify' }}>
              {article.contenido}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 3, color: '#00e5ff' }}>
              Publicado el {new Date(article.fecha_publicacion).toLocaleDateString()}
            </Typography>
            <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
              Comentar
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Article;
