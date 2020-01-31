import chalk from 'chalk';

const SET_SHIPPING_ADDRESS = 'SET_SHIPPING_ADDRESS';

//initial state
const initState = '';

//action creator
export const setShippingAddress = (shippingAddress) => {
  return {
    type: SET_SHIPPING_ADDRESS,
    shippingAddress
  }
};

//thunks
export const fetchShippingAddress = (userId) => {
  return (dispatch, getState, { axios }) => {
    return axios.get(`/api/shippingaddress/${userId}`)
      .then(response => response.data)
      .then(address => dispatch(setShippingAddress(address)))
      .catch(e => console.log(chalk.red('error: fetchShippingAddress thunk failed')))
  }
};

export const postShippingAddress = (address) => {
  return (dispatch, getState, { axios }) => {
    return axios.post('/api/shippingaddress', address)
      .then(response => response.data)
      .then(address => dispatch(setShippingAddress(address)))
      .catch(e => console.log(chalk.red('error: setShippingAddress thunk failed')))
  }
};

export const updateShippingAddress = (address) => {
  return (dispatch, getState, { axios }) => {
    return axios.put(`/api/shippingaddress/${userId}`, { address })
      .then(response => response.data)
      .then(address => dispatch(setShippingAddress(address)))
      .catch(e => console.log(chalk.red('error: setShippingAddress thunk failed')))
  }
};

//reducer
export const shippingAddressReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_SHIPPING_ADDRESS:
      return action.shippingAddress;
    default:
      return state;
  }
};