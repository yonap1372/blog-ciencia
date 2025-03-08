import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get('http://localhost:3001/api/notifications', {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setNotifications(response.data);
    };
    fetchNotifications();
  }, []);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Notificaciones</Typography>
      <List>
        {notifications.map((notif) => (
          <ListItem key={notif.id}>
            <ListItemText primary={notif.mensaje} secondary={notif.fecha} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
