import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <Container sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h3">Bienvenido al Blog de Ciencia</Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Explora artículos científicos, comenta y califica tus favoritos.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }} component={Link} to="/login">
        Iniciar Sesión
      </Button>
      <Button variant="outlined" color="secondary" sx={{ mt: 3, ml: 2 }} component={Link} to="/register">
        Registrarse
      </Button>
    </Container>
  );
}
