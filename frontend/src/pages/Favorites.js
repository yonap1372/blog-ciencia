import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await axios.get('http://localhost:3001/api/favorites', {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setFavorites(response.data);
    };
    fetchFavorites();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Mis Favoritos</Typography>
      <List>
        {favorites.map((fav) => (
          <ListItem key={fav.id} button component="a" href={`/article/${fav.articulo_id}`}>
            <ListItemText primary={fav.articulo_id} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
