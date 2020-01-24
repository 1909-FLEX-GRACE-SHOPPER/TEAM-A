// - image
// - title
// - price
// - description
// - quantity selector
// - add to cart (disabled if product is sold out)

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct, clearProduct } from '../redux/singleProduct'
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
    const { selectedProduct, clearSelectedProduct, addCartItem, cart } = this.props;
    // TODO: add case for !selectedProduct (i.e. return "Requested product could not be found")
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
        <Link
          to='/'
          // TODO: clear selected product thunk
          onClick={() => clearSelectedProduct()}
        >Return to products</Link>
      </div>
    )
  }
}

const mapState = ({ selectedProduct, cart }) => {
  return {
    selectedProduct,
    cart,
  }
}

const mapDispatch = dispatch => {
  return {
    setProduct: (productId) => dispatch(fetchProduct(productId)),
    clearSelectedProduct: () => dispatch(clearProduct()),
    addCartItem: (cartId, productId, quantity) => dispatch(addCartItem(cartId, productId, quantity))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)