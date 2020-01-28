import chalk from 'chalk';
import { setCart } from './cart'

const SET_USER = 'SET_USER';

//initial state
const initState = null;

//action creators
const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
};
//check if cookie is set, and then set the user as per that cookie
export const fetchUser = () => {
  return (dispatch, getState, { axios }) => {
    return axios.get('/auth/who')
      .then(user => dispatch(setUser(user.data)))
      .then (() => dispatch(fetchCart()))
      .catch(() => dispatch(newSessionCart()))
  } 
};

export const fetchCart = () => {
  return (dispatch, getState, { axios }) => {
    return axios.get('/api/cart/byuser')
      .then(cart => dispatch(setCart(cart.data)))
      //if a 404 then make teh user a new cart
      .catch(() => dispatch(newSessionCart()));
  }
};

export const newSessionCart = () => {
  return (dispatch, getState, { axios }) => {
    return axios.post('/api/cart/', {})
      .then(response => response.data)
      .then(cart => dispatch(setCart(cart)))
      .catch(e => console.log(chalk.red(`Error IN Redux thunk createSessionCart: ${e}`)))
  }
};

export const sendLogin = (login) => {
  return (dispatch, getState, { axios }) => {
    return axios.post('/auth/login', login)
      .then(user => dispatch(setUser(user.data)))
      .catch(user => dispatch(setUser(null)))
  }
};

export const userLogout = () => {
  return (dispatch, getState, { axios }) => {
    return axios.put('/auth/login', { logout: true })
      .then(() => dispatch(setUser('')))
      .then(() => dispatch(fetchCart()))
      .catch(e => console.log(chalk.red(`Error IN Redux thunk userLogout: ${e}`)))
  }
};

//reducer
export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};