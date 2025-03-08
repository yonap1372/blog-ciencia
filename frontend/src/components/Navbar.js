import React from 'react';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Blog de Ciencia
        </Typography>
        <Button color="inherit" component={Link} to="/usuarios">Usuarios</Button>
        <Button color="inherit" component={Link} to="/articulos">Artículos</Button>
        <Button color="inherit" component={Link} to="/noticias">Noticias</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
