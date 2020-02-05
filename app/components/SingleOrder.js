import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProduct } from '../redux/singleProduct';

class SingleOrder extends Component {

  render() {
    const orderId = parseInt(this.props.match.params.id);
    const order = this.props.ordersByUser.filter(order => order.id === orderId)
    // console.log('order: ', order)
    return (
      <>
        <h1>Single Order</h1>
        <>
          {
            order.length > 0 ?
              (
                <div>
                  <h2>Order ID: {order[0].id}</h2>
                  <h2>Order Items:</h2>
                  <ul>
                    {
                      order[0].orderitems.map(orderItem => {
                        return (
                          <li
                            key={orderItem.id}
                          >{orderItem.product.name}
                            {/* TODO: render "update review" if user has already left review on this product */}
                            <Link
                              to='/review'
                              onClick={() => this.props.setSelectedProduct(orderItem.product.id)}
                            >Leave a review
                          </Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                  <h2>Created At: {order[0].createdAt}</h2>
                  <h2>Status: {order[0].status}</h2>
                  <Link to='/orders'>Return to all orders</Link>
                </div>
              ) : (
                <h2>Order not found</h2>
              )
          }
        </>
      </>
    )
  }
}

const mapState = ({ ordersByUser }) => {
  return {
    ordersByUser
  }
}

const mapDispatch = dispatch => {
  return {
    setSelectedProduct: productId => dispatch(fetchProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)