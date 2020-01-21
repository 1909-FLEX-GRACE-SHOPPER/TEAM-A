import React from 'react';
import { HashRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux';
import Cart from '../Cart'

class Root extends React.Component {

  render() {
    return (
      <HashRouter>
        <Route path='/' component={Cart} />
      </HashRouter>
      // <div>
      //   Hello World again and again, from compiled React!
      // </div>
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
