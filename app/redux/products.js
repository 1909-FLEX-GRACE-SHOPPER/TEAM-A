import axios from 'axios';
const SET_PRODUCTS = 'SET_PRODUCTS';

//action creators
const setProducts =  products => {
    return {
        type: SET_PRODUCTS,
        products
    }

};

//thunks
export const fetchProducts = function () {
    return dispatch => {
        axios.get('/api/products')
            .then(product => dispatch(setProducts(product.data)))
            .catch(e => console.log(e));
    }
};

