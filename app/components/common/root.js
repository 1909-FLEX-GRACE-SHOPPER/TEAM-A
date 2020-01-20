import React from 'react';
import Navbar from './navbar';
import ProductList from './productsList';

class Root extends React.Component {
  render() {
    return (
      <React.Fragment>
        Content Goes Here
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList}></Route>
        </Switch>
      </React.Fragment>
    );
  }
}

export default Root;
