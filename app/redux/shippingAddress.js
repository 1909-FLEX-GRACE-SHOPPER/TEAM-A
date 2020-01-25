import axios from 'axios';
const SET_SHIPPING_ADDRESS = 'SET_SHIPPING_ADDRESS';
const SET_PAYMENT_INFO = 'SET_PAYMENT_INFO';

const initialState = {
	paymentInfo: {},
	shippingAddress: {}
};

//action creators
const setShippingAddress = shippingAddress => {
  return {
    type: SET_SHIPPING_ADDRESS,
    shippingAddress
  }

};

export const setPaymentInformation = (paymentInfo) => {
  console.log('inside setPayment: ', paymentInfo)
  return {
    type: SET_PAYMENT_INFO,
    paymentInfo
  }
}

//reducer
export const shippingAddressReducer = (state = initialState, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case SET_SHIPPING_ADDRESS:
      newState.shippingAddress = action.shippingAddress;
      break;
    case SET_PAYMENT_INFO:
      newState.paymentInfo = action.paymentInfo;
      break;
    default:
      return newState;
  }
  return newState;
}

//thunks
export const fetchShippingAddress = function (userId) {
  return dispatch => {
    axios.get(`/api/shippingAddress/${userId}`)
      .then(address => dispatch(setShippingAddress(address.data)))
      .catch(e => console.log(e));
  }
};

export const updateShippingAddress = (shippingAddress, isUpdate, paymentPayload, userId) => {
  return dispatch => {
    if (isUpdate) {
      axios.put(`/api/shippingAddress/${userId}`, shippingAddress)
      .then(address => dispatch(setShippingAddress(address.data)))
      .catch(e => console.log(e));
    } else {
      axios.post(`/api/shippingAddress`, shippingAddress)
      .then(address => dispatch(setShippingAddress(address.data)))
      .catch(e => console.log(e));
    }
    dispatch(setPaymentInformation(paymentPayload))
  }
}

