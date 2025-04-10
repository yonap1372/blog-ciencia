import React from 'react';
import { Container, Typography } from '@mui/material';

const ModeradorDashboard = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" sx={{ color: '#00e5ff' }}>
        Panel de Moderador
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Bienvenido, Moderador. Desde aquí puedes moderar artículos y comentarios.
      </Typography>
    </Container>
  );
};

export default ModeradorDashboard;
