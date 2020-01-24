import React from 'react';
import Cart from '../Cart';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Navbar extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Button color="inherit">StoreName/Home</Button>
          <Button color="inherit">Login</Button>
          <Button color="inherit">Cart</Button>
        </Toolbar>
      </AppBar>
    );
  }
}

// const Navbar = () => {
//   return <h3>this is navbar need cart and login</h3>;
// };

export default Navbar;
