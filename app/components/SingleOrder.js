import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SingleOrder extends Component {

  render() {
    const orderId = parseInt(this.props.match.params.id);
    const order = this.props.ordersByUser.filter(order => order.id === orderId)
    return (
      <>
        <h1>Single Order</h1>
        <>
          {
            order.length > 0 ?
              (
                <div>
                  <h2>Order ID: {order[0].id}</h2>
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

export default connect(mapState)(SingleOrder)