import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrdersByUser } from '../redux/ordersByUser'
import { Container } from '@material-ui/core';

class AllOrders extends Component {

  render() {
    const { ordersByUser } = this.props;
    return (
      <>
        <Container maxWidth={"lg"}>
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
                          <ul>
                            <li>Number of items: {order.orderitems.length}</li>
                            <li>Status: {order.status}</li>
                          </ul>
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
        </Container>
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