import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00e5ff' },
    secondary: { main: '#ff4081' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#ffffff', secondary: '#aaaaaa' },
  },
  typography: {
    fontFamily: 'Orbitron, Arial, sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 600, fontSize: '2rem' },
    body1: { fontSize: '1rem' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          textTransform: 'none',
          fontWeight: 'bold',
          transition: '0.3s',
          '&:hover': { boxShadow: '0px 0px 15px rgba(0, 229, 255, 0.5)' },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '15px',
          boxShadow: '0px 4px 20px rgba(0, 229, 255, 0.2)',
          background: 'linear-gradient(145deg, #1e1e1e, #2a2a2a)',
        },
      },
    },
  },
});

export default darkTheme;
