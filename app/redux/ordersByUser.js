import axios from 'axios';
const SET_ORDERS_BY_USER = 'SET_ORDERS_BY_USER';
// const CREATE_ORDER = 'CREATE_ORDER';
// const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';

//action creators
const setOrdersByUser = orders => {
  return {
    type: SET_ORDERS_BY_USER,
    orders: [...orders]
  }
};

const addOrder = newOrder => {
  return {
    type: CREATE_ORDER,
    newOrder
  }
}

const addAnOrderItem = orderItem => {
  return {
    type: ADD_ORDER_ITEM,
    orderItem
  }
}


//reducer
export const ordersByUserReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ORDERS_BY_USER:
      return action.orders;
    case CREATE_ORDER:
      return action.newOrder;
    // case ADD_ORDER_ITEM:
    //   return action.orderItem;
    default:
      return state;
  }
}

//thunks
export const fetchOrdersByUser = function (userId) {
  return dispatch => {
    axios.get(`/api/order/byuser/${userId}`)
      .then(orders => {
        return dispatch(setOrdersByUser(orders.data))
      })
      .catch(e => console.log(e));
  }
};

// export const createOrder = function (newOrderId) {
//   return dispatch => {
//     axios.post(`/api/order/`, newOrderId)
//       .then(newOrder => dispatch(addOrder(newOrder.data)))
//       .catch(e => console.log(e));
//   }
// }

// export const addOrderItem = function (orderId, productId) {
//   return dispatch => {
//     axios.post(`/api/orderitem/`, { orderId, productId })
//       .then(orderItem => dispatch(addAnOrderItem(orderItem.data)))
//       .catch(e => console.log(e));
//   }
// }

// export const createOrderAndAddOrderItems = function (orderId) {
//   return (dispatch, getState) => {
//     return dispatch(createOrder(orderId))
//       .then(() => {
//         const cart = getState().cart
//         const order = getState().order
//         return cart.cartItems.forEach(cartItem => dispatch(addOrderItem(order.userId, cartItem.productId)))
//       })
//   }
// }

