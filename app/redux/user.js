import chalk from 'chalk';
import { createCart, fetchCartByUserId } from './cart'
import { fetchOrdersByUser } from './ordersByUser'

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
      .then(() => {
        const user = getState().user
        return dispatch(fetchCartByUserId(user.id))
      })
      .then(() => {
        const user = getState().user
        return dispatch(fetchOrdersByUser(user.id))
      })
      .catch(() => dispatch(createGuest()));
  }
};

export const createGuest = () => {
  return (dispatch, getState, { axios }) => {
    return axios.post('/api/user/guest', {})
      .then(response => response.data)
      .then(guest => {
        return dispatch(loginUser(guest))
          .then(() => {
            return dispatch(createCart(guest.id))
          })
      })
      .catch(e => console.log(chalk.red(`Error IN Redux thunk createGuest: ${e}`)))
  }
};

export const fetchUser = (userId) => {
  return (dispatch, getState, { axios }) => {
    return axios.get(`/api/user/${userId}`)
      .then(response => response.data)
      .then(user => dispatch(setUser(user)))
      .then(() => dispatch(createCart(getState().user.id)))
      .catch(e => console.log(chalk.red(`Error IN Redux thunk fetchUser: ${e}`)))
  }
};

export const updateUser = (userId, newUserDetails) => {
  return (dispatch, getState, { axios }) => {
    return axios.put(`/api/user/${userId}`, newUserDetails)
      .then(response => response.data)
      .then((newUser) => dispatch(setUser(newUser)))
      .catch(e => {
        console.error(e)
      })
  }
}

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

export const userLogout = () => {
  return (dispatch, getState, {axios}) => {
      return axios.put('/auth/login', {logout: true})
          .then(() => dispatch(setUser('')))
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