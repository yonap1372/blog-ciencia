import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, TextField, Button, Card, CardContent, Grid, CircularProgress } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({ nombre: '', correo: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      axios.get("http://localhost:3001/api/users/me", { headers: { Authorization: `Bearer ${user.token}` } })
        .then(response => {
          setProfileData(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error al cargar el perfil:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    axios.put("http://localhost:3001/api/users/update", profileData, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(() => setMessage("Perfil actualizado correctamente"))
      .catch(error => setMessage(error.response?.data?.error || "Error al actualizar perfil"));
  };

  const handleDeleteAccount = () => {
    axios.delete("http://localhost:3001/api/users/delete", { headers: { Authorization: `Bearer ${user.token}` } })
      .then(() => {
        logout();
        window.location.href = "/";
      })
      .catch(error => setMessage(error.response?.data?.error || "Error al eliminar cuenta"));
  };

  return (
    <Container sx={{ mt: 5 }}>
      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <Card sx={{ background: '#1e1e1e', boxShadow: '0px 4px 20px rgba(0, 229, 255, 0.2)', borderRadius: '15px', p: 3 }}>
          <CardContent>
            <Typography variant="h3" sx={{ color: '#00e5ff', mb: 2 }}>Perfil de Usuario</Typography>
            {message && <Typography color="primary">{message}</Typography>}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField name="nombre" label="Nombre" fullWidth value={profileData.nombre} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="correo" label="Correo Electrónico" fullWidth disabled value={profileData.correo} />
              </Grid>
            </Grid>
            <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleUpdate}>
              Guardar Cambios
            </Button>
            <Button variant="outlined" color="error" sx={{ mt: 2, ml: 2 }} onClick={handleDeleteAccount}>
              Eliminar Cuenta
            </Button>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Profile;
