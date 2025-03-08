import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/login', { correo, contrasena })
      .then(response => {
        console.log('Login exitoso:', response.data);
        // Guardar token JWT en localStorage y redirigir
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
      });
  };

  return (
    <Container>
      <Typography variant="h4">Iniciar sesión</Typography>
      <form onSubmit={handleSubmit}>
        <TextField 
          label="Correo" 
          variant="outlined" 
          fullWidth 
          value={correo} 
          onChange={(e) => setCorreo(e.target.value)} 
          margin="normal" 
        />
        <TextField 
          label="Contraseña" 
          type="password" 
          variant="outlined" 
          fullWidth 
          value={contrasena} 
          onChange={(e) => setContrasena(e.target.value)} 
          margin="normal" 
        />
        <Button type="submit" variant="contained" color="primary">Iniciar sesión</Button>
      </form>
    </Container>
  );
};

export default Login;
