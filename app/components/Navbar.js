import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { isWithinInterval } from 'date-fns';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    background: '#EEF4ED',
    color: '#13315C',
  },
  home: {
    flexGrow: 1,
    textAlign: 'left'
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar(props) {
  const user = useSelector(state => state.user);
  const cartItemsLength = useSelector(state => {
    if (state.cart.cartitems) {
      return state.cart.cartitems.length
    }
  })
  const [loggedIn, setLoggedIn] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
    }
  });

  const handleClick = (path) => {
    props.history.push(`/${path}`);
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <Button className={classes.home} className={classes.title} edge='start' id='home' color="inherit" onClick={() => handleClick('')}>Dead Bits R Us</Button>
        <Button color="inherit" onClick={() => handleClick('cart')}><ShoppingCartIcon /> ({cartItemsLength ? cartItemsLength : 0})</Button>
        <Button edge="end" color="inherit" onClick={() => handleClick(user ? 'account' : 'login')}>
          {user ? `Welcome, ${user.firstName}` : 'Log In'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};


export default withRouter(Navbar);
