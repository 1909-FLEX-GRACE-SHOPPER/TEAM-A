import React from 'react';
import { HashRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import Cart from '../Cart'
import Home from '../Home'
import { testAuthPage, LoginPage } from '../index';

class Root extends React.Component {

  render() {
    return (
      <HashRouter>
        <Route exact path='/' component={Home} />
        <Route path='/cart' component={Cart} />
        <Route path ='/testauth' component ={testAuthPage} />
        <Route path ='/login' component={LoginPage} />
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
