import axios from 'axios';
const SET_PRODUCTS = 'SET_PRODUCTS';

//action creators
const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }

};

//reducer
export const productsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}

//thunks
export const fetchProducts = function () {
  return dispatch => {
    axios.get('/api/products')
      .then(products => dispatch(setProducts(products.data)))
      .catch(e => console.log(e));
  }
};

