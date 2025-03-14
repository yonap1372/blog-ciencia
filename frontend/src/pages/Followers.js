import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, List, ListItem, ListItemText, CircularProgress, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Followers = () => {
  const { user } = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/api/follows/followers/${user.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      }).then(response => {
        setFollowers(response.data);
      }).catch(error => console.error("Error al obtener seguidores:", error));

      axios.get(`http://localhost:3001/api/follows/following/${user.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      }).then(response => {
        setFollowing(response.data);
        setLoading(false);
      }).catch(error => console.error("Error al obtener seguidos:", error));
    }
  }, [user]);

  const handleUnfollow = (id) => {
    axios.delete(`http://localhost:3001/api/follows/unfollow`, {
      headers: { Authorization: `Bearer ${user.token}` },
      data: { seguido_id: id }
    })
    .then(() => {
      setFollowing(following.filter(f => f.id !== id));
    })
    .catch(error => console.error("Error al dejar de seguir:", error));
  };

  return (
    <Container sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ color: '#00e5ff', mb: 3 }}>
        Seguidores
      </Typography>

      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <>
          <Typography variant="h4" sx={{ color: '#00e5ff', mt: 3 }}>
            Personas que te siguen
          </Typography>
          <List sx={{ width: '100%', bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
            {followers.length === 0 ? (
              <Typography variant="h6" sx={{ color: '#aaaaaa' }}>Aún no tienes seguidores.</Typography>
            ) : (
              followers.map(follower => (
                <ListItem key={follower.id}>
                  <ListItemText 
                    primary={follower.nombre} 
                    secondary={follower.correo} 
                    sx={{ color: '#ffffff' }} 
                  />
                </ListItem>
              ))
            )}
          </List>

          <Typography variant="h4" sx={{ color: '#00e5ff', mt: 3 }}>
            Personas a las que sigues
          </Typography>
          <List sx={{ width: '100%', bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
            {following.length === 0 ? (
              <Typography variant="h6" sx={{ color: '#aaaaaa' }}>Aún no sigues a nadie.</Typography>
            ) : (
              following.map(follow => (
                <ListItem key={follow.id}>
                  <ListItemText 
                    primary={follow.nombre} 
                    secondary={follow.correo} 
                    sx={{ color: '#ffffff' }} 
                  />
                  <Button variant="outlined" color="error" onClick={() => handleUnfollow(follow.id)}>
                    Dejar de seguir
                  </Button>
                </ListItem>
              ))
            )}
          </List>
        </>
      )}
    </Container>
  );
};

export default Followers;
