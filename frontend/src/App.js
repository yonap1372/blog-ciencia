import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import darkTheme from './theme';
import NavBar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import AuthPage from './pages/AuthPage';
import Favorites from './pages/Favorites';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Followers from './pages/Followers';
import ArticlesList from './pages/ArticlesList';
import Article from './pages/Article';
import AdminDashboard from './pages/AdminDashboard';
import ModeratorDashboard from './pages/ModeradorDashboard';
import AuthorDashboard from './pages/AutorDashboard';
import CrearArticulo from './pages/CrearArticulo';

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/articles" element={<ArticlesList />} />
            <Route path="/article/:id" element={<Article />} />

            <Route 
              path="/favorites" 
              element={
                <ProtectedRoute allowedRoles={['usuario', 'autor', 'moderador', 'admin']}>
                  <Favorites />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute allowedRoles={['usuario', 'autor', 'moderador', 'admin']}>
                  <Notifications />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute allowedRoles={['usuario', 'autor', 'moderador', 'admin']}>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/followers" 
              element={
                <ProtectedRoute allowedRoles={['usuario', 'autor', 'moderador', 'admin']}>
                  <Followers />
                </ProtectedRoute>
              } 
            />

            {/* Dashboards separados por rol */}
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/moderator" 
              element={
                <ProtectedRoute allowedRoles={['moderador']}>
                  <ModeratorDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/author" 
              element={
                <ProtectedRoute allowedRoles={['autor']}>
                  <AuthorDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Crear artículo accesible para autores y admin */}
            <Route 
              path="/crear-articulo" 
              element={
                <ProtectedRoute allowedRoles={['autor', 'admin']}>
                  <CrearArticulo />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
