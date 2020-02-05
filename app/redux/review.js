import axios from 'axios'

const ADD_REVIEW = 'ADD_REVIEW'

const addReview = (review) => {
    return {
        type: ADD_REVIEW,
        review
    }
}

export const reviewReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_REVIEW:
            state = [...state.review, action.review]
            return state;
        default:
            return state;
    }
}
//thunk to fetch reviews

export const addReview = () => {
    return (dispatch) => {
        axios.post('/api/review', (productId))
            .then(reviews => dispatch(addReview(reviews)))
            .catch(e => console.log(e))
    }
}