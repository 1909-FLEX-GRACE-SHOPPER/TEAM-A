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
