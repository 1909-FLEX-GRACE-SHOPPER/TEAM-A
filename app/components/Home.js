import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { ProductsList } from './index';

const theme = createMuiTheme({
  palette: {
    primary:{
      main: '#0B2545',
    }
  },
  typography: {
    fontFamily: "Nunito Sans, Roboto, sans-serif",
  },
  props: {
    MuiButtonBase: {
      disableRipple: true, 
    },
    MuiToolbar:{
      disableRipple: true, 
    }
  },
  contrastThreshold: 3,

});


export default function () {
  return (
    <>
    <ThemeProvider theme = {theme}>
      <ProductsList />
    </ThemeProvider>
    </>
  );
}
