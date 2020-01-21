import React from 'react';
import { HashRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import Cart from '../Cart'
import Home from '../Home'

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
