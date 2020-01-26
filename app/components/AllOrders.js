import React, { Component } from 'react';
import { connect } from 'react-redux';

class AllOrders extends Component {

  render() {
    const { ordersByUser } = this.props;
    return (
      <>
        <h1>All Orders</h1>
        <>
          {
            ordersByUser.length > 0 ?
              (
                <ul>
                  {
                    ordersByUser.map(order => {
                      return (
                        <li key={order.id}>
                          <a href={`/#/orders/${order.id}`}>Order ID: {order.id}</a>
                          Number of items: {order.orderitems.length}
                          Status: {order.status}
                        </li>
                      )
                    })
                  }
                </ul>
              ) : (
                <h2>No orders to display.</h2>
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

export default connect(mapState)(AllOrders)