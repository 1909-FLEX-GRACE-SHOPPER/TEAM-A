import axios from 'axios';
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const SET_CART_ITEMS = 'SET_CART_ITEMS'
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const CREATE_CART = 'CREATE_CART'
const SET_CART = 'SET_CART';

//action creators

const addACartItem = (cartItem) => {
  return {
    type: ADD_CART_ITEM,
    cartItem
  }
}

const setCartItems = cartItems => {
  return {
    type: SET_CART_ITEMS,
    cartItems
  }
}

const updateACartItem = (newDetails, id) => {
  return {
    type: UPDATE_CART_ITEM,
    newDetails: {
      ...newDetails,
      id
    }
  }
}

const deleteACartItem = id => {
  return {
    type: DELETE_CART_ITEM,
    id
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
      state.cartitems.push(action.cartItem);
      return state;
    }
    case SET_CART_ITEMS: {
      state.cartitems = action.cartItems;
      return state;
    }
    case UPDATE_CART_ITEM: {
      const newCartItems = state.cartitems.map(cartItem => {
        if (cartItem.id !== action.newDetails.id) {
          return cartItem;
        } else {
          return {
            ...cartItem,
            ...action.newDetails,
          }
        }
      })
      return { ...state, cartitems: newCartItems }
    }
    case DELETE_CART_ITEM: {
      const newCartItems = state.cartitems.filter(cartItem => cartItem.id !== action.id)
      return { ...state, cartitems: newCartItems }
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

export const fetchCartItems = (cartId) => {
  return (dispatch) => {
    axios.get(`/api/cart/${cartId}`)
      .then(cart => dispatch(setCartItems(cart.data.cartItems)))
      .catch(e => console.error(e))
  }
}

export const updateCartItem = (cartItemId, newDetails) => {
  return (dispatch) => {
    axios.put(`/api/cartitem/${cartItemId}`, newDetails)
      .then(() => dispatch(updateACartItem(newDetails, parseInt(cartItemId))))
      .catch(e => {
        console.error(e)
        // TODO: create dispatch(updateCartItemError())
      })
  }
}

export const deleteCartItem = cartItemId => {
  return (dispatch) => {
    axios.delete(`/api/cartitem/${cartItemId}`)
      .then(() => dispatch(deleteACartItem(cartItemId)))
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

export const fetchCartByUserId = function (userId) {
  return dispatch => {
    axios.get(`/api/cart/byuser/${userId}`)
      .then(cart => {
        return dispatch(setCart(cart.data))
      })
      .catch(e => console.log(e));
  }
};
