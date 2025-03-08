import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const Articulos = () => {
  const [articulos, setArticulos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/articulos')
      .then(response => {
        setArticulos(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los artículos', error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Artículos</Typography>
      <List>
        {articulos.map(articulo => (
          <ListItem key={articulo.id}>
            <ListItemText primary={articulo.titulo} secondary={articulo.fecha_publicacion} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Articulos;
