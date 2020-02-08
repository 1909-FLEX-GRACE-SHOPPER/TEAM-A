import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../redux/products';
import { updateCartItem, deleteCartItem } from '../redux/cart'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Image from 'material-ui-image'
import { Container } from '@material-ui/core';

class Cart extends React.Component {

  handleChange(ev, cartItemId) {
    this.props.updateCartItem(cartItemId, { quantity: parseInt(ev.target.value) })
  }

  render() {
    let totalCost = 0
    return (
      <div>
        <Container maxWidth={"lg"}>
        <TableContainer component={Paper}>
          <Table aria-label="shoppingCart">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Product</TableCell>
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
                    // { let productCost = product.price * cartItem.quantity
                    //   totalCost += productCost}
                    <TableRow key={cartItem.id}>
                      <Fragment key={cartItem.id}>
                        <TableCell align="left" >
                         
                          <Image
                        
                            src={cartItem.product.imageUrl}
                        
                          />
                       
                        </TableCell>
                        <TableCell align="left" >{cartItem.product.name}</TableCell>
                        <TableCell align="left"><select name='quantity' value={cartItem.quantity} onChange={ev => this.handleChange(ev, cartItem.id)}>
                          {
                            Array(10).fill('').map((el, idx) => <option key={idx} defaultValue={cartItem.quantity}>{idx + 1}</option>)
                          }
                        </select></TableCell>
                        <TableCell align="left" >${cartItem.product.price}</TableCell>
                        <TableCell align="left" >${cartItem.product.price * cartItem.quantity}.00</TableCell>
                        <TableCell align="left" ><Button
                          color="secondary"
                          startIcon={<DeleteIcon />}
                          onClick={() => this.props.deleteCartItem(cartItem.id)}
                        >
                          Delete
                                </Button>
                        </TableCell>
                       
                      </Fragment>
                      {/* } */}
                    </TableRow>
                   
                  ))) : (
                    <TableRow>
                      <TableCell>Loading...</TableCell>
                    </TableRow>
                  )
              }
              <TableRow>
                <TableCell align="left" >Total Cost: {totalCost} </TableCell>
               </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Button onClick={() => window.location.href = '/#/checkout'}>Checkout</Button>
        </Container>
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
    fetchProducts: () => dispatch(fetchProducts()),
    updateCartItem: (cartItemId, newDetails) => dispatch(updateCartItem(cartItemId, newDetails)),
    deleteCartItem: (cartItemId) => dispatch(deleteCartItem(cartItemId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
