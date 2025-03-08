import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, TextField, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await axios.get(`http://localhost:3001/api/articles/${id}`);
      setArticle(response.data);
    };

    const fetchComments = async () => {
      const response = await axios.get(`http://localhost:3001/api/comments/${id}`);
      setComments(response.data);
    };

    fetchArticle();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async () => {
    await axios.post('http://localhost:3001/api/comments', {
      contenido: comment,
      articulo_id: id
    }, {
      headers: { Authorization: localStorage.getItem('token') }
    });
    setComment('');
    const response = await axios.get(`http://localhost:3001/api/comments/${id}`);
    setComments(response.data);
  };

  if (!article) return <Typography>Cargando...</Typography>;

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3">{article.titulo}</Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>{article.contenido}</Typography>
      <Typography variant="h6" sx={{ mt: 4 }}>Comentarios:</Typography>
      <List>
        {comments.map((c) => (
          <ListItem key={c.id}>
            <ListItemText primary={c.contenido} secondary={`Usuario ID: ${c.usuario_id}`} />
          </ListItem>
        ))}
      </List>
      <TextField label="Escribe un comentario" fullWidth sx={{ mt: 2 }} value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleCommentSubmit}>Enviar</Button>
    </Container>
  );
}
