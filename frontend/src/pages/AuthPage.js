import React, { useState, useContext } from 'react';
import { Container, Card, CardContent, TextField, Button, Typography, ToggleButtonGroup, ToggleButton, CircularProgress, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ nombre: '', correo: '', contrasena: '', rol: 'usuario' });
  const [loading, setLoading] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) {
      setFormData({ ...formData, rol: newRole });
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      if (isLogin) {
        const res = await axios.post('http://localhost:3001/api/auth/login', {
          correo: formData.correo,
          contrasena: formData.contrasena,
        });
        const { token } = res.data;
        const decoded = JSON.parse(atob(token.split('.')[1]));
  
        login({ token, id: decoded.id, rol: decoded.rol }); 
  
        setSnackbarMessage('Inicio de sesión exitoso.');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
  
        setTimeout(() => {
          if (decoded.rol === 'admin') {
            navigate('/admin');
          } else if (decoded.rol === 'moderador') {
            navigate('/moderator');
          } else if (decoded.rol === 'autor') {
            navigate('/author');
          } else {
            navigate('/'); 
          }
        }, 1000);
  
      } else {
        await axios.post('http://localhost:3001/api/auth/register', formData);
        setSnackbarMessage('Registro exitoso. Ahora puedes iniciar sesión.');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setIsLogin(true);
      }
    } catch (err) {
      setSnackbarMessage(err.response?.data?.error || 'Error al procesar la solicitud');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container sx={{ mt: 5, textAlign: 'center', display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: 400, background: '#1e1e1e', p: 4, borderRadius: '20px', boxShadow: '0px 4px 20px rgba(0, 229, 255, 0.2)' }}>
        <CardContent>
          <Typography variant="h3" sx={{ color: '#00e5ff', mb: 3 }}>
            {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </Typography>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <TextField
                name="nombre"
                label="Nombre"
                fullWidth
                required
                sx={{ mb: 2 }}
                onChange={handleChange}
              />
            )}
            <TextField
              name="correo"
              label="Correo Electrónico"
              type="email"
              fullWidth
              required
              sx={{ mb: 2 }}
              onChange={handleChange}
            />
            <TextField
              name="contrasena"
              label="Contraseña"
              type="password"
              fullWidth
              required
              sx={{ mb: 2 }}
              onChange={handleChange}
            />

            {!isLogin && (
              <ToggleButtonGroup
                value={formData.rol}
                exclusive
                onChange={handleRoleChange}
                sx={{ mb: 2 }}
                fullWidth
              >
                <ToggleButton value="usuario">Usuario</ToggleButton>
                <ToggleButton value="autor">Autor</ToggleButton>
              </ToggleButtonGroup>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </Button>
          </form>

          <Button onClick={handleToggle} sx={{ mt: 2, color: '#00e5ff', textTransform: 'none' }}>
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </Button>
        </CardContent>
      </Card>

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert severity={snackbarSeverity} variant="filled" onClose={handleSnackbarClose}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AuthPage;
