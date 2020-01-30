import axios from 'axios';

const SET_ORDERS_BY_USER = 'SET_ORDERS_BY_USER';

//action creators
const setOrdersByUser = orders => {
  return {
    type: SET_ORDERS_BY_USER,
    orders: [...orders]
  }
};


//reducer
export const ordersByUserReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ORDERS_BY_USER:
      return action.orders;
    default:
      return state;
  }
}

//thunks
export const fetchOrdersByUser = function () {
  return dispatch => {
    axios.get('/api/order')
      .then(orders => {
        return dispatch(setOrdersByUser(orders.data))
      })
      .catch(e => console.log(e));
  }
};

export const createOrderAndAddOrderItems = function () {
  return (dispatch, getState) => {
    axios.post('/api/order/')
      .then(order => {
        const cart = getState().cart
        cart.cartitems.forEach(cartItem => axios.post(`/api/orderitem/`, { orderId: order.data.id, productId: cartItem.productId, pricePaid: cartItem.product.price, quantity: cartItem.quantity }))
      })
      .then(() => dispatch(fetchOrdersByUser()))
      .catch(e => console.log(e));
  }
}

// const addOrderItem = function (orderId, productId, pricePaid, quantity) {
//   return dispatch => {
//     axios.post(`/api/orderitem/`, { orderId, productId, pricePaid, quantity })
//       // .then(orderItem => dispatch(addAnOrderItem(orderItem.data)))
//       // .then((orderItem) => console.log('orderItem: ', orderItem.data))
//       .catch(e => console.log(e));
//   }
// }

// export const createOrderAndAddOrderItems = function () {
//   return (dispatch, getState) => {
//     return dispatch(createOrder())
//       .then(order => console.log('order line 79: ', order))
//     // const cart = getState().cart
//     // // console.log('cart: ', cart)
//     // const order = getState().order
//     // console.log('order: ', order)
//     // return cart.cartitems.forEach(cartItem => dispatch(addOrderItem(order.id, cartItem.productId, cartItem.product.price, cartItem.quantity)))
//   }
// }

// export const createOrderAndAddOrderItems = function () {
//   return (dispatch, getState) => {
//     return dispatch(createOrder())
//       .then(() => {
//         console.log('line 74')
//         const cart = getState().cart
//         const order = getState().order
//         return cart.cartItems.forEach(cartItem => dispatch(addOrderItem(order.id, cartItem.productId, cartItem.product.price, cartItem.quantity)))
//       })
//       .catch(e => console.error(e))
//   }
// }

