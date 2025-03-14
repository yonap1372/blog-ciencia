import React from 'react';
import { Container, Typography, Button, Grid, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <Container sx={{ textAlign: 'center', mt: 5 }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h1" sx={{ color: '#00e5ff', mb: 2 }}>
          Blog Ciencia
        </Typography>
        <Typography variant="h5" sx={{ color: '#ffffff', mb: 4 }}>
          Explora los últimos avances científicos en un entorno futurista.
        </Typography>
        <Button variant="contained" color="primary" size="large" component={Link} to="/articles">
          Explorar Artículos
        </Button>
      </motion.div>

      <Grid container spacing={3} sx={{ mt: 5 }}>
        {[1, 2, 3].map((index) => (
          <Grid item xs={12} sm={4} key={index}>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">Artículo {index}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Breve descripción del artículo.
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home;
