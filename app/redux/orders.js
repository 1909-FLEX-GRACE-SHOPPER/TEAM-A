const SET_ORDERS= 'SET_ORDERS';

const initState = [];

//action creators
const setOrders = orders => {
  return {
    type: SET_ORDERS_BY_USER,
    orders
  }
};


//reducer
export const ordersByUserReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}

//thunks
export const fetchOrders = () => {
  return (dispatch, getState, {axios}) => {
    axios.get(`/api/order/session/`)
      .then(orders => {
        return dispatch(setOrders(orders.data))
      })
      .catch(e => console.log(e));
  }
};

export const createOrder = () => {
  return dispatch => {
    axios.post(`/api/order/`, {})
      .then(() => dispatch(fetchOrders()))
      .catch(e => console.log(e));
  }
};


