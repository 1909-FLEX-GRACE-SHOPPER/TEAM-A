import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/products';
import { fetchCart, fetchCartByUserId, updateCartItem, deleteCartItem } from '../redux/cart'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


class Cart extends React.Component {
  // constructor(){
  //   super();
  //   this.state={
  //     totalCost:0,
  //   }
  // }

  handleChange(ev, cartItemId) {
    this.props.updateCartItem(cartItemId, { quantity: parseInt(ev.target.value) })
  }

  render() {
    let totalCost = 0
    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="shoppingCart">
            <TableHead>
              <TableRow>
                <TableCell>Product Id</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.cart.id ?
                  (this.props.cart.cartitems.map(cartItem => (
                    <TableRow key={cartItem.id}>
                      {this.props.products.map(product => {
                        if (cartItem.productId === product.id) {
                          const productCost = product.price * cartItem.quantity
                          totalCost += productCost
                      return (
                            <Fragment key={cartItem.id}>
                              <TableCell align="left" >{product.name}</TableCell>
                              <TableCell align="left"><select name='quantity' value={cartItem.quantity} onChange={ev => this.handleChange(ev, cartItem.id)}>
                                {
                                  Array(10).fill('').map((el, idx) => <option key={idx} defaultValue={cartItem.quantity}>{idx + 1}</option>)
                                }
                              </select></TableCell>
                              <TableCell align="left" >{product.price}</TableCell>
                              <TableCell align="left" >{productCost}</TableCell>
                              <TableCell align="left" ><Button
                                variant="contained"
                                color="secondary"
                                startIcon={<DeleteIcon />}
                                onClick={() => this.props.deleteCartItem(cartItem.id)}
                              >
                                Delete
                                </Button>
                              </TableCell>
                            </Fragment>)
                        }
                      })}
                    </TableRow>
                  ))) : (
                    <TableRow>
                      <TableCell>Loading...</TableCell>
                    </TableRow>
                  )
              }
            </TableBody>
          </Table>
        </TableContainer>
        <h4>Total Cost</h4>
        <p>{totalCost}</p>
        <Button onClick={() => window.location.href = '/#/checkout'}>Checkout</Button>
      </div>
    )
  }
}


const mapState = ({ cart, user, products }) => {
  return {
    cart,
    user,
    products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: (cartId) => dispatch(fetchCart(cartId)),
    fetchProducts: () => dispatch(fetchProducts()),
    fetchCartByUserId: (userId) => dispatch(fetchCartByUserId(userId)),
    updateCartItem: (cartItemId, newDetails) => dispatch(updateCartItem(cartItemId, newDetails)),
    deleteCartItem: (cartItemId) => dispatch(deleteCartItem(cartItemId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
