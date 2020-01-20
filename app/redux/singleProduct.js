import axios from 'axios';
const SET_SELECTED_PRODUCT = 'SET_SELECTED_PRODUCT';
const SELECTED_QUANTITY = 'SELECTED_QUANTITY';

//action creators
const setSelectedProduct = product => {
    return {
        type: SET_SELECTED_PRODUCT,
        product
    }

};

//reducer
export const singleProductReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_SELECTED_PRODUCT':
            return action.product;
        default:
            return state;
    }
}

//thunks
export const fetchProduct = function (productId) {
    return dispatch => {
        axios.get(`/api/products/${productId}`)
            .then(product => dispatch(setSelectedProduct(product.data)))
            .catch(e => console.log(e));
    }
};

