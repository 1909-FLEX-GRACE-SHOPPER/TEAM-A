import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/products'
import { createGuestAndCart } from '../../redux/user'
import { testAuthPage, LoginPage, SingleProduct, Cart, Home, Checkout } from '../index';
import Navbar from './navbar';

class Root extends React.Component {
 
  componentDidMount() {
    this.props.fetchProducts();
    if (!this.props.user) {
      this.props.createGuestAndCart();
    }
  }
  render() {
    return (
      <React.Fragment>
        <HashRouter>
        <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path='/testauth' component={testAuthPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/checkout' component={Checkout} />
            <Route exact path='/products/:id' component={SingleProduct} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

const mapState = ({ cart, user }) => {
  return {
    cart,
    user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    createGuestAndCart: () => dispatch(createGuestAndCart()),
  }
}

export default connect(mapState, mapDispatch)(Root)
