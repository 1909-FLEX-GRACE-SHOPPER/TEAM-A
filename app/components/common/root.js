import React from 'react';
import { HashRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import Cart from '../Cart'
import Home from '../Home'

//redux
//import {store} from '.../store';
//import fetchProducts from '.../redux/products';

//Components
import Navbar from './navbar';
import ProductList from './productsList';

class Root extends React.Component {
  
  render() {
    
    return (
      <HashRouter>
        <Route exact path='/' component={Home} />
        <Route path='/cart' component={Cart} />
      </HashRouter>
    )
  }
}

const mapState = ({ cart }) => {
  return {
    cart,
  }
}

// const mapDispatch = dispatch => {

// }

export default connect(mapState)(Root)
