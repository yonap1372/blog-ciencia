import React from 'react';
import { Container, Typography } from '@mui/material';

const UserHome = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" sx={{ color: '#00e5ff' }}>
        Inicio
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Bienvenido, Usuario. Explora los últimos artículos y noticias científicas.
      </Typography>
    </Container>
  );
};

export default UserHome;
