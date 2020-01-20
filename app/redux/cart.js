import axios from 'axios';
const SET_CART = 'SET_CART';

//action creators
const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
};

//reducer
export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CART: {
      return action.cart;
    }
    default: {
      return state;
    }
  }
}

//thunks
export const fetchCart = function (cartId) {
  return dispatch => {
    axios.get(`/api/cart/${cartId}`)
      .then(cart => dispatch(setCart(cart.data)))
      .catch(e => console.log(e));
  }
};
