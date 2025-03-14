import React, { useEffect, useState, useContext } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, CircularProgress } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [articulos, setArticulos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.rol === "admin") {
      axios.get("http://localhost:3001/api/admin/usuarios", {
        headers: { Authorization: `Bearer ${user.token}` },
      }).then(response => setUsuarios(response.data))
        .catch(error => console.error("Error al obtener usuarios:", error));

      axios.get("http://localhost:3001/api/admin/articulos", {
        headers: { Authorization: `Bearer ${user.token}` },
      }).then(response => {
        setArticulos(response.data);
        setLoading(false);
      }).catch(error => console.error("Error al obtener artículos:", error));
    }
  }, [user]);

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:3001/api/admin/usuarios/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    }).then(() => {
      setUsuarios(usuarios.filter(u => u.id !== id));
    }).catch(error => console.error("Error al eliminar usuario:", error));
  };

  const handleDeleteArticle = (id) => {
    axios.delete(`http://localhost:3001/api/admin/articulos/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    }).then(() => {
      setArticulos(articulos.filter(a => a.id !== id));
    }).catch(error => console.error("Error al eliminar artículo:", error));
  };

  return (
    <Container sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h2" sx={{ color: '#00e5ff', mb: 3 }}>
        Panel de Administración
      </Typography>

      {loading ? (
        <CircularProgress color="primary" />
      ) : (
        <>
          <Typography variant="h4" sx={{ color: '#00e5ff', mt: 3 }}>Gestión de Usuarios</Typography>
          <TableContainer component={Paper} sx={{ mt: 2, background: 'rgba(255,255,255,0.1)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#00e5ff' }}>Nombre</TableCell>
                  <TableCell sx={{ color: '#00e5ff' }}>Correo</TableCell>
                  <TableCell sx={{ color: '#00e5ff' }}>Rol</TableCell>
                  <TableCell sx={{ color: '#00e5ff' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.map(usuario => (
                  <TableRow key={usuario.id}>
                    <TableCell sx={{ color: '#ffffff' }}>{usuario.nombre}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{usuario.correo}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{usuario.rol}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="error" onClick={() => handleDeleteUser(usuario.id)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h4" sx={{ color: '#00e5ff', mt: 3 }}>Gestión de Artículos</Typography>
          <TableContainer component={Paper} sx={{ mt: 2, background: 'rgba(255,255,255,0.1)' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: '#00e5ff' }}>Título</TableCell>
                  <TableCell sx={{ color: '#00e5ff' }}>Autor</TableCell>
                  <TableCell sx={{ color: '#00e5ff' }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {articulos.map(articulo => (
                  <TableRow key={articulo.id}>
                    <TableCell sx={{ color: '#ffffff' }}>{articulo.titulo}</TableCell>
                    <TableCell sx={{ color: '#ffffff' }}>{articulo.autor}</TableCell>
                    <TableCell>
                      <Button variant="outlined" color="error" onClick={() => handleDeleteArticle(articulo.id)}>
                        Eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;
