import chalk from 'chalk';
import { createCart } from './cart'

const SET_USER = 'SET_USER';

//initial state
const initState = '';

//action creators
const setUser = (user) => {
  return {
    type: SET_USER,
    user
  }
};


//thunks

//log in a user (for login form and after a new guest has been created)
//note the /auth/login call will also set the cookie
export const loginUser = (user) => {
  return (dispatch, getState, { axios }) => {
    return axios.post('/auth/login', { email: user.email, password: user.password })
      .then(response => response.data)
      .then((user) => dispatch(setUser(user)))
      .catch(e => console.log(chalk.red('login failed')))
  }
};

//check if cookie is set, and then set the user as per that cookie
export const fetchLogin = () => {
  return (dispatch, getState, { axios }) => {
    return axios.get('/auth/who')
      .then(user => dispatch(setUser(user.data)))
      .catch(() => dispatch(createGuest()));
  }
};

export const createGuest = () => {
  return (dispatch, getState, { axios }) => {
    return axios.post('/api/user/guest', {})
      .then(response => response.data)
      .then(guest => {
        return dispatch(loginUser(guest))
      })
      .catch(e => console.log(chalk.red(`Error IN Redux thunk createGuest: ${e}`)))
  }
};

export const fetchUser = (userId) => {
  return (dispatch, getState, { axios }) => {
    return axios.get(`/api/user/${userId}`)
      .then(response => response.data)
      .then(user => dispatch(setUser(user)))
      .catch(e => console.log(chalk.red(`Error IN Redux thunk fetchUser: ${e}`)))
  }
};

export const createUser = (user) => {
  return (dispatch, getState, { axios }) => {
    return axios.post('/api/user', { user })
      .then(response => response.data)
      .then(newUser => dispatch(loginUser(newUser)))
      .catch(e => console.log(chalk.red(`Error IN Redux thunk createUser: ${e}`)))
  }
};

export const createGuestAndCart = () => {
  return (dispatch, getState) => {
    return dispatch(createGuest())
      .then(() => {
        const user = getState().user;
        return dispatch(createCart(user.id))
      })
  }
}

//reducer
export const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
};