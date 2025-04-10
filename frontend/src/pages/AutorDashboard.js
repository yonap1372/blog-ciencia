import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Tabs, Tab, Card, CardContent, Button, TextField, Modal, Rating, CircularProgress } from '@mui/material';
import axios from 'axios';

const AutorDashboard = () => {
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState(null);
  const [myArticles, setMyArticles] = useState([]);
  const [exploreArticles, setExploreArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem('user'))?.token;

  useEffect(() => {
    if (token) {
      fetchUser();
      fetchExploreArticles();
    }
  }, [token]);

  useEffect(() => {
    if (user?.nombre) {
      fetchMyArticles();
    }
  }, [user]);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    } catch (err) {
      console.error('Error al obtener usuario:', err);
    }
  };

  const fetchMyArticles = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/articles');
      const myArticlesFiltered = res.data.filter(article => article.autor === user?.nombre);
      setMyArticles(myArticlesFiltered);
    } catch (err) {
      console.error('Error al obtener artículos:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchExploreArticles = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/articles');
      setExploreArticles(res.data);
    } catch (err) {
      console.error('Error al explorar artículos:', err);
    }
  };

  const handleTabChange = (e, newValue) => {
    setTab(newValue);
  };

  const handleOpenModal = async (article) => {
    setSelectedArticle(article);
    try {
      const res = await axios.get(`http://localhost:3001/api/comments/${article.id}`);
      setComments(res.data);
      setOpenModal(true);
    } catch (err) {
      console.error('Error al cargar comentarios:', err);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedArticle(null);
    setComments([]);
    setNewComment('');
    setNewRating(0);
  };

  const handleAddComment = async () => {
    if (newComment.trim() === '') return;
    try {
      await axios.post(`http://localhost:3001/api/comments/${selectedArticle.id}`, {
        contenido: newComment
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const res = await axios.get(`http://localhost:3001/api/comments/${selectedArticle.id}`);
      setComments(res.data);
      setNewComment('');
    } catch (err) {
      console.error('Error al agregar comentario:', err);
    }
  };

  const handleRateArticle = async () => {
    if (newRating === 0) return;
    try {
      await axios.post(`http://localhost:3001/api/ratings/${selectedArticle.id}`, {
        puntuacion: newRating
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error('Error al calificar artículo:', err);
    }
  };

  return (
    <Container sx={{ mt: 3, display: 'flex' }}>
      {/* Barra lateral */}
      <Box sx={{ width: '250px', bgcolor: '#1e1e1e', p: 2, borderRadius: 3, boxShadow: 3, height: 'fit-content' }}>
        <Typography variant="h5" sx={{ color: '#00e5ff', mb: 2 }}>
          {user?.nombre}
        </Typography>
        <Typography variant="body2" sx={{ color: '#ccc', mb: 4 }}>
          {user?.correo}
        </Typography>

        <Tabs
          orientation="vertical"
          value={tab}
          onChange={handleTabChange}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Mis Artículos" />
          <Tab label="Crear Artículo" />
          <Tab label="Explorar Artículos" />
        </Tabs>
      </Box>

      {/* Contenido principal */}
      <Box sx={{ flexGrow: 1, ml: 4 }}>
        {tab === 0 && (
          <>
            <Typography variant="h4" sx={{ color: '#00e5ff', mb: 3 }}>
              Mis Artículos
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              myArticles.map((article) => (
                <Card key={article.id} sx={{ mb: 2, background: '#2c2c2c', color: '#fff' }}>
                  <CardContent>
                    <Typography variant="h6">{article.titulo}</Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>{article.resumen}</Typography>
                    <Typography variant="caption" sx={{ mt: 1, display: 'block' }}>
                      Publicado: {new Date(article.fecha_publicacion).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              ))
            )}
          </>
        )}

        {tab === 1 && (
          <>
            <Typography variant="h4" sx={{ color: '#00e5ff', mb: 3 }}>
              Crear Artículo
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => window.location.href = '/crear-articulo'}
            >
              Crear Nuevo Artículo
            </Button>
          </>
        )}

        {tab === 2 && (
          <>
            <Typography variant="h4" sx={{ color: '#00e5ff', mb: 3 }}>
              Explorar Artículos
            </Typography>
            {exploreArticles.map((article) => (
              <Card key={article.id} sx={{ mb: 2, background: '#2c2c2c', color: '#fff' }}>
                <CardContent>
                  <Typography variant="h6">{article.titulo}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>{article.resumen}</Typography>
                  <Button
                    variant="outlined"
                    sx={{ mt: 2, color: '#00e5ff', borderColor: '#00e5ff' }}
                    onClick={() => handleOpenModal(article)}
                  >
                    Ver Detalles
                  </Button>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </Box>

      {/* Modal de detalles */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', width: 400,
          bgcolor: '#1e1e1e', color: '#fff', p: 4, borderRadius: 3, boxShadow: 24
        }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            {selectedArticle?.titulo}
          </Typography>

          <Box sx={{ mb: 2 }}>
            {comments.map((comment) => (
              <Typography key={comment.id} variant="body2" sx={{ mb: 1 }}>
                - {comment.contenido}
              </Typography>
            ))}
          </Box>

          <TextField
            label="Escribe un comentario"
            fullWidth
            sx={{ mb: 2 }}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button fullWidth variant="contained" color="primary" onClick={handleAddComment}>
            Agregar Comentario
          </Button>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="subtitle1">Calificar este artículo</Typography>
            <Rating
              value={newRating}
              onChange={(e, newValue) => setNewRating(newValue)}
              size="large"
              sx={{ mt: 1 }}
            />
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2, color: '#00e5ff', borderColor: '#00e5ff' }}
              onClick={handleRateArticle}
            >
              Enviar Calificación
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default AutorDashboard;
