import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

export default function ArticlesList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await axios.get('http://localhost:3001/api/articles');
      setArticles(response.data);
    };
    fetchArticles();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Lista de Artículos</Typography>
      <List>
        {articles.map((article) => (
          <ListItem key={article.id} button component="a" href={`/article/${article.id}`}>
            <ListItemText primary={article.titulo} secondary={article.fecha_publicacion} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
