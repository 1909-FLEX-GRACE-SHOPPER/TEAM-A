import chalk from 'chalk';

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
      .catch(() => dispatch(setUser(null)))
  } 
};

export const loginUser = (login) => {
  return (dispatch, getState, { axios }) => {
    return axios.post('/auth/login', login)
      .then(user => dispatch(setUser(user.data)))
      .catch(user => dispatch(setUser(null)))
  }
};

export const logoutUser = () => {
  return (dispatch, getState, { axios }) => {
    return axios.put('/auth/login', { logout: true })
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