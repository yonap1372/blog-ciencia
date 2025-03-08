import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import Usuarios from './pages/Usuarios';
import Articulos from './pages/Articulos';
import Noticias from './pages/Noticias';
import Navbar from './components/Navbar';
import Login from './pages/Login';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/usuarios" component={Usuarios} />
          <PrivateRoute path="/articulos" component={Articulos} />
          <PrivateRoute path="/noticias" component={Noticias} />
          <Route path="/" exact>
            <h1>Bienvenido al Blog de Ciencia</h1>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;