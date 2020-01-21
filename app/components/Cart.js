import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../redux/cart'

class Cart extends React.Component {

  componentDidMount() {
    this.props.fetchCart(1)
  }

  render() {
    return (
      <div>
        <h2>Cart items:</h2>
        <Fragment>
          {
            this.props.cart.id ?
              (
                <ul>
                  {
                    this.props.cart.cartitems.map(cartItem => {
                      return (
                        <li key={cartItem.id}>id: {cartItem.id} productId: {cartItem.productId} created at: {cartItem.createdAt} </li>
                      )
                    })
                  }
                </ul>
              ) : (
                <h3>Loading...</h3>
              )
          }
        </Fragment>
      </div>
    )
  }

}

const mapState = ({ cart }) => {
  return {
    cart,
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: (cartId) => dispatch(fetchCart(cartId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
