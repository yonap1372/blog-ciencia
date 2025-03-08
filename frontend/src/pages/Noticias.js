import React from 'react';
import { Container, Typography } from '@mui/material';

const Noticias = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Noticias Científicas
      </Typography>
      <Typography variant="body1">
        Aquí se mostrarán las últimas noticias sobre ciencia y tecnología.
      </Typography>
    </Container>
  );
};

export default Noticias;
