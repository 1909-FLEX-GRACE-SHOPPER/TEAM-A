import axios from 'axios';
const SET_USER = 'SET_USER';

//action creators
const setUser = user => {
    return {
        type: SET_USER,
        user
    }

};

//reducer
export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.user;
        default:
            return state;
    }
}

//thunks
export const fetchUser = function (userId) {
    return dispatch => {
        axios.get(`/api/users/${userId}`)
            .then(user => dispatch(userReducer(user.data)))
            .catch(e => console.log(e));
    }
};