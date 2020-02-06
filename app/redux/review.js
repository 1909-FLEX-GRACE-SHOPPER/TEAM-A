import chalk from 'chalk';
import axios from 'axios';
import { fetchProducts } from './products';
import { fetchProduct } from './singleProduct';

export const addReview = (review, productId) => {
  return (dispatch) => {
    axios.post(`/api/review/${productId}`, review)
      .then(review => {
        dispatch(fetchProducts())
        dispatch(fetchProduct(productId))
      })
      .catch(e => console.log(chalk.red('error: addReview thunk failed', e)))
  };
};