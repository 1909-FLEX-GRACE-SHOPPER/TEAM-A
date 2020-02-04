import axios from 'axios'

const SET_REVIEW = 'SET_REVIEW'

const setReview = (review) => {
    return {
        type: SET_REVIEW,
        review
    }
}

export const reviewReducer = (state = [], action) => {
    switch (action.type) {
        case SET_REVIEW:
            return action.review;
        default:
            return state;
    }
}
//thunk to fetch reviews

export const fetchReviews = () => {
    return (dispatch) => {
        axios.get('/api/review')
            .then(reviews => dispatch(setReview(reviews.data)))
            .catch(e => console.log(e))
    }
}