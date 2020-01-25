import React from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../redux/cart';
import { fetchProducts } from '../redux/products';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


class Cart extends React.Component {

  componentDidMount() {
    this.props.fetchCart(1)
    this.props.fetchProducts()
  }

  render() {
    return (
      <div>
       <TableContainer component={Paper}>
          <Table aria-label="shoppingCart">
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Total</TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.cart.id ?
                  (this.props.cart.cartitems.map(cartItem => (
                    <TableRow key={cartItem.id}>
                      {this.props.products.map(product => {
                        if (cartItem.productId === product.id) {
                          return (
                          <>
                            <TableCell align="left" key = {product.id}>{product.name}</TableCell>
                              <TableCell align="left">{cartItem.quantity}</TableCell>
                              <TableCell align="left">{product.price}</TableCell>
                              <TableCell align="left">{product.price}</TableCell>
                           
                          </>)
                        }
                      })}
                      
                    
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

const mapState = ({ cart, products }) => {
  return {
    cart,
    products
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCart: (cartId) => dispatch(fetchCart(cartId)),
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(Cart)
