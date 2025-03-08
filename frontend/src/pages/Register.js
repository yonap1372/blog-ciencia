import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3001/api/auth/register', {
        nombre: name,
        correo: email,
        contrasena: password
      });
      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      navigate('/login');
    } catch (error) {
      alert('Error al registrar usuario');
    }
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Registro</Typography>
      <TextField label="Nombre" fullWidth sx={{ mt: 2 }} value={name} onChange={(e) => setName(e.target.value)} />
      <TextField label="Correo" fullWidth sx={{ mt: 2 }} value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Contraseña" type="password" fullWidth sx={{ mt: 2 }} value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleRegister}>
        Registrarse
      </Button>
    </Container>
  );
}
