// - image
// - title
// - price
// - description
// - quantity selector
// - add to cart (disabled if product is sold out)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../redux/singleProduct'
import { addCartItem } from '../redux/cart'

class SingleProduct extends Component {

  constructor() {
    super();
    this.state = {
      quantity: 1,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.setProduct(id)
  }

  handleChange(ev) {
    const { name, value } = ev.target;
    this.setState({ [name]: value })
  }

  render() {
    const { selectedProduct, addCartItem, user, cart } = this.props;
    return (
      <div>
        <h1>Image??</h1>
        <h2>Name: {selectedProduct.name}</h2>
        <h2>Price: ${selectedProduct.price}</h2>
        <h3>Description: {selectedProduct.description}</h3>
        <select name='quantity' onChange={this.handleChange}>
          {
            Array(11).fill('').map((el, idx) => <option key={idx}>{idx}</option>)
          }
        </select>
        <button
          onClick={() => addCartItem(cart.id, this.props.match.params.id, this.state.quantity)}
          disabled={selectedProduct.quantity === 0}
        >Add to cart</button>
      </div>
    )
  }
}

const mapState = ({ selectedProduct, user, cart }) => {
  return {
    selectedProduct,
    user,
    cart,
  }
}

const mapDispatch = dispatch => {
  return {
    setProduct: (productId) => dispatch(fetchProduct(productId)),
    addCartItem: (cartId, productId, quantity) => dispatch(addCartItem(cartId, productId, quantity))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)