import axios from 'axios';
const ADD_PRODUCT = 'ADD_PRODUCT';
const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

//action creators
export const addProducts =  product => {
    return {
      type: ADD_PRODUCT,
      product
    };

};

export const deleteProduct = product => {
  return {
    type: REMOVE_PRODUCT,
    product
  };
};

//thunks

export const addProductToCart = function(product) {
  return dispatch => {
    axios
      .post(`/api/cart/`, product)
      .then(addedProduct => dispatch(addProducts(addedProduct.data)))
      .catch(e => console.log(e));
  };
};

export const removeProduct = function (productId) {
    return dispatch => {
        axios
          .delete(`/api/cart/${productId}`)
          .then(removeProduct => dispatch(deleteProduct(removeProduct.data)))
          .catch(e => console.log(e));
    }
};

