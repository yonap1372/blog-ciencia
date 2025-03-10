import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        correo: email,
        contrasena: password
      });
      localStorage.setItem('token', response.data.token);
      alert('Inicio de sesión exitoso');
      navigate('/dashboard');
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Iniciar Sesión</Typography>
      <TextField label="Correo" fullWidth sx={{ mt: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Contraseña" type="password" fullWidth sx={{ mt: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleLogin}>
        Entrar
      </Button>
    </Container>
  );
}
