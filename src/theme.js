import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#1FD1A2', contrastText: '#06110D' },
    secondary: { main: '#5B8DEF' },
    background: {
      default: '#0A1420',
      paper: '#0F1D2E',
    },
    text: {
      primary: '#EAF2F5',
      secondary: '#9FB3C0',
    },
    divider: 'rgba(255,255,255,0.08)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Montserrat", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Montserrat", sans-serif', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8 },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: '1px solid rgba(255,255,255,0.08)',
        },
      },
    },
  },
})

export default theme
