import React from 'react';
import { connect } from 'react-redux';
import { fetchCart, fetchCartByUserId } from '../redux/cart'
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


class Cart extends React.Component {

  render() {
    return (
      <div>
        <TableContainer component={Paper}>
          <Table aria-label="shoppingCart">
            <TableHead>
              <TableRow>
                <TableCell>Product Id</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.cart.id ?
                  (this.props.cart.cartitems.map(cartItem => (
                    <TableRow key={cartItem.productId}>
                      <TableCell component="th" scope="row">
                        {cartItem.productId}
                      </TableCell>
                      <TableCell align="left">{cartItem.quantity}</TableCell>
                      <TableCell align="left">{cartItem.createdAt}</TableCell>
                    </TableRow>
                  ))) : (
                    <p>Loading...</p>
                  )
              }
            </TableBody>
          </Table>
        </TableContainer>

      </div>
    )
  }

}

const mapState = ({ cart, user }) => {
  return {
    cart,
    user,
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: (cartId) => dispatch(fetchCart(cartId)),
    fetchCartByUserId: (userId) => dispatch(fetchCartByUserId(userId))
  }
}

export default connect(mapState, mapDispatch)(Cart)
