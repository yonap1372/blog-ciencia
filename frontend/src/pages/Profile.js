import React, { useEffect, useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import axios from 'axios';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('http://localhost:3001/api/users/me', {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setUser(response.data);
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (!user) return <Typography>Cargando...</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Perfil de Usuario</Typography>
      <Typography variant="h6">Nombre: {user.nombre}</Typography>
      <Typography variant="h6">Correo: {user.correo}</Typography>
      <Button variant="contained" color="secondary" sx={{ mt: 3 }} onClick={handleLogout}>
        Cerrar Sesión
      </Button>
    </Container>
  );
}
