import React, { useEffect, useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';

export default function Followers() {
  const [followers, setFollowers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      const response = await axios.get('http://localhost:3001/api/followers', {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setFollowers(response.data);
    };

    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:3001/api/users');
      setUsers(response.data);
    };

    fetchFollowers();
    fetchUsers();
  }, []);

  const handleFollow = async (seguido_id) => {
    await axios.post('http://localhost:3001/api/followers', { seguido_id }, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    alert('Ahora sigues a este usuario.');
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4">Mis Seguidores</Typography>
      <List>
        {followers.map((f) => (
          <ListItem key={f.id}>
            <ListItemText primary={`Usuario ${f.seguidor_id}`} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h4" sx={{ mt: 5 }}>Usuarios Disponibles</Typography>
      <List>
        {users.map((u) => (
          <ListItem key={u.id}>
            <ListItemText primary={u.nombre} />
            <Button variant="contained" color="primary" onClick={() => handleFollow(u.id)}>
              Seguir
            </Button>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
