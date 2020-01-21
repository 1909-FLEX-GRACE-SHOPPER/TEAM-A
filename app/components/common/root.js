import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

//redux
//import {store} from '.../store';
//import fetchProducts from '.../redux/products';

//Components
import Navbar from './navbar';
import ProductList from './productsList';

class Root extends React.Component {
  
  render() {
    
    return (
      <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={ProductList}></Route>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default Root;
