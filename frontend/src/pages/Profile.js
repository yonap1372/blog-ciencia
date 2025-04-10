import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, CircularProgress } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({ nombre: '', correo: '', rol: '' });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  useEffect(() => {
    if (user) {
      axios.get('http://localhost:3001/api/auth/profile', {
        headers: { Authorization: `Bearer ${user.token}` }
      })
      .then(response => {
        setProfileData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al cargar el perfil:', error);
        setLoading(false);
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put('http://localhost:3001/api/auth/profile', {
      nombre: profileData.nombre,
      correo: profileData.correo
    }, {
      headers: { Authorization: `Bearer ${user.token}` }
    })
    .then(() => {
      setMessage('Perfil actualizado exitosamente');
      setSeverity('success');
      setOpen(true);
    })
    .catch(error => {
      setMessage(error.response?.data?.error || 'Error al actualizar perfil');
      setSeverity('error');
      setOpen(true);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Container sx={{ mt: 5 }}>
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <Card sx={{ background: '#1e1e1e', p: 4, borderRadius: '20px', boxShadow: '0px 4px 20px rgba(0, 229, 255, 0.2)' }}>
          <CardContent>
            <Typography variant="h3" sx={{ color: '#00e5ff', mb: 3 }}>
              Mi Perfil
            </Typography>

            <TextField
              name="nombre"
              label="Nombre"
              fullWidth
              sx={{ mb: 2 }}
              value={profileData.nombre}
              onChange={handleChange}
            />

            <TextField
              name="correo"
              label="Correo Electrónico"
              type="email"
              fullWidth
              sx={{ mb: 2 }}
              value={profileData.correo}
              onChange={handleChange}
            />

            <TextField
              name="rol"
              label="Rol"
              fullWidth
              sx={{ mb: 2 }}
              value={profileData.rol}
              disabled
            />

            <Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>
              Guardar Cambios
            </Button>
          </CardContent>
        </Card>
      )}

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Profile;
