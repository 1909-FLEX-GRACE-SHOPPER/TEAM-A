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
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

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
      <React.Fragment>
        <Container maxWidth={"lg"}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={6}>>
        <img src={selectedProduct.imageUrl} width="400" height="400" />
            </Grid>
            <Grid item xs={6} >
              <h1>{selectedProduct.name}</h1>
              <h3>{selectedProduct.description}</h3>
              <p style={{ marginBottom: "10px" }}>Price: ${selectedProduct.price}</p>

              <select style={{ marginBottom: "10px" }} name='quantity' onChange={this.handleChange}>
                {
                  Array(10).fill('').map((el, idx) => <option key={idx}>{idx + 1}</option>)
                }
              </select>
              <Grid item sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  onClick={() => addCartItem(cart.id, this.props.match.params.id, this.state.quantity)}
                  disabled={selectedProduct.quantity === 0}
                >
                  <AddShoppingCartIcon fontSize={"small"} style={{ paddingRight: "10px" }} />
                  Add to cart
        </Button>
              </Grid>
              {
                user && user.isAdmin &&
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginBottom: "10px" }}
                  onClick={() => this.props.history.push(`/products/edit/${selectedProduct.id}`)}
                >
                  Edit Product
            </Button>
              }

              <Button>
                <Link
                  to='/'
                  onClick={() => clearSelectedProduct()}
                >Return to products</Link></Button>
            </Grid>

            <Grid item sm={6}>
              <h3>
                Average Rating
          </h3>
              {selectedProduct.numRatings === 0 ? <span style={{ fontStyle: 'italic' }}>No ratings</span> :
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating name="rating" value={Math.ceil(selectedProduct.averageRating)} readOnly size="small" />
                  <Typography variant="overline">
                    {`(${selectedProduct.numRatings})`}
                  </Typography>
                </div>
              }
              <h3>
                Customer Reviews:
        </h3>
              <div>
                {reviews.length > 0 ? reviews.map(review => {
                  return (
                    <React.Fragment key={review.id}>
                      <h4 style={{ margin: 0 }}>
                        {review.title}
                      </h4>
                      <p style={{ fontStyle: "italic", marginTop: 0, marginBottom: "1rem" }}>{review.body}</p>
                    </React.Fragment>
                  )
                }) :
                  <React.Fragment>
                    <p style={{ fontStyle: "italic", marginTop: 0, marginBottom: "1rem" }}>No Reviews</p>
                  </React.Fragment>
                }
              </div>
            </Grid>
          </Grid>
        </Container>
      </React.Fragment>
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