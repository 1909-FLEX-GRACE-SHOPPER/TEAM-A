import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/products'
import { createGuestAndCart, fetchLogin } from '../../redux/user'
import { createCart, fetchCartByUserId } from '../../redux/cart'
import { testAuthPage, LoginPage, SingleProduct, Cart, Home, Checkout, Navbar, ProductsList, NewUserRegistration } from '../index';

class Root extends React.Component {

  componentDidMount() {
    this.props.fetchProducts();
    if (!this.props.user) {
      this.props.fetchLogin();
    }
  }

  render() {
    return (
      <>
        <HashRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path='/testauth' component={testAuthPage} />
            <Route path='/login' component={LoginPage} />
            <Route path='/signup' component={NewUserRegistration} />
            <Route path='/checkout' component={Checkout} />
            <Route exact path='/products/:id' component={SingleProduct} />
          </Switch>
        </HashRouter>
      </>
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
    fetchLogin: () => dispatch(fetchLogin()),
    createCart: (userId) => dispatch(createCart(userId)),
    fetchCartByUserId: (userId) => dispatch(fetchCartByUserId(userId))
  }
}

export default connect(mapState, mapDispatch)(Root)
