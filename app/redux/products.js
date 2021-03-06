import axios from 'axios';
const SET_PRODUCTS = 'SET_PRODUCTS';

//action creators
const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products: products
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

export const fetchProducts = function (page, valString = '', ) {
  return dispatch => {
    if (valString) {
      axios.get(`/api/products?page=${!page ? 0 : page}${valString}`) //longtime
        .then(products => dispatch(setProducts(products.data)))
        .catch(e => console.log(e));
    }
    else {
      axios.get(`/api/products?page=${page ? page : 0}`) //longtime
        .then(products => dispatch(setProducts(products.data)))
        .catch(e => console.log(e));
    }
  }
};

export const updateProduct = (update, id) => {
  return (dispatch, getState, { axios }) => {
    axios.put(`/api/products/${id}`, update)
      .then(() => dispatch(fetchProducts()))
      .catch(e => {
        console.log('Error in update product thunk');
        dispatch(fetchProducts());
      })
  }
};

export const deleteProduct = (id) => {
  return (dispatch, getState, { axios }) => {
    axios.delete(`/api/products/${id}`)
      .then(() => dispatch(fetchProducts()))
      .catch(e => {
        console.log('Error in update product thunk');
        dispatch(fetchProducts());
      })
  }
};

