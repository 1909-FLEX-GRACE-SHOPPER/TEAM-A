// import axios from 'axios';
// const SET_ORDERS = 'SET_ORDERS';
// const CREATE_ORDER = 'CREATE_ORDER';
// const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';

// //action creators
// const setOrders = orders => {
//   return {
//     type: SET_ORDERS,
//     orders
//   }
// };

// const addOrder = newOrder => {
//   return {
//     type: CREATE_ORDER,
//     newOrder
//   }
// }
// const addAnOrderItem = orderItem => {
//   return {
//     type: ADD_ORDER_ITEM,
//     orderItem
//   }
// }


// //reducer
// export const ordersByUserReducer = (state = [], action) => {
//   switch (action.type) {
//     case SET_ORDERS:
//       return action.orders;
//     case CREATE_ORDER:
//       return action.newOrder;
//     case ADD_ORDER_ITEM:
//       return action.orderItem;
//     default:
//       return state;
//   }
// }

// //thunks
// export const fetchOrders = function () {
//   return dispatch => {
//     axios.get('/api/order')
//       .then(orders => dispatch(setOrders(orders.data)))
//       .catch(e => console.log(e));
//   }
// };

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

