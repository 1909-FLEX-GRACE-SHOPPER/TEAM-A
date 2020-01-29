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
import { addCartItem } from '../redux/cart';


//MaterialUI
import { Card, Grid, Paper, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(
  {
    card: {
      maxWidth: 345,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },}
)

class SingleProduct extends Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    }
    this.handleChange = this.handleChange.bind(this)
    const classes = useStyles();
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
        <Paper>
          <Card className={classes.card}>
            <CardMedia
              className={this.classes.media}
              image="https://cdn.dribbble.com/users/1003768/screenshots/3237397/shitty-ideas-yatish-asthana-dribbble.png"
              title="Paella dish"
            />
        </Card>
        <h2>Name: {selectedProduct.name}</h2>
        <h2>Price: ${selectedProduct.price}</h2>
        <h3>Description: {selectedProduct.description}</h3>
        <select name='quantity' onChange={this.handleChange}>
          {
            Array(10).fill('').map((el, idx) => <option key={idx}>{idx + 1}</option>)
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
        </Paper>
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