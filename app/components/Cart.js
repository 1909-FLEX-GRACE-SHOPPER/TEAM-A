import React from 'react';
import store from './app/store.js';

class Cart extends React.Component {
  constructor(props) {
    super();
    this.state = store.getState()
  }

  componentWillUnmount() {

  }

  componentDidMount() {

  }

  render() {
      return ()
    
}
}

export default Cart