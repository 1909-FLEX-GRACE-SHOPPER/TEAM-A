import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ProductsList } from './index';

const theme = createMuiTheme({
  palette: {
    primary:{
      main: '#0B2545',
    },
    secondary: {
      main: '#9FD8CB',
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true, 
    },
  },
  transitions: {
    // So we have `transition: none;` everywhere
    create: () => 'none',
  },
  typography: {
    //fontFamily:[ "-apple - system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans- serif", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"].join(",")
    fontFamily: 'Poppins'
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': 'Poppins',
      },
    },
  },
  contrastThreshold: 3,
});


export default function () {
  return (
    <>
    <ThemeProvider theme = {theme}>
        <CssBaseline />
      <ProductsList />
    </ThemeProvider>
    </>
  );
}
