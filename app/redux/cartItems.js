import axios from 'axios';
const SET_CART_ITEMS = 'SET_CART_ITEMS'
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

//action creators

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

//reducer
export const cartItemsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CART_ITEMS: {
      return action.cartItems
    }
    case UPDATE_CART_ITEM: {
      return state.map(cartItem => {
        if (cartItem.id !== action.newDetails.id) {
          return cartItem;
        } else {
          return {
            ...cartItem,
            ...action.newDetails,
          }
        }
      })
    }
    case DELETE_CART_ITEM: {
      return state.filter(cartItem => cartItem.id !== action.id)
    }
    default: {
      return state;
    }
  }
}

//thunks

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
        // create this:
        // dispatch(updateCartItemError())
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
