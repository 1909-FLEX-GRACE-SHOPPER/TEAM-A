import axios from 'axios'

//thunk to add a review
export const addReview = (review, productId) => {
    return (dispatch) => {
        axios.post('/api/review', (review))
            .then(review => dispatch(addReview(review, productId)))
            .catch(e => console.log(e))
    }
}