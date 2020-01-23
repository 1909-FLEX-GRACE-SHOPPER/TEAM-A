import axios from 'axios';
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const CREATE_CART = 'CREATE_CART'
const SET_CART = 'SET_CART';

//action creators

const addACartItem = (cartItem) => {
  return {
    type: ADD_CART_ITEM,
    cartItem
  }
}

const createACart = cart => {
  return {
    type: CREATE_CART,
    cart
  }
}

const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
};

//reducer
export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CART_ITEM: {
      state.cartitems.push(action.cartItem)
      return state;
    }
    case CREATE_CART: {
      return action.cart;
    }
    case SET_CART: {
      return action.cart;
    }
    default: {
      return state;
    }
  }
}

//thunks

export const addCartItem = (cartId, productId, quantity) => {
  return (dispatch) => {
    axios.post('/api/cartitem', { cartId, productId, quantity })
      .then(cartItem => dispatch(addACartItem(cartItem.data)))
      .catch(e => console.error(e))
  }
}

export const createCart = userId => {
  return dispatch => {
    axios.post('/api/cart', { userId })
      .then(cart => dispatch(createACart(cart.data)))
      .catch(e => console.error(e))
  }
}

export const fetchCart = function (cartId) {
  return dispatch => {
    axios.get(`/api/cart/${cartId}`)
      .then(cart => {
        return dispatch(setCart(cart.data))
      })
      .catch(e => console.log(e));
  }
};
