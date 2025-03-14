import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({ nombre: '', correo: '', contrasena: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios.post("http://localhost:3001/api/auth/register", userData)
      .then(() => {
        setLoading(false);
        navigate('/login');
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response?.data?.error || "Error al registrar usuario");
      });
  };

  return (
    <Container sx={{ mt: 5, textAlign: 'center' }}>
      <Card sx={{ background: '#1e1e1e', boxShadow: '0px 4px 20px rgba(0, 229, 255, 0.2)', borderRadius: '15px', p: 3 }}>
        <CardContent>
          <Typography variant="h3" sx={{ color: '#00e5ff', mb: 2 }}>Registro</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleSubmit}>
            <TextField name="nombre" label="Nombre" fullWidth required sx={{ mb: 2 }} onChange={handleChange} />
            <TextField name="correo" label="Correo" type="email" fullWidth required sx={{ mb: 2 }} onChange={handleChange} />
            <TextField name="contrasena" label="Contraseña" type="password" fullWidth required sx={{ mb: 2 }} onChange={handleChange} />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : "Registrarse"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Register;
