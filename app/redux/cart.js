import axios from 'axios';
import chalk from 'chalk';
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

export const setCart = cart => {
  return {
    type: SET_CART,
    cart
  }
};

//reducer
export const cartReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_CART_ITEM: {
      [...state.cartitems, action.cartItem]
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

//fetch cart
export const fetchCart = () => {
  return (dispatch, getState, { axios }) => {
    return axios.get('/api/cart/')
      .then(cart => {
        cart.data.id ?
          dispatch(setCart(cart.data))
          : dispatch(newSessionCart())
      })
      .catch((e) => {
        console.log('error in fetchCart thunk');
        console.error(e);
      });
  }
};

//creates a new cart with the current sessionId
export const newSessionCart = () => {
  return (dispatch, getState, { axios }) => {
    return axios.post('/api/cart/')
      .then(response => response.data)
      .then(cart => dispatch(setCart(cart)))
      .catch(e => console.log(chalk.red(`Error in Redux thunk createSessionCart: ${e}`)))
  }
};

export const mergeCart = () => {
  return (dispatch, getState, { axios }) => {
    const { cart } = getState();
    return axios.get('/api/cart')
      .then(userCart => {
        for (let i = 0; i < cart.cartitems.length; i++) {
          const cartItem = cart.cartitems[i]
          dispatch(updateCartItem(cartItem.id, { cartId: userCart.data.id }))
        }
      })
      .then(() => axios.delete(`/api/cart/${cart.id}`))
      .catch(e => console.log('Error in Redux thunk mergeCart: ', e))
  }
}

export const updateCart = (update) => {
  return (dispatch, getState, { axios }) => {
    const { cart } = getState();
    return axios.put(`/api/cart/${cart.id}`, update)
      .then(() => dispatch(fetchCart()))
      .catch(e => console.log(`Error in Redux thunk updateCart: ${e}`))
  }
};

//---------Cart Item Thunks

export const addCartItem = (cartId, productId, quantity) => {
  return (dispatch) => {
    axios.post('/api/cartitem', { cartId, productId, quantity })
      .then(cartItem => dispatch(fetchCart()))
      .catch(e => console.error(e))
  }
};

export const updateCartItem = (cartItemId, newDetails) => {
  return (dispatch) => {
    axios.put(`/api/cartitem/${cartItemId}`, newDetails)
      .then(() => dispatch(fetchCart()))
      .catch(e => console.error(e))
  }
};

export const deleteCartItem = (cartItemId) => {
  return (dispatch) => {
    axios.delete(`/api/cartitem/${cartItemId}`)
      .then(() => dispatch(fetchCart()))
      .catch(e => console.error(e))
  }
};

//-------
//Archived version of fetch cart that is split into two pieces
//keeping here for troubleshooting use


// export const fetchUserCart = () => {
  //   return (dispatch, getState, { axios }) => {
  //     return axios.get('/api/cart/user')
  //       .then(cart => 
  //         cart.data ?
  //         dispatch(setCart(cart.data))
  //         : dispatch(fetchSessionCart())
  //         )
  //       .catch((e) => {
  //         console.log('error in fetchCart thunk');
  //         console.error(e);
  //       });
  //   }
  // };

  // //fetches cart by sessionId
  // export const fetchSessionCart = () => {
  //   return (dispatch, getState, { axios }) => {
  //     return axios.get('/api/cart/session')
  //       .then(cart => 
  //         cart.data ?
  //         dispatch(setCart(cart.data))
  //         : dispatch(newSessionCart())
  //       )
  //       .catch((e) => {
  //         console.log('error in fetchSessionCart thunk');
  //         console.error(e);
  //       });
  //   }
  // };
