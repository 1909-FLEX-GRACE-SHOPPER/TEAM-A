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

//Material UI
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Rating from '@material-ui/lab/Rating';

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
    const { selectedProduct, clearSelectedProduct, addCartItem, cart, user } = this.props;
    const { reviews } = selectedProduct
    console.log('reviews: ', reviews)
    // TODO: add case for !selectedProduct (i.e. return "Requested product could not be found")
    if (!reviews) {
      return (
        <div>Loading...</div>
      )
    }

    return (
      <div>
        <img src={selectedProduct.imageUrl} width="400" height="400" />
        <h1>{selectedProduct.name}</h1>
        <h3>{selectedProduct.description}</h3>
        <p>Price: ${selectedProduct.price}</p>
        <select name='quantity' onChange={this.handleChange}>
          {
            Array(10).fill('').map((el, idx) => <option key={idx}>{idx + 1}</option>)
          }
        </select>
        <Button
          variant="contained"
          color="primary"
          onClick={() => addCartItem(cart.id, this.props.match.params.id, this.state.quantity)}
          disabled={selectedProduct.quantity === 0}
        >
          Add to cart
        </Button>
        {
          user && user.isAdmin &&
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.props.history.push(`/products/edit/${selectedProduct.id}`)}
          >
            Edit Product
            </Button>
        }
        <Button variant="contained" color="secondary"
          onClick={() => {
            clearSelectedProduct()
            this.props.history.push('/')
          }}
        >Return to products
          </Button>
        <h3>
          Average Rating: </h3>
        {selectedProduct.numRatings === 0 ? <span style={{ fontStyle: 'italic' }}>No ratings</span> :
          <Rating name="rating" value={Math.ceil(selectedProduct.averageRating)} readOnly size="small" />
        }
        <h3>
          Customer Reviews:
        </h3>
        {reviews.length === 0 ? <span style={{ fontStyle: 'italic' }}>No reviews</span> :
          <ul>
            {reviews && reviews.map(review => {
              return (
                <li key={review.id} style={{ fontWeight: 'bold' }}>
                  {review.title}
                  <div>
                    <div style={{ fontStyle: 'italic', fontWeight: 'normal', padding: '3px' }}>"{review.body}"</div>
                  </div>
                </li>
              )
            })}
          </ul>
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    selectedProduct: state.selectedProduct,
    cart: state.cart,
    user: state.user,
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