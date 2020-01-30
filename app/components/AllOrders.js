import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrdersByUser } from '../redux/ordersByUser'

class AllOrders extends Component {

  componentDidMount() {
    this.props.fetchOrders();
  }

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

const mapDispatch = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrdersByUser())
  }
}

export default connect(mapState, mapDispatch)(AllOrders)