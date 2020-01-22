import React from 'react';
import Cart from '../Cart'

import { AppBar, Tabs, Tab } from '@material-ui/core';

class Navbar extends React.Component {
  render() {
    return (
      <AppBar title="My App">
        <Tabs>
          <Tab label='Home' />
          <Tab label="Cart" />
          <Tab label="Log In" />
        </Tabs>
      </AppBar>
    );
  }
}

// const Navbar = () => {
//   return <h3>this is navbar need cart and login</h3>;
// };

export default Navbar;
