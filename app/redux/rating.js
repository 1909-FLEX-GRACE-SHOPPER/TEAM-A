import chalk from 'chalk';
import axios from 'axios';
import { fetchProducts } from './products';
import { fetchProduct } from './singleProduct';

export const addRating = (rating, productId) => {
  return (dispatch) => {
    axios.get(`/api/products/${productId}`)
      .then(result => result.data)
      .then(product => {
        let totalRatings = product.averageRating * product.numRatings;
        totalRatings += rating;
        const newAverageRating = totalRatings / (product.numRatings + 1);
        axios.put(`/api/products/${productId}`, { numRatings: product.numRatings + 1, averageRating: parseInt(newAverageRating.toFixed(1)) })
          .then(() => {
            dispatch(fetchProduct(productId))
            dispatch(fetchProducts())
          })
          .catch(e => console.log(chalk.red('error updating product in addRating thunk', e)))
      })
      .catch(e => console.log(chalk.red('error: addRating thunk failed', e)))
  };
};