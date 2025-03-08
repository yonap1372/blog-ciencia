import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, List, ListItem, ListItemText, Typography } from '@mui/material';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/usuarios')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los usuarios', error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Usuarios</Typography>
      <List>
        {usuarios.map(usuario => (
          <ListItem key={usuario.id}>
            <ListItemText primary={usuario.nombre} secondary={usuario.correo} />
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary">Agregar Usuario</Button>
    </div>
  );
};

export default Usuarios;
