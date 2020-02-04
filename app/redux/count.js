const SET_COUNT = 'SET_COUNT';

initState = 0;

//action creators
const setCount = count => {
  return {
    type: SET_COUNT,
    count
  }
};

//thunk
export const fetchCount = () => {
    return (dispatch, getState, { axios }) => {
        axios.get('/api/products?all=true')
            .then(allProducts => dispatch(setCount(allProducts.data.length)))
            .catch(e => {
                console.log('error in fetchCount thunk');
                dispatch(setCount(0))
            })
    }
}

//reducer
export const countReducer = (state = initState, action) => {
    switch (action.type) {
      case SET_COUNT:
        return action.count;
      default:
        return state;
    }
}