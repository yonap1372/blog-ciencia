import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, TextField, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Socials = () => {
  const { user } = useContext(AuthContext);
  const [socials, setSocials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newSocial, setNewSocial] = useState({ plataforma: '', enlace: '' });

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/api/socials/${user.id}`)
        .then(response => {
          setSocials(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error al obtener redes sociales:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleAddSocial = () => {
    axios.post("http://localhost:3001/api/socials", newSocial, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then(response => {
      setSocials([...socials, response.data.social]);
      setNewSocial({ plataforma: '', enlace: '' });
    })
    .catch(error => console.error("Error al agregar red social:", error));
  };

  const handleDeleteSocial = (id) => {
    axios.delete(`http://localhost:3001/api/socials/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then(() => {
      setSocials(socials.filter(s => s.id !== id));
    })
    .catch(error => console.error("Error al eliminar red social:", error));
  };

  return (
    <Container sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ color: '#00e5ff', mb: 3 }}>
        Mis Redes Sociales
      </Typography>

      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <List sx={{ width: '100%', bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
          {socials.map(social => (
            <ListItem key={social.id} sx={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
              <ListItemText 
                primary={social.plataforma} 
                secondary={social.enlace} 
                sx={{ color: '#ffffff' }} 
              />
              <Button variant="outlined" color="error" onClick={() => handleDeleteSocial(social.id)}>
                Eliminar
              </Button>
            </ListItem>
          ))}
        </List>
      )}

      <Typography variant="h5" sx={{ color: '#00e5ff', mt: 3 }}>
        Agregar Nueva Red Social
      </Typography>
      <TextField 
        label="Plataforma" 
        fullWidth 
        sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }} 
        value={newSocial.plataforma} 
        onChange={(e) => setNewSocial({ ...newSocial, plataforma: e.target.value })} 
      />
      <TextField 
        label="Enlace" 
        fullWidth 
        sx={{ mb: 2, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }} 
        value={newSocial.enlace} 
        onChange={(e) => setNewSocial({ ...newSocial, enlace: e.target.value })} 
      />
      <Button variant="contained" color="primary" onClick={handleAddSocial}>
        Agregar
      </Button>
    </Container>
  );
};

export default Socials;
