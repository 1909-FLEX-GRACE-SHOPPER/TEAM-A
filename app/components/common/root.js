import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Cart from '../Cart';
import Home from '../Home';

// todo:
// import thunk to fetch products
// give fetch products to mapDispatchToProps
// run fetch products in componentdidmount

//thunks
import { fetchProducts } from '../../redux/products';

//redux
//import store from '.../store';
//import fetchProducts from '.../redux/products';

//Components
import Navbar from './navbar';
import ProductsList from './productsList';

class Root extends React.Component {
 
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    console.log('****This.props****', this.props);
    return (
      <React.Fragment>
        <Navbar />
        <HashRouter>
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={Cart} />
        </HashRouter>
      </React.Fragment>
    );
  }
}

const mapState = ({ cart }) => {
  return {
    cart
  };
};

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => {
      dispatch(fetchProducts());
    }
  };
};

export default connect(mapState, mapDispatch)(Root);
