import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Notifications = () => {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.get("http://localhost:3001/api/notifications", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then(response => {
        setNotifications(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error al obtener notificaciones:", error);
        setLoading(false);
      });
    }
  }, [user]);

  const handleMarkAsRead = (id) => {
    axios.put(`http://localhost:3001/api/notifications/${id}/read`, {}, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
    .then(() => {
      setNotifications(notifications.map(notif => notif.id === id ? { ...notif, leido: true } : notif));
    })
    .catch(error => console.error("Error al marcar como leído:", error));
  };

  return (
    <Container sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ color: '#00e5ff', mb: 3 }}>
        Notificaciones
      </Typography>

      {loading ? (
        <CircularProgress color="primary" />
      ) : notifications.length === 0 ? (
        <Typography variant="h6" sx={{ color: '#aaaaaa' }}>No tienes notificaciones.</Typography>
      ) : (
        <List sx={{ width: '100%', bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
          {notifications.map(notif => (
            <ListItem key={notif.id} sx={{ borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
              <ListItemText 
                primary={notif.mensaje} 
                secondary={`Fecha: ${new Date(notif.fecha).toLocaleDateString()}`} 
                sx={{ color: notif.leido ? '#aaaaaa' : '#ffffff' }} 
              />
              {!notif.leido && (
                <Button variant="contained" color="primary" size="small" onClick={() => handleMarkAsRead(notif.id)}>
                  Marcar como leído
                </Button>
              )}
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Notifications;
