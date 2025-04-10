import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e1e1e', boxShadow: '0px 4px 20px rgba(0, 229, 255, 0.2)' }}>
      <Toolbar>
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer', color: '#00e5ff' }}
          onClick={() => navigate('/')}
        >
          Blog Ciencia
        </Typography>

        {!user ? (
          <Button color="inherit" onClick={handleLogin} sx={{ textTransform: 'none', color: '#00e5ff' }}>
            Iniciar Sesión
          </Button>
        ) : (
          <Box>
            <Button 
              color="inherit" 
              onClick={handleProfile} 
              sx={{ textTransform: 'none', color: '#00e5ff', mr: 2 }}
            >
              Perfil
            </Button>

            <Button 
              color="inherit" 
              onClick={handleLogout} 
              sx={{ textTransform: 'none', color: '#00e5ff' }}
            >
              Cerrar Sesión
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
