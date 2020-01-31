import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/products';
import { fetchUser } from '../../redux/user';
import { fetchCart } from '../../redux/cart';
import { fetchOrdersByUser } from '../../redux/ordersByUser'
import { LoginPage, SingleProduct, Cart, Home, Checkout, Navbar, SingleOrder, AllOrders, AccountInfo } from '../index';

class Root extends React.Component {

  async componentDidMount() {
    await this.props.fetchProducts();
    await this.props.fetchUser();
    await this.props.fetchOrders();
    await this.props.fetchCart();
  }

  render() {
    return (
      <>
        <HashRouter>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path='/login' component={LoginPage} />
            <Route path='/checkout' component={Checkout} />
            <Route path='/account' component={AccountInfo} />
            <Route exact path='/products/:id' component={SingleProduct} />
            <Route exact path='/orders' component={AllOrders} />
            <Route exact path='/orders/:id' component={SingleOrder} />
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
    fetchUser: () => dispatch(fetchUser()),
    fetchCart: () => dispatch(fetchCart()),
    fetchOrders: () => dispatch(fetchOrdersByUser())
  }
}

export default connect(mapState, mapDispatch)(Root)
