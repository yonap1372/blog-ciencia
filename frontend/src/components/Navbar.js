import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" sx={{ background: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontFamily: 'Orbitron' }}>
          Blog Ciencia
        </Typography>
        {user && <Button color="inherit" component={Link} to="/followers">Seguidores</Button>}
        {user && <Button color="inherit" component={Link} to="/socials">Redes Sociales</Button>}
        <Button color="inherit" component={Link} to="/">Inicio</Button>
        <Button color="inherit" component={Link} to="/articles">Artículos</Button>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/profile">Perfil</Button>
            <Button color="error" onClick={logout}>Cerrar Sesión</Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">Iniciar Sesión</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
