import React from 'react';
import { HashRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/products'
import { createGuestAndCart } from '../../redux/oldUser'
import Cart from '../Cart'
import Home from '../Home'
import { testAuthPage, LoginPage, SingleProduct, Cart } from '../index';

class Root extends React.Component {

  componentDidMount() {
    this.props.fetchProducts()
    this.props.createGuestAndCart()
  }

  render() {
    return (
      <HashRouter>
        <Route exact path='/' component={Home} />
        <Route path='/cart' component={Cart} />
        <Route path='/testauth' component={testAuthPage} />
        <Route path='/login' component={LoginPage} />
        <Route exact path='/products/:id' component={SingleProduct} />
      </HashRouter>
    )
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
